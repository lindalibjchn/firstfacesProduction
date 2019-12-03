from django.http import JsonResponse
from face.utils import *
from django.utils import timezone
import json
from face.models import Conversation, Sentence, Update
import code
import time
import string
import math
import ast
from face.views.conversation.student.utils.store_sentence import change_sentence_to_list_n_add_data
from face.views.conversation.all.sentences import convert_django_sentence_object_to_json, convert_django_prompt_to_json
from face.views.conversation.all.modify_data import jsonify_or_none, floatify
from django.conf import settings
import datetime

def store_sent(request):

    #code.interact(local=locals());

    time_now = timezone.now();
    sentence_text = request.POST['sent']
    sentence_data = change_sentence_to_list_n_add_data(sentence_text) #[[['a', 'DT', ['e']], ['boy', 'NNS', ['b', 'e', 'i']],...
    sentence_list = json.dumps([s[:2] for s in sentence_data]) # removes visemes cause don't need to store these in db

    # get session
    sent_id = int(request.POST['sent_id'])
    conv_id = int(request.POST['conversation_id'])
    conv = Conversation.objects.get(pk=conv_id)

    s = Sentence.objects.get( pk=sent_id )
    s.sentence = sentence_list
    s.sentence_timestamp = time_now
    s.save()

    sent = convert_django_sentence_object_to_json(s, request.user.id, conv.id)
    
    # code.interact(local=locals());
    sent['sentence'] = sentence_data # for visemes to be added

    update = Update.objects.latest('pk')
    update.updated_sent = True
    updated_sentence_ids = jsonify_or_none(update.sentence_ids)
    if update.sentence_ids == None:
        update.sentence_ids = json.dumps([s.id])
    else:
        update.sentence_ids = json.dumps(updated_sentence_ids.append(si.d))
    update.save()
    
    response_data = {

        'sentence': sent,

    }

    return JsonResponse(response_data)    

def check_judgement(request):

    sent_id = int(request.GET['sentId'])
    conv_id = int(request.GET['convId'])
    loop = int(request.GET['loop'])
    received_judgement = False
    # received_judgement_n_for_prompt = False

    s = Sentence.objects.get(pk=sent_id)
    sent = {}

    if s.judgement != None:
                
        if s.judgement == "P":

            if s.prompts.exists():
                received_judgement = True
                sent = convert_django_sentence_object_to_json(s, request.user.id, conv_id)
                s.loop = loop
                s.save()

        if s.judgement == "M":

            if jsonify_or_none(s.indexes) != None:
                received_judgement = True
                sent = convert_django_sentence_object_to_json(s, request.user.id, conv_id)
                s.loop = loop
                s.save()

        else:
            received_judgement = True
            sent = convert_django_sentence_object_to_json(s, request.user.id, conv_id)
            s.loop = loop
            s.save()

    sent_meta = {
        'receivedJudgement': received_judgement,
        'sentence': sent,
    }

    return JsonResponse(sent_meta)    

def check_for_corrections(request):

    sent_id = int(request.GET['sentId'])
    # received_judgement_n_for_prompt = False

    s = Sentence.objects.get(pk=sent_id)
    received_corrections = False
    count = 0
    while True:
        if count == 5:
            break
        elif s.indexes == None:
            count += 1
            time.sleep(1)
        else:
            received_corrections = True
            break

    sent_meta = {
        'received_corrections': received_corrections,
        'indexes': jsonify_or_none(s.indexes),
        'correction': jsonify_or_none(s.correction),
    }

    return JsonResponse(sent_meta)    

# def wait_for_correction(request):

    # sent_id = int(request.GET['sentId'])

    # sent_new = Sentence.objects.get(pk=sent_id)
        
    # sent_new.indexes = sent_new.indexes
    # response_data = {

        # 'correction': sent_new.correction,
        # 'indexes': sent_new.indexes,

    # }

    # return JsonResponse(response_data)    

def get_next_prompt(request):

    sent_id = int(request.GET['sentId'])

    sent = Sentence.objects.get(pk=sent_id)

    prompts = convert_django_prompt_to_json( sent.prompts.all() )

    response_data = {

        'awaiting_more': sent.awaiting_next_prompt,
        'prompts': prompts,

    }

    return JsonResponse(response_data)    

    

def store_whats_wrong(request):

    sent_id = int(request.GET['sentId'])
    time_now = timezone.now();

    # code.interact(local=locals());
    sent = Sentence.objects.get(pk=sent_id)
    sent.whats_wrong = True
    sent.whats_wrong_timestamp = time_now
    sent.save()

    response_data = {
    }

    return JsonResponse(response_data)    

def store_try_again(request):

    sent_id = int(request.GET['sentId'])
    time_now = timezone.now();

    # code.interact(local=locals());
    sent = Sentence.objects.get(pk=sent_id)
    sent.try_again = True
    sent.try_again_timestamp = time_now
    sent.save()

    response_data = {
    }

    return JsonResponse(response_data)    

def store_next_sentence(request):

    sent_id = int(request.GET['sentId'])
    time_now = timezone.now();

    # code.interact(local=locals());
    sent = Sentence.objects.get(pk=sent_id)
    sent.next_sentence = True
    sent.next_sentence_timestamp = time_now
    sent.save()

    response_data = {
    }

    return JsonResponse(response_data)    

def store_show_correction(request):

    sent_id = int(request.GET['sentId'])
    time_now = timezone.now();

    # code.interact(local=locals());
    sent = Sentence.objects.get(pk=sent_id)
    sent.show_correction = True
    sent.show_correction_timestamp = time_now
    sent.save()

    response_data = {


    }

    return JsonResponse(response_data)    
