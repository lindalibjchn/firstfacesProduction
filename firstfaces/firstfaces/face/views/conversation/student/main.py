import os

from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from face.views.conversation.all.modify_data import jsonify_or_none, floatify
from face.views.conversation.student.utils.text_to_speech import create_hello_wav
from face.views.conversation.teacher.utils.sessions_sentences import get_student_conversation 
from django.utils import timezone
import json
from face.models import Conversation, Sentence, AudioFile, Profile, AudioError, AudioErrorAttempt, AudioErrorCorrectionAttempt
from django.conf import settings
from face.utils import * #for now
import time
import datetime
import logging
from google.cloud import texttospeech
logger = logging.getLogger(__name__)

# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/johnsHDD/PhD_backup/erle-3666ad7eec71.json"
if settings.DEBUG:
    #os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/johnsHDD/PhD/2018_autumn/erle-3666ad7eec71.json"
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/daniel/Desktop/Tia/erle-3666ad7eec71.json"
else:
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/firstfaces/erle-3666ad7eec71.json"
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/user1/Downloads/erle-3666ad7eec71.json"
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/Users/john/Documents/PhD/firstfaces/erle-3666ad7eec71.json"

@login_required
def conversation_student(request, conversation_id):

    try:

        # when entering a conversation, must check that a conversation exists at that url e.g. 'conversation/234'. If a DoesNot
        conversation_object = Conversation.objects.get(id=conversation_id)
        
        # if conversation is ended, or user not the owner, return to waiting
        if conversation_object.end_time == None and request.user == conversation_object.learner:

            # boolean values for each of the following
            first_conversation = determine_if_first_full_conversation(request.user)
            first_enter = determine_if_first_entry(conversation_object) 

            conversation_dict, sentence_awaiting_judgement, sentence_being_recorded = get_student_conversation(conversation_object, request.user.id, True)

            prof = Profile.objects.get(learner=request.user)
            gender = prof.gender

            conversation_variables = {

                'username': request.user.username,
                'first_enter': first_enter,
                'conversation_dict': conversation_dict,
                'sentence_awaiting_judgement': sentence_awaiting_judgement,
                'sentence_being_recorded': sentence_being_recorded,
                'sentence_being_recorded_audio': {},
                # 'sentence_being_recorded': {
                    # 'sent_id': 64,
                    # 'conv_id': 1,
                # },
                # 'sentence_being_recorded_audio': {
                    # 'alternatives': [{'transcript': "I have a pet dog"}],
                # },
                'gender': gender,
                'first_conversation': first_conversation,
                'inDevelopment': settings.DEBUG,

            }

            context = {

                'conversation_variables': json.dumps(conversation_variables), 
                'conversation': True, # for the navbar to know we are in conversation

            }

            return render(request, 'face/conversation/student/main.html', context)
        
            
        else:

            # conversation has already ended or user not owner
            logger.error('\n\nerror: conversation is finished or user is not owner of conversation')
            return redirect('waiting')

    # if the conversation doesn't exist from the url the following exception handles it by returning the user to the waiting area:
    except Conversation.DoesNotExist as e:

        logger.error('\n\nerror from try except in conversation:' + str(e) + '\n')
        return redirect('waiting')
    

def determine_if_first_full_conversation(u):

    first_full_conversation = False

    # if first time create .wav of Tia sating 'hello {USERNAME}'
    # if not tutorial_complete_:
        # create_hello_wav(u.username)

    try:
        all_convs = Conversation.objects.filter(learner=u)
        if len(all_convs) == 1:
            first_full_conversation = True
    except:
        pass

    return first_full_conversation

def determine_if_first_entry(c):

    first_enter = True
    if c.topic != None:    
        first_enter = False

    return first_enter

def fill_sentences(this_conv_sents_):

    sentences_ = {}
    for i, s in enumerate(this_conv_sents_):

        #count the interference
        audio_files = s.audiofile_set.all()
        for a in audio_files:
            if a.interference:
                interference_count += 1;

        sentences_[i] = {
            'sent_id': s.id,
            'sentence': jsonify_or_none(s.sentence),
            'judgement': s.judgement,
            'emotion': jsonify_or_none(s.emotion),
            'nod_shake': jsonify_or_none(s.nod_shake),
            'surprise': floatify(s.surprise),
            'indexes': jsonify_or_none(s.indexes),
            'prompt': s.prompt,
            'show_correction': s.show_correction,
        }

    return sentences_
