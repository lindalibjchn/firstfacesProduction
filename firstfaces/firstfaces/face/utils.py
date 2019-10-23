from face.models import Available, Sentence, Conversation, Profile

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
#os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/johnsHDD/PhD/2018_autumn/erle-3666ad7eec71.json"
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/daniel/Desktop/Tia/erle-3666ad7eec71.json"
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/firstfaces/erle-3666ad7eec71.json"
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/user1/Downloads/erle-3666ad7eec71.json"



def has_user_clicked_option_btn(s_id):

    sent = Sentence.objects.get(pk=s_id)

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

# def delete_sentences_from_temp_db(sess_id): 

    # sess = Conversation.objects.get(pk=sess_id)
    # sentences = Sentence.objects.filter(session=sess).order_by('pk')
    
    # for s in sentences:
        # TempSentence.objects.get(pk=s.pk).delete()


# def get_scores( sess_id ):

    # sess = Conversation.objects.get(pk=sess_id)
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

def check_if_username_is_unique( name ):

    if User.objects.filter(username=name).exists():

        return False

    else:

        return True

