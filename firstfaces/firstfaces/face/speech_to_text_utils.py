import speech_recognition as sr
import ffmpeg
import os
from django.conf import settings

def get_speech_recognition( aud_file ):

    r = sr.Recognizer()

    input_aud_loc = os.path.join(settings.BASE_DIR, 'media', aud_file)
    output_aud_loc = os.path.join(settings.BASE_DIR, 'media', 'wav', aud_file[:-4] + 'wav')

    ffmpeg.input(input_aud_loc).output(output_aud_loc).run()

    with sr.AudioFile(output_aud_loc) as source:
        audio_source = r.record(source)

    recog_output = r.recognize_google(audio_data=audio_source, show_all=True)
    
    all_alts = []
    for i, alt in enumerate(recog_output['alternative']):
        if i < 5:
            all_alts.append(alt['transcript']) 

    print('all_alts:', all_alts)

    return all_alts

def create_transcription_files(trans, subm):
    with open('hyp.trn', 'w') as hyp:
        hyp.write(trans + " (aaa_001)\n")
    with open('ref.trn', 'w') as ref:
        ref.write(subm + " (aaa_001)\n")
    n = !./SCTK/bin/sclite -r ref.trn -h hyp.trn -i rm -f 2 -o all

def read_transcription_file():
    with open('hyp.trn.pra', 'r') as pra:
        transcriptions = pra.readlines()
    asr = transcriptions[13][6:]
    sent = transcriptions[12][6:]
    labels = transcriptions[14][6:].replace('I', 'd').replace('D', 'i').upper()
    return asr + sent + labels
