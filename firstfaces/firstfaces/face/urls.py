from django.urls import path
from django.urls import reverse_lazy
from django.contrib.auth.views import LogoutView
from face import views_temp
from face.views.conversation.student import main as conversation_student_main
from face.views.conversation.student.ajax import audio
from face.views.conversation.student.ajax import conversation
from face.views.conversation.student.ajax import sentence as student_sentence
from face.views.conversation.teacher import main as conversation_teacher_main
from face.views.conversation.teacher.ajax import sentence as teacher_sentence
from face.views.conversation.teacher.ajax import updates
from face.views.waiting import main as waiting_main
from face.views.entrance import main as entrance_main

urlpatterns = [
    # CONVERSATION
    # MAIN
    path('conversation_student/<int:conversation_id>', conversation_student_main.conversation_student, name="conversation_student"),
    # AJAX
    # conversation
    path('store_emotion', conversation.store_emotion, name='store_emotion'),
    path('store_topic', conversation.store_topic, name='store_topic'),
    path('get_pronunciation_errors',conversation.get_pronunciation_errors,name="get_pronunciation_errors"),
    # path('store_tutorial_end', conversation.store_tutorial_end, name='store_tutorial_end'),
    # path('timings', conversation.timings, name='timings'),
    path('delete_session', conversation.delete_session, name='delete_session'),
    path('store_conversation_over', conversation.store_conversation_over, name='store_conversation_over'),
    path('tag_sentence', conversation.tag_sentence, name='tag_sentence'),
    path('get_context', conversation.get_context, name="get_context"),
    path('get_spliced_audio', conversation.get_spliced_audio, name="get_spliced_audio"),
    # sentence
    path('store_sent', student_sentence.store_sent, name='store_sent'),
    path('check_judgement', student_sentence.check_judgement, name='check_judgement'),
    path('wait_for_correction', student_sentence.wait_for_correction, name='wait_for_correction'),
    path('store_whats_wrong', student_sentence.store_whats_wrong, name='store_whats_wrong'),
    path('store_try_again', student_sentence.store_try_again, name='store_try_again'),
    path('store_next_sentence', student_sentence.store_next_sentence, name='store_next_sentence'),
    path('store_show_correction', student_sentence.store_show_correction, name='store_show_correction'),
    # audio
    path('tts', audio.tts, name='tts'),
    path('store_blob', audio.store_blob, name='store_blob'),
    path('store_error_blob', audio.store_error_blob,name='store_error_blob'),
    path('error_recording_used', audio.error_recording_used, name="error_recording_used"),
    path('error_typing_used', audio.error_typing_used, name="error_typing_used"),
    path('store_attempt_blob', audio.store_attempt_blob, name="store_attempt_blob"),
    path('close_attempt', audio.close_attempt, name="close_attempt"),
    path('get_remaining_audio', audio.get_remaining_audio, name="get_remaining_audio"),
    path('do_allignment',audio.do_allignment, name="do_allignment"),

    
    # TEACHER
    # MAIN
    path('conversation_teacher', conversation_teacher_main.conversation_teacher, name="conversation_teacher"),
    # AJAX
    # store
    path('store_judgement', teacher_sentence.store_judgement, name='store_judgement'),
    # path('store_prompt', teacher_sentence.store_prompt, name='store_prompt'),
    # path('store_correction', teacher_sentence.store_correction, name='store_correction'),
    # check db
    path('check_for_change', updates.check_for_change, name='check_for_change'),
    # update
    path('update_session_object', updates.update_session_object, name='update_session_object'),
    path('update_info', updates.update_info, name='update_info'),

    #WAITING
    path('waiting', waiting_main.waiting, name="waiting"),
    path('book_conversation', waiting_main.book_conversation, name="book_conversation"),

    #ENTRANCE
    path('entrance', entrance_main.entrance, name='entrance'),
    path('sign_up', views_temp.sign_up, name='sign_up'),
    path('sign_up_user', views_temp.sign_up_user, name='sign_up_user'),
    path('login', views_temp.my_login, name='login'),
    path('logout', LogoutView.as_view(next_page=reverse_lazy('entrance')), name='logout'),
    
    path('', views_temp.out_or_in, name="out_or_in"),
    # path('store_test_score', views_temp.store_test_score, name='store_test_score'),
    # path('store_test_begin', views_temp.store_test_begin, name='store_test_begin'),
    # path('store_sound_mic', views_temp.store_sound_mic, name='store_sound_mic'),
    # path('add_transcription_choice_view', views_temp.add_transcription_choice_view, name='add_transcription_choice_view'),
    # path('add_listen_synth_data', views_temp.add_listen_synth_data, name='add_listen_synth_data'),
    # path('check_prompt_indexes', views_temp.check_prompt_indexes, name='check_prompt_indexes'),
    path('group_data', views_temp.group_data, name="group_data"),
    ]
