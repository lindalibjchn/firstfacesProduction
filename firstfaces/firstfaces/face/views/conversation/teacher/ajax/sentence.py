from face.models import Sentence
from face.views.conversation.teacher.utils.text_to_speech import create_tia_speak_sentences_synthesis_data
from django.utils import timezone
import time
import json
from django.http import JsonResponse
import code

def store_judgement(request):

    time_now = timezone.now();

    sent_meta = json.loads( request.POST['sentMeta'] )
    
    # code.interact(local=locals());

    conv_id = sent_meta['conv_id']
    sent_id = int(sent_meta['sent_id'])
    sent = Sentence.objects.get(pk=sent_id)
    
    sent.judgement = sent_meta['judgement']

    sent.judgement_timestamp = time_now

    print('judgement:', sent.judgement)
    # if correct or better then need to store expression data too
    if sent_meta['judgement'] in ['B', 'P', 'X', 'M']:

        sent.prompt = sent_meta['prompt']
        create_tia_speak_sentences_synthesis_data(sent, conv_id)

        if sent_meta['judgement'] != 'P':

            sent.indexes = json.dumps(sent_meta['indexes'])

        if sent_meta['judgement'] not in ['X', 'M']:
        
            sent.emotion = json.dumps(sent_meta['emotion'])
            sent.nod_shake = json.dumps(sent_meta['nod_shake'])
            sent.surprise = sent_meta['surprise']

    sent.save()

    response_data = {

    }

    return JsonResponse(response_data)    

