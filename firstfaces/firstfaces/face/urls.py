from django.urls import path
from django.urls import reverse_lazy
from django.contrib.auth.views import LogoutView
from face import views_temp
from face.views.conversation import main
from face.views.conversation.ajax import audio
from face.views.conversation.ajax import conversation
from face.views.conversation.ajax import sentence

urlpatterns = [
    # CONVERSATION
    # MAIN
    path('conversation/<int:session_id>', main.conversation, name="conversation"),
    # AJAX
    # conversation
    path('store_emotion', conversation.store_emotion, name='store_emotion'),
    path('store_topic', conversation.store_topic, name='store_topic'),
    path('store_tutorial_end', conversation.store_tutorial_end, name='store_tutorial_end'),
    path('timings', conversation.timings, name='timings'),
    path('delete_session', conversation.delete_session, name='delete_session'),
    path('store_conversation_over', conversation.store_conversation_over, name='store_conversation_over'),
    # sentence
    path('store_sent', sentence.store_sent, name='store_sent'),
    path('check_judgement', sentence.check_judgement, name='check_judgement'),
    path('wait_for_correction', sentence.wait_for_correction, name='wait_for_correction'),
    path('store_whats_wrong', sentence.store_whats_wrong, name='store_whats_wrong'),
    path('store_try_again', sentence.store_try_again, name='store_try_again'),
    path('store_next_sentence', sentence.store_next_sentence, name='store_next_sentence'),
    path('store_show_correction', sentence.store_show_correction, name='store_show_correction'),
    # audio
    path('tts', audio.tts, name='tts'),
    path('store_blob', audio.store_blob, name='store_blob'),
    # path('store_error_blob', audio.store_error_blob,name='store_error_blob'),
    # path('error_recording_used', audio.error_recording_used, name="error_recording_used"),
    # path('error_typing_used', audio.error_typing_used, name="error_typing_used"),
    # path('store_attempt_blob', audio.store_attempt_blob, name="store_attempt_blob"),
    # path('close_attempt', audio.close_attempt, name="close_attempt"),
    # path('get_remaining_audio', audio.get_remaining_audio, name="get_remaining_audio"),
    # path('do_allignment',audio.do_allignment, name="do_allignment"),
    
    path('', views_temp.out_or_in, name="out_or_in"),
    path('teacherMeeting', views_temp.teacherMeeting, name="teacherMeeting"),
    # path('store_test_score', views_temp.store_test_score, name='store_test_score'),
    # path('store_test_begin', views_temp.store_test_begin, name='store_test_begin'),
    # path('store_sound_mic', views_temp.store_sound_mic, name='store_sound_mic'),
    # path('add_transcription_choice_view', views_temp.add_transcription_choice_view, name='add_transcription_choice_view'),
    # path('add_listen_synth_data', views_temp.add_listen_synth_data, name='add_listen_synth_data'),
    path('sign_up', views_temp.sign_up, name='sign_up'),
    path('sign_up_user', views_temp.sign_up_user, name='sign_up_user'),
    # path('check_prompt_indexes', views_temp.check_prompt_indexes, name='check_prompt_indexes'),
    path('store_judgement', views_temp.store_judgement, name='store_judgement'),
    path('store_prompt', views_temp.store_prompt, name='store_prompt'),
    path('store_correction', views_temp.store_correction, name='store_correction'),
    path('check_for_change', views_temp.check_for_change, name='check_for_change'),
    path('update_session_object', views_temp.update_session_object, name='update_session_object'),
    path('waiting', views_temp.waiting, name="waiting"),
    path('group_data', views_temp.group_data, name="group_data"),
    path('book_session', views_temp.book_session, name="book_session"),
    path('entrance', views_temp.entrance, name='entrance'),
    path('login', views_temp.my_login, name='login'),
    path('logout', LogoutView.as_view(next_page=reverse_lazy('entrance')), name='logout'),
    ]
