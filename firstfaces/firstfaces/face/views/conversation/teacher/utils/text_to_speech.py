#from google.cloud import texttospeech
from nltk.tokenize import sent_tokenize
from face.views.conversation.student.utils.store_sentence import change_sentence_to_list_n_add_data
from face.views.conversation.all.modify_data import jsonify_or_none
import os
from django.conf import settings
import time
import json
from face.models import StockPhrases, Prompt, StockWord
from suds.client import Client
import urllib
import glob
import random
import re
# import ffmpeg

if settings.DEVELOPMENT_ENV == 'john':
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/johnsHDD/PhD/2018_autumn/erle-3666ad7eec71.json"
elif settings.DEVELOPMENT_ENV == 'dan':
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/daniel/Desktop/Tia/erle-3666ad7eec71.json"
else:
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/firstfaces/erle-3666ad7eec71.json"


saved_audios = [v.split("/")[-1][:-4] for v in glob.glob(settings.BASE_DIR+'/media/prePreparedWords/audio/*.wav')]

def create_word_audio(word, gesture=None, initial_delay=500, breathing=False, speaking_rate=100, pitch='+0', volume='+0', emotion=''):
    name = word
    s = StockWord(name=name, texts=json.dumps(word))
    urls = []
    visemes = []
    ssml = "<voice emotion='" + emotion + "'>" + word + "</voice>"
# def create_tia_tts_url(first_word, gesture, text, directory, filename, initial_delay, breathing, speaking_rate, pitch, volume ):
    url, viseme_list = create_tia_tts_url(word, gesture, ssml, 'prePreparedWords/audio/', name, initial_delay, breathing, speaking_rate, pitch, volume )
    urls.append(url)
    visemes.append(viseme_list)
    s.urls = json.dumps(urls)
    s.visemes = json.dumps(visemes)
    s.save()
    return s

vocal_gesture_dict = {
    'haha': ['g0001_021', 'g0001_022', 'g0001_023', 'g0001_024'],
    'umm': ['g0001_015', 'g0001_016'],
    'err': ['g0001_017', 'g0001_018'],
    'hehe': ['g0001_019', 'g0001_020'],
    'argh': ['g0001_032', 'g0001_033'],
    'hmm': ['g0001_014'],
    'gasp': ['g0001_052'],
}

unwanted_punctuation = [',', '.', '!', '?']

def create_vocal_gesture( gesture_text ):

    return "<spurt audio='" + random.choice(vocal_gesture_dict[gesture_text]) + "'>laugh</spurt> "


def create_stock_instance( texts, initial_delay=500, breathing=False, speaking_rate=100, pitch='+0', volume='+0', emotion=''):

    # texts = [ 'this is a...', 'second here is..', ...]

    name = texts[0].replace(' ', '_').replace('?', '')
    s = StockPhrases(name=name, texts=json.dumps(texts))
    urls = []
    visemes = []
    for i, t in enumerate(texts):
        text_without_punctuation = ''.join(c for c in t if c not in unwanted_punctuation)
        print('text_without_punctuation:', text_without_punctuation)
        split_t = text_without_punctuation.split()
        first_word = split_t[0]
        gesture = None
        if first_word in [*vocal_gesture_dict]:
            gesture = first_word
            t = create_vocal_gesture( first_word ) + "<break time='1000ms'/>" + " ".join(split_t[1:])
            first_word = split_t[1]
        ssml = "<voice emotion='" + emotion + "'>" + t + "</voice>"
        url, viseme_list = create_tia_tts_url(first_word, gesture, ssml, 'prePreparedTiaPhrases/stockPhrases/', name + '_0' + str(i), initial_delay, breathing, speaking_rate, pitch, volume)
        urls.append(url)
        visemes.append(viseme_list)
    s.urls = json.dumps(urls)
    s.visemes = json.dumps(visemes)
    s.save()
    return s


def create_prompt_instance( text, prompt_number, initial_delay=500, breathing=False, speaking_rate=100, pitch='+0', volume='+0', emotion='' ):

    text_without_punctuation = ''.join(c for c in t if c not in unwanted_punctuation)
    second_word_on = text_without_punctuation
    split_t = text.split()
    first_word = split_t[0]
    gesture = None
    if first_word in [*vocal_gesture_dict]:
        second_word_on = " ".join(split_t[1:])
        gesture = first_word
        t = create_vocal_gesture( first_word ) + "<break time='1000ms'/>" + second_word_on
        first_word = split_t[1]

    name = second_word_on.replace(' ', '_').replace('?', '')
    p = Prompt(name=name, level=prompt_number)
    print('name:', name)
    
    ssml = "<voice emotion='" + emotion + "'>" + t + "</voice>"
    url, visemes = create_tia_tts_url(first_word, gesture, ssml, 'prePreparedTiaPhrases/prompt' + str(prompt_number) + '/', name, initial_delay, breathing, speaking_rate, pitch, volume)
    p.url = url

    p.visemes = json.dumps(visemes)
    p.save()
    
    return p

