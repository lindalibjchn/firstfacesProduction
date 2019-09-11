from google.cloud import texttospeech
from nltk.tokenize import sent_tokenize
from .sentence import change_sentence_to_list_n_add_data
import os
from django.conf import settings
import time
import json

def create_tia_speak_sentences_synthesis_data(text, sess_id, sent):

    sentences = sent_tokenize(text)

    for_prompt = {
        'URLs': [],
        'texts': [],
        'phones': []
    }
    
    start_time = time.time()
    for i, s in enumerate(sentences):

        for_prompt['URLs'].append(get_tia_tts(s, sess_id, i))
        for_prompt['texts'].append(s)
        sent_data = change_sentence_to_list_n_add_data(s)
        
        # concatenate separate viseme lists
        single_viseme_list = []
        for s_d in sent_data:
            for vis in s_d[2]:
                single_viseme_list.append(vis)
        
        for_prompt['phones'].append(single_viseme_list)
    # print('tts:', time.time() - start_time)
    sent.for_prompt = json.dumps(for_prompt)
    sent.save()


def get_tia_tts(text, sess_id, sent_no):

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

        print('response:', response)
        # don't need to keep all synths for class. Remember to delete this when session ends.
        synthURL = 'media/synths/sess_' + str(sess_id) + '_' + str(sent_no) + '.wav' # + '_' + str(int(time.mktime((timezone.now()).timetuple())))
        print('synthURL:', synthURL)
        fullURL = os.path.join(settings.BASE_DIR, synthURL)
        print('fullURL:', fullURL)
        with open( fullURL, 'wb') as out:
            print('writing file')
            out.write(response.audio_content)
            print('file written')
    except:
        synthURL = 'fault'

    return synthURL


def get_text(sentence, judgement, prompt, indexes):

    if judgement == "P":

        tia_to_say = prompt

    elif judgement == "M":

        unsure_strings = " "

        for i in range(len(indexes)):
            if i != 0:
                unsure_strings += " or "
            unsure_word_list = []
            for j in indexes[i]:
                unsure_word_list.append(sentence[j])
            unsure_strings += "'" + ''.join(unsure_word_list) + "'"

        tia_to_say = "I'm not sure what you mean by" + unsure_strings + ". Could you rephrase that?"

    elif judgement == "B":

        better_bit = "".join([sentence[k] for k in indexes[0]])

        tia_to_say = "It would be more natural to say '" + prompt + "', instead of '" + better_bit + "'"

    return tia_to_say


def create_hello_wav( u_name ):

    speaking_voice = 'en-GB-Wavenet-C'

    client = texttospeech.TextToSpeechClient()
    input_text = texttospeech.types.SynthesisInput(text='hello ' + u_name)

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

    try:
        response = client.synthesize_speech(input_text, voice, audio_config)

        # don't need to keep all synths for class. Remember to delete this when session ends.
        synthURL = 'media/prePreparedTiaPhrases/greetings/' + u_name + '.wav'
        print('rsynthURL:', synthURL)
        with open( os.path.join(settings.BASE_DIR, synthURL ), 'wb') as out:
            out.write(response.audio_content)
    except:
        synthURL = 'fault'







