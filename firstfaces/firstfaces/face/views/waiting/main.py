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
from face.models import Conversation, Sentence, AudioFile, Profile, AudioError, AudioErrorAttempt, AudioErrorCorrectionAttempt, waitingClick
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
from face.views.waiting.utils.conversation import get_prev_conversations
from face.views.waiting.utils.store_utils import get_eye_colors, get_attributes, get_background_colors, get_clothes_colors, get_hair_colors, get_stats
from face.views.conversation.all.modify_data import jsonify_or_none, floatify

group_leader_dict = {

    "Beate": "FengChia",
    "john": "all",

}

@login_required
def waiting(request):
    
    # if it is a group leader then they will be redirected to the group_data page
    #try:
        #group_leader_dict[ request.user.username ]
        #return redirect('group_data')
    
    #except:
    
        user_profile = Profile.objects.get(learner=request.user)
        tutorial_complete = user_profile.tutorial_complete

        time_now = timezone.localtime(timezone.now()).strftime("%H:%M")
        date_now = timezone.localtime(timezone.now()).date()

        groups = request.user.groups.values_list('name', flat=True)
        experimental_group = groups[0]

        available_objects = get_availables_for_schedule(groups)
        availables = create_list_of_javascript_available_times_from_django_objects(available_objects)
        currently_in_class, class_finished_today = check_if_currently_in_class_or_class_finished(request.user)
        print('\n\ncurrently_in_class:', currently_in_class)
        conversations = get_prev_conversations( request.user )

        # tutorial_conversation_id = None
        # if not tutorial_complete:

            # # check if tutorial already open
            # if Conversation.objects.filter(learner=request.user).count() == 1:
                
                # conversation = Conversation.objects.filter(learner=request.user)[0]
                
            # else:

                # conversation = Conversation(learner=request.user, start_time=timezone.now(), topic="tutorial") 
                # conversation.save()
            
            # tutorial_conversation_id = conversation.id

        # Get Products
        attributes = get_attributes(request.user)
        products = {'eyes': get_eye_colors(request.user), "backgrounds": get_background_colors(request.user),
                    "hair": get_hair_colors(request.user), "clothes": get_clothes_colors(request.user)}


        # check if user has completed tutorial
        waiting_variables = {
            'products': products,
            'attributes': attributes,
            'profile_stats': get_stats(request.user),
            # 'schedule_dict': json.dumps(schedule_dict),
            # 'schedule_now': json.dumps(schedule_now),
            'conversations': conversations,
            'availables': availables,
            'tutorial_complete': tutorial_complete,
            'currently_in_class': currently_in_class,
            'class_finished_today': class_finished_today,
            'in_development': settings.DEBUG,
            'experimental_group': experimental_group,
            # 'tutorial_conversation_id': tutorial_conversation_id,
            # 'no_live_sessions': no_live_sessions,

        }

        control = False
        no_shop = False
        if experimental_group == "control" or experimental_group == "points":
            no_shop = True
            if experimental_group == "control":
                control = True

        # print('waiting_variables:', json.dumps(waiting_variables))
        context = {
            'control': control,
            'no_shop': no_shop,
            'tutorial_complete': tutorial_complete,
            'waiting_variables': json.dumps(waiting_variables),
            'timeNowForNavbar': time_now,
            'waiting': True,

        }

        return render(request, 'face/waiting/main.html', context)

def book_conversation(request):

    user = request.user
    time_now = timezone.now()
    tutorial = json.loads(request.POST['tutorial'])
    
    if user is not None:
        
        conversation = Conversation(learner=user, start_time=time_now) 
        if tutorial:
            send_mail('Tutorial booked by: ' + request.user.username, 'starts soon', 'ucd.erle@gmail.com', ['john.sloan.1@ucdconnect.ie'])
            conversation.topic = 'tutorial'
        else:
            send_mail('Class booked by: ' + request.user.username, 'starts soon', 'ucd.erle@gmail.com', ['john.sloan.1@ucdconnect.ie'])

        conversation.save()


        response_data = {
            'conversationCreated': True,
            'conversation_id': conversation.id,
        }

    else:

        response_data = {
            'conversationCreated': False,
        }

    return JsonResponse(response_data)    


def contact_us(request):
    time_now = timezone.localtime(timezone.now()).strftime("%H:%M")
    date_now = timezone.localtime(timezone.now()).date()
    name = request.POST['name']
    email = request.POST['email']
    message = request.POST['message']

    str_ = "Time: "+str(time_now)+"\nDate: "+str(date_now)+"\nName: "+name+"\nEmail: "+email+"\n\nMessage:\n"+message

    send_mail("Contact Us Message", str_, 'ucd.erle@gmail.com', ['daniel.maguire@ucdconnect.ie'])

    response_data = {
    }

    return JsonResponse(response_data)


def waiting_click(request):
    mobile_or_tablet_device = request.user_agent.is_mobile or request.user_agent.is_tablet
    user = request.user
    description = request.POST['description']
    id_ = request.POST['element']
    sc = waitingClick(user=user, mobile_bool=mobile_or_tablet_device, element_id=id_, description=description)
    sc.save()
    response_data = {
    }

    return JsonResponse(response_data)