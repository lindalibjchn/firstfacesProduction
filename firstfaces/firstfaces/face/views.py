from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .forms import UserForm, SignUpForm, SignUpUserForm
from django.contrib.auth.password_validation import validate_password
from django.http import JsonResponse
from .utils import *
from django.utils import timezone
import json
from .models import Session, Sentence, AudioFile, Profile, NewsArticle
from django.conf import settings
from django.core.files.storage import FileSystemStorage
import code
import speech_recognition as sr
import soundfile as sf
import os
import time
from operator import itemgetter
import datetime
import logging
from google.cloud import texttospeech
import math
from django.core.mail import send_mail

logger = logging.getLogger(__name__)
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/johnsHDD/PhD_backup/erle-3666ad7eec71.json"
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/johnsHDD/PhD/2018_autumn/erle-3666ad7eec71.json"
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/firstfaces/erle-3666ad7eec71.json"

def out_or_in(request):

    if request.user.is_authenticated:

        return redirect('waiting')

    else:

        return redirect('entrance')

def entrance(request):

    form = UserForm()
    sign_up_form = SignUpForm()
    sign_up_user_form = SignUpUserForm()
    context = {
        'form': form,
        'signUpForm': sign_up_form,
        'signUpUserForm': sign_up_user_form,
    }

    return render(request, 'face/entrance.html', context)

def my_login(request):

    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        
        login(request, user)

        response_data = {
            'loggedIn': True,
        }

    else:

        response_data = {
            'loggedIn': False,
        }

    return JsonResponse(response_data)    

def sign_up(request):

    nationality = request.GET['nationality']
    language = request.GET['language']
    born = request.GET['born']
    gender = request.GET['gender']
    education = request.GET['education']
    lived_in_english_speaking_country = request.GET['lived_in_english_speaking_country']
    p = Profile(learner=request.user, nationality=nationality, language=language, born=born, gender=gender, education=education, lived_in_english_speaking_country=lived_in_english_speaking_country)   
    p.save()

    response_data = {

    }

    return JsonResponse(response_data)    

def sign_up_user(request):

    # code.interact(local=locals());
    username = request.POST['username']
    email = request.POST['email']
    password = request.POST['password1']

    username_unique = check_if_username_is_unique( username )
    user_id = 0

    password_ok = True
    
    if username_unique:
        
        u = User(username=username, email=email)
        u.set_password(password)

        try: 
            
            validate_password( password, u )
   
            u.save();
            login(request, u)

        except:
            
            password_ok = False

    response_data = {

        'usernameUnique': username_unique,
        'passwordOK': password_ok,

    }

    return JsonResponse(response_data)    

@login_required
def waiting(request):
    
    time_now = timezone.localtime(timezone.now()).strftime("%H:%M")
    date_now = timezone.localtime(timezone.now()).date()

    availables = get_availables_for_schedule()

    # in utils.py, for schedule on board
    schedule_dict, schedule_now = make_schedule_dict( availables )

    # in "Monday 18:00" format
    next_class, next_class_after_today = get_upcoming_class( availables )
    schedule_dict[ 'upcomingClass' ] = next_class
    schedule_dict[ 'upcomingClassAfterToday' ] = next_class_after_today
    # check if in class or during class
    sessions = Session.objects.filter( learner=request.user )
    # returns boolean
    schedule_dict[ 'class_already_done_today' ] = json.dumps( get_class_already_done_today( sessions ) )
    schedule_dict[ 'in_class_now' ], schedule_dict[ 'session_id' ] = get_in_class_now( sessions )

    # get dictionary of all previous sessions
    sessions_dict = get_prev_sessions( request.user )

    try:
        todays_news_article = NewsArticle.objects.get(date=date_now)
        headline = todays_news_article.title
        article_link = todays_news_article.link
    except:
        headline = "no article today"
        article_link = "#"

    context = {

        'schedule_dict': json.dumps(schedule_dict),
        'schedule_now': json.dumps(schedule_now),
        'sessions_dict': json.dumps(sessions_dict),
        'waiting': True,
        'timeNow': time_now,
        'headline': headline,
        'article_link': article_link,

    }

    return render(request, 'face/waiting.html', context)

