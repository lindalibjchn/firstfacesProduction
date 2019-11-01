from face.models import Sentence, Conversation, Profile
import datetime
from operator import itemgetter
import json
from face.views.conversation.all.modify_data import jsonify_or_none, floatify, int_time_or_none
from face.views.conversation.all.sentences import get_student_conversation
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
    for i, c in enumerate(student_conversation_objects):

        current_conv = False
        if i == len(student_conversation_objects) - 1:
            current_conv = True

        conversation, sentence_awaiting_judgement, sentence_being_recorded = get_student_conversation(c, student_id_, current_conv)
            
        conversations.append(conversation)
    conversations = sorted(conversations, key=itemgetter("id"), reverse=True)

    return conversations, sentence_awaiting_judgement, sentence_being_recorded


def get_nationality_code( country_name ):

    with open( settings.BASE_DIR + '/face/static/face/images/country-flags/countries_flipped.json') as f:
        countries = json.load( f )
        
    return countries.get( country_name )

def get_learner_age( years_of_birth ):

    current_year = datetime.date.today().year
    birth_year = int( years_of_birth[-4:] )

    return current_year - birth_year
    
