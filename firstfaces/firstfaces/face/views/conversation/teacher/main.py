from django.shortcuts import render
from face.views.conversation.teacher.utils.sessions_sentences import fill_sessions_dict
import json

def conversation_teacher(request):

    sessions = fill_sessions_dict()

    context = {

        "sessions": json.dumps(sessions),
        "conversation": True,

    }

    return render(request, 'face/conversation/teacher/main.html', context)

