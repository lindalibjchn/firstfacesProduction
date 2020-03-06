from django.http import JsonResponse
from face.utils import *
from django.utils import timezone
import json
from face.models import Conversation, Sentence, Profile, AudioFile, AudioError, AudioErrorCorrectionAttempt, AudioErrorAttempt, StockWord
import matplotlib.pyplot as plt
import spacy
from face.views.conversation.student.utils.context_utils import *
from django.conf import settings
from scipy.io import wavfile
import librosa
from g2p_en import G2p
import numpy as np
import itertools
import face.views.conversation.teacher.utils.text_to_speech as ts
import glob
from face.views.conversation.all.praat_utils import get_audio_length
nlp = spacy.load("en_core_web_sm")
import code
import string
import math
import ast
from face.views.conversation.all.modify_data import jsonify_or_none
from face.views.conversation.all.dan_utils import get_StockWords


valid = get_StockWords()


# def store_sound_mic(request):

    # device = request.GET['device']
    # t_f = json.loads(request.GET['TF'])

    # print('device:', device)
    # print('t_f:', t_f)
    # prof = Profile.objects.get(learner=request.user)

    # if device == "sound":

        # prof.sound = t_f

    # elif device == "microphone":

        # prof.microphone = t_f

    # prof.save()

    # response_data = {

    # }

    # return JsonResponse(response_data)    

# def store_tutorial_end(request):

    # session_id = request.POST['sessionID']
    # sess = Conversation.objects.get(pk=session_id)
    # sess.learner_emotion = "tutorial"
    # sess.topic = "tutorial"
    # time_now = timezone.now();
    # sess.end_time = time_now
    # sess.save()

    # tutorial_step = int(request.POST['tutorialStep'])
    # if tutorial_step == 99:
        # prof = Profile.objects.get(learner=request.user)
        # prof.tutorial_complete = True;
        # prof.save()

    # response_data = {

    # }

    # return JsonResponse(response_data)
# from wordcloud import WordCloud


def store_emotion(request):

    emotion = request.POST['emotion']
    conversation_id = request.POST['conversationId']
    conv = Conversation.objects.get(pk=conversation_id)
    conv.emotion = emotion
    conv.save()

    response_data = {

    }

    return JsonResponse(response_data)    

def store_tutorial_step(request):

    tutorial_step = int(request.POST['tutorial_step'])
    conversation_id = request.POST['conversationId']
    conv = Conversation.objects.get( pk=conversation_id )
    conv.emotion = tutorial_step
    conv.save()

    response_data = {

    }

    return JsonResponse(response_data)    

def store_topic(request):

    topic = request.POST['topic']
    conversation_id = request.POST['conversationId']
    conv = Conversation.objects.get(pk=conversation_id)
    conv.topic = topic
    conv.save()

    response_data = {

    }

    return JsonResponse(response_data)    

def store_slow_FPS(request):

    device = request.POST['device']
    conversation_id = request.POST['conversationId']
    conv = Conversation.objects.get(pk=conversation_id)
    conv.device = device
    conv.slow_FPS = True
    conv.slow_FPS_timestamp = timezone.now()
    conv.save()

    response_data = {

    }

    return JsonResponse(response_data)    

# def timings(request):

    # # code.interact(local=locals());
    # sent_id = int(request.GET['sent_id'])
    # sent = Sentence.objects.get(pk=sent_id)
    # timings = json.loads(request.GET['timing_dict'])

    # t = PostTalkTimings.objects.create(sentence=sent, timings=timings)

    # t.save()

    # response_data = {

    # }

    # return JsonResponse(response_data)    

def delete_session(request):

    try:

        session_id = int(request.GET['sessId'])

        sess = Conversation.objects.get(pk=session_id)
        sess.delete()

    except:

        pass

    response_data = {

    }

    return JsonResponse(response_data)    

def getTotalPointsForAClass( c ):

    tPoints = 0

    sent_objects = Sentence.objects.filter(conversation=c)

    for sent in sent_objects:

        if sent.judgement == 'P': 

            correctSentenceLength = len(json.loads(sent.sentence))
            tPoints += convertCorrectSentenceLengthToPoints( correctSentenceLength )

    return tPoints

