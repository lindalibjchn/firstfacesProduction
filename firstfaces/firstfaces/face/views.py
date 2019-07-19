from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, Group
from .forms import UserForm, SignUpForm, SignUpUserForm
from django.contrib.auth.password_validation import validate_password
from django.http import JsonResponse
from .utils import *
from .speech_to_text_utils import *
from django.utils import timezone
import json
from .models import Session, Sentence, AudioFile, Profile, NewsArticle, PostTalkTimings, Test,AudioErrors,AudioErrorAttempt, AudioErrorCorrectionAttempt
from django.conf import settings
from django.core.files.storage import FileSystemStorage
import code
#import soundfile as sf
import os
import time
from operator import itemgetter
import datetime
import logging
from google.cloud import texttospeech
import math
from django.core.mail import send_mail
import re
import ast
from .praat_utils import *


logger = logging.getLogger(__name__)
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/johnsHDD/PhD_backup/erle-3666ad7eec71.json"
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/johnsHDD/PhD/2018_autumn/erle-3666ad7eec71.json"
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/firstfaces/erle-3666ad7eec71.json"
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/user1/Downloads/erle-3666ad7eec71.json"

def out_or_in(request):

    if request.user.is_authenticated:

        return redirect('waiting')

    else:

        return redirect('entrance')

def entrance(request):

    if request.user.is_authenticated:

        return redirect('waiting')

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
    living_now = request.GET['living_now']
    born = request.GET['born']
    gender = request.GET['gender']
    education = request.GET['education']
    english_level = request.GET['english_level']
    lived_in_english_speaking_country = request.GET['lived_in_english_speaking_country']
    p = Profile(learner=request.user, nationality=nationality, living_now=living_now, language=language, born=born, gender=gender, education=education, english_level=english_level, lived_in_english_speaking_country=lived_in_english_speaking_country)   
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
            
            group_all = Group.objects.get(name='all')
            group_all.user_set.add(u)

            login(request, u)

        except:
            
            password_ok = False

    response_data = {

        'usernameUnique': username_unique,
        'passwordOK': password_ok,

    }

    return JsonResponse(response_data)    

group_leader_dict = {

    "Beate": "FengChia",
    "john": "all",

}
def group_data(request):
    groups_sessions = {}
    try:
    
        group = group_leader_dict[ request.user.username ]

        if group == "all":
            group_users = User.objects.all()
        else:
            group_users = User.objects.filter(groups__name=group)

        for u in group_users:

            sessions = Session.objects.filter( learner=u )

            if sessions.count() != 0:
                # get dictionary of all previous sessions
                sessions_dict = get_prev_sessions( u )
                groups_sessions[ u.username ] = sessions_dict

        context = {

            "groups_sessions": json.dumps(groups_sessions),

        }

        return render(request, 'face/group_data.html', context)

    except:

        return redirect('entrance')


@login_required
def waiting(request):
    
    # if it is a group leader then they will be redirected to the group_data page
    try:    
        group_leader_dict[ request.user.username ]
        return redirect('group_data')
    
    except:
    
        time_now = timezone.localtime(timezone.now()).strftime("%H:%M")
        date_now = timezone.localtime(timezone.now()).date()

        groups = request.user.groups.values_list('name', flat=True)
        print('groups: ', groups)
        availables = get_availables_for_schedule(groups)

        # in utils.py, for schedule on board
        schedule_dict, schedule_now = make_schedule_dict( availables )
    
        # no of current live sessions
        no_live_sessions = get_number_of_current_live_sessions()

        # in "Monday 18:00" format
        next_class, next_class_after_today = get_upcoming_class( availables )
        schedule_dict[ 'upcomingClass' ] = next_class
        schedule_dict[ 'upcomingClassAfterToday' ] = next_class_after_today
        # check if in class or during class
        sessions = Session.objects.filter( learner=request.user ).filter( tutorial=False )
        # returns boolean
        schedule_dict[ 'class_already_done_today' ] = json.dumps( get_class_already_done_today( sessions ) )
        schedule_dict[ 'in_class_now' ], schedule_dict[ 'session_id' ] = get_in_class_now( sessions )

        # get dictionary of all previous sessions
        sessions_dict = get_prev_sessions( request.user )

        # get scores of previous tests
        prev_test_scores = get_test_scores( request.user )

        # check if user has completed tutorial
        user_profile = Profile.objects.get(learner=request.user)
        tutorial_complete = user_profile.tutorial_complete

        news_article = True
        try:
            todays_news_article = NewsArticle.objects.get(date=date_now)
            headline = todays_news_article.title
            article_link = todays_news_article.link
        except:
            headline = "no article today"
            article_link = "#"
            news_article = False

        print('prev_test_scores:', prev_test_scores)

        context = {

            'schedule_dict': json.dumps(schedule_dict),
            'schedule_now': json.dumps(schedule_now),
            'sessions_dict': json.dumps(sessions_dict),
            'tutorial_complete': json.dumps(tutorial_complete),
            'waiting': True,
            'timeNow': time_now,
            'headline': headline,
            'article_link': article_link,
            'no_live_sessions': no_live_sessions,
            'news_article': news_article,
            'prev_test_scores': json.dumps(prev_test_scores)

        }

        return render(request, 'face/waiting.html', context)

