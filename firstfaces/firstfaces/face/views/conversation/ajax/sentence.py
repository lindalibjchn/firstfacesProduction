from django.http import JsonResponse
from face.utils import *
from django.utils import timezone
import json
from face.models import Conversation, TempSentence, PermSentence
import code
import time
import string
import math
import ast
from face.views.conversation.utils.sentence import change_sentence_to_list_n_add_data, jsonify_or_none, floatify

def store_sent(request):

    #code.interact(local=locals());

    time_now = timezone.now();
    sentence_text = request.POST['sent']
    sentence_data = change_sentence_to_list_n_add_data(sentence_text) #[[['a', 'DT', ['e']], ['boy', 'NNS', ['b', 'e', 'i']],...
    sentence_list = json.dumps([s[:2] for s in sentence_data]) # removes visemes cause don't need to store these in db


    # get session
    blob_no_text = json.loads(request.POST['blob_no_text'])
    blob_no_text_sent_id = request.POST['blob_no_text_sent_id']
    sess = Conversation.objects.get(pk=int(request.POST['sessionID']))

    # if very first attempt or new sent then need to create empty sentence
    if blob_no_text:

        s = TempSentence.objects.get( pk=blob_no_text_sent_id )
        s.sentence = sentence_list
        s.sentence_timestamp = time_now
        s.save()

        ps = PermSentence.objects.get( pk=blob_no_text_sent_id )
        ps.sentence = sentence_list
        ps.sentence_timestamp = time_now
        ps.save()

    else:
    
        ps = PermSentence(learner=request.user, session=sess, sentence=sentence_list, sentence_timestamp=timezone.now())
        ps.sentence_timestamp = time_now
        ps.save()

        s = TempSentence(pk=ps.pk, p_sentence=ps, learner=request.user, session=sess, sentence=sentence_list, sentence_timestamp=timezone.now())
        s.sentence_timestamp = time_now
        s.save()


    response_data = {

        'sent_id': s.id,
        'sentenceData': sentence_data,

    }

    return JsonResponse(response_data)    

def check_judgement(request):

    sent_id = int(request.GET['sentId'])
    received_judgement = False

    s = TempSentence.objects.get(pk=sent_id)

    if s.judgement != None:

        if s.judgement in ["M", "B", "P"]:
            
            if s.for_prompt != None:

                received_judgement = True

        else: #i C, X,  D and 3

            received_judgement = True

    print('received_judgement:', received_judgement)

    sent_meta = {
        'sent_id': s.id,
        'sentence': jsonify_or_none(s.sentence),
        'judgement': s.judgement,
        'emotion': jsonify_or_none(s.emotion),
        'indexes': jsonify_or_none(s.indexes),
        'correction': s.correction,
        'prompt': s.prompt,
        'surprise': floatify(s.surprise),
        'nod': s.nod,
        'nodAmount': floatify(s.nodAmount),
        'nodSpeed': floatify(s.nodSpeed),
        'show_correction': s.show_correction,
        'receivedJudgement': received_judgement,
        'forPrompt': jsonify_or_none(s.for_prompt),
    }

    return JsonResponse(sent_meta)    

def wait_for_correction(request):

    sent_id = int(request.GET['sentId'])

    sent_new = TempSentence.objects.get(pk=sent_id)
        
    sent_new.indexes = sent_new.indexes
    response_data = {

        'correction': sent_new.correction,
        'indexes': sent_new.indexes,

    }

    return JsonResponse(response_data)    

def store_whats_wrong(request):

    sent_id = int(request.GET['sentId'])
    time_now = timezone.now();

    # code.interact(local=locals());
    sent = TempSentence.objects.get(pk=sent_id)
    sent.whats_wrong = True
    sent.whats_wrong_timestamp = time_now
    sent.save()

    p_sent = PermSentence.objects.get(pk=sent_id)
    p_sent.whats_wrong = True
    p_sent.whats_wrong_timestamp = time_now
    p_sent.save()

    response_data = {
    }

    return JsonResponse(response_data)    

def store_try_again(request):

    sent_id = int(request.GET['sentId'])
    time_now = timezone.now();

    # code.interact(local=locals());
    sent = TempSentence.objects.get(pk=sent_id)
    sent.try_again = True
    sent.try_again_timestamp = time_now
    sent.save()

    p_sent = PermSentence.objects.get(pk=sent_id)
    p_sent.try_again = True
    p_sent.try_again_timestamp = time_now
    p_sent.save()

    response_data = {
    }

    return JsonResponse(response_data)    

def store_next_sentence(request):

    sent_id = int(request.GET['sentId'])
    time_now = timezone.now();

    # code.interact(local=locals());
    sent = TempSentence.objects.get(pk=sent_id)
    sent.next_sentence = True
    sent.next_sentence_timestamp = time_now
    sent.save()

    p_sent = TempSentence.objects.get(pk=sent_id)
    p_sent.next_sentence = True
    p_sent.next_sentence_timestamp = time_now
    p_sent.save()

    response_data = {
    }

    return JsonResponse(response_data)    

def store_show_correction(request):

    sent_id = int(request.GET['sentId'])
    time_now = timezone.now();

    # code.interact(local=locals());
    sent = TempSentence.objects.get(pk=sent_id)
    sent.show_correction = True
    sent.show_correction_timestamp = time_now
    sent.save()

    p_sent = PermSentence.objects.get(pk=sent_id)
    p_sent.show_correction = True
    p_sent.show_correction_timestamp = time_now
    p_sent.save()

    response_data = {


    }

    return JsonResponse(response_data)    
