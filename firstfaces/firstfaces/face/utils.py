from .models import Available, TempSentence, Session, PermSentence, Profile, PostTalkTiming

from django.contrib.auth.models import User
from django.conf import settings
import datetime
import time
from django.utils import timezone
from operator import itemgetter
import math
import json
from django.forms.models import model_to_dict
from google.cloud import texttospeech
import os

# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/johnsHDD/PhD_backup/erle-3666ad7eec71.json"
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/johnsHDD/PhD/2018_autumn/erle-3666ad7eec71.json"
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/firstfaces/erle-3666ad7eec71.json"
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/user1/Downloads/erle-3666ad7eec71.json"

def get_this_weeks_dates():

    days_add_minus = {

            'Sat': [0,7],
            'Sun': [0,6],
            'Mon': [-1,5],
            'Tue': [-2,4],
            'Wed': [-3,3],
            'Thu': [-4,2],
            'Fri': [-5,1]

    }

    todays_date = timezone.localtime().date()
    todays_day = todays_date.strftime("%a")
    today = timezone.localtime()
    date_mon = today + datetime.timedelta( days_add_minus[ todays_day ][ 0 ] )
    date_fri = today + datetime.timedelta( days_add_minus[ todays_day ][ 1 ] )

    return [ date_mon, date_fri ]


def get_availables_for_schedule(groups):
    
    this_weeks_dates = get_this_weeks_dates()

    # get all availables in this period
    this_weeks_availables = Available.objects.filter( avail_group__name__in=groups).filter( start_availability__gte=this_weeks_dates[ 0 ] ).filter( end_availability__lte=this_weeks_dates[ 1 ] ) 
    print('this weeks availables: ', this_weeks_availables)

    return this_weeks_availables


days_nums = {
                
    'Sat': -1,
    'Sun': -1,
    'Mon': 0,
    'Tue': 1,
    'Wed': 2,
    'Thu': 3,
    'Fri': 4

}

# for schedule board in waiting views
def make_schedule_dict( availables ):

    # my teaching timetable starts at this time
    zero_hour = 8

    # 0, 1, 2... are Mon, Tue, Wed.. for x-axis
    # in list are y-axis top and bottom of block
    schedule_dict_prot = {

            0: [],
            1: [],
            2: [],
            3: [],
            4: []

    }

    day_now = timezone.now().strftime("%a")
    hour_now = int(timezone.localtime().strftime("%H"))
    min_now = int(timezone.localtime().strftime("%M"))

    line_now = [days_nums[ day_now ], round(hour_now - zero_hour + min_now / 60 , 1)]

    for a in availables:

        start_hour = int(timezone.localtime(a.start_availability).strftime("%H"))
        start_min = int(timezone.localtime(a.start_availability).strftime("%M"))
        end_hour = int(timezone.localtime(a.end_availability).strftime("%H"))
        end_min = int(timezone.localtime(a.end_availability).strftime("%M"))

        decimal_start = round(start_hour - zero_hour + start_min / 60, 1)
        decimal_end = round(end_hour - zero_hour + end_min / 60, 1)

        if decimal_start != decimal_end:
            schedule_dict_prot[ days_nums[ a.start_availability.strftime("%a") ] ].append( [decimal_start, decimal_end] )

    return schedule_dict_prot, line_now

def get_upcoming_class( availables ):

    """
    gets next available and next available at another day incase the student has already finished one class
    """

    time_now = timezone.now()
    todays_date = time_now.date()

    next_class = None;
    next_class_after_today = None;

    for a in availables:

        if a.start_availability > time_now:

            if next_class != None:

                if a.start_availability < next_class.start_availability:

                    next_class = a

            else:

                next_class = a
        
            if next_class_after_today != None:

                if a.start_availability.date() > todays_date:

                    if a.start_availability < next_class_after_today.start_availability:

                        next_class_after_today = a

                    else:

                        next_class_after_today = a
        
    if next_class != None:

        next_class = timezone.localtime(next_class.start_availability).strftime("%A %H:%M")

    else:

        next_class = "No Classes"

    if next_class_after_today != None:

        next_class_after_today = timezone.localtime(next_class_after_today.start_availability).strftime("%A %H:%M")

    else:

        next_class_after_today = "No Classes"

    return next_class, next_class_after_today

def get_class_already_done_today( sessions ):

    for s in sessions:

        if s.start_time.date() == timezone.now().date():

            if s.end_time != None:

                return True

    return False

def get_in_class_now( sessions ):

    if len( sessions ) == 0:

        return False, 0

    else:

        # get the most recent session
        s = sessions.order_by('-start_time')[ 0 ]
        
        print('s:', s)

        # if no end time then session is currently running
        if s.end_time == None and s.start_time > timezone.now() - datetime.timedelta(hours=1):

            return True, s.id

        else:

            return False, 0

def has_user_clicked_option_btn(s_id):

    sent = TempSentence.objects.get(pk=s_id)

    if sent.try_again or sent.next_sentence or sent.whats_wrong:

        return True

    else:

        return False

