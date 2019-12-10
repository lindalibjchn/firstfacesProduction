from django.http import JsonResponse
from face.utils import *
from django.utils import timezone
import json
from face.models import Conversation, Sentence, Profile, AudioFile, AudioError, AudioErrorCorrectionAttempt, AudioErrorAttempt
import matplotlib.pyplot as plt
import spacy
from face.views.conversation.student.utils.context_utils import *
from django.conf import settings
from scipy.io import wavfile
import librosa
from g2p_en import G2p
import numpy as np
import itertools



from face.views.conversation.all.praat_utils import get_audio_length
nlp = spacy.load("en_core_web_sm")
import code
import string
import math
import ast

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
from wordcloud import WordCloud


def store_emotion(request):

    emotion = request.POST['emotion']
    conversation_id = request.POST['conversationId']
    conv = Conversation.objects.get(pk=conversation_id)
    conv.emotion = emotion
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


def store_conversation_over(request):

    conv_id = int(request.POST['convId'])
    ratings = json.loads(request.POST['ratings'])


    # print('in store_conversation_over:', ratings)


    # code.interact(local=locals());
    time_now = timezone.now();
    conv = Conversation.objects.get(pk=conv_id)
    conv.end_time = time_now
    conv.final_emotion = ratings['emotion']
    conv.rating = ratings['stars']
    conv.comment = ratings['comment']
    # conv.score = score
    conv.save()

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
    c_vis = []
    if isinstance(words, list):
        for word in words:
            c_vis += [v+'Emp' for v in Visemes(word)]

        response_data = {
            'success':0,
            'c_vis': c_vis,
            'joined_word': " ".join(words).strip()
        }
    else:

        c_vis = [v + 'Emp' for v in Visemes(words)]

        response_data = {
            'success': 0,
            'c_vis': c_vis,
            'joined_word': words.strip()
        }
    return JsonResponse(response_data)


