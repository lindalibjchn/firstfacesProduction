from face.models import TempSentence, PermSentence, Conversation, Profile
import datetime
from operator import itemgetter
import json
from face.views.conversation.student.utils.sentence import jsonify_or_none, floatify, int_time_or_none
from django.conf import settings
from django.contrib.auth.models import User

def get_students_in_conversation_now_ids():
    
    cur_conversations = Conversation.objects.filter(end_time=None)

    students_in_conversation_now_ids = []
    for c in cur_conversations:

        students_in_conversation_now_ids.append(c.learner.pk)

    return students_in_conversation_now_ids

def get_students_conversations(students_in_conversation_now_ids_):

    students_conversations = {
        "all_conversations": {},
        "sentences_awaiting_judgement": [],
        "sentences_being_recorded": [],
    }
        
    for student_id in students_in_conversation_now_ids_:

        conversations, sentence_awaiting_judgement, sentence_being_recorded = get_student_conversations(student_id)
        
        # print('sentence_awaiting_judgement:', sentence_awaiting_judgement)

        learner_profile = Profile.objects.get(learner__id=student_id)
        students_conversations["all_conversations"][student_id] = {
            "username": User.objects.get(pk=student_id).username,
            "nationality": get_nationality_code(learner_profile.nationality),
            "gender": learner_profile.gender,
            "age": get_learner_age(learner_profile.born),
            "info": jsonify_or_none(learner_profile.info),
            "conversations": conversations,
        }

        if sentence_awaiting_judgement != None:
            students_conversations["sentences_awaiting_judgement"].append(sentence_awaiting_judgement)
        if sentence_being_recorded != None:
            students_conversations["sentences_being_recorded"].append(sentence_being_recorded)

    students_conversations["sentences_awaiting_judgement"] = sorted(students_conversations["sentences_awaiting_judgement"], key=itemgetter("sentence_timestamp"), reverse=True)
    

    return students_conversations

def get_student_conversations(student_id_):
        
    student_conversation_objects = Conversation.objects.filter(learner__id=student_id_).order_by('pk')
    # print('student_conversation_objects:', student_conversation_objects)

    conversations = []
    sentence_awaiting_judgement = None
    sentence_being_recorded = None
    for i, c in enumerate(student_conversation_objects):

        conversation = {}
        if c.tutorial == False:

            conversation["id"] = c.pk
            conversation["start_time"] = int_time_or_none(c.start_time)
            conversation["end_time"] = int_time_or_none(c.end_time)
            conversation["topic"] = c.topic
            conversation["emotion"] = c.emotion
            conversation["completed_sentences"] = []

            # get prev sentences
            sent_objects = PermSentence.objects.filter(conversation=c)

            for sent in sent_objects:

                # print('conv:', c.pk)
                # print('sent:', sent)
                # print('sent.sentence:', sent.sentence)
                sent_meta = convert_django_sentence_object_to_json(sent, student_id_, c.pk)
                # timestamps only work if there is an actual time, else None
                if sent.judgement != None :
                    conversation["completed_sentences"].append(sent_meta)
                
                elif i == len(student_conversation_objects) - 1:
                    
                    # print('conv:', c.pk)
                    # print('sent:', sent)
                    # print('sent.sentence:', sent.sentence)
                    if sent.sentence != None:
                        sentence_awaiting_judgement = sent_meta
                    else:
                        sentence_being_recorded = sent_meta 


            conversation["completed_sentences"] = sorted(conversation["completed_sentences"], key=itemgetter("sent_id"), reverse=True)

        conversations.append(conversation)

    return conversations, sentence_awaiting_judgement, sentence_being_recorded

def get_nationality_code( country_name ):

    with open( settings.BASE_DIR + '/face/static/face/images/country-flags/countries_flipped.json') as f:
        countries = json.load( f )
        
    return countries.get( country_name )

def get_learner_age( years_of_birth ):

    current_year = datetime.date.today().year
    birth_year = int( years_of_birth[-4:] )

    return current_year - birth_year
    
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
        "whats_wrong": sent.whats_wrong,
        "whats_wrong_timestamp": whats_wrong_time,
        "try_again": sent.try_again,
        "try_again_timestamp": try_again_time,
        "next_sentence": sent.next_sentence,
        "next_sentence_timestamp": next_sentence_time,
    }

    return sent_meta
                