def convertCorrectSentenceLengthToPoints( len_sent ):

    points = 0

    if len_sent >= 15:

        points = 30

    elif len_sent >= 10:

        points = 20

    elif len_sent >= 5:

        points = 10

    return points

def store_conversation_over(request):

    conv_id = int(request.POST['convId'])
    # points_from_class = int(request.POST['points'])
    ratings = json.loads(request.POST['ratings'])
    tutorial_complete = json.loads(request.POST['tutorial_complete'])

    # code.interact(local=locals());
    time_now = timezone.now();
    conv = Conversation.objects.get(pk=conv_id)
    conv.end_time = time_now
    conv.final_emotion = ratings['emotion']
    conv.rating = ratings['stars']
    conv.comment = ratings['comment']
    # conv.score = score
    conv.save()

    prof = Profile.objects.get(learner=request.user)

    if not tutorial_complete:
        prof.tutorial_complete = True
    else:
        points_from_class = getTotalPointsForAClass( conv ) 

    prof.points += points_from_class
    prof.total_points += points_from_class
    prof.save()
    response_data = {

    }

    return JsonResponse(response_data)    


def get_pronunciation_errors(request):
    session_id = request.POST['session_id']

    errors = dict()

    conv = Conversation.objects.get(pk=session_id)
    sents = Sentence.objects.filter(conversation=conv)
    for sent in sents:
        auds = AudioFile.objects.filter(sentence=sent)
        # print(sent)
        for aud in auds:
            audErrors = AudioError.objects.filter(audio=aud)
            for audErr in audErrors:
                if isinstance(audErr.intention, str):
                    if audErr.intention.strip() != "":
                        total = 0
                        if audErr.typed:
                            total += len(AudioErrorCorrectionAttempt.objects.filter(error=audErr))
                        total += len(AudioErrorAttempt.objects.filter(error=audErr))

                        if audErr.intention.strip() not in errors.keys():
                            errors[audErr.intention.strip()] = total
                        else:
                            errors[audErr.intention.strip()] += total
   # fn = "worcloud" + "_" + timezone.now().strftime('%H-%M-%S') + ".png"
    #wc = WordCloud(background_color=None, mode="RGBA" ,width=1000, height=500, relative_scaling=0.5, normalize_plurals= False, colormap='RdYlGn', min_font_size=50, max_font_size=200).generate_from_frequencies(errors)#.to_file(fn)
    plt.figure(figsize=(8, 4), facecolor=None)
    plt.imshow(wc)
    plt.axis("off")
    plt.tight_layout(pad=0)
    fn = "worcloud" + "_" + timezone.now().strftime('%H-%M-%S') + ".png"
    plt.savefig("media/images/"+fn)
    response_data = {

        'wordcloud': "media/images/"+fn,

    }

    return JsonResponse(response_data)


def tag_sentence(request):
    sentence = request.POST['sentence']

    doc = nlp(sentence)
    pos = []
    for token in doc:
        pos.append(token.pos_)
    # print(pos)
    out = []
    count = 0
    for i in range(len(pos)):
        if pos[i] == 'PART' and i > 0:
            out[count-1] = out[count-1]+"_"+pos[i]
        else:
            out.append(pos[i])
            count += 1
    response_data = {
        'POS':out,
    }
    return JsonResponse(response_data)




def get_vis_now(words):
    response_data = {
        'success': 0,
    }
    return JsonResponse(response_data)