def get_context(request):
    word = request.POST['word']
    word = word.lower()
    pos = request.POST['pos']
    if len(word.split(",")) != 1:
        return get_vis_now(word.split(","))
    #try:
        #words, levels, idx, poss, viss = get_tris(word, pos)

    words = {"a": ["new", "red", "dull", "magic", "plaid"]}
    poss = ['DET', 'ADJ', "NOUN"]
    levels = {"A1": ["A1", "A2", "B1", "B2", "C2"]}
    viss = {"['e']": [['t', 'u'], ['r', 'e', 't'], ['t', 'e', 'b'], ['t', 'e', 'l'], ['b', 'e', 's', 'e', 'k'],['b','l', 'e', 't']]}
    idx=1
    print("\n\nHERE\n\n")
    try:
        c_vis = [ v+'Emp' for v in get_word_visemes(word)]
        if len(c_vis) == 0:
            c_vis = [v + 'Emp' for v in Visemes(word)]

        if idx == 1:
            print("\nHERE\n")
            fixed_word = list(words.keys())[0]
            fixed_word_level = list(levels.keys())[0]
            fixed_word_vis = ast.literal_eval(list(viss.keys())[0])
            tile_words = list(words[fixed_word])
            tile_levels = list(levels[fixed_word_level])
            tile_viss = list(viss[list(viss.keys())[0]])
            #tile_pos = poss[0]
            tile_pos = poss[1]
            tiles_html = []
            tile_audio = []
            tile_audio_durations = []
            mx = len(tile_words)
            print(mx)
            print("MEME")
            for i in range(len(tile_words)):
                class_ = get_tile_class(mx, i)
                print(i)
                tiles_html.append(create_tile(tile_levels[i], tile_words[i], tile_pos, class_, i))
                print(i)
                #tile_audio.append(get_audio_path(tile_words[i]))
                tile_audio.append("")
                #tile_audio_durations.append(get_audio_length(settings.BASE_DIR+'/'+tile_audio[i]))
                tile_audio_durations.append(0)
                print(i)
            print("HERE NOW")
            fixed_tile = create_fixed_tile(fixed_word, poss[2], fixed_word_level)
            #fixed_audio = get_audio_path(fixed_word)
            #fixed_duration = get_audio_length(settings.BASE_DIR+'/'+fixed_audio)
            fixed_audio = ""
            fixed_duration = 0
            tiles = append_tile_list(mx)
            num_tiles = mx
            hidden_bottom = hidden_tiles(mx)

        elif idx == 0:
            fixed_word = list(words.keys())[0]
            fixed_word_level = list(levels.keys())[0]
            fixed_word_vis = ast.literal_eval(list(viss.keys())[0])
            tile_words = list(words[fixed_word])
            tile_levels = list(levels[fixed_word_level])
            tile_viss = list(viss[list(viss.keys())[0]])
            tile_audio_durations = []
            tile_pos = poss[2]
            tiles_html = []
            tile_audio = []
            mx = len(tile_words)
            for i in range(len(tile_words)):
                class_ = get_tile_class(mx, i)
                tiles_html.append(create_tile(tile_levels[i], tile_words[i], tile_pos, class_, i))
                tile_audio.append(get_audio_path(tile_words[i]))
                tile_audio_durations.append(get_audio_length(settings.BASE_DIR + '/' + tile_audio[i]))
            fixed_tile = create_fixed_tile(fixed_word, poss[1], fixed_word_level)
            fixed_audio = get_audio_path(fixed_word)
            fixed_duration = get_audio_length(settings.BASE_DIR + '/' + fixed_audio)
            tiles = append_tile_list(mx)
            num_tiles = mx
            hidden_bottom = hidden_tiles(mx)

        else:
            fixed_word = list(words.keys())[0]

            fixed_word_level = list(levels.keys())[0]
            fixed_word_vis = ast.literal_eval(list(viss.keys())[0])
            tile_words = list(words[fixed_word])
            tile_levels = list(levels[fixed_word_level])
            tile_viss = list(viss[list(viss.keys())[0]])
            tile_pos = poss[1]
            tiles_html = []
            tile_audio = []
            tile_audio_durations = []
            mx = len(tile_words)
            for i in range(len(tile_words)):
                class_ = get_tile_class(mx, i)
                tiles_html.append(create_tile(tile_levels[i], tile_words[i], tile_pos, class_, i))
                tile_audio.append(get_audio_path(tile_words[i]))
                tile_audio_durations.append(get_audio_length(settings.BASE_DIR + '/' + tile_audio[i]))
            fixed_tile = create_fixed_tile(fixed_word, poss[0], fixed_word_level)
            fixed_audio = get_audio_path(fixed_word)
            fixed_duration = get_audio_length(settings.BASE_DIR + '/' + fixed_audio)
            tiles = append_tile_list(mx)
            num_tiles = mx
            hidden_bottom = hidden_tiles(mx)
        # print('\n\n', tile_audio_durations, '\n\n')

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
            'id': idx,
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
    vis = request.POST['viss'].split(',')
    # print("\n\n",vis,"\n\n",request.POST['viss'],"\n\n")
    urls = request.POST['urls'].split(',')
    for i in range(len(urls)):
        urls[i] = settings.BASE_DIR+'/media'+urls[i].split('media')[1]

    out = []
    min_fs = 24000
    for url in urls:
        fs, data = wavfile.read(url)
        if fs < min_fs:
            min_fs = fs

    for url in urls:
        out += list(librosa.load(url, sr=min_fs)[0])

    filename = '_'.join(words)+"_"+timezone.now().strftime('%H-%M-%S')+".wav"
    out_path = 'media/prePreparedWords/trigrams/'+filename
    wavfile.write(settings.BASE_DIR+"/"+out_path, min_fs, np.asarray(out))
    duration = get_audio_length(settings.BASE_DIR+"/"+out_path)

    response_data = {
        'path': out_path,
        'duration': duration,
        'words': " ".join(words).strip(),
        'viss': vis,
    }
    # print("there")
    return JsonResponse(response_data)