# def has_user_added_sent_to_blob(s_id):

    # sent = TempSentence.objects.get(pk=s_id)

    # print('sent_id:', s_id)
    # print('sent:', sent)
    # print('sent added from blob:', sent)

    # if sent.sentence != None:

        # return True

    # else:

        # return False

def get_number_of_current_live_sessions():

    print('time now:', timezone.now())
    # get all sessions currently underway
    sessions_no_end_time = Session.objects.filter(end_time=None)
    remove_those_not_ended_by_user = sessions_no_end_time.filter(start_time__gte=timezone.now()-datetime.timedelta(hours=2))
    remove_tutorials = remove_those_not_ended_by_user.filter(tutorial=False)
    return remove_tutorials.count()

def fill_sessions_dict():

    # create JSON object containing all info for teacher meeting
    sessions = {}

    # get all sessions currently underway
    cur_sessions = Session.objects.filter(end_time=None)

    # get total sentences in db in order to check later if this has increased
    total_sentences = TempSentence.objects.count()
    sessions[ 'totalSentences' ] = total_sentences
    sessions[ 'numberOf' ] = 0
    sess_id_to_username = {}
    for s in cur_sessions:
        
        if s.tutorial == False:

            # 1000 hours is for development
            if s.start_time > timezone.now() - datetime.timedelta(hours=1000):
            
                sessions[ 'numberOf' ] += 1
                sessions[s.pk] = {}
                sessions[s.pk]["user_id"] = s.learner.pk
                sessions[s.pk]["username"] = s.learner.username
                # need to convert to basic time units for JS
                sessions[s.pk]["start_time"] = int(time.mktime(timezone.localtime(s.start_time).timetuple())) * 1000
                

                # get prev sentences
                this_sess_sents = TempSentence.objects.filter(session=s)
                sents = []

                for sent in this_sess_sents:

                    # timestamps only work if there is an actual time, else None
                    sent_time = None
                    judge_time = None
                    whats_wrong_time = None
                    try_again_time = None
                    next_sentence_time = None
                    if sent.sentence_timestamp != None:

                        sent_time = int(time.mktime((sent.sentence_timestamp).timetuple()))
                        
                    if sent.judgement_timestamp != None:

                        judge_time = int(time.mktime((sent.judgement_timestamp).timetuple()))

                    if sent.whats_wrong_timestamp != None:

                        whats_wrong_time = int(time.mktime((sent.whats_wrong_timestamp).timetuple()))

                    if sent.try_again_timestamp != None:

                        try_again_time = int(time.mktime((sent.try_again_timestamp).timetuple()))

                    if sent.next_sentence_timestamp != None:

                        next_sentence_time = int(time.mktime((sent.next_sentence_timestamp).timetuple()))

                    sent_meta = {
                        "sess_id": s.pk,
                        "sent_id": sent.id, 
                        "sentence": json.loads(sent.sentence),
                        "sentence_timestamp": sent_time,
                        "judgement": sent.judgement,
                        "judgement_timestamp": judge_time,
                        "indexes": sent.indexes,
                        "prompt": sent.prompt,
                        "correction": sent.correction,
                        "whats_wrong": sent.whats_wrong,
                        "whats_wrong_timestamp": whats_wrong_time,
                        "try_again": sent.try_again,
                        "try_again_timestamp": try_again_time,
                        "next_sentence": sent.next_sentence,
                        "next_sentence_timestamp": next_sentence_time,
                    }
                    sents.append(sent_meta)

                sents = sorted(sents, key=itemgetter("sent_id"), reverse=True)

                sessions[s.pk]["sentences"]= sents

    return sessions

def delete_sentences_from_temp_db(sess_id): 

    sess = Session.objects.get(pk=sess_id)
    sentences = TempSentence.objects.filter(session=sess).order_by('pk')
    
    for s in sentences:
        TempSentence.objects.get(pk=s.pk).delete()


# def get_scores( sess_id ):

    # sess = Session.objects.get(pk=sess_id)
    # sentences = TempSentence.objects.filter(session=sess).order_by('pk')

    # save_to_perm_db( sentences )

    # no_sentences = len( sentences )

    # if no_sentences == 0:
        # return [0,0,0]

    # correct_sentences = [s for s in sentences if s.judgement in ['C', 'B', 'P']]

    # print('correct_sentences:', correct_sentences);

    # no_correct_sentences = len(correct_sentences)

    # if no_correct_sentences == 0:
        # return [0,0,0]

    # no_incorrect_sentences = no_sentences - no_correct_sentences

    # ratio_correct = len(correct_sentences) / no_sentences

    # av_correct_sent_length = sum([len(c_s.sentence.split()) for c_s in correct_sentences]) / no_correct_sentences
    # av_correct_sent_length = min(10, av_correct_sent_length)

    # emotion_amounts = []
    # for e_s in correct_sentences:

        # emotion_list = json.loads(e_s.emotion)
        # emotion_amounts.append(math.sqrt(emotion_list[0]**2 + emotion_list[1]**2))

    # av_correct_emotion = sum(emotion_amounts) / no_correct_sentences

    # ratio_successful_try_again = 0
    # if no_incorrect_sentences != 0:
        # # try again - if use try again and get it right - bonus points!
        # successful_try_again_count = 0
        # for i, t_s in enumerate(sentences):
            
            # if i != 0:

                # if t_s.judgement in ['C', 'B', 'P']:

                    # if sentences[i-1].try_again:

                        # successful_try_again_count += 1
        
        # ratio_successful_try_again = successful_try_again_count / no_incorrect_sentences

    # raw_score = ratio_correct * av_correct_sent_length * 10;
    # try_again_bonus = math.ceil(ratio_successful_try_again * 5)
    # emotion_bonus = math.ceil(av_correct_emotion * 5)

    # print('raw score in utils:', raw_score)

    # return [raw_score, try_again_bonus, emotion_bonus]
        
