from django.urls import path
from django.urls import reverse_lazy
from django.contrib.auth.views import LogoutView
from . import views

urlpatterns = [
    path('', views.out_or_in, name="out_or_in"),
    path('class_time/<int:session_id>', views.class_time, name="class_time"),
    path('teacherMeeting', views.teacherMeeting, name="teacherMeeting"),
    path('store_test_score', views.store_test_score, name='store_test_score'),
    path('store_test_begin', views.store_test_begin, name='store_test_begin'),
    path('store_emotion', views.store_emotion, name='store_emotion'),
    path('store_topic', views.store_topic, name='store_topic'),
    path('store_tutorial_end', views.store_tutorial_end, name='store_tutorial_end'),
    path('store_blob', views.store_blob, name='store_blob'),
    path('tts', views.tts, name='tts'),
    path('store_sound_mic', views.store_sound_mic, name='store_sound_mic'),
    path('timings', views.timings, name='timings'),
    path('add_transcription_choice_view', views.add_transcription_choice_view, name='add_transcription_choice_view'),
    path('add_listen_synth_data', views.add_listen_synth_data, name='add_listen_synth_data'),
    path('add_voice_data', views.add_voice_data, name='add_voice_data'),
    path('sign_up', views.sign_up, name='sign_up'),
    path('sign_up_user', views.sign_up_user, name='sign_up_user'),
    path('store_sent', views.store_sent, name='store_sent'),
    path('check_judgement', views.check_judgement, name='check_judgement'),
    path('check_prompt_indexes', views.check_prompt_indexes, name='check_prompt_indexes'),
    path('store_judgement', views.store_judgement, name='store_judgement'),
    path('store_prompt', views.store_prompt, name='store_prompt'),
    path('store_correction', views.store_correction, name='store_correction'),
    path('store_show_correction', views.store_show_correction, name='store_show_correction'),
    path('store_whats_wrong', views.store_whats_wrong, name='store_whats_wrong'),
    path('store_try_again', views.store_try_again, name='store_try_again'),
    path('store_next_sentence', views.store_next_sentence, name='store_next_sentence'),
    path('delete_session', views.delete_session, name='delete_session'),
    path('store_class_over', views.store_class_over, name='store_class_over'),
    path('check_for_change', views.check_for_change, name='check_for_change'),
    path('update_session_object', views.update_session_object, name='update_session_object'),
    path('wait_for_correction', views.wait_for_correction, name='wait_for_correction'),
    path('waiting', views.waiting, name="waiting"),
    path('group_data', views.group_data, name="group_data"),
    path('book_session', views.book_session, name="book_session"),
    path('entrance', views.entrance, name='entrance'),
    path('login', views.my_login, name='login'),
    path('logout', LogoutView.as_view(next_page=reverse_lazy('entrance')), name='logout'),
]