@login_required
def class_time(request, session_id):

    try:

        # when entering a class, must check that a session exists at that url e.g. 'class_time/234'. If a DoesNot
        sess = Session.objects.get(id=session_id)
        
        # if session is ended, return to waiting
        if sess.end_time == None:

            # changes the datetime objct into unix time
            start_time = int(time.mktime((sess.start_time).timetuple()))
       
            # check that the user is the one whose session it is. If not, return to waiting.
            if request.user == sess.learner:

                # get news article details. This will set the 'headline' and 'article_link' variables
                date_now = timezone.localtime(timezone.now()).date()
                try:
                    todays_news_article = NewsArticle.objects.get(date=date_now)
                    headline = todays_news_article.title
                    article_link = todays_news_article.link
                    article = True
                except:
                    headline = "no article today"
                    article_link = "#"
                    article = False

                # get previous session details
                prev_topic = None
                prev_score = None
                prev_emotion = None
                first_full_class = False
                tutorial_complete = Profile.objects.get(learner=request.user).tutorial_complete
                try:
                    all_sesss = Session.objects.filter(learner=request.user).exclude(end_time=None)
                    recent_sesss = all_sesss.filter(start_time__gte=sess.start_time-datetime.timedelta(days=30)).filter(tutorial=False).order_by('-pk')

                    print('recent_sesss:', recent_sesss)

                    if len(recent_sesss) > 0:
                        
                        prev_topic = recent_sesss[0].topic
                        prev_emotion = recent_sesss[0].learner_emotion
                        if prev_topic == 'emotion':
                            prev_topic = 'feeling ' + prev_emotion
                        prev_score = recent_sesss[0].score
                    else:
                        first_full_class = True

                except:
                    pass

                blobs = 0;
                blob_no_text = False
                blob_no_text_sent_id = None
                interference_count = 0
                interference_count_this_sent = 0

                #check if learner entered a topic. If so then it is not first entry
                first_enter = True 
                sentences = {}
                id_of_last_sent = None
                last_sent = {}
                if sess.topic != None:
                    
                    first_enter = False
                    this_sess_sents = Sentence.objects.filter(session=sess).order_by('pk')

                    #check that there are entries in the queryset i.e. not empty
                    if this_sess_sents:

                        #this is to be the index of the sentence
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

                            #count the interference
                            audio_files = s.audiofile_set.all()
                            for a in audio_files:
                                if a.interference:
                                    interference_count += 1;

                            # stop error on json.loads when indexes are none
                            print(type(s.correction))
                            if s.indexes != None:
                                indexes = json.loads(s.indexes)
                            else:
                                indexes = None

                            if s.correction != '':
                                correction = json.loads(s.correction)
                            else:
                                correction = None

                            sentences[i] = {
                                'sent_id': s.id,
                                'sentence': json.loads(s.sentence),
                                'judgement': s.judgement,
                                'emotion': s.emotion,
                                'nod': s.nod,
                                'nodSpeed': float_nodSpeed,
                                'nodAmount': float_nodAmount,
                                'surprise': float_surprise,
                                'indexes': indexes,
                                'correction': correction,
                                'prompt': s.prompt,
                                'show_correction': s.show_correction,
                            }

                        #need to check if sentence has blob but no text
                        last_sent = list(this_sess_sents)[-1]
                        if last_sent.sentence == None: 

                            blob_no_text = True
                            blob_no_text_sent_id = last_sent.id

                            # interference for last sentence
                            last_sent_audio_files = last_sent.audiofile_set.all()
                            for b in audio_files:
                                blobs += 1
                                if b.interference:
                                    interference_count_this_sent += 1;


                        last_sent = sentences[id_of_last_sent]
                        
                # check if class is over
                class_over = False
                if sess.end_time != None:
                    class_over = True

                prof = Profile.objects.get(learner=request.user)
                gender = prof.gender

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
                    'prev_score': prev_score,
                    'prev_emotion': prev_emotion,
                    'interference_count': interference_count,
                    'interference_count_this_sent': interference_count_this_sent,
                    'blobs': blobs,
                    'gender': gender,
                    'first_full_class': first_full_class,
                    'tutorial': sess.tutorial,
                    'tutorial_complete': tutorial_complete,
                    'endClassSequenceStarted': False,

                }

                context = {

                    'class_variable_dict': json.dumps(class_variable_dict), 
                    'class': True, # for the navbar to know we are in class
                    'article': article

                }

                return render(request, 'face/class_time.html', context)
            
            else:
            
                # user is not the owner of the class
                logger.error('\n\nerror from inside if in class_time: user is not owner of class')
                return redirect('waiting')
        
        else:

            # session has already ended
            return redirect('waiting')

    # if the session doesn't exist from the url the following exception handles it by returning the user to the waiting area:
    except Session.DoesNotExist as e:

        logger.error('\n\nerror from try except in class_time:' + str(e) + '\n')
        
        return redirect('waiting')
    