def get_context(request):
    word = request.POST['word']
    word = word.lower()
    pos = request.POST['pos']
    if len(word.split(",")) != 1:
        return get_vis_now(word.split(","))




    try:
        words, levels, c_idx, f_idx, viss = get_tris(word, pos)
        c_vis = [v+'Emp' for v in get_word_visemes(word)]
        if len(c_vis) == 0:
            c_vis = [v + 'Emp' for v in Visemes(word)]

        fixed_word = list(words.keys())[0]
        fixed_word_level = list(levels.keys())[0]

        tile_words = list(words[fixed_word])
        tile_levels = list(levels[fixed_word_level])
        tile_viss = []
        tile_pos = ""
        tiles_html = []
        tile_audio = []
        tile_audio_durations = []
        mx = len(tile_words)
        for i in range(len(tile_words)):
            class_ = get_tile_class(mx, i)
            tiles_html.append(create_tile(tile_levels[i], tile_words[i], "", class_, i))
            if tile_words[i] not in valid:
                temp = ts.create_word_audio(tile_words[i])
                valid.append(tile_words[i])
                texts = jsonify_or_none(temp.texts)
                url = ['media/'+URL for URL in jsonify_or_none(temp.urls)]
                visemes = jsonify_or_none(temp.visemes)
            else:
                temp = StockWord.objects.get(name=tile_words[i])
                texts = jsonify_or_none(temp.texts)
                url = ['media/'+URL for URL in jsonify_or_none(temp.urls)]
                visemes = jsonify_or_none(temp.visemes)

            tile_viss.append(visemes)
            tile_audio.append(url)
            print(tile_audio,tile_viss)
            tile_audio_durations.append(get_audio_length(url[0]))
        fixed_tile = create_fixed_tile(fixed_word, "", fixed_word_level)
        if fixed_word not in valid:
            temp = ts.create_word_audio(fixed_word)
            valid.append(fixed_word)
            texts = jsonify_or_none(temp.texts)
            url = ['media/'+URL for URL in jsonify_or_none(temp.urls)]
            visemes = jsonify_or_none(temp.visemes)
        else:
            temp = StockWord.objects.get(name=fixed_word)
            texts = jsonify_or_none(temp.texts)
            url = ['media/' + URL for URL in jsonify_or_none(temp.urls)]
            visemes = jsonify_or_none(temp.visemes)
        fixed_audio = url
        fixed_word_vis = visemes
        fixed_duration = get_audio_length(fixed_audio[0])
        tiles = append_tile_list(mx)
        num_tiles = mx
        hidden_bottom = hidden_tiles(mx)

        response_data = {
            'success': 1,
            'fixed_tile': fixed_tile,
            'tiles_html': tiles_html,
            'num_tiles': num_tiles,
            'hidden_tiles': hidden_bottom,
            'tile_audio': tile_audio,
            'fixed_audio': fixed_audio,
            'tiles': tiles,
            'levels': levels,
            'cid': c_idx,
            'fid': f_idx,
            'word': word,
            'c_vis': c_vis,
            'fixed_vis': fixed_word_vis,
            'tile_vis': tile_viss,
            'fixed_word': fixed_word,
            'tile_durations': tile_audio_durations,
            'fixed_duration': fixed_duration
        }

    except:
        return get_vis_now(word)

    return JsonResponse(response_data)


def get_spliced_audio(request):
    # code.interact(local=locals());
    words = request.POST['words'].split(',')
    # print("\n\n",vis,"\n\n",request.POST['viss'],"\n\n")
    urls = request.POST['urls'].split(',')
    for i in range(len(urls)):
        urls[i] = settings.BASE_DIR+'/media'+urls[i].split('media')[1]

    min_fs = 0
    first = True
    out = []
    for url in urls:
        if first:
            min_fs, data = remove_start_audio(url, 0)
            print("First-", url)
            out += list(data)
            first = False
        else:
            print("Next-", url)
            min_fs, data = remove_start_audio(url, 500)
            out += list(data)

    filename = '_'.join(words)+"_"+timezone.now().strftime('%H-%M-%S')+".wav"
    out_path = 'media/prePreparedWords/trigrams/'+filename
    wavfile.write(settings.BASE_DIR+"/"+out_path, min_fs, np.asarray(out))
    duration = get_audio_length(settings.BASE_DIR+"/"+out_path)

    response_data = {
        'path': out_path,
        'duration': duration,
        'words': " ".join(words).strip(),
    }
    return JsonResponse(response_data)



def remove_start_audio(path,time_ms):
    fs, data = wavfile.read(path)
    frames = int((fs/1000)*time_ms)
    return fs, data[frames:]
