from face.models import Sentence, Profile, Conversation
from django.utils import timezone
import datetime
import json
import time
from django.http import JsonResponse
from face.views.conversation.teacher.utils.sessions_sentences import get_students_conversations
from face.views.conversation.all.sentences import convert_django_sentence_object_to_json
from face.views.conversation.all.modify_data import jsonify_or_none
from face.views.conversation.all import database_updates
import code

def check_for_change(request):

    # print('checking for change:', database_updates.teacher_checking_for_change)
    check_for_change_count = 0
    while not database_updates.database_updated_by_student:
        if check_for_change_count < 10:
            # print('database_updated_by_student:', database_updates.database_updated_by_student, check_for_change_count)
            check_for_change_count += 1
            time.sleep(1)
        else:
            # print('returning from else')
            return JsonResponse({'change': False})
    
    # print('database_updated_by_student after while:', database_updates.database_updated_by_student)
    database_updates.database_updated_by_student = False

    sentences_being_recorded_or_not_judged_objects = Sentence.objects.filter(judgement=None)
    # print('sentences_being_recorded_or_not_judged_objects:', sentences_being_recorded_or_not_judged_objects)
    sentences_being_recorded_objects = sentences_being_recorded_or_not_judged_objects.filter(sentence=None)
    sentences_not_judged_objects = sentences_being_recorded_or_not_judged_objects.exclude(sentence=None).order_by('sentence_timestamp')

    sentences_being_recorded = []
    for s_b in sentences_being_recorded_objects:
        sentences_being_recorded.append( convert_django_sentence_object_to_json(s_b, s_b.learner.id, s_b.conversation.id))

    sentences_not_judged = []
    for s_n in sentences_not_judged_objects:
        sentences_not_judged.append( convert_django_sentence_object_to_json(s_n, s_n.learner.id, s_n.conversation.id))

    print('sentences_being_recorded:', sentences_being_recorded)
    print('sentences_not_judged:', sentences_not_judged)
    response_data = {

        'change': True,
        'sentences_being_recorded': sentences_being_recorded,
        'sentences_not_judged': sentences_not_judged,

    };

    return JsonResponse(response_data)    

def update_conversation_objects(request):

    # code.interact(local=locals());
    string_user_ids_in_teacher_view = json.loads( request.GET['conversationIds'] )
    user_ids_in_teacher_view = set([int(i) for i in string_user_ids_in_teacher_view])
    # print( 'user_ids_in_teacher_view:', user_ids_in_teacher_view )
    
    user_ids_in_conversation_in_database = []
    for c in Conversation.objects.filter(end_time=None):
        user_ids_in_conversation_in_database.append( c.learner.id )

    user_ids_in_conversation_in_database = set(user_ids_in_conversation_in_database)

    # print( 'user_ids_in_conversation_in_database:', user_ids_in_conversation_in_database )
    # print( 'same:', user_ids_in_conversation_in_database == user_ids_in_teacher_view )

    same_students = user_ids_in_conversation_in_database == user_ids_in_teacher_view

    new_students = []
    finished_students = []
    if not same_students:

        new_students = list(user_ids_in_conversation_in_database - user_ids_in_teacher_view)
        finished_students = list(user_ids_in_teacher_view - user_ids_in_conversation_in_database)

    response_data = {

        'same_students': same_students,
        'new_students': new_students,
        'finished_students': finished_students

    };

    return JsonResponse(response_data)    

def update_info(request):

    user_id = request.POST['user_id']
    new_info = request.POST['new_info']

    profile = Profile.objects.get(learner=user_id)
    
    existing_info = jsonify_or_none(profile.info)

    if existing_info: 

        existing_info.append(new_info)

    else:

        existing_info = [new_info]

    profile.info = json.dumps(existing_info)
    profile.save()

    response_data = {

        'updated_info': existing_info,

    };

    return JsonResponse(response_data)    