@login_required
def class_time(request, session_id):

    print('request.class_time:', request.path)

    try:

        sess = Session.objects.get(id=session_id)
        
        if sess.end_time == None:

            print("time_now:", sess.start_time)
            print("time_now local:", timezone.localtime(sess.start_time))
            start_time = int(time.mktime((sess.start_time).timetuple()))
       
            if request.user == sess.learner:

                #check if learner entered a topic. If so then it is not first entry
                first_enter = True 
                sentences = {}
                id_of_last_sent = None;
                last_sent = {}

                # get news article details
                try:
                    todays_news_article = NewsArticle.objects.get(date=date_now)
                    headline = todays_news_article.title
                    article_link = todays_news_article.link
                except:
                    headline = "no article today"
                    article_link = "#"

                # get previous session topic
                prev_topic = None
                try:
                    recent_sesss = Session.objects.filter(start_time__gte=sess.start_time-datetime.timedelta(days=14)).order_by('-pk')
                    if len(recent_sesss) > 1:
                        prev_topic = recent_sesss[1].topic
                        if prev_topic == 'emotion':
                            prev_topic = 'feeling ' + recent_sesss[1].learner_emotion
                except:
                    pass

                blob_no_text = False
                blob_no_text_sent_id = None

                #check to see if there is a topic i.e. not their first enter
                if sess.topic != None:
                    
                    first_enter = False

                    this_sess_sents = Sentence.objects.filter(session=sess).order_by('pk')

                    #check that there are entries in the queryset i.e. not empty
                    if this_sess_sents:

                        id_of_last_sent = this_sess_sents.count() - 1

                        for i, s in enumerate(this_sess_sents):

                            # have to change from decimal in db to float
                            float_nodSpeed = None
                            float_nodAmount = None
                            float_surprise = None

                            if s.nodSpeed != None:

                                float_nodSpeed = float(s.nodSpeed)

                            if s.nodAmount != None:

                                float_nodAmount = float(s.nodAmount)

                            if s.surprise != None:

                                float_surprise = float(s.surprise)

                            sentences[i] = {
                                'sent_id': s.id,
                                'sentence': s.sentence,
                                'question': s.question,
                                'judgement': s.judgement,
                                'emotion': s.emotion,
                                'nod': s.nod,
                                'nodSpeed': float_nodSpeed,
                                'nodAmount': float_nodAmount,
                                'surprise': float_surprise,
                                'indexes': s.indexes,
                                'correction': s.correction,
                                'prompt': s.prompt,
                                'show_correction': s.show_correction,
                            }

                        #need to check if sentence has blob but no text
                        last_sent = list(this_sess_sents)[-1]
                        if last_sent.sentence == None: 

                            blob_no_text = True
                            blob_no_text_sent_id = last_sent.id

                        last_sent = sentences[id_of_last_sent]

                class_over = False
                if sess.end_time != None:
                    print('sess.end_time and so class_over is true:', sess.end_time)
                    class_over = True

                class_variable_dict = {

                    'classOver': class_over,
                    'username': request.user.username,
                    'start_time': start_time * 1000,
                    'session_id': session_id,
                    'first_enter': first_enter,
                    'sentences': sentences,
                    'blob_no_text': blob_no_text,
                    'blob_no_text_sent_id': blob_no_text_sent_id,
                    'id_of_last_sent': id_of_last_sent,
                    'last_sent': last_sent,
                    'thinking': False,
                    'headline': headline,
                    'article_link': article_link,
                    'prev_topic': prev_topic,
                    
                }

                context = {

                    'class_variable_dict': json.dumps(class_variable_dict), 
                    'class': True

                }

                return render(request, 'face/class_time.html', context)
            
            else:
            
                logger.error('\n\nerror from inside if in class_time')
        
                return redirect('waiting')
        
        else:

            # class is over
            return redirect('waiting')

    except BaseException as e:
        
        print('exception:', e)

        logger.error('\n\nerror from try except in class_time:', e + '\n')
        
        return redirect('waiting')
    

def book_session(request):

    user = request.user
    time_now = timezone.now()
    
    if user is not None:
        
        session = Session(learner=user, start_time=time_now) 
        session.save()

        send_mail('Class booked by: ' + request.user.username, 'starts soon', 'ucd.erle@gmail.com', ['john.sloan.1@ucdconnect.ie'])

        response_data = {
            'sessionCreated': True,
            'session_id': session.id,
        }

    else:

        response_data = {
            'sessionCreated': False,
        }

    return JsonResponse(response_data)    