def book_session(request):

    user = request.user
    time_now = timezone.now()
    tutorial = json.loads(request.POST['tutorial'])
    
    if user is not None:
        
        session = Session(learner=user, start_time=time_now, tutorial=tutorial) 
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

def store_sound_mic(request):

    device = request.GET['device']
    t_f = json.loads(request.GET['TF'])

    print('device:', device)
    print('t_f:', t_f)
    prof = Profile.objects.get(learner=request.user)

    if device == "sound":

        prof.sound = t_f

    elif device == "microphone":

        prof.microphone = t_f

    prof.save()

    response_data = {

    }

    return JsonResponse(response_data)    
def store_tutorial_end(request):

    session_id = request.POST['sessionID']
    sess = Session.objects.get(pk=session_id)
    sess.learner_emotion = "tutorial"
    sess.topic = "tutorial"
    time_now = timezone.now();
    sess.end_time = time_now
    sess.save()

    tutorial_step = int(request.POST['tutorialStep'])
    if tutorial_step == 99:
        prof = Profile.objects.get(learner=request.user)
        prof.tutorial_complete = True;
        prof.save()

    response_data = {

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

def store_error_blob(request):

    # code.interact(local=locals());
    blob = request.FILES['data'] 
    startID = request.POST['start_idx']
    #`Wsent_id = int(request.POST['blob_no_text_sent_id']) 
    errors = json.loads(request.POST['error_list'])
    if startID in errors.keys():
        primaryKey = errors[startID]
        af = AudioErrors.objects.get(pk=primaryKey)
    else:
        temp = AudioFile.objects.get(pk=request.POST['audio_id'])
        af = AudioErrors(audio=temp, start_index=startID)
        af.save()
    sess = Session.objects.get( pk=request.POST['sessionID'] )
    s = Sentence(learner=request.user, session=sess)
    # Create new AudioErrorAttempt
    filename ="error_"+str(sess.id) + "_" + str(s.id)+ "_" + timezone.now().strftime( '%H-%M-%S' )+ ".webm"
    blob.name = filename
    
    aea = AudioErrorAttempt(
            error = af,
            audio = blob,
            correct=False,
            )
    aea.save()
    trans = get_speech_recognition(filename)[0]["transcript"]
    aea.transcript = trans
    aea.save()
    response_data = {
            'error_trans':trans,
            'attempt_pk':aea.id,
            'error_pk':af.id,
            'error_start':startID,
    }

    return JsonResponse(response_data) 

def error_recording_used(request):
    att = request.POST['attempt_pk']
    err = request.POST['error_pk']
    trans = request.POST['trans']

    ae = AudioErrors.objects.get(pk=err)
    aea = AudioErrorAttempt.objects.get(pk=att)
    ae.typed = False
    ae.intention = trans
    ae.save()
    
    aea.correct = True
    aea.save()

    response_data = { 

    }
    return JsonResponse(response_data)

def error_typing_used(request):
    startID = request.POST['start_idx']
    errors = json.loads(request.POST['error_list'])
    af = AudioFile.objects.get(pk=request.POST['audio_id'])
    session_id = request.POST['sessionID']
    #If no Audio error exists create it
    if startID in errors.keys():
        #AE exists
        primaryKey = errors[startID]
        ae = AudioErrors.objects.get(pk=primaryKey)
    else:
        #AE does not exist
        ae = AudioErrors(audio=af, start_index=startID)

    filename = af.audio.name
    trans = ast.literal_eval(af.alternatives)[0]["transcript"]
    ## generate file for forced allignment
    f = open(get_text_path(),"w+")
    for word in trans.split():
        f.write(word.lower()+"\n")
    f.close()
    #convert audio to wav
    audioPath = convert_audio(filename)
    textPath = get_text_path()
    extra_str = '"task_language=eng|os_task_file_format=json|is_text_type=plain"'
    outPath = get_out_path()
    aeneasPath = get_aeneas_path()
    cwd = os.getcwd()
    
    #Run forced alligner
    os.chdir(aeneasPath)
    os.system('python3 -m aeneas.tools.execute_task '+audioPath+" "+textPath+" "+extra_str+" "+outPath+" >/dev/null 2>&1")
    os.chdir(cwd)
    #Get audio
    ERR_trans = request.POST['etrans']
    idx = int(request.POST['first_word_id'])
    

    endid = idx + (len(ERR_trans.strip().split(" "))-1) 
    

    ts = get_timestamps(idx,endid)
    fn = request.POST['sessionID']+"_"+timezone.now().strftime( '%H-%M-%S' )+"_error.wav"
    errorPath = play_errored_text(audioPath,ts,fn)
    #Synth Audio
    gender = request.POST['gender']
    if gender == 'F':
        speaking_voice = 'en-GB-Wavenet-A'
    elif gender == 'M':
        speaking_voice = 'en-GB-Wavenet-B'
    else:
        speaking_voice = 'en-GB-Wavenet-A'
    pitch_designated = float(request.POST['pitch'])
    speaking_rate_designated = float(request.POST['speaking_rate'])      

    #client = texttospeech.TextToSpeechClient()
    #input_text = texttospeech.types.SynthesisInput(text=request.POST['trans'])
    #voice = texttospeech.types.VoiceSelectionParams(language_code='en-GB',name=speaking_voice)
    #audio_config = texttospeech.types.AudioConfig(audio_encoding=texttospeech.enums.AudioEncoding.MP3,pitch = pitch_designated,speaking_rate = speaking_rate_designated)
    #try:
     #   print("\t\t-1")
      #  print("\t\t-",input_text)
       # print("\t\t-",voice)
        #print("\t\t-",audio_config)
   #     response = client.synthesize_speech(input_text, voice, audio_config)
   #     print("\t\t-2")
   #     synthURL1 = 'media/synths/session' + session_id + '_'+ 'error' + '.wav'
   #     print("\t\t" + synthURL1)
   #     with open( os.path.join(settings.BASE_DIR, synthURL1 ), 'wb') as out:
    #        out.write(response.audio_content)
    #    print("\t\t-4")
   # except:  
    #    synthURL1 = 'fault'
   # print("\t\t-Stage 4")
    
    #Above code works but for development is not being utilised

    synthFN = generate_synth_audio(request.POST['trans'],fn)

    get_praat_image(synthFN,1)
    get_praat_image(errorPath,0) 
    refLen = get_audio_length(synthFN)
    hypLen = get_audio_length(errorPath)

    ref_image, hyp_image = get_rel_praat_paths()
    #Error in naming convention
    hyp_audio = ref_path(fn) 
    ref_audio = get_hyp_audio_path(fn)
    
    #create empty Audio Error Correction Attempt
    ae.typed= True
    ae.intention = request.POST['trans']
    ae.save()

    aeca = AudioErrorCorrectionAttempt(error=ae)
    aeca.save();

    response_data = {
            "ref_audio_url":ref_audio,
            "ref_image_url":ref_image,
            "hyp_audio_url":hyp_audio,
            "hyp_image_url":hyp_image,
            "hyp_length":hypLen,
            "ref_length":refLen,
            "aeca_id":aeca.id,
            "ae_id":ae.id,
    }
    return JsonResponse(response_data)

def store_attempt_blob(request):
    blob = request.FILES['data']
    sess = Session.objects.get( pk=request.POST['sessionID'] )
    ae_pk = request.POST['error_pk']
    ae = AudioErrors.objects.get( pk=ae_pk )

    blob_no_text_sent_id = int(request.POST['blob_no_text_sent_id'])
    s = Sentence.objects.get( pk=blob_no_text_sent_id )

    aeca = AudioErrorCorrectionAttempt.objects.get(pk = request.POST['correctio_id'])
    filename = str(sess.id) + "_attempt_" + str(s.id) + "_" + timezone.now().strftime( '%H-%M-%S' ) +".webm"
    blob.name = filename 
    aeca.audio = blob;
    try:
        clicks = ast.literal_eval(request.POST['clicks'])
    except:
        clicks = []
    aeca.clicks = clicks
    aeca.save();
    
    trans = get_speech_recognition(filename)[0]["transcript"]
    aeca.transcript = trans
    aeca.save()
    
    correct = False
    if ae.intention == trans:
        correct = True
    print("\n\n",trans,"\n",correct,"\n\n")
    audio_url = "media/wav/"+filename[:-4]+'wav'

    code = 3
    if correct:
        code = 2
    
    get_praat_image(settings.BASE_DIR+"/"+audio_url,code)
    pic_url = "media/images/att.png"


    response_data = {
        "correct":correct,
        "audio_url":audio_url,
        "image_url":pic_url,
        "trans":trans,
    }
    return JsonResponse(response_data)

def store_blob(request):

    blob = request.FILES['data']
    # code.interact(local=locals());

    # get session
    blob_no_text = json.loads(request.POST['blob_no_text'])
    interference = json.loads(request.POST['interference'])
    sess = Session.objects.get( pk=request.POST['sessionID'] )
    # text_from_speech0 = request.POST['transcript0']
    # text_from_speech1 = request.POST['transcript1']
    # text_from_speech2 = request.POST['transcript2']

    #check if this recording is a retry
    #get prev sents for this user in this session

    # if very first attempt or new sent then need to create empty sentence
    if blob_no_text:
        
        blob_no_text_sent_id = int(request.POST['blob_no_text_sent_id'])
        s = Sentence.objects.get( pk=blob_no_text_sent_id )

    else:

        s = Sentence(learner=request.user, session=sess)
        s.save()


    filename = str(sess.id) + "_" + str(s.id) + "_" + timezone.now().strftime( '%H-%M-%S' ) + ".webm" 
    blob.name = filename

    #and then link the recording
    a = AudioFile(
            sentence=s, 
            audio=blob, 
            interference=interference,
            )
    a.save()
    # need to save the file before can acces url to use ffmpeg (in utils.py)
    alternatives = get_speech_recognition(filename)
    # print('transcription_list:', transcription_list)

    ## commented out as daniel will be doing his own thing here so wont need alignments
    # transcription_aligned_list = get_alignments(transcription_list)
    # print('transcription_aligned_list:', transcription_aligned_list)

    #and then once have the transcriptions, save them
    a.alternatives = alternatives
    a.save()

    response_data = {

        'alternatives': alternatives,
        'sent_id': s.id,
        'audio_pk':a.id,
    }

    return JsonResponse(response_data)    

def tts(request):

    text = request.GET['sentence']
    tia_speaker = json.loads(request.GET['tiaSpeaker'])
    session_id = request.GET['sessionID']
    pitch_designated = float(request.GET['pitch'])
    speaking_rate_designated = float(request.GET['speaking_rate'])
    caller = request.GET['caller']
    blob_no_text = json.loads(request.GET['blob_no_text'])
    blob_no_text_sent_id = request.GET['blob_no_text_sent_id']
    try:
        gender = request.GET['gender']
    except:
        gender = 'F'

    if tia_speaker:

        speaking_voice = 'en-GB-Wavenet-C'
    
    else:

        if gender == 'M':

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

    try:
        response = client.synthesize_speech(input_text, voice, audio_config)

        # don't need to keep all synths for class. Remember to delete this when session ends.
        synthURL = 'media/synths/session' + session_id # + '_' + str(int(time.mktime((timezone.now()).timetuple()))) + '.wav'
        with open( os.path.join(settings.BASE_DIR, synthURL ), 'wb') as out:
            out.write(response.audio_content)
    except:
        synthURL = 'fault'

    # if they are listening to something they typed, want to keep note of it. If they listen and try to speak again, then the change in pronunciation could be useful for pronunciation training

    response_data = {

        'synthURL': synthURL,

    }

    return JsonResponse(response_data) 

def store_sent(request):

    time_now = timezone.now();

    # don't need with new data storage in list
    # def buffer_text( raw ) :

        # #add a space at beginning and period at end if needed.
        
        # stripped = raw.strip()
        
        # # buffered left
        # buff = " " + stripped

        # # buffered right
        # if buff[-1] not in ['.', '?', '!']:
            # buff += "."
        
        # # remove multiple spaces
        # buff = re.sub(' +', ' ', buff)

        # return buff

    sentence_text = request.POST['sent']

    # q = json.loads(request.POST['isItQ'])
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
        s.save()

    else:
    
        s = Sentence(learner=request.user, session=sess, sentence=sentence_text, sentence_timestamp=timezone.now())
        s.sentence_timestamp = time_now
        s.save()


    response_data = {

        'sent_id': s.id,

    }

    return JsonResponse(response_data)    

from django.utils.dateparse import parse_datetime
def timings(request):

    # code.interact(local=locals());
    sent_id = int(request.GET['sent_id'])
    sent = Sentence.objects.get(pk=sent_id)
    timings = json.loads(request.GET['timing_dict'])

    t = PostTalkTimings.objects.create(sentence=sent, timings=timings)

    t.save()

    response_data = {

    }

    return JsonResponse(response_data)    

def check_judgement(request):

    sent_id = int(request.GET['sentId'])

    count = 0;
    while True:

        # print('in check judgement while loop')
        time.sleep(1)
        count += 1

        s_new = Sentence.objects.get(pk=sent_id)
        
        if s_new.judgement != None:

            received_judgement = True
            break

        elif count == 10:

            received_judgement = False
            break

    # deal with nonetypes for the bleeding decimals

    sent_meta = {
        'sent_id': s_new.id,
        'sentence': s_new.sentence,
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

def check_prompt_indexes(request):

    sent_id = int(request.GET['sentId'])

    received_prompt_n_ind = False

    # p_count = 0;
    # while True:

        # print('in while loop')
        # time.sleep(1)
        # p_count += 1

    s_new = Sentence.objects.get(pk=sent_id)
    
    if s_new.judgement == "B":

        if s_new.indexes != None:

            received_prompt_n_ind = True
            # break

    elif s_new.judgement == "P":

        if s_new.prompt != None:

            received_prompt_n_ind = True
            # break

    elif s_new.judgement == "M":

        if s_new.indexes != None:

            received_prompt_n_ind = True
            # break

        # elif p_count == 10:

            # received_prompt_n_ind = False
            # break

    sent_meta = {
        'sent_id': s_new.id,
        'indexes': s_new.indexes,
        'prompt': s_new.prompt,
        'receivedPromptNIndexes': received_prompt_n_ind,
    }

    response_data = {

        'sent_meta': sent_meta,

    }

    return JsonResponse(response_data)    

def delete_session(request):

    try:

        session_id = int(request.GET['sessId'])

        sess = Session.objects.get(pk=session_id)
        sess.delete()

    except:

        pass

    response_data = {

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

    sent_new.indexes = sent_new.indexes
    response_data = {

        'correction': sent_new.correction,
        'indexes': sent_new.indexes,

    }

    return JsonResponse(response_data)    

def teacherMeeting(request):

    sessions = fill_sessions_dict()
    
    print('sessions:', sessions)

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
    # sent.indexes = sent_meta['indexes']
    # sent.prompt = sent_meta['prompt']

    # if correct or better then need to store expression data too
    if sent_meta['judgement'] in ['C', 'B', 'P']:
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

def store_prompt(request):

    time_now = timezone.now();

    sent_id = int(request.POST['sentId'])
    prompt = request.POST['promptText']
    wrongIndexes = json.loads(request.POST['wrongIndexesForServer'])
    
    print('promptText:', prompt)
    print('wrongIndexes:', wrongIndexes)
    sent = Sentence.objects.get(pk=sent_id)
    sent.prompt = prompt
    sent.prompt_timestamp = time_now
    sent.indexes = wrongIndexes

    # code.interact(local=locals());

    sent.save()

    #need to update to get the corrent bloody timestamp for judgement, HUMPH!
    # updated_sent = Sentence.objects.get(pk=sent_id)
    # need to add timestamp
    # sent_meta[ "judgement_timestamp" ] = int(time.mktime((updated_sent.judgement_timestamp).timetuple()))

    response_data = {

        # 'sent_meta': json.dumps(sent_meta),

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
    new_corrections_list = []
    for cor in corrections_list:
        list_without_spaces = cor.split()
        list_with_spaces = [list_without_spaces[0]]
        for i in range(1, len(list_without_spaces)):
            list_with_spaces.append(' ')
            list_with_spaces.append(list_without_spaces[i])
        new_corrections_list.append(list_with_spaces)

    print('new_corrections_list:', new_corrections_list)

    sent.correction = json.dumps( new_corrections_list )
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

def add_transcription_choice_view(request):

    # code.interact(local=locals());
    blob_no_text_sent_id = request.GET['blob_no_text_sent_id']
    choice = request.GET['choice']

    s = Sentence.objects.get(pk=int(blob_no_text_sent_id))
    a = AudioFile.objects.filter(sentence=s).latest('pk')
    
    time_now = int(time.mktime((timezone.now()).timetuple()))

    if len(a.clicks) < 1700:

        clicks_already = json.loads(a.clicks)
        clicks_already.append( [choice, time_now] )

        a.clicks = json.dumps(clicks_already)
        a.save();
    
    response_data = {

    }

    return JsonResponse(response_data)    

def add_listen_synth_data(request):

    # code.interact(local=locals());
    blob_no_text = json.loads(request.GET['blob_no_text'])
    blob_no_text_sent_id = request.GET['blob_no_text_sent_id']
    session_id = int(request.GET['sessId'])
    diffSent = request.GET['diffSent']
    transcriptCur = request.GET['transcriptCur']
    listenTranscript = json.loads(request.GET['listenTranscript'])
    repeat = json.loads(request.GET['repeat'])

    if blob_no_text:
        s = Sentence.objects.get(pk=int(blob_no_text_sent_id))
        a = AudioFile.objects.filter(sentence=s).latest('pk')
        clicks_already = json.loads( a.clicks )
    else:
        sess = Session.objects.get(pk=int(session_id))
        s = Sentence(learner=request.user, session=sess)
        s.save()
        a = AudioFile(sentence=s)
        clicks_already = []

    #don't store it if too long
    if len(a.clicks) < 1700:
        clicks_already = []

    #don't store it if too long
    if len(a.clicks) < 1700:

        time_now = int(time.mktime((timezone.now()).timetuple()))

        #if it's a repeat
        if json.loads( request.GET['repeat'] ):

            clicks_already.append( ['r', time_now] )

        else:

            if listenTranscript:

                clicks_already.append( [transcriptCur + 's', time_now] )

            else:

                clicks_already.append( [diffSent, time_now] )

        a.clicks = json.dumps(clicks_already)
        a.save();

    response_data = {

        'sent_id': s.id,

    }

    return JsonResponse(response_data)    

def add_voice_data(request):

    # code.interact(local=locals());
    blob_no_text_sent_id = request.GET['blob_no_text_sent_id']
    transcriptCur = request.GET['transcriptCur']

    s = Sentence.objects.get(pk=int(blob_no_text_sent_id))
    a = AudioFile.objects.filter(sentence=s).latest('pk')

    #don't store it if too long
    if len(a.clicks) < 1700:

        clicks_already = json.loads( a.clicks )

        time_now = int(time.mktime((timezone.now()).timetuple()))

        clicks_already.append( [transcriptCur + 'v', time_now] )

        a.clicks = json.dumps(clicks_already)
        a.save();

    response_data = {

        'sent_id': s.id,

    }

    return JsonResponse(response_data)    

def store_test_begin(request):

    time_now = timezone.now();

    # code.interact(local=locals());
    test = Test.objects.create(learner=request.user, started_at=time_now)

    response_data = {
    }

    return JsonResponse(response_data)    

def store_test_score(request):

    time_now = timezone.now();

    # code.interact(local=locals());
    test = Test.objects.filter(learner=request.user).latest('pk');
    test.score = request.GET['test_score']
    test.finished_at = time_now
    test.save()

    finish_time = int(time.mktime((test.finished_at).timetuple()))

    response_data = {

        'finishTime': finish_time 

    }

    return JsonResponse(response_data)    










