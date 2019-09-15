from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, Group
from face.forms import UserForm, SignUpForm, SignUpUserForm
from django.contrib.auth.password_validation import validate_password
from django.http import JsonResponse
from face.utils import *
# from face.speech_to_text_utils import *
from django.utils import timezone
import json
from face.models import Conversation, TempSentence, PermSentence, AudioFile, Profile, NewsArticle, PostTalkTiming, AudioError, AudioErrorAttempt, AudioErrorCorrectionAttempt
from django.conf import settings
from django.core.files.storage import FileSystemStorage
import code
#import soundfile as sf
import os
import time
import string
from operator import itemgetter
import datetime
import logging
from google.cloud import texttospeech
import math
from django.core.mail import send_mail
import re
import ast
# from .praat_utils import *
# from .DanUtils import *


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

            sessions = Conversation.objects.filter( learner=u )

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
        next_conversation, next_conversation_after_today = get_upcoming_conversation( availables )
        schedule_dict[ 'upcomingClass' ] = next_conversation
        schedule_dict[ 'upcomingClassAfterToday' ] = next_conversation_after_today
        # check if in conversation or during conversation
        sessions = Conversation.objects.filter( learner=request.user ).filter( tutorial=False )
        # returns boolean
        schedule_dict[ 'conversation_already_done_today' ] = json.dumps( get_conversation_already_done_today( sessions ) )
        schedule_dict[ 'in_conversation_now' ], schedule_dict[ 'session_id' ] = get_in_conversation_now( sessions )

        # get dictionary of all previous sessions
        sessions_dict = get_prev_sessions( request.user )

        # get scores of previous tests
        # prev_test_scores = get_test_scores( request.user )

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

        # print('prev_test_scores:', prev_test_scores)

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
            # 'prev_test_scores': json.dumps(prev_test_scores)

        }

        return render(request, 'face/waiting.html', context)


def book_session(request):

    user = request.user
    time_now = timezone.now()
    tutorial = json.loads(request.POST['tutorial'])
    
    if user is not None:
        
        session = Conversation(learner=user, start_time=time_now, tutorial=tutorial) 
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

# def add_transcription_choice_view(request):

    # # code.interact(local=locals());
    # blob_no_text_sent_id = request.GET['blob_no_text_sent_id']
    # choice = request.GET['choice']

    # s = TempSentence.objects.get(pk=int(blob_no_text_sent_id))
    # a = AudioFile.objects.filter(sentence=s).latest('pk')
    
    # time_now = int(time.mktime((timezone.now()).timetuple()))

    # if len(a.clicks) < 1700:

        # clicks_already = json.loads(a.clicks)
        # clicks_already.append( [choice, time_now] )

        # a.clicks = json.dumps(clicks_already)
        # a.save();
    
    # response_data = {

    # }

    # return JsonResponse(response_data)    

# def add_listen_synth_data(request):

    # # code.interact(local=locals());
    # blob_no_text = json.loads(request.GET['blob_no_text'])
    # blob_no_text_sent_id = request.GET['blob_no_text_sent_id']
    # session_id = int(request.GET['sessId'])
    # diffSent = request.GET['diffSent']
    # transcriptCur = request.GET['transcriptCur']
    # listenTranscript = json.loads(request.GET['listenTranscript'])
    # repeat = json.loads(request.GET['repeat'])

    # if blob_no_text:
        # s = TempSentence.objects.get(pk=int(blob_no_text_sent_id))
        # a = AudioFile.objects.filter(sentence=s).latest('pk')
        # clicks_already = json.loads( a.clicks )
    # else:
        # sess = Conversation.objects.get(pk=int(session_id))
        # s = TempSentence(learner=request.user, session=sess)
        # s.save()
        # a = AudioFile(sentence=s)
        # clicks_already = []

    # #don't store it if too long
    # if len(a.clicks) < 1700:
        # clicks_already = []

    # #don't store it if too long
    # if len(a.clicks) < 1700:

        # time_now = int(time.mktime((timezone.now()).timetuple()))

        # #if it's a repeat
        # if json.loads( request.GET['repeat'] ):

            # clicks_already.append( ['r', time_now] )

        # else:

            # if listenTranscript:

                # clicks_already.append( [transcriptCur + 's', time_now] )

            # else:

                # clicks_already.append( [diffSent, time_now] )

        # a.clicks = json.dumps(clicks_already)
        # a.save();

    # response_data = {

        # 'sent_id': s.id,

    # }

    # return JsonResponse(response_data)    

# def add_voice_data(request):

    # # code.interact(local=locals());
    # blob_no_text_sent_id = request.GET['blob_no_text_sent_id']
    # transcript = request.GET['transcript']

    # s = TempSentence.objects.get(pk=int(blob_no_text_sent_id))
    # a = AudioFile.objects.filter(sentence=s).latest('pk')

    # #don't store it if too long
    # if len(a.clicks) < 1700:

        # clicks_already = json.loads( a.clicks )

        # time_now = int(time.mktime((timezone.now()).timetuple()))

        # clicks_already.append( [transcript + 'v', time_now] )

        # a.clicks = json.dumps(clicks_already)
        # a.save();

    # response_data = {

        # 'sent_id': s.id,

    # }

    # return JsonResponse(response_data)    

# def store_test_begin(request):

    # time_now = timezone.now();

    # # code.interact(local=locals());
    # test = Test.objects.create(learner=request.user, started_at=time_now)

    # response_data = {
    # }

    # return JsonResponse(response_data)    

# def store_test_score(request):

    # time_now = timezone.now();

    # # code.interact(local=locals());
    # test = Test.objects.filter(learner=request.user).latest('pk');
    # test.score = request.GET['test_score']
    # test.finished_at = time_now
    # test.save()

    # finish_time = int(time.mktime((test.finished_at).timetuple()))

    # response_data = {

        # 'finishTime': finish_time 

    # }

    # return JsonResponse(response_data)    










