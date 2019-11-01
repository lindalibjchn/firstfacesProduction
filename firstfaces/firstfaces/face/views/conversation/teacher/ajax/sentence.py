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
    print('sent_meta:', sent_meta)
    # code.interact(local=locals());

    conv_id = sent_meta['conv_id']
    sent_id = int(sent_meta['sent_id'])
    sent = Sentence.objects.get(pk=sent_id)
    
    sent.judgement = sent_meta['judgement']

    sent.judgement_timestamp = time_now

    # if correct or better then need to store expression data too
    if sent_meta['judgement'] in ['B', 'P', 'I', 'M']:

        sent.prompt = json.dumps(sent_meta['prompt'])

        if sent_meta['judgement'] != 'P':

            sent.indexes = json.dumps(sent_meta['indexes'])

        if sent_meta['judgement'] not in ['I', 'M']:

            emotion = sent_meta['emotion']
            print('emotion:', emotion)
            if emotion != None:
                sent.emotion = json.dumps(emotion)
            else:
                sent.emotion = json.dumps([0, 0])
            
            sent.nod_shake = json.dumps(sent_meta['nod_shake'])
            sent.surprise = sent_meta['surprise']

        if sent_meta['judgement'] != 'I':
        
            create_tia_speak_sentences_synthesis_data(sent, conv_id)

    else:

        if sent_meta['judgement'] == 'D':

            sent.nod_shake = json.dumps([-0.6, -0.6])

        elif sent_meta['judgement'] == '3':

            sent.nod_shake = json.dumps([-0.4, -0.4])

    sent.save()

    response_data = {

    }

    return JsonResponse(response_data)    

