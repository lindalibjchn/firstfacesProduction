from face.views.conversation.all.modify_data import jsonify_or_none, floatify, int_time_or_none
from face.models import Sentence
from operator import itemgetter

def get_student_conversation(c, student_id_, current_conv):

    sentence_awaiting_judgement = None
    sentence_being_recorded = None

    conversation = {}
    conversation["id"] = c.pk
    conversation["start_time"] = int_time_or_none(c.start_time)
    conversation["end_time"] = int_time_or_none(c.end_time)
    conversation["topic"] = c.topic
    conversation["emotion"] = c.emotion
    conversation["completed_sentences"] = []

    # get prev sentences
    sent_objects = Sentence.objects.filter(conversation=c)

    for sent in sent_objects:

        sent_meta = convert_django_sentence_object_to_json(sent, student_id_, c.pk)
        if sent.judgement != None :
            conversation["completed_sentences"].append(sent_meta)
        
        elif current_conv:
            
            if sent.sentence != None:
                sentence_awaiting_judgement = sent_meta
            else:
                sentence_being_recorded = sent_meta 

    conversation["completed_sentences"] = sorted(conversation["completed_sentences"], key=itemgetter("sent_id"), reverse=True)

    return conversation, sentence_awaiting_judgement, sentence_being_recorded

def convert_django_sentence_object_to_json(sent, student_id_, conv_id):

    sent_time = int_time_or_none(sent.sentence_timestamp)
    judge_time = int_time_or_none(sent.judgement_timestamp)
    whats_wrong_time = int_time_or_none(sent.whats_wrong_timestamp)
    try_again_time = int_time_or_none(sent.try_again_timestamp)
    next_sentence_time = int_time_or_none(sent.next_sentence_timestamp)

    sent_meta = {
        "user_id": student_id_,
        "conv_id": conv_id,
        "sent_id": sent.id, 
        "sentence": jsonify_or_none(sent.sentence),
        "sentence_timestamp": sent_time,
        "judgement": sent.judgement,
        "judgement_timestamp": judge_time,
        "emotion": jsonify_or_none(sent.emotion),
        "surprise": floatify(sent.surprise),
        "nod_shake": jsonify_or_none(sent.nod_shake),
        "indexes": jsonify_or_none(sent.indexes),
        "prompt": jsonify_or_none(sent.prompt),
        "for_prompt": jsonify_or_none(sent.for_prompt),
        "whats_wrong": sent.whats_wrong,
        "whats_wrong_timestamp": whats_wrong_time,
        "try_again": sent.try_again,
        "try_again_timestamp": try_again_time,
        "next_sentence": sent.next_sentence,
        "next_sentence_timestamp": next_sentence_time,
    }

    return sent_meta
                
