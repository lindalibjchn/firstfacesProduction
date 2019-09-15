from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from face.views.conversation.student.utils.sentence import jsonify_or_none, floatify
from face.views.conversation.student.utils.text_to_speech import create_hello_wav
from django.utils import timezone
import json
from face.models import Conversation, TempSentence, PermSentence, AudioFile, Profile, PostTalkTiming, AudioError, AudioErrorAttempt, AudioErrorCorrectionAttempt
from django.conf import settings
from face.utils import * #for now
import time
import datetime
import logging
from google.cloud import texttospeech
logger = logging.getLogger(__name__)

# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/johnsHDD/PhD_backup/erle-3666ad7eec71.json"
# if settings.DEBUG:
    # os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/johnsHDD/PhD/2018_autumn/erle-3666ad7eec71.json"
# else:
    # os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/firstfaces/erle-3666ad7eec71.json"
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/user1/Downloads/erle-3666ad7eec71.json"
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/Users/john/Documents/PhD/firstfaces/erle-3666ad7eec71.json"

@login_required
def conversation_student(request, session_id):

    try:

        # when entering a conversation, must check that a session exists at that url e.g. 'conversation/234'. If a DoesNot
        sess = Conversation.objects.get(id=session_id)
        
        # if session is ended, or user not the owner, return to waiting
        if sess.end_time == None and request.user == sess.learner:

            # changes the datetime objct into unix time
            start_time = int(time.mktime((sess.start_time).timetuple()))
       
            tutorial_complete = Profile.objects.get(learner=request.user).tutorial_complete

            # true or false
            first_full_conversation = determine_if_first_full_conversation(request.user, tutorial_complete)

            blobs = 0;
            blob_no_text = False
            blob_no_text_sent_id = None
            interference_count = 0

            #check if learner entered a topic. If so then it is not first entry
            first_enter = True 
            sentences = {}
            last_sent = None
            if sess.topic != None:
                
                first_enter = False
                this_sess_sents = PermSentence.objects.filter(session=sess).order_by('pk')

                #check that there are entries in the queryset i.e. not empty
                if this_sess_sents:

                    # adds all data about the sentences
                    sentences_data = fill_sentences(this_sess_sents)

                    #need to check if sentence has blob but no text
                    last_sent = list(this_sess_sents)[-1]
                    if last_sent.sentence == None: 

                        blob_no_text = True
                        blob_no_text_sent_id = last_sent.id

                        # interference for last sentence
                        last_sent_audio_files = last_sent.audiofile_set.all()
                        for b in audio_files:
                            blobs += 1

            prof = Profile.objects.get(learner=request.user)
            gender = prof.gender

            conversation_variables = {

                'username': request.user.username,
                'start_time': start_time * 1000,
                'session_id': session_id,
                'first_enter': first_enter,
                'sentences': sentences_data,
                # 'last_sent': last_sent.sentence,
                'blob_no_text': blob_no_text,
                'blob_no_text_sent_id': blob_no_text_sent_id,
                'interference_count': interference_count,
                'blobs': blobs,
                'gender': gender,
                'first_full_conversation': first_full_conversation,
                'tutorial_complete': tutorial_complete,
                'inDevelopment': settings.DEBUG,

            }

            context = {

                'conversation_variables': json.dumps(conversation_variables), 
                'conversation': True, # for the navbar to know we are in conversation

            }

            return render(request, 'face/conversation/student/main.html', context)
        
            
        else:

            # session has already ended or user not owner
            logger.error('\n\nerror: conversation is finished or user is not owner of conversation')
            return redirect('waiting')

    # if the session doesn't exist from the url the following exception handles it by returning the user to the waiting area:
    except Conversation.DoesNotExist as e:

        logger.error('\n\nerror from try except in conversation:' + str(e) + '\n')
        return redirect('waiting')
    

def determine_if_first_full_conversation(u, tutorial_complete_):

    first_full_conversation = False

    # if first time create .wav of Tia sating 'hello {USERNAME}'
    if not tutorial_complete_:
        create_hello_wav(u.username)

    try:
        all_sesss = Conversation.objects.filter(learner=u).exclude(end_time=None)
        if len(all_sesss) == 1: # tutorial is one conversation
            first_full_conversation = True
    except:
        pass

    return first_full_conversation

def fill_sentences(this_sess_sents_):

    sentences_ = {}
    for i, s in enumerate(this_sess_sents_):

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
            'nod': s.nod,
            'nodSpeed': floatify(s.nodSpeed),
            'nodAmount': floatify(s.nodAmount),
            'surprise': floatify(s.surprise),
            'indexes': jsonify_or_none(s.indexes),
            'correction': jsonify_or_none(s.correction),
            'prompt': s.prompt,
            'show_correction': s.show_correction,
        }

    return sentences_
