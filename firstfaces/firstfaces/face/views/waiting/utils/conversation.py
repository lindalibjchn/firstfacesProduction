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

def get_class_already_done_today( sessions ):

    for s in sessions:

        if s.start_time.date() == timezone.now().date():

            if s.end_time != None:

                return True

    return False

def get_in_class_now( sessions ):

    if len( sessions ) == 0:

        return False, 0

    else:

        # get the most recent session
        s = sessions.order_by('-start_time')[ 0 ]
        
        print('s:', s)

        # if no end time then session is currently running
        if s.end_time == None and s.start_time > timezone.now() - datetime.timedelta(hours=1):

            return True, s.id

        else:

            return False, 0

def get_number_of_current_live_sessions():

    print('time now:', timezone.now())
    # get all sessions currently underway
    sessions_no_end_time = Conversation.objects.filter(end_time=None)
    remove_those_not_ended_by_user = sessions_no_end_time.filter(start_time__gte=timezone.now()-datetime.timedelta(hours=2))
    remove_tutorials = remove_those_not_ended_by_user.filter(tutorial=False)
    return remove_tutorials.count()

def get_prev_sessions( user ):

    all_sessions = Conversation.objects.filter(learner=user)

    sessions_dict = {}

    for sess in all_sessions:

        if not sess.tutorial and sess.score != None:

            sents = Sentence.objects.filter(session=sess).order_by('pk')
            sentences = []

            for s in sents:

                a_s = s.audiofile_set.all().order_by('pk')
                a_s_ids = [[a.id, [a.transcription0, a.transcription1, a.transcription2], a.audio.name, json.loads(a.clicks)] for a in a_s]

                sentences.append({
                    'sent_id': s.id,
                    'sess_id': sess.id,
                    'sentence': s.sentence, 
                    'judgement': s.judgement, 
                    'correction': s.correction, 
                    'indexes': s.indexes,
                    'try_again': s.try_again, 
                    'prompt': s.prompt,
                    'audio_files': a_s_ids
                })

            topic = sess.topic
            if topic == 'emotion':
                topic = 'feeling ' + sess.learner_emotion
            
            sessions_dict[ sess.id ] = {

                'score': sess.score,
                'start_time': int(time.mktime((sess.start_time).timetuple())),
                'topic': topic,
                'emotion': sess.learner_emotion,
                'sentences': sentences

            }
                
    return sessions_dict 

