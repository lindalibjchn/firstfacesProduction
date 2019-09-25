from django.shortcuts import render
from face.views.conversation.teacher.utils.sessions_sentences import fill_sessions_dict
from django.conf import settings
import json

def conversation_teacher(request):

    sessions = fill_sessions_dict()
    print('in_development:', settings.DEBUG)

    context = {

        "sessions": json.dumps(sessions),
        "conversation": True,
        "in_development": json.dumps(settings.DEBUG),

    }

    return render(request, 'face/conversation/teacher/main.html', context)

