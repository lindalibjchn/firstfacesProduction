from face.models import TempSentence, PermSentence
from face.views.conversation.teacher.utils.text_to_speech import create_tia_speak_sentences_synthesis_data
from django.utils import timezone
import time
import json
from django.http import JsonResponse

def store_judgement(request):

    time_now = timezone.now();

    sent_meta = json.loads( request.POST['sentMeta'] )
    
    # code.interact(local=locals());
    # print('sent_meta:', sent_meta)

    sent_id = int(sent_meta['sent_id'])
    sent = TempSentence.objects.get(pk=sent_id)
    p_sent = PermSentence.objects.get(pk=sent_id)
    sent.judgement = sent_meta['judgement']
    p_sent.judgement = sent_meta['judgement']
    sent.judgement_timestamp = time_now
    p_sent.judgement_timestamp = time_now
    # sent.indexes = sent_meta['indexes']
    # sent.prompt = sent_meta['prompt']

    # if correct or better then need to store expression data too
    if sent_meta['judgement'] in ['C', 'B', 'P']:
        sent.emotion = str(sent_meta['emotion'])
        sent.nod = sent_meta['nod']
        sent.nodAmount = sent_meta['nodAmount']
        sent.nodSpeed = sent_meta['nodSpeed']
        sent.surprise = sent_meta['surprise']

        p_sent.emotion = str(sent_meta['emotion'])
        p_sent.nod = sent_meta['nod']
        p_sent.nodAmount = sent_meta['nodAmount']
        p_sent.nodSpeed = sent_meta['nodSpeed']
        p_sent.surprise = sent_meta['surprise']
    
    sent.save()
    p_sent.save()

    #need to update to get the corrent bloody timestamp for judgement, HUMPH!
    updated_sent = TempSentence.objects.get(pk=sent_id)
    # need to add timestamp
    sent_meta[ "judgement_timestamp" ] = int(time.mktime((updated_sent.judgement_timestamp).timetuple()))

    response_data = {

        'sent_meta': json.dumps(sent_meta),

    }

    return JsonResponse(response_data)    

def store_prompt(request):

    time_now = timezone.now();

    sent_id = int(request.POST['sentId'])
    sessId = int(request.POST['sessId'])
    prompt = request.POST['promptText']
    wrongIndexes = json.loads(request.POST['wrongIndexesForServer'])
    
    sent = TempSentence.objects.get(pk=sent_id)
    sent.prompt = prompt
    sent.prompt_timestamp = time_now
    sent.indexes = wrongIndexes

    p_sent = PermSentence.objects.get(pk=sent_id)
    p_sent.prompt = prompt
    p_sent.prompt_timestamp = time_now
    p_sent.indexes = wrongIndexes

    # code.interact(local=locals());
    sent.prompt_created = False

    sent.save()
    p_sent.save()

    if sent.judgement in ["M", "B", "P"]:
    
        if sent.judgement == "P":

            tia_to_say = sent.prompt
    
        else:

            tia_to_say = get_text(json.loads(sent.sentence), sent.judgement, sent.prompt, wrongIndexes)
        
        create_tia_speak_sentences_synthesis_data(tia_to_say, sessId, sent)

    #need to update to get the corrent bloody timestamp for judgement, HUMPH!
    # updated_sent = TempSentence.objects.get(pk=sent_id)
    # need to add timestamp
    # sent_meta[ "judgement_timestamp" ] = int(time.mktime((updated_sent.judgement_timestamp).timetuple()))

    response_data = {

        # 'sent_meta': json.dumps(sent_meta),

    }

    return JsonResponse(response_data)    

def store_correction(request):

    time_now = timezone.now();

    # code.interact(local=locals());
    sent_meta = json.loads( request.POST['sentMeta'] )
    
    sent_id = int(sent_meta['sent_id'])
    sent = TempSentence.objects.get(pk=sent_id)
    sent.indexes = sent_meta['indexes']

    p_sent = PermSentence.objects.get(pk=sent_id)
    p_sent.indexes = sent_meta['indexes']
    
    corrections_list = sent_meta['correction'].split('\n')
    new_corrections_list = []
    for cor in corrections_list:
        list_without_spaces = cor.split()
        list_with_spaces = [list_without_spaces[0]]
        for i in range(1, len(list_without_spaces)):
            list_with_spaces.append(' ')
            list_with_spaces.append(list_without_spaces[i])
        new_corrections_list.append(list_with_spaces)

    print('new_corrections_list:', new_corrections_list)

    sent.correction = json.dumps( new_corrections_list )
    sent.correction_timestamp = time_now

    p_sent.correction = json.dumps( new_corrections_list )
    p_sent.correction_timestamp = time_now
    
    sent.save()
    p_sent.save()

    # need to update to get the corrent bloody timestamp for correction, HUMPH!
    updated_sent = TempSentence.objects.get(pk=sent_id)
    # need to add timestamp
    sent_meta[ 'correction_timestamp' ] = int(time.mktime((updated_sent.correction_timestamp).timetuple()))
    sent_meta[ 'correction' ] = updated_sent.correction

    response_data = {

        'sent_meta': json.dumps(sent_meta),

    }

    return JsonResponse(response_data)    

