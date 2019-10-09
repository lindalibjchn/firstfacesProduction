from face.models import TempSentence, Profile
from django.utils import timezone
import datetime
import json
import time
from django.http import JsonResponse
from face.views.conversation.teacher.utils.sessions_sentences import get_students_conversations, convert_django_sentence_object_to_json
from face.views.conversation.student.utils.sentence import jsonify_or_none
from face.views.conversation import database_updates

def check_for_change(request):

    check_for_change_count = 0
    while not database_updates.database_updated_by_student:
        if check_for_change_count < 30:
            print('database_updated_by_student:', database_updates.database_updated_by_student, check_for_change_count)
            check_for_change_count += 1
            time.sleep(1)
        else:
            return JsonResponse({'change': False})    


    
    print('database_updated_by_student:', database_updates.database_updated_by_student)

    database_updates.database_updated_by_student = False

    sentences_being_recorded_or_not_judged_objects = TempSentence.objects.filter(judgement=None)
    sentences_being_recorded_objects = sentences_being_recorded_or_not_judged_objects.filter(sentence=None)
    sentences_not_judged_objects = sentences_being_recorded_or_not_judged_objects.exclude(sentence=None).order_by('sentence_timestamp')

    sentences_being_recorded = []
    for s_b in sentences_being_recorded_objects:
        sentences_being_recorded.append( convert_django_sentence_object_to_json(s_b, s_b.learner.id, s_b.conversation.id))

    sentences_not_judged = []
    for s_n in sentences_not_judged_objects:
        sentences_not_judged.append( convert_django_sentence_object_to_json(s_n, s_n.learner.id, s_n.conversation.id))

    response_data = {

        'change': True,
        'sentences_being_recorded': sentences_being_recorded,
        'sentences_not_judged': sentences_not_judged,

    };

    return JsonResponse(response_data)    

def update_session_object(request):

    # sessions = get()

    response_data = {

        # 'sessions': json.dumps(sessions),

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



