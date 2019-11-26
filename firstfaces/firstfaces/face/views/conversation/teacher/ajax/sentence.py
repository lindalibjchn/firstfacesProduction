from face.models import Sentence, Prompt
from face.views.conversation.teacher.utils.text_to_speech import create_tia_speak_sentence_URL_and_visemes, create_prompt_instance
from face.views.conversation.teacher.utils.get_text_for_prompts import get_mean_by_text
from django.utils import timezone
import time
import json
from django.http import JsonResponse
import code

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

    if sent_meta['judgement'] == 'P':

        emotion = sent_meta['emotion']
        # print('emotion:', emotion)
        if emotion != None:
            sent.emotion = json.dumps(emotion)
        else:
            sent.emotion = json.dumps([0, 0])
        
        sent.nod_shake = json.dumps(sent_meta['nod_shake'])
        sent.surprise = sent_meta['surprise']

        prompt_0_text = sent_meta['prompts']['0']
        print( 'prompt_0_text:', prompt_0_text )
        prompt = create_prompt_instance(prompt_0_text, 0 )
        
    elif sent_meta['judgement'] == 'D':

        sent.nod_shake = json.dumps([-0.6, -0.6])

    elif sent_meta['judgement'] == '3':

        sent.nod_shake = json.dumps([-0.4, -0.4])

    sent.save()

    response_data = {

    }

    return JsonResponse(response_data)    

def store_single_prompt(request):

    sent_id = int(request.POST['sentenceID'])
    prompt_no = int(request.POST['promptNumber'])
    prompt_text = request.POST['promptText']
    awaiting_more = json.loads(request.POST['awaitingMore'])
    sent = Sentence.objects.get(pk=sent_id)
    sent.awaiting_next_prompt = awaiting_more 
    prompt_name = prompt_text.replace(' ', '_')
    print('prompt text:', prompt_text)

    if Prompt.objects.filter(level=prompt_no, name=prompt_name).exists():
        prompt = Prompt.objects.get(level=prompt_no, name=prompt_name)
        print('already existits')
    else:     
        prompt = create_prompt_instance( prompt_text, prompt_no )

    sent.prompts.add(prompt)

    sent.save()

    response_data = {

    }

    return JsonResponse(response_data)    

def store_indexes_corrections(request):

    sent_id = int(request.POST['sentenceID'])
    sent = Sentence.objects.get(pk=sent_id)
    sent.indexes = request.POST['indexes']
    print(request.POST)
    print(sent.judgement)
    
    if sent.judgement == 'M':

        unsure_strings = get_mean_by_text(sent.sentence, sent.indexes)
        create_tia_speak_sentence_URL_and_visemes( unsure_strings, 'synths/', str(conv_id) + "_mean_by" )

    elif sent.judgement == 'I':

        sent.correction = request.POST['corrections']

    sent.save()

    response_data = {

    }

    return JsonResponse(response_data)    

