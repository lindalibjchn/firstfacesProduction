from django.shortcuts import render
from face.views.conversation.teacher.utils.sessions_sentences import get_students_in_conversation_now_ids, get_students_conversations
from django.conf import settings
import json
from face.models import Prompt, Update
import logging
logger = logging.getLogger(__name__)

def conversation_teacher(request):

    # logger.error('in conversation_teacher')
    print('in conversation_teacher')
    students_in_conversation_now_ids = get_students_in_conversation_now_ids()
    conversations = get_students_conversations(students_in_conversation_now_ids)
    # u = Update.objects.latest('pk')
    # u.updated_aud = False
    # u.updated_sent = False
    # u.audio_ids = None
    # u.sentence_ids = None

    prompt0_list = [p.name.replace('_', ' ') for p in Prompt.objects.filter(level=0)]

    # print( 'conversations:', conversations )
    context = {

        "conversations": json.dumps(conversations),
        "conversation": True,
        "in_development": json.dumps(settings.DEBUG),
        "prompt0_list": json.dumps(prompt0_list),

    }

    return render(request, 'face/conversation/teacher/main.html', context)

