from django.http import JsonResponse
from face.utils import *
from django.utils import timezone
import json
from face.models import Conversation, Sentence, Profile
import code
import string
import math
import ast

# def store_sound_mic(request):

    # device = request.GET['device']
    # t_f = json.loads(request.GET['TF'])

    # print('device:', device)
    # print('t_f:', t_f)
    # prof = Profile.objects.get(learner=request.user)

    # if device == "sound":

        # prof.sound = t_f

    # elif device == "microphone":

        # prof.microphone = t_f

    # prof.save()

    # response_data = {

    # }

    # return JsonResponse(response_data)    

# def store_tutorial_end(request):

    # session_id = request.POST['sessionID']
    # sess = Conversation.objects.get(pk=session_id)
    # sess.learner_emotion = "tutorial"
    # sess.topic = "tutorial"
    # time_now = timezone.now();
    # sess.end_time = time_now
    # sess.save()

    # tutorial_step = int(request.POST['tutorialStep'])
    # if tutorial_step == 99:
        # prof = Profile.objects.get(learner=request.user)
        # prof.tutorial_complete = True;
        # prof.save()

    # response_data = {

    # }

    # return JsonResponse(response_data)    

def store_emotion(request):

    emotion = request.POST['emotionID']
    session_id = request.POST['sessionID']
    sess = Conversation.objects.get(pk=session_id)
    sess.learner_emotion = emotion
    sess.save()

    response_data = {

    }

    return JsonResponse(response_data)    

def store_topic(request):

    topic = request.POST['topic']
    session_id = request.POST['sessionID']
    sess = Conversation.objects.get(pk=session_id)
    sess.topic = topic
    sess.save()

    response_data = {

    }

    return JsonResponse(response_data)    

# def timings(request):

    # # code.interact(local=locals());
    # sent_id = int(request.GET['sent_id'])
    # sent = Sentence.objects.get(pk=sent_id)
    # timings = json.loads(request.GET['timing_dict'])

    # t = PostTalkTimings.objects.create(sentence=sent, timings=timings)

    # t.save()

    # response_data = {

    # }

    # return JsonResponse(response_data)    

def delete_session(request):

    try:

        session_id = int(request.GET['sessId'])

        sess = Conversation.objects.get(pk=session_id)
        sess.delete()

    except:

        pass

    response_data = {

    }

    return JsonResponse(response_data)    

def store_conversation_over(request):

    session_id = int(request.GET['sessId'])

    # print('in store_conversation_over')

    # scores = get_scores( session_id )
    # score = math.floor(min(100, sum(scores)))

    delete_sentences_from_temp_db(session_id)

    time_now = timezone.now();
    sess = Conversation.objects.get(pk=session_id)
    sess.end_time = time_now
    # sess.score = score
    sess.save()

    response_data = {

        # 'score': score,

    }

    return JsonResponse(response_data)    

