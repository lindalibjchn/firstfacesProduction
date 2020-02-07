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


def entrance(request):

    if request.user.is_authenticated:

        return redirect('waiting')

    mobile_device = request.user_agent.is_mobile
    print('mobile_device:', mobile_device)
    form = UserForm()
    sign_up_form = SignUpForm()
    sign_up_user_form = SignUpUserForm()
    context = {
        'form': form,
        'mobile_device': mobile_device,
        'signUpForm': sign_up_form,
        'signUpUserForm': sign_up_user_form,
    }

    return render(request, 'face/entrance/main.html', context)

