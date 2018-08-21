from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from .forms import UserForm
from django.http import JsonResponse
from .utils import get_availables_for_schedule, make_schedule_dict, get_upcoming_class, get_class_already_done_today, get_in_class_now, has_user_clicked_option_btn, fill_sessions_dict 
from django.utils import timezone
import json
from .models import Session, Sentence, AudioFile
from django.conf import settings
from django.core.files.storage import FileSystemStorage
import code
import speech_recognition as sr
import soundfile as sf
import os
import time
from operator import itemgetter
import datetime

def entrance(request):
    form = UserForm()

    context = {
        'form': form,
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

@login_required
def waiting(request):
    
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

    context = {

        'schedule_dict': json.dumps(schedule_dict),
        'schedule_now': json.dumps(schedule_now),

    }

    return render(request, 'face/waiting.html', context)

@login_required
def class_time(request, session_id):

    try:

        sess = Session.objects.get(id=session_id)
        
        if sess.end_time == None:

            start_time = int(time.mktime((sess.start_time).timetuple()))
       
            print('end time is None')

            if request.user == sess.learner:

                #check if learner entered a topic. If so then it is not first entry
                first_enter = True 
                sentences = {}
                id_of_last_sent = 0
                last_sent = {}

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

                class_variable_dict = {

                    'username': request.user.username,
                    'start_time': start_time * 1000,
                    'session_id': session_id,
                    'first_enter': first_enter,
                    'sentences': sentences,
                    'blob_no_text': blob_no_text,
                    'blob_no_text_sent_id': blob_no_text_sent_id,
                    'id_of_last_sent': id_of_last_sent,
                    'last_sent': last_sent,

                }

                context = {

                    'class_variable_dict': json.dumps(class_variable_dict)   

                }

                return render(request, 'face/class_time.html', context)
            
            else:
            
                return redirect('waiting')
        
        else:

            return redirect('waiting')

    except BaseException as e:
        
        print('exception:', e)
        
        return redirect('waiting')
    

def book_session(request):

    user = request.user
    time_now = timezone.now()
    
    if user is not None:
        
        session = Session(learner=user, start_time=time_now) 
        session.save()

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
    # filename = request.user.username + "__" + timezone.now().strftime( '%Y-%m-%d-%H-%M-%S' )
    filename = 'test.wav'
    blob.name = filename

    # code.interact(local=locals());

    # get session
    blob_no_text = json.loads(request.POST['blob_no_text'])
    sess = Session.objects.get( pk=request.POST['sessionID'] )

    #check if this recording is a retry
    #get prev sents for this user in this session

    # if very first attempt or new sent then need to create empty sentence
    if blob_no_text:

        blob_no_text_sent_id = int(request.POST['blob_no_text_sent_id'])
        s = Sentence.objects.get( pk=blob_no_text_sent_id )
        a = AudioFile(sentence=s, audio=blob)
        a.save()

    else:

        s = Sentence(learner=request.user, session=sess)
        s.save()

        #and then link the recording
        a = AudioFile(sentence=s, audio=blob)
        a.save()

    response_data = {

        'sent_id': s.id,

    }

    return JsonResponse(response_data)    

def store_sent(request):

    sentence_text = request.POST['sent']
    # code.interact(local=locals());

    # get session
    blob_no_text = json.loads(request.POST['blob_no_text'])
    blob_no_text_sent_id = request.POST['blob_no_text_sent_id']
    sess = Session.objects.get(pk=int(request.POST['sessionID']))

    # if very first attempt or new sent then need to create empty sentence
    if blob_no_text:

        s = Sentence.objects.get( pk=blob_no_text_sent_id )
        s.sentence = sentence_text
        s.save()

    else:
    
        s = Sentence(learner=request.user, session=sess, sentence=sentence_text, sentence_timestamp=timezone.now())
        s.save()

    while True:

        time.sleep(2)

        s_new = Sentence.objects.get(pk=s.pk)
        
        if s_new.judgement != None:

            if s_new.judgement == "C":

                if s_new.emotion != None:
                
                    break

            break

    # deal with nonetypes for the bleeding decimals

    sent_meta = {
        'sent_id': s.id,
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
    }

    response_data = {

        'sent_meta': sent_meta,

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