# def save_to_perm_db( sents_tbcopied ):

    # for s in sents_tbcopied:

        # # print('\n\nsent_tbcopied:', s)

        # s_dict = model_to_dict( s )
        # s_dict['learner'] = s.learner
        # s_dict['session'] = s.session
        # del(s_dict['id'])
        # ps = PermSentence.objects.create(**s_dict)

        # # change audio files over to PermSentence
        # audiofile_set = s.audiofile_set.all().order_by('-pk')
        # for a in audiofile_set.reverse():
            # pa = PermAudioFile.objects.create(sentence=ps, transcription0=a.transcription0, transcription1=a.transcription1, transcription2=a.transcription2, interference=a.interference, clicks=a.clicks, audio=a.audio, created_at=a.created_at)
            # pa.save()

        # # change audio files over to PermSentence
        # talk_timings_set = s.posttalktimings_set.all().order_by('-pk')
        # for t in talk_timings_set.reverse():
            # pt = PostTalkTimings.objects.create(
                    # sentence=ps,
                    # timings=t.timings, 
                    # created_at=t.created_at
                # )
            # pt.save()

        # TempSentence.objects.get(pk=s.pk).delete()

def get_prev_sessions( user ):

    all_sessions = Session.objects.filter(learner=user)

    sessions_dict = {}

    for sess in all_sessions:

        if not sess.tutorial and sess.score != None:

            sents = PermSentence.objects.filter(session=sess).order_by('pk')
            sentences = []

            for s in sents:

                a_s = s.audiofile_set.all().order_by('pk')
                a_s_ids = [[a.id, [a.transcription0, a.transcription1, a.transcription2], a.audio.name, json.loads(a.clicks)] for a in a_s]

                sentences.append({
                    'sent_id': s.id,
                    'sess_id': sess.id,
                    'sentence': s.sentence, 
                    'judgement': s.judgement, 
                    'correction': s.correction, 
                    'indexes': s.indexes,
                    'try_again': s.try_again, 
                    'prompt': s.prompt,
                    'audio_files': a_s_ids
                })

            topic = sess.topic
            if topic == 'emotion':
                topic = 'feeling ' + sess.learner_emotion
            
            sessions_dict[ sess.id ] = {

                'score': sess.score,
                'start_time': int(time.mktime((sess.start_time).timetuple())),
                'topic': topic,
                'emotion': sess.learner_emotion,
                'sentences': sentences

            }
                
    return sessions_dict 

def check_if_username_is_unique( name ):

    if User.objects.filter(username=name).exists():

        return False

    else:

        return True

# def get_test_scores( u ):

    # prev_test_scores = [[int(time.mktime((t.finished_at).timetuple())), t.score] for t in Test.objects.filter(learner=u) if t.finished_at != None]

    # prev_test_scores = sorted(prev_test_scores, key=itemgetter(0))    

    # print('prev_test_scores:', prev_test_scores)

    # return prev_test_scores

def get_tia_tts_for_prompts_early(text, sent_id):

    print('\ntext:', text)
    print('\nsent_id:', sent_id)
    speaking_voice = 'en-GB-Wavenet-C'

    client = texttospeech.TextToSpeechClient()
    input_text = texttospeech.types.SynthesisInput(text=text)

    # Note: the voice can also be specified by name.
    # Names of voices can be retrieved with client.list_voices().
    voice = texttospeech.types.VoiceSelectionParams(
        language_code='en-GB',
        name=speaking_voice
        # ssml_gender=texttospeech.enums.SsmlVoiceGender.MALE
        )

    audio_config = texttospeech.types.AudioConfig(
        audio_encoding=texttospeech.enums.AudioEncoding.MP3,
        pitch = 0,
        speaking_rate = 1,
        )

    try:
        response = client.synthesize_speech(input_text, voice, audio_config)

        print('response:', response)

        # don't need to keep all synths for class. Remember to delete this when session ends.
        synthURL = 'media/synths/sent_' + str(sent_id) + '.wav' # + '_' + str(int(time.mktime((timezone.now()).timetuple())))
        print('rsynthURL:', synthURL)
        with open( os.path.join(settings.BASE_DIR, synthURL ), 'wb') as out:
            out.write(response.audio_content)
    except:
        synthURL = 'fault'

    return synthURL







