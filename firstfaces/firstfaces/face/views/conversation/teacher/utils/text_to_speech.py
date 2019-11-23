from google.cloud import texttospeech
from nltk.tokenize import sent_tokenize
from face.views.conversation.student.utils.store_sentence import change_sentence_to_list_n_add_data
from face.views.conversation.all.modify_data import jsonify_or_none
import os
from django.conf import settings
import time
import json
from face.models import StockPhrases, Prompt0, Prompt1, Prompt2

if settings.DEVELOPMENT_ENV == 'john':
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/johnsHDD/PhD/2018_autumn/erle-3666ad7eec71.json"
elif settings.DEVELOPMENT_ENV == 'dan':
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/daniel/Desktop/Tia/erle-3666ad7eec71.json"
else:
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/firstfaces/erle-3666ad7eec71.json"

def create_stock_instance( texts ):

    # texts = [ 'this is a...', 'second here is..', ...]

    name = texts[0].replace(' ', '_')
    s = StockPhrases(name=name, texts=texts)
    urls = []
    visemes = []
    for t in texts:
        url, visemes = create_tia_speak_sentence_URL_and_visemes(t, 'prePreparedTiaPhrases/stockPhrases/', name)
        urls.append(url)
        visemes.append(visemes)
    s.urls = urls
    s.visemes = visemes
    s.save()
    return s


def create_prompt_instance( text, sentence, prompt_number ):

    name = text.replace(' ', '_')
    if prompt_number == 0:
        p = Prompt0(name=name, sentence=sentence, text=text)
    if prompt_number == 1:
        p = Prompt1(name=name)
    if prompt_number == 2:
        p = Prompt2(name=name)
    
    url, visemes = create_tia_speak_sentence_URL_and_visemes(text, 'prePreparedTiaPhrases/prompt0/', name)
    p.url = url
    p.visemes = visemes
    p.save()
    
    return p

def create_tia_speak_sentence_URL_and_visemes(text, directory, filename):

    # list_of_text_to_speak = get_text(jsonify_or_none(sent.sentence), sent.judgement, jsonify_or_none(sent.prompt), jsonify_or_none(sent.indexes))
    # for i, s in enumerate(list_of_text_to_speak):

    directory = 'synths/'

    URL = create_tia_tts_url( text, directory, filename )
    sent_data = change_sentence_to_list_n_add_data( text )
    
    # concatenate separate viseme lists
    visemes = []
    for s_d in sent_data:
        for vis in s_d[2]:
            visemes.append(vis)
    
    return [URL, visemes]

def create_tia_tts_url(text, directory, filename):

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
        pitch = 1,
        speaking_rate = 0.7,
        )

    fullURL = ''
    try:
        response = client.synthesize_speech(input_text, voice, audio_config)

        # don't need to keep all synths for class. Remember to delete this when session ends.
        synthURL = 'media/' + directory + filename + '.wav' # + '_' + str(int(time.mktime((timezone.now()).timetuple())))
        fullURL = os.path.join(settings.BASE_DIR, synthURL)
        with open( fullURL, 'wb') as out:
            out.write(response.audio_content)
    except:
        synthURL = 'fault'

    return synthURL


