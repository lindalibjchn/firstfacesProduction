from django.shortcuts import render
from face.views.conversation.teacher.utils.sessions_sentences import get_students_in_conversation_now_ids, get_students_conversations
from django.conf import settings
import json

def conversation_teacher(request):

    students_in_conversation_now_ids = get_students_in_conversation_now_ids()
    conversations = get_students_conversations(students_in_conversation_now_ids)

    # print( 'conversations:', conversations )
    context = {

        "conversations": json.dumps(conversations),
        "conversation": True,
        "in_development": json.dumps(settings.DEBUG),

    }

    return render(request, 'face/conversation/teacher/main.html', context)