def my_login(request):

    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        
        login(request, user)

        response_data = {
            'loggedIn': True,
        }

    else:

        response_data = {
            'loggedIn': False,
        }

    return JsonResponse(response_data)    

def store_emotion(request):

    emotion = request.POST['emotionID']
    session_id = request.POST['sessionID']
    sess = Session.objects.get(pk=session_id)
    sess.learner_emotion = emotion
    sess.save()

    response_data = {

    }

    return JsonResponse(response_data)    

def store_topic(request):

    topic = request.POST['topic']
    session_id = request.POST['sessionID']
    sess = Session.objects.get(pk=session_id)
    sess.topic = topic
    sess.save()

    response_data = {

    }

    return JsonResponse(response_data)    

def store_blob(request):

    blob = request.FILES['data']
    # code.interact(local=locals());

    # get session
    blob_no_text = json.loads(request.POST['blob_no_text'])
    sess = Session.objects.get( pk=request.POST['sessionID'] )
    text_from_speech = request.POST['textFromSpeech']

    #check if this recording is a retry
    #get prev sents for this user in this session

    # if very first attempt or new sent then need to create empty sentence
    if blob_no_text:
        
        blob_no_text_sent_id = int(request.POST['blob_no_text_sent_id'])
        s = Sentence.objects.get( pk=blob_no_text_sent_id )

    else:

        s = Sentence(learner=request.user, session=sess)
        s.save()


    filename = str(sess.id) + "_" + str(s.id) + "_" + timezone.now().strftime( '%H-%M-%S' ) + ".wav"
    blob.name = filename

    #and then link the recording
    a = AudioFile(sentence=s, audio=blob, speech_to_text=text_from_speech)
    a.save()

    response_data = {

        'sent_id': s.id,

    }

    return JsonResponse(response_data)    

def tts(request):

    text = request.GET['sentence']
    tia_speaker = json.loads(request.GET['tiaSpeaker'])
    session_id = request.GET['sessionID']
    pitch_designated = float(request.GET['pitch'])
    speaking_rate_designated = float(request.GET['speaking_rate'])

    print('text:', text)
    print('pitch_designated:', pitch_designated)
    print('text:', text)
    print('speaking_rate_designated:', speaking_rate_designated)

    if tia_speaker:

        speaking_voice = 'en-GB-Wavenet-C'
    
    else:

        prof = Profile.objects.get(learner=request.user)
        if prof.gender == 'M':

            speaking_voice = 'en-GB-Wavenet-B'
    
        else:

            speaking_voice = 'en-GB-Wavenet-A'


    client = texttospeech.TextToSpeechClient()
    input_text = texttospeech.types.SynthesisInput(text=text)

    # Note: the voice can also be specified by name.
    # Names of voices can be retrieved with client.list_voices().
    voice = texttospeech.types.VoiceSelectionParams(
        language_code='en-GB',
        name=speaking_voice
        # ssml_gender=texttospeech.enums.SsmlVoiceGender.MALE
        )

    audio_config = texttospeech.types.AudioConfig(
        audio_encoding=texttospeech.enums.AudioEncoding.MP3,
        pitch = pitch_designated,
        speaking_rate = speaking_rate_designated,
        )

    response = client.synthesize_speech(input_text, voice, audio_config)

    synthURL = 'media/synths/session' + session_id + '_' + str(int(time.mktime((timezone.now()).timetuple()))) + '.wav'
    with open( os.path.join(settings.BASE_DIR, synthURL ), 'wb') as out:
        out.write(response.audio_content)
    
    response_data = {

        'synthURL': synthURL,

    }

    return JsonResponse(response_data)    

def store_sent(request):

    time_now = timezone.now();
    sentence_text = request.POST['sent']
    q = json.loads(request.POST['isItQ'])
    #code.interact(local=locals());
    # print('q:', type(q))

    # get session
    blob_no_text = json.loads(request.POST['blob_no_text'])
    blob_no_text_sent_id = request.POST['blob_no_text_sent_id']
    sess = Session.objects.get(pk=int(request.POST['sessionID']))

    # if very first attempt or new sent then need to create empty sentence
    if blob_no_text:

        s = Sentence.objects.get( pk=blob_no_text_sent_id )
        s.sentence = sentence_text
        s.sentence_timestamp = time_now
        s.question = q
        s.save()

    else:
    
        s = Sentence(learner=request.user, session=sess, sentence=sentence_text, question=q, sentence_timestamp=timezone.now())
        s.sentence_timestamp = time_now
        s.save()


    response_data = {

        'sent_id': s.id,

    }

    return JsonResponse(response_data)    