viseme_gesture_dict = {
    'haha': [{"name": "haha", "start": 800, "end": 800, "Viseme": "happy", "stress": "0"}, {"name": "haha", "start": 0, "end": 0, "Viseme": "happy", "stress": "0"}],
    'umm': [{"name": "umm", "start": 1000, "end": 1000, "Viseme": "b", "stress": "0"}, {"name": "laugh", "umm": 0, "end": 0, "Viseme": "b", "stress": "0"}],
    'err': [{"name": "err", "start": 800, "end": 800, "Viseme": "r", "stress": "0"}, {"name": "laugh", "err": 0, "end": 0, "Viseme": "r", "stress": "0"}],
    'hehe': [{"name": "hehe", "start": 800, "end": 800, "Viseme": "happy", "stress": "0"}, {"name": "hehe", "start": 0, "end": 0, "Viseme": "happy", "stress": "0"}],
    'argh': [{"name": "argh", "start": 800, "end": 800, "Viseme": "disgust", "stress": "0"}, {"name": "argh", "start": 0, "end": 0, "Viseme": "disgust", "stress": "0"}],
    'hmm': [{"name": "hmm", "start": 800, "end": 800, "Viseme": "b", "stress": "0"}, {"name": "hmm", "start": 0, "end": 0, "Viseme": "b", "stress": "0"}],
    'gasp': [{"name": "gasp", "start": 800, "end": 800, "Viseme": "surprise", "stress": "0"}, {"name": "gasp", "start": 0, "end": 0, "Viseme": "surprise", "stress": "0"}],
}

accountID = '5dea1f13b1519'
password = 'wg3BbQ53cP'
soapclient = Client("https://cerevoice.com/soap/soap_1_1.php?WSDL")

def create_tia_tts_url(first_word, gesture, text, directory, filename, initial_delay, breathing, speaking_rate, pitch, volume ):

    breath = "";
    # print('breathing:', breathing)
    if breathing:
        print('add breath')
        breath = "<spurt audio='g0001_007'>breath in</spurt>"

    ssml_text = "<s><break time='" + str(initial_delay) + "ms'/>" + breath + "<prosody rate='" + str(speaking_rate) + "%' pitch='" + pitch + "%' volume='" + volume + "db' >" + text + "</prosody></s>"

    request = soapclient.service.speakExtended(accountID, password, 'Caitlin-CereWave', ssml_text, 'wav', 22050, False, True)
    viseme_data = get_viseme_data(first_word, request.metadataUrl)
    print('viseme_data:', viseme_data)
    print('request:', request)
    print('first_word:', first_word)
    if gesture != None:
        first_two_visemes = viseme_gesture_dict[gesture]
        first_two_visemes[1]['start'] = viseme_data[1]["end"] - 600
        first_two_visemes[1]['end'] = viseme_data[1]["end"] - 600
        viseme_data = first_two_visemes + viseme_data

    url = create_url( request.fileUrl, directory, filename )

    return url, viseme_data

def create_url(url, directory, name):

    with urllib.request.urlopen(url) as response:
        with open(settings.BASE_DIR + '/media/' + directory + name + '.wav', 'wb') as output:
            output.write(response.read())

    return directory + name + '.wav'


dic = {
    '0': "SIL",
    '1': 'e',
    '2': 'e',
    '3': 'e',
    '4': 'e',
    '5': 'r',
    '6': 'e',
    '7': 'u',
    '8': 'e',
    '9': 'e',
    '10': 'e',
    '11': 'e',
    '12': 'e',
    '13': 'r',
    '14': 'l',
    '15': 's',
    '16': 's',
    '17': 'th',
    '18': 'f',
    '19': 't',
    '20': 'k',
    '21': 'b',
    "w":"w"
}

def get_viseme_data(first_word, metadataUrl):
    xml = get_xml_from_url(metadataUrl)
    parsed_xml = parse_xml(first_word, xml)
    return parsed_xml

def get_xml_from_url(metadataUrl):
    data = []
    with urllib.request.urlopen(metadataUrl) as response:
        data = [line.decode('utf-8') for line in response]
    return data

def parse_xml(first_word, xml):

    rid_of_unwanted_beginning = []
    after_first_word = False
    for line in xml:
        if after_first_word:
            rid_of_unwanted_beginning.append(line)
        else:
            if '<word name="' + first_word.lower() + '"' in line:
                after_first_word = True

    # print('rid_of_unwanted_beginning:', rid_of_unwanted_beginning)

    rel = [l for l in rid_of_unwanted_beginning if "<phone" in l]
    out = []
    for r in rel:
        temp = {}
        for w in r[6:-3].split():
            s = w.split("=")
            name = ""
            if s[0] not in ['disney_viseme', 'sapi_viseme']:
                if s[0] == 'name':
                    name = s[1][1:-1]
                if s[0] in ['start','end']:
                    temp[s[0]] = round(float(s[1][1:-1])*1000)
                else:
                    temp[s[0]] = s[1][1:-1]
            if s[0] == 'sapi_viseme':
                if name == 'w':
                    code = 'w'
                else:
                    code = s[1][1:-1]
                try:
                    temp['Viseme'] = dic[code]
                except:
                    temp['Viseme'] = dic['0']
        if temp['Viseme'] != "SIL":
            out.append(temp)
    return out


