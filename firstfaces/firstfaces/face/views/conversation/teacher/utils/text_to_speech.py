from google.cloud import texttospeech
from nltk.tokenize import sent_tokenize
from face.views.conversation.student.utils.store_sentence import change_sentence_to_list_n_add_data
from face.views.conversation.all.modify_data import jsonify_or_none
import os
from django.conf import settings
import time
import json
from face.models import StockPhrases, Prompt
from suds.client import Client
import urllib
# import ffmpeg

if settings.DEVELOPMENT_ENV == 'john':
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/johnsHDD/PhD/2018_autumn/erle-3666ad7eec71.json"
elif settings.DEVELOPMENT_ENV == 'dan':
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/daniel/Desktop/Tia/erle-3666ad7eec71.json"
else:
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/firstfaces/erle-3666ad7eec71.json"

def create_stock_instance( texts, initial_delay=0, breathing=False, speaking_rate=100, pitch='+0', volume='+0'):

    # texts = [ 'this is a...', 'second here is..', ...]

    name = texts[0].replace(' ', '_')
    s = StockPhrases(name=name, texts=json.dumps(texts))
    urls = []
    visemes = []
    for i, t in enumerate(texts):
        url, viseme_list = create_tia_tts_url(t, 'prePreparedTiaPhrases/stockPhrases/', name + '_0' + str(i), initial_delay, breathing, speaking_rate, pitch, volume)
        urls.append(url)
        visemes.append(viseme_list)
    s.urls = json.dumps(urls)
    s.visemes = json.dumps(visemes)
    s.save()
    return s


def create_prompt_instance( text, prompt_number, initial_delay=0, breathing=False, speaking_rate=100, pitch='+0', volume='+0' ):

    name = text.replace(' ', '_')
    p = Prompt(name=name, level=prompt_number)
    
    url, visemes = create_tia_tts_url(text, 'prePreparedTiaPhrases/prompt' + str(prompt_number) + '/', name, initial_delay, breathing, speaking_rate, pitch, volume)
    p.url = url

    p.visemes = json.dumps(visemes)
    p.save()
    
    return p

# def create_tia_speak_sentence_URL_and_visemes(text, directory, filename, initial_delay, speaking_rate, pitch, volume):

    # # list_of_text_to_speak = get_text(jsonify_or_none(sent.sentence), sent.judgement, jsonify_or_none(sent.prompt), jsonify_or_none(sent.indexes))
    # # for i, s in enumerate(list_of_text_to_speak):

    # URL = create_tia_tts_url( text, directory, filename, initial_delay, speaking_rate, pitch, volume)
    # # sent_data = change_sentence_to_list_n_add_data( text )
    
    # # concatenate separate viseme lists
    # visemes = []
    # for s_d in sent_data:
        # for vis in s_d[2]:
            # visemes.append(vis)
    
    # return [URL, visemes]

def create_tia_tts_url(text, directory, filename, initial_delay, breathing, speaking_rate, pitch, volume ):

    breath = "";
    print('breathing:', breathing)
    if breathing:
        print('add breath')
        breath = "<spurt audio='g0001_007'>breath in</spurt>"

    ssml_text = "<s><break time='" + str(initial_delay) + "ms'/>" + breath + "<prosody rate='" + str(speaking_rate) + "%' pitch='" + pitch + "%' volume='" + volume + "db' >" + text + "</prosody></s>"

    accountID = '5dea1f13b1519'
    password = 'wg3BbQ53cP'
    soapclient = Client("https://cerevoice.com/soap/soap_1_1.php?WSDL")
    request = soapclient.service.speakExtended(accountID, password, 'Caitlin-CereWave', ssml_text, 'wav', 22050, False, True)
    viseme_data = get_viseme_data(request.metadataUrl)
    print('viseme_data:', viseme_data)
    print('request:', request)

    return request.fileUrl, viseme_data

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

def get_viseme_data(metadataUrl):
    xml = get_xml_from_url(metadataUrl)
    parsed_xml = parse_xml(xml)
    return parsed_xml

def get_xml_from_url(metadataUrl):
    data = []
    with urllib.request.urlopen(metadataUrl) as response:
        data = [line.decode('utf-8') for line in response]
    return data

def parse_xml(xml):
    rel = [l for l in xml if "<phone" in l]
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