def check_judgement(request):

    sent_id = int(request.GET['sentId'])

    count = 0;
    while True:

        print('in while loop')
        time.sleep(2)
        count += 1

        s_new = Sentence.objects.get(pk=sent_id)
        
        if s_new.judgement != None:

            received_judgement = True
            break

        elif count == 5:

            received_judgement = False
            break

    # deal with nonetypes for the bleeding decimals

    sent_meta = {
        'sent_id': s_new.id,
        'sentence': s_new.sentence,
        'question': s_new.question,
        'judgement': s_new.judgement,
        'emotion': s_new.emotion,
        'indexes': s_new.indexes,
        'correction': s_new.correction,
        'prompt': s_new.prompt,
        'surprise': float(s_new.surprise),
        'nod': s_new.nod,
        'nodAmount': float(s_new.nodAmount),
        'nodSpeed': float(s_new.nodSpeed),
        'show_correction': s_new.show_correction,
        'receivedJudgement': received_judgement,
    }

    response_data = {

        'sent_meta': sent_meta,

    }

    return JsonResponse(response_data)    

def store_class_over(request):

    session_id = int(request.GET['sessId'])

    print('in store_class_over')

    scores = get_scores( session_id )
    score = math.floor(min(100, sum(scores)))

    time_now = timezone.now();
    sess = Session.objects.get(pk=session_id)
    sess.end_time = time_now
    sess.score = score
    sess.save()

    response_data = {

        'score': score,

    }

    return JsonResponse(response_data)    

def wait_for_correction(request):

    sent_id = int(request.GET['sentId'])

    # while True:

        # time.sleep(2)

    sent_new = Sentence.objects.get(pk=sent_id)
        
        # if sent_new.correction != '':

            # break

    sent_new.correction = sent_new.correction.split(" # ")
    sent_new.indexes = sent_new.indexes
    response_data = {

        'correction': sent_new.correction,
        'indexes': sent_new.indexes,

    }

    return JsonResponse(response_data)    

def teacherMeeting(request):

    sessions = fill_sessions_dict();
    
    context = {

        "sessions": json.dumps(sessions),

    }

    return render(request, 'face/teacherMeeting.html', context)

def store_judgement(request):

    time_now = timezone.now();

    sent_meta = json.loads( request.POST['sentMeta'] )
    
    # code.interact(local=locals());

    sent_id = int(sent_meta['sent_id'])
    sent = Sentence.objects.get(pk=sent_id)
    sent.judgement = sent_meta['judgement']
    sent.judgement_timestamp = time_now
    sent.indexes = sent_meta['indexes']
    sent.prompt = sent_meta['prompt']

    # if correct or better then need to store expression data too
    if sent_meta['judgement'] in ['C', 'B']:
        sent.emotion = str(sent_meta['emotion'])
        sent.nod = sent_meta['nod']
        sent.nodAmount = sent_meta['nodAmount']
        sent.nodSpeed = sent_meta['nodSpeed']
        sent.surprise = sent_meta['surprise']

    sent.save()

    #need to update to get the corrent bloody timestamp for judgement, HUMPH!
    updated_sent = Sentence.objects.get(pk=sent_id)
    # need to add timestamp
    sent_meta[ "judgement_timestamp" ] = int(time.mktime((updated_sent.judgement_timestamp).timetuple()))

    response_data = {

        'sent_meta': json.dumps(sent_meta),

    }

    return JsonResponse(response_data)    

