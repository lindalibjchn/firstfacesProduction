from google.cloud import texttospeech
from nltk.tokenize import sent_tokenize
from face.views.conversation.student.utils.store_sentence import change_sentence_to_list_n_add_data
from face.views.conversation.all.modify_data import jsonify_or_none
import os
from django.conf import settings
import time
import json

if settings.DEVELOPMENT_ENV == 'john':
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/johnsHDD/PhD/2018_autumn/erle-3666ad7eec71.json"
elif settings.DEVELOPMENT_ENV == 'dan':
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/daniel/Desktop/Tia/erle-3666ad7eec71.json"
else:
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/john/firstfaces/erle-3666ad7eec71.json"

def create_tia_speak_sentence_URL_and_visemes(sent, conv_id):

    # list_of_text_to_speak = get_text(jsonify_or_none(sent.sentence), sent.judgement, jsonify_or_none(sent.prompt), jsonify_or_none(sent.indexes))
    # for i, s in enumerate(list_of_text_to_speak):

    URL = get_tia_tts(sent.sentence, conv_id, sent.id)
    sent_data = change_sentence_to_list_n_add_data(sent.sentence)
    
    # concatenate separate viseme lists
    visemes = []
    for s_d in sent_data:
        for vis in s_d[2]:
            single_viseme_list.append(vis)
    
    return [URL, visemes]

def get_tia_tts(text, conv_id, sent_id):

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
        synthURL = 'media/synths/conv_' + str(conv_id) + '_' + str(sent_id) + '.wav' # + '_' + str(int(time.mktime((timezone.now()).timetuple())))
        fullURL = os.path.join(settings.BASE_DIR, synthURL)
        with open( fullURL, 'wb') as out:
            out.write(response.audio_content)
    except:
        synthURL = 'fault'

    return synthURL


def get_text(sentence, judgement, prompt, indexes):

    if judgement == "P":

        tia_to_say = prompt

    elif judgement == "M":

        unsure_strings = " "
        reduced_indexes = reduce_indexes(indexes)

        for i in range(len(reduced_indexes)):
            if i != 0:
                unsure_strings += " or "
            unsure_word_list = []
            for j in reduced_indexes[i]:
                unsure_word_list.append(sentence[j][0])
            unsure_strings += "'" + ' '.join(unsure_word_list) + "'"

        tia_to_say = ["I'm not sure what you mean by" + unsure_strings + ", could you try again?"]

        # if there are additional prompts
        if prompt is not None:
            tia_to_say += prompt

    elif judgement == "B":

        reduced_indexes = reduce_indexes(indexes)
        better_bit = " ".join([sentence[k][0] for k in reduced_indexes[0]])

        tia_to_say = ["It would be more natural to say '" + prompt[ 0 ] + "', instead of '" + better_bit + "'"]

        # if there are additional prompts
        if len(prompt) > len(reduced_indexes):
            remaining_prompts = prompt[len(reduced_indexes):]
            tia_to_say += remaining_prompts

    return tia_to_say

def reduce_indexes(ind):
    reduced_inds = []
    for i in ind:
        reduced_inds.append([int((j-1)/2) for j in i if j%2!=0])
    return reduced_inds

