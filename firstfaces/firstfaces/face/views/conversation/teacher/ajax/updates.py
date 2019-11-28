from face.models import Sentence, Profile, Conversation, Update
from django.utils import timezone
import datetime
import json
import time
from django.http import JsonResponse
from face.views.conversation.teacher.utils.sessions_sentences import get_students_conversations
from face.views.conversation.all.sentences import convert_django_sentence_object_to_json
from face.views.conversation.all.modify_data import jsonify_or_none
import code
import datetime
import logging
logger = logging.getLogger(__name__)

# time02=0
# time03=0
# time04=0
# time05=0
# time06=0
# time07=0

def check_for_change(request):

    def new_update():
        update = Update.objects.latest('pk')
        if update.updated_aud or update.updated_sent:
            return True
        else:
            return False

    check_for_change_count = 0
    while not new_update():
        if check_for_change_count < 100:
            if check_for_change_count % 20 == 0:
                print('sente_update:', check_for_change_count)
            check_for_change_count += 1
            time.sleep(0.5)
        else:
            # print('returning from else')
            return JsonResponse({'change': False})
    
    update = Update.objects.latest('pk')
    sentences_not_judged = []
    sentences_being_recorded = []
    # determine whether change came from audio or sentence
    if update.updated_sent:

        print('\nsentence updated\n')
        for sent_id in json.loads(update.sentence_ids):
            
            sent = Sentence.objects.get(pk=sent_id)
            sentences_not_judged.append(convert_django_sentence_object_to_json(sent, sent.learner.id, sent.conversation.id))
        update.sentence_ids = None
        update.updated_sent = False
        # settings.TIME01 = datetime.datetime.now()
        # logger.error('\ntime to register SENTENCE change after boolean changed:' + str(settings.TIME01 - settings.TIME00) + '\n')
        # print('\ntime to register SENTENCE change after boolean changed:' + str(settings.TIME01 - settings.TIME00) + '\n')

    if update.updated_aud:

        print('\naudio updated\n')
        for sent_aud_id in json.loads(update.audio_ids):
            
            sent_aud = Sentence.objects.get(pk=sent_aud_id)
            sentences_being_recorded.append(convert_django_sentence_object_to_json(sent_aud, sent_aud.learner.id, sent_aud.conversation.id))
        update.audio_ids = None
        update.updated_aud = False
        # settings.TIME01 = datetime.datetime.now()
        # logger.error('\ntime to register AUDIO change after boolean changed:' + str(settings.TIME01 - settings.TIME00) + '\n')
        # print('\ntime to register AUDIO change after boolean changed:' + str(settings.TIME01 - settings.TIME00) + '\n')

    update.save()
    # print('\nnew sentence/audio:' + str(t1 - t0) + '\n')

    # print('database_updated_by_student after while:', database_updated_by_student)
    # print('sentences_being_recorded:', sentences_being_recorded)
    # print('sentences_not_judged:', sentences_not_judged)
    response_data = {

        'change': True,
        'sentences_being_recorded': sentences_being_recorded,
        'sentences_not_judged': sentences_not_judged,

    };

    return JsonResponse(response_data)    

def update_conversation_objects(request):

    # code.interact(local=locals());
    string_user_ids_in_teacher_view = json.loads( request.GET['conversationIds'] )
    user_ids_in_teacher_view_set = set([int(i) for i in string_user_ids_in_teacher_view])
    # print( 'user_ids_in_teacher_view:', user_ids_in_teacher_view )
    
    user_ids_in_conversation_in_database = []
    for c in Conversation.objects.filter(end_time=None):
        user_ids_in_conversation_in_database.append( c.learner.id )

    user_ids_in_conversation_in_database_set = set(user_ids_in_conversation_in_database)

    # print( 'user_ids_in_conversation_in_database_set:', user_ids_in_conversation_in_database_set )
    # print( 'same:', user_ids_in_conversation_in_database_set == user_ids_in_teacher_view_set )

    same_students = user_ids_in_conversation_in_database_set == user_ids_in_teacher_view_set

    updated_student_conversations = []
    # new_students = []
    # finished_students = []
    if not same_students:

        # new_students = list(user_ids_in_conversation_in_database - user_ids_in_teacher_view)
        # finished_students = list(user_ids_in_teacher_view - user_ids_in_conversation_in_database)
        updated_student_conversations = get_students_conversations( user_ids_in_conversation_in_database )[ 'all_conversations' ]

    response_data = {

        'same_students': same_students,
        'updated_student_conversations': updated_student_conversations,
        # 'new_students': new_students,
        # 'finished_students': finished_students

    }

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