def store_correction(request):

    time_now = timezone.now();

    # code.interact(local=locals());
    sent_meta = json.loads( request.POST['sentMeta'] )
    
    sent_id = int(sent_meta['sent_id'])
    sent = Sentence.objects.get(pk=sent_id)
    sent.indexes = sent_meta['indexes']
    corrections_list = sent_meta['correction'].split('\n')
    sent.correction = ' # '.join( corrections_list )
    sent.correction_timestamp = time_now
    sent.save()

    # need to update to get the corrent bloody timestamp for correction, HUMPH!
    updated_sent = Sentence.objects.get(pk=sent_id)
    # need to add timestamp
    sent_meta[ 'correction_timestamp' ] = int(time.mktime((updated_sent.correction_timestamp).timetuple()))
    sent_meta[ 'correction' ] = updated_sent.correction

    response_data = {

        'sent_meta': json.dumps(sent_meta),

    }

    return JsonResponse(response_data)    

def store_whats_wrong(request):

    sent_id = int(request.GET['sentId'])
    time_now = timezone.now();

    # code.interact(local=locals());
    sent = Sentence.objects.get(pk=sent_id)
    sent.whats_wrong = True
    sent.whats_wrong_timestamp = time_now
    sent.save()

    response_data = {
    }

    return JsonResponse(response_data)    

def store_try_again(request):

    sent_id = int(request.GET['sentId'])
    time_now = timezone.now();

    # code.interact(local=locals());
    sent = Sentence.objects.get(pk=sent_id)
    sent.try_again = True
    sent.try_again_timestamp = time_now
    sent.save()

    response_data = {
    }

    return JsonResponse(response_data)    

def store_next_sentence(request):

    sent_id = int(request.GET['sentId'])
    time_now = timezone.now();

    # code.interact(local=locals());
    sent = Sentence.objects.get(pk=sent_id)
    sent.next_sentence = True
    sent.next_sentence_timestamp = time_now
    sent.save()

    response_data = {
    }

    return JsonResponse(response_data)    

def store_show_correction(request):

    sent_id = int(request.GET['sentId'])
    time_now = timezone.now();

    # code.interact(local=locals());
    sent = Sentence.objects.get(pk=sent_id)
    sent.show_correction = True
    sent.show_correction_timestamp = time_now
    sent.save()

    response_data = {


    }

    return JsonResponse(response_data)    

def check_for_change(request):

    # code.interact(local=locals());

    # get ids of sentences which have blobs but no sentences
    time_now_minus_3s = timezone.now() - datetime.timedelta(seconds=3)
    time_now_minus_10 = timezone.now() - datetime.timedelta(minutes=300)
    # sentences_with_blobs_but_nosentences_ids = [s.id for s in Sentence.objects.filter(created_at__gte=time_now_minus_10).filter(sentence=None)]
    # print('sentences_with_blobs_but_nosentences_ids:', sentences_with_blobs_but_nosentences_ids)

    # check that sents awaiting maybe urgent update have had their 'whats wrong' or 'try again/next sentence' buttons clicked 
    sents_awaiting_maybe_urgent_update = json.loads( request.GET['sentsAwaitingMaybeUrgentUpdate'] )
    prev_sentences_count = int(json.loads( request.GET['totalSents'] ))
    
    sents_awaiting_maybe_urgent_update_ids = [s['sent_id'] for s in sents_awaiting_maybe_urgent_update]

    # get ids of sentences which have changed
    def check_each_change():

        for s_id in sents_awaiting_maybe_urgent_update_ids:

            if has_user_clicked_option_btn(s_id):

                return True

        # for s_b_id in sentences_with_blobs_but_nosentences_ids:

            # if has_user_added_sent_to_blob(s_b_id):

                # return True
    
        if Sentence.objects.count() > prev_sentences_count:

            # no_new_sents = Sentence.objects.count() - prev_sentences_count
            # Sentences.objects.filter(created_at__gte=time_now_minus_3s).order_by('-pk')[:no_new_sents]

            return True

        else:
            
            sentences_within_3s = Sentence.objects.filter(sentence_timestamp__gte=time_now_minus_3s)

            if len(sentences_within_3s) != 0:

                for s in sentences_within_3s:

                    #if the time difference between being created and the sentence created is greater than 1 then it is a recording
                    if s.sentence_timestamp - s.created_at > datetime.timedelta(seconds=1):

                        return True



        return False

    changed = check_each_change()

    response_data = {

        'changed': changed,

    };

    return JsonResponse(response_data)    

def update_session_object(request):

    sessions = fill_sessions_dict()

    response_data = {

        'sessions': json.dumps(sessions),

    };

    return JsonResponse(response_data)    



