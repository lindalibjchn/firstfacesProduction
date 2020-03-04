from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, Group
from face.forms import UserForm, SignUpForm, SignUpUserForm
from django.contrib.auth.password_validation import validate_password
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

from django.http import JsonResponse
from face.utils import *
# from face.speech_to_text_utils import *
from django.utils import timezone
import json
from face.models import Conversation, Sentence, AudioFile, Profile, AudioError, AudioErrorAttempt, AudioErrorCorrectionAttempt, UserProducts, TiaAttributes, siteVisit, enteranceClick
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


def entrance(request):

    if request.user.is_authenticated:

        return redirect('waiting')

    mobile_or_tablet_device = request.user_agent.is_mobile or request.user_agent.is_tablet
    print('mobile_or_tablet_device:', mobile_or_tablet_device)
    form = UserForm()
    sign_up_form = SignUpForm()
    sign_up_user_form = SignUpUserForm()
    context = {
        'form': form,
        'mobile_or_tablet_device': mobile_or_tablet_device,
        'signUpForm': sign_up_form,
        'signUpUserForm': sign_up_user_form,
    }

    return render(request, 'face/entrance/main.html', context)


def validate_username(request):
    username = request.POST['username']
    u_valid = True
    for u in User.objects.all():
        if u.username == username:
            u_valid = False
            break
    if len(username) <= 3:
        u_valid = False
    email = request.POST['email']
    e_valid = validateEmail(email)
    print(e_valid)
    p_valid = validatePassword(request.POST['password'])

    if isinstance(p_valid, tuple):
       p_message = p_valid[1]
       p_valid = False
    else:
       p_message = ""

    response_data = {
        'u_valid': u_valid,
        'e_valid': e_valid,
        'p_message': p_message,
        'p_valid': p_valid,
    }

    return JsonResponse(response_data)


def site_access(request):
    mobile_or_tablet_device = request.user_agent.is_mobile or request.user_agent.is_tablet
    ip = visitor_ip_address(request)
    sa = siteVisit(ip_address=ip, mobile_bool=mobile_or_tablet_device)
    sa.save()
    response_data = {
    }

    return JsonResponse(response_data)


def site_click(request):
    mobile_or_tablet_device = request.user_agent.is_mobile or request.user_agent.is_tablet
    ip = visitor_ip_address(request)
    element_id = request.POST['element']
    sc = enteranceClick(ip_address=ip, mobile_bool=mobile_or_tablet_device, element_id=element_id)
    sc.save()
    response_data = {
    }

    return JsonResponse(response_data)


def visitor_ip_address(request):

    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')

    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def create_user(request):

    username = request.POST['username']
    email = request.POST['email']
    password = request.POST['password']

    nationality = request.POST['country']
    language = request.POST['native']
    living_now = request.POST['living']
    born = request.POST['born']
    gender = request.POST['gender']
    education = request.POST['education']
    english_level = request.POST['english_level']
    lived_in_english_speaking_country = request.POST['lived_english']

    # Create User
    u = User(username=username, email=email)
    u.set_password(password)
    u.save()

    user_count = len(User.objects.all())
    if user_count % 3 == 0:
        group = Group.objects.get(name='control')
    elif user_count % 3 == 1:
        group = Group.objects.get(name='points')
    else:
        group = Group.objects.get(name='shop')
    group.user_set.add(u)
    group.save()

    p = Profile(learner=u, nationality=nationality, living_now=living_now, language=language, born=born,
                gender=gender, education=education, english_level=english_level,
                lived_in_english_speaking_country=lived_in_english_speaking_country)
    p.save()

    # Create user products
    up = UserProducts(learner=u, backgroundColours='["1"]', hairColours='["1"]',
                      clothesColour='["1"]', EyeTypes='["1"]', gif_backgrounds='[]')
    up.save()

    # Create tia attributes
    ta = TiaAttributes(learner=u, backgroundColour=1, hairColour=1, clothesColour=1, eyeColour=1,
                       color_background=True)
    ta.save()

    user = authenticate(request, username=username, password=password)
    send_mail("Profile Created", 'Profile Created:\nUsername:\t'+username+'\nEmail:\t'+email+"\nNationality:\t"+nationality, 'ucd.erle@gmail.com', ['ucd.erle@gmail.com'])

    login(request, user)

    response_data = {
        'loggedIn': True,
    }


    return JsonResponse(response_data)


def validatePassword(password):
    try:
        a = validate_password(password)
        return True
    except ValidationError as ve:
        return False, ve.error_list[0].message


def validateEmail(email):
    try:
        validate_email(email)
        return True
    except ValidationError:
        return False
