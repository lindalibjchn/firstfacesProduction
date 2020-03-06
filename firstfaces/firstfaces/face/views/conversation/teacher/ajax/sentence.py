from face.models import Sentence, Prompt
from face.views.conversation.teacher.utils.text_to_speech import create_prompt_instance
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

    elif sent_meta['judgement'] == 'P':

        emotion = sent_meta['emotion']
        if emotion != None:
            sent.emotion = json.dumps(emotion)
        else:
            sent.emotion = json.dumps([0, 0])
        
        sent.nod_shake = json.dumps(sent_meta['nod_shake'])
        sent.surprise = sent_meta['surprise']

    sent.save()

    response_data = {

    }

    return JsonResponse(response_data)    

def store_single_prompt(request):

    # sent_meta = json.loads( request.POST['sentMeta'] )
    # print('\n\nsent_meta:', sent_meta)
    sent_id = int(request.POST['sentID'])
    sent = Sentence.objects.get(pk=sent_id)
    prompt_text = request.POST['promptText']
    prompt_number = int(request.POST['promptNumber'])
    prompt_name = prompt_text.replace(' ', '_')
    sent.awaiting_next_prompt = json.loads(request.POST['awaitingNextPrompt'])
    print('awaiting_next_prompt', sent.awaiting_next_prompt)

    print('prompt_number:', prompt_number)
    if prompt_text != "":
    
        prompt_levels_already_entered = [p.level for p in sent.prompts.all()]
        print('prompt_levels_already_entered:', prompt_levels_already_entered)
        if prompt_number not in prompt_levels_already_entered:

            if prompt_number == 0:

                prompt0 = Prompt.objects.filter(level=0, name=prompt_name)
                if prompt0.exists():
                    prompt = prompt0[0]
                else:
                    prompt = create_prompt_instance(prompt_text, 0, initial_delay=500 )
                sent.prompts.add(prompt)
                
            else:

                promptN = Prompt.objects.filter(level=prompt_number, name=prompt_name)
                if promptN.exists():
                    prompt = promptN[0]
                    print('already exists')
                else:     
                    prompt = create_prompt_instance( prompt_text, prompt_number, initial_delay=500 )
                    print('created new:', prompt_number)

                sent.prompts.add(prompt)
                sent.prompt_updated_by_teacher = True

    sent.save()
    
    response_data = {

    }

    return JsonResponse(response_data) 

def store_indexes_corrections(request):

    sent_id = int(request.POST['sentenceID'])
    conv_id = request.POST['conversationID']
    sent = Sentence.objects.get(pk=sent_id)
    sent.indexes = request.POST['indexes']
    
    # logger.error('\nindexes:', str(sent.indexes))
    # logger.error('judgement:', str(sent.judgement))
    print('\nindexes:', sent.indexes)
    print('judgement:', sent.judgement)
    if sent.judgement == 'M':

        unsure_strings = get_mean_by_text(json.loads(sent.sentence), json.loads(sent.indexes))
        # logger.error('unsure_strings:', str(unsure_strings))
        prompt = create_prompt_instance( unsure_strings[1:], 3, 850 )
        sent.prompts.add(prompt)

    elif sent.judgement == 'I':

        sent.correction = request.POST['corrections']

    sent.save()

    response_data = {

    }

    return JsonResponse(response_data)    

