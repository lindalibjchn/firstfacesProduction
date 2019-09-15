from face.models import TempSentence, Conversation
from django.utils import timezone
import datetime
import time
from operator import itemgetter
import json

def fill_sessions_dict():

    # create JSON object containing all info for teacher meeting
    sessions = {}

    # get all sessions currently underway
    cur_sessions = Conversation.objects.filter(end_time=None)

    # get total sentences in db in order to check later if this has increased
    total_sentences = TempSentence.objects.count()
    sessions[ 'totalSentences' ] = total_sentences
    sessions[ 'numberOf' ] = 0
    sess_id_to_username = {}
    for s in cur_sessions:
        
        if s.tutorial == False:

            # 1000 hours is for development
            if s.start_time > timezone.now() - datetime.timedelta(hours=1000):
            
                sessions[ 'numberOf' ] += 1
                sessions[s.pk] = {}
                sessions[s.pk]["user_id"] = s.learner.pk
                sessions[s.pk]["username"] = s.learner.username
                # need to convert to basic time units for JS
                sessions[s.pk]["start_time"] = int(time.mktime(timezone.localtime(s.start_time).timetuple())) * 1000
                

                # get prev sentences
                this_sess_sents = TempSentence.objects.filter(session=s)
                sents = []

                for sent in this_sess_sents:

                    # timestamps only work if there is an actual time, else None
                    sent_time = None
                    judge_time = None
                    whats_wrong_time = None
                    try_again_time = None
                    next_sentence_time = None
                    if sent.sentence_timestamp != None:

                        sent_time = int(time.mktime((sent.sentence_timestamp).timetuple()))
                        
                    if sent.judgement_timestamp != None:

                        judge_time = int(time.mktime((sent.judgement_timestamp).timetuple()))

                    if sent.whats_wrong_timestamp != None:

                        whats_wrong_time = int(time.mktime((sent.whats_wrong_timestamp).timetuple()))

                    if sent.try_again_timestamp != None:

                        try_again_time = int(time.mktime((sent.try_again_timestamp).timetuple()))

                    if sent.next_sentence_timestamp != None:

                        next_sentence_time = int(time.mktime((sent.next_sentence_timestamp).timetuple()))

                    sent_meta = {
                        "sess_id": s.pk,
                        "sent_id": sent.id, 
                        "sentence": json.loads(sent.sentence),
                        "sentence_timestamp": sent_time,
                        "judgement": sent.judgement,
                        "judgement_timestamp": judge_time,
                        "indexes": sent.indexes,
                        "prompt": sent.prompt,
                        "correction": sent.correction,
                        "whats_wrong": sent.whats_wrong,
                        "whats_wrong_timestamp": whats_wrong_time,
                        "try_again": sent.try_again,
                        "try_again_timestamp": try_again_time,
                        "next_sentence": sent.next_sentence,
                        "next_sentence_timestamp": next_sentence_time,
                    }
                    sents.append(sent_meta)

                sents = sorted(sents, key=itemgetter("sent_id"), reverse=True)

                sessions[s.pk]["sentences"]= sents

    return sessions

