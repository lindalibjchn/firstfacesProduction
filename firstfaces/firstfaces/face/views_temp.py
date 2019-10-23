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
from face.models import Conversation, Sentence, AudioFile, Profile, AudioError, AudioErrorAttempt, AudioErrorCorrectionAttempt
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










