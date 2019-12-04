from face.models import Sentence, Prompt
from face.views.conversation.teacher.utils.text_to_speech import create_tia_speak_sentence_URL_and_visemes, create_prompt_instance
from face.views.conversation.teacher.utils.get_text_for_prompts import get_mean_by_text
from django.utils import timezone
import time
import json
from django.http import JsonResponse
import code
import logging
logger = logging.getLogger(__name__)

def store_judgement(request):

    time_now = timezone.now();

    sent_meta = json.loads( request.POST['sentMeta'] )
    # print('sent_meta:', sent_meta)
    # code.interact(local=locals());

    conv_id = int(sent_meta['conv_id'])
    sent_id = int(sent_meta['sent_id'])
    sent = Sentence.objects.get(pk=sent_id)
    
    sent.judgement = sent_meta['judgement']

    sent.judgement_timestamp = time_now

    if sent_meta['judgement'] == 'D':

        sent.nod_shake = json.dumps([-0.6, -0.6])

    elif sent_meta['judgement'] == '3':

        sent.nod_shake = json.dumps([-0.4, -0.4])

    sent.save()

    response_data = {

    }

    return JsonResponse(response_data)    

def store_single_prompt(request):

    sent_meta = json.loads( request.POST['sentMeta'] )
    sent_id = int(sent_meta['sent_id'])
    sent = Sentence.objects.get(pk=sent_id)
    prompt_text = request.POST['promptText']
    prompt_number = int(request.POST['promptNumber'])
    prompt_name = prompt_text.replace(' ', '_')
    sent.awaiting_next_prompt = sent_meta['awaiting_next_prompt']

    if prompt_number == 0:

        time_now = timezone.now()
        sent.judgement = "P"
        sent.judgement_timestamp = time_now
        emotion = sent_meta['emotion']
        if emotion != None:
            sent.emotion = json.dumps(emotion)
        else:
            sent.emotion = json.dumps([0, 0])
        
        sent.nod_shake = json.dumps(sent_meta['nod_shake'])
        sent.surprise = sent_meta['surprise']

        prompt0 = Prompt.objects.filter(level=0, name=prompt_name)
        if prompt0.exists():
            prompt = prompt0[0]
        else:
            prompt = create_prompt_instance(prompt_text, 0, 850 )
        sent.prompts.add(prompt)
        
    else:

        promptN = Prompt.objects.filter(level=prompt_number, name=prompt_name)
        if promptN.exists():
            prompt = promptN[0]
            print('already existits')
        else:     
            prompt = create_prompt_instance( prompt_text, prompt_number, 850 )
            print('created new:', prompt_number)

        sent.prompts.add(prompt)

    sent.save()

    response_data = {

    }

    return JsonResponse(response_data) 

def store_indexes_corrections(request):

    sent_id = int(request.POST['sentenceID'])
    conv_id = request.POST['conversationID']
    sent = Sentence.objects.get(pk=sent_id)
    sent.indexes = request.POST['indexes']
    
    logger.error('\nindexes:', str(sent.indexes))
    logger.error('judgement:', str(sent.judgement))
    print('\nindexes:', sent.indexes)
    print('judgement:', sent.judgement)
    if sent.judgement == 'M':

        unsure_strings = get_mean_by_text(json.loads(sent.sentence), json.loads(sent.indexes))
        logger.error('unsure_strings:', str(unsure_strings))
        prompt = create_prompt_instance( unsure_strings[1:], 3, 850 )
        sent.prompts.add(prompt)

    elif sent.judgement == 'I':

        sent.correction = request.POST['corrections']

    sent.save()

    response_data = {

    }

    return JsonResponse(response_data)    

