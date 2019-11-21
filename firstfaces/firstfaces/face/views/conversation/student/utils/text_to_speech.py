from google.cloud import texttospeech
import os
from django.conf import settings

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
        # print('rsynthURL:', synthURL)
        with open( os.path.join(settings.BASE_DIR, synthURL ), 'wb') as out:
            out.write(response.audio_content)
    except:
        synthURL = 'fault'







