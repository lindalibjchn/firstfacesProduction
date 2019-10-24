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
from face.views.waiting.utils.availables import get_availables_for_schedule, create_list_of_javascript_available_times_from_django_objects, check_if_currently_in_class_or_class_finished
from face.views.conversation.all.modify_data import jsonify_or_none, floatify

group_leader_dict = {

    "Beate": "FengChia",
    "john": "all",

}

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
        available_objects = get_availables_for_schedule(groups)
        print('available_objects: ', available_objects)

        availables = create_list_of_javascript_available_times_from_django_objects(available_objects)
        print('availables:', availables)

        currently_in_class, class_finished_today = check_if_currently_in_class_or_class_finished(request.user)
        print('currently_in_class:', currently_in_class)
        print('class_finished_today:', class_finished_today)

        # class_finished_today = check_if class

        # in utils.py, for schedule on board
        # schedule_dict, schedule_now = make_schedule_dict( availables )
        # print('schedule_dict: ', schedule_dict)
        # print('schedule_now: ', schedule_now)
    
        # # no of current live sessions
        # no_live_sessions = get_number_of_current_live_sessions()

        # # in "Monday 18:00" format
        # next_conversation, next_conversation_after_today = get_upcoming_conversation( availables )
        # schedule_dict[ 'upcomingClass' ] = next_conversation
        # schedule_dict[ 'upcomingClassAfterToday' ] = next_conversation_after_today
        # # check if in conversation or during conversation
        # sessions = Conversation.objects.filter( learner=request.user ).filter( tutorial=False )
        # # returns boolean
        # schedule_dict[ 'conversation_already_done_today' ] = json.dumps( get_conversation_already_done_today( sessions ) )
        # schedule_dict[ 'in_conversation_now' ], schedule_dict[ 'session_id' ] = get_in_conversation_now( sessions )

        # # get dictionary of all previous sessions
        # sessions_dict = get_prev_sessions( request.user )

        # check if user has completed tutorial
        user_profile = Profile.objects.get(learner=request.user)
        tutorial_complete = user_profile.tutorial_complete

        waiting_variables = {

            # 'schedule_dict': json.dumps(schedule_dict),
            # 'schedule_now': json.dumps(schedule_now),
            # 'sessions_dict': json.dumps(sessions_dict),
            'availables': availables,
            'tutorial_complete': tutorial_complete,
            'currently_in_class': currently_in_class,
            'class_finished_today': class_finished_today,
            # 'no_live_sessions': no_live_sessions,

        }

        print('waiting_variables:', json.dumps(waiting_variables))
        context = {

            'waiting_variables': json.dumps(waiting_variables),
            'timeNowForNavbar': time_now,
            'waiting': True,

        }

        return render(request, 'face/waiting/main.html', context)


def book_conversation(request):

    user = request.user
    time_now = timezone.now()
    # tutorial = json.loads(request.POST['tutorial'])
    
    if user is not None:
        
        conversation = Conversation(learner=user, start_time=time_now) 
        conversation.save()

        # send_mail('Class booked by: ' + request.user.username, 'starts soon', 'ucd.erle@gmail.com', ['john.sloan.1@ucdconnect.ie'])

        response_data = {
            'conversationCreated': True,
            'conversation_id': conversation.id,
        }

    else:

        response_data = {
            'conversationCreated': False,
        }

    return JsonResponse(response_data)    
