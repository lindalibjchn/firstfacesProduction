from face.models import TempSentence
from django.utils import timezone
import datetime
import json
from django.http import JsonResponse
from face.views.conversation.teacher.utils.sessions_sentences import get_students_conversations

def check_for_change(request):

    # code.interact(local=locals());

    # get ids of sentences which have blobs but no sentences
    time_now_minus_3s = timezone.now() - datetime.timedelta(seconds=3)
    time_now_minus_10 = timezone.now() - datetime.timedelta(minutes=300)
    # sentences_with_blobs_but_nosentences_ids = [s.id for s in TempSentence.objects.filter(created_at__gte=time_now_minus_10).filter(sentence=None)]
    # print('sentences_with_blobs_but_nosentences_ids:', sentences_with_blobs_but_nosentences_ids)

    # check that sents awaiting maybe urgent update have had their 'whats wrong' or 'try again/next sentence' buttons clicked 
    sents_awaiting_maybe_urgent_update = json.loads( request.GET['sentsAwaitingMaybeUrgentUpdate'] )
    prev_sentences_count = int(json.loads( request.GET['totalSents'] ))
    
    sents_awaiting_maybe_urgent_update_ids = [s['sent_id'] for s in sents_awaiting_maybe_urgent_update]

    # get ids of sentences which have changed
    def check_each_change():

        for s_id in sents_awaiting_maybe_urgent_update_ids:

            if has_user_clicked_option_btn(s_id):

                return True

        # for s_b_id in sentences_with_blobs_but_nosentences_ids:

            # if has_user_added_sent_to_blob(s_b_id):

                # return True
    
        if TempSentence.objects.count() > prev_sentences_count:

            # no_new_sents = TempSentence.objects.count() - prev_sentences_count
            # TempSentences.objects.filter(created_at__gte=time_now_minus_3s).order_by('-pk')[:no_new_sents]

            return True

        else:
            
            sentences_within_3s = TempSentence.objects.filter(sentence_timestamp__gte=time_now_minus_3s)

            if len(sentences_within_3s) != 0:

                for s in sentences_within_3s:

                    #if the time difference between being created and the sentence created is greater than 1 then it is a recording
                    if s.sentence_timestamp - s.created_at > datetime.timedelta(seconds=1):

                        return True



        return False

    changed = check_each_change()

    response_data = {

        'changed': changed,

    };

    return JsonResponse(response_data)    

def update_session_object(request):

    # sessions = get()

    response_data = {

        # 'sessions': json.dumps(sessions),

    };

    return JsonResponse(response_data)    

