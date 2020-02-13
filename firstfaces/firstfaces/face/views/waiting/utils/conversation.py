from face.models import Available, Sentence, Conversation, Profile
from django.contrib.auth.models import User
from django.conf import settings
import datetime
import time
from django.utils import timezone
from operator import itemgetter
import math
import json
from django.forms.models import model_to_dict
from google.cloud import texttospeech
import os
from face.views.conversation.all.sentences import convert_django_sentence_object_to_json, get_student_conversation

# def get_class_already_done_today( sessions ):

    # for s in sessions:

        # if s.start_time.date() == timezone.now().date():

            # if s.end_time != None:

                # return True

    # return False

# def get_in_class_now( sessions ):

    # if len( sessions ) == 0:

        # return False, 0

    # else:

        # # get the most recent session
        # s = sessions.order_by('-start_time')[ 0 ]
        
        # print('s:', s)

        # # if no end time then session is currently running
        # if s.end_time == None and s.start_time > timezone.now() - datetime.timedelta(hours=1):

            # return True, s.id

        # else:

            # return False, 0

# def get_number_of_current_live_sessions():

    # print('time now:', timezone.now())
    # # get all sessions currently underway
    # sessions_no_end_time = Conversation.objects.filter(end_time=None)
    # remove_those_not_ended_by_user = sessions_no_end_time.filter(start_time__gte=timezone.now()-datetime.timedelta(hours=2))
    # remove_tutorials = remove_those_not_ended_by_user.filter(tutorial=False)
    # return remove_tutorials.count()

def get_prev_conversations( user ):

    all_conversations = Conversation.objects.filter(learner=user).order_by('-pk')

    # conversations_dict = {}
    conversations_list = []

    for conv in all_conversations:

        student_conv = get_student_conversation(conv, user.id, False)[ 0 ]
        conversations_list.append( student_conv )

        # sents = Sentence.objects.filter(conversation=conv).order_by('-pk')
        # sentences = []

        # for s in sents:

            # sentences.append( convert_django_sentence_object_to_json( s, user.id, conv.id ))

        # topic = conv.topic
        # if topic == 'emotion':
            # topic = 'feeling ' + conv.emotion
        
        # conversations_dict[ conv.id ] = {

            # 'start_time': int(time.mktime((conv.start_time).timetuple())),
            # 'topic': topic,
            # 'emotion': conv.emotion,
            # 'completed_sentences': sentences

        # }
                
    return conversations_list 

