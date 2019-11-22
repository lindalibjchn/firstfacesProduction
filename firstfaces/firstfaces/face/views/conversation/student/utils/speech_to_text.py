import speech_recognition as sr
import ffmpeg
import os
from django.conf import settings
import subprocess


def convert_mp3_to_wav( input_url ):

    input_aud_loc = os.path.join(settings.BASE_DIR, input_url)
    output_rel = os.path.join(input_url[:-3] + 'wav')
    output_aud_loc = os.path.join(settings.BASE_DIR, input_url[:-3] + 'wav')
    ffmpeg.input(input_aud_loc).output(output_aud_loc).run()
    
    return output_rel


def get_speech_recognition(aud_file):

    # loads in the speech recognition package 
    r = sr.Recognizer()

    # convert from .webm to wav for Google's speech-to-text using a Python ffmpeg package
    input_aud_loc = os.path.join(settings.BASE_DIR, 'media', aud_file)
    output_aud_loc = os.path.join(settings.BASE_DIR, 'media', 'wav', aud_file[:-4] + 'wav')

    try:
        ffmpeg.input(input_aud_loc).output(output_aud_loc).run()
    except:
        print("FFMPEG Error")
        return {0: {'transcript': "", 'confidence': 1}}
    with sr.AudioFile(output_aud_loc) as source:
        audio_source = r.record(source)

    recog_output = r.recognize_google(audio_data=audio_source, show_all=True)
    # data returns in the format: 
    # recog_output: {
    #   'alternative: [{'transcript': '4 3 2 1', 'confidence': 0.83303463}, {'transcript': 'for 3 to 1'}, {'transcript': 'for 321'}, {'transcript': '4 321'}, {'transcript': '4321'}], 
    #   'final': True
    # }
    
    # only return the list of alternatives

    try: 
        output = recog_output['alternative'];
        print(output)
    except:
        output = {0: {'transcript': "", 'confidence': 1}}
    if output[0]['transcript'].strip() == '':
        return {0: {'transcript': "", 'confidence': 1}}
    return output


## commented below out as Daniel will be using his own code for this part

# def create_transcription_files(trans, subm):
    # with open(os.path.join(settings.BASE_DIR,'face/text_files/hyp.trn'), 'w') as hyp:
        # hyp.write(trans + " (aaa_001)\n")
    # with open(os.path.join(settings.BASE_DIR,'face/text_files/ref.trn'), 'w') as ref:
        # ref.write(subm + " (aaa_001)\n")
    # subprocess.run([os.path.join(settings.BASE_DIR, 'face/SCTK/bin/sclite'), '-r', os.path.join(settings.BASE_DIR, 'face/text_files/ref.trn'), '-h', os.path.join(settings.BASE_DIR, 'face/text_files/hyp.trn'), '-i', 'rm', '-f', '0', '-o', 'pra'])
    # #n = !./SCTK/bin/sclite -r ref.trn -h hyp.trn -i rm -f 2 -o all

# def read_transcription_file():
    # with open(os.path.join(settings.BASE_DIR,'face/text_files/hyp.trn.pra'), 'r') as pra:
        # transcriptions = pra.readlines()
    # asr = transcriptions[13][6:]
    # sent = transcriptions[12][6:]
    # labels = transcriptions[14][6:].replace('I', 'd').replace('D', 'i').upper()
    # return [asr, sent, labels]

# def get_alignments(transcriptions):
    # #transcriptions is a list of strings - transcriptions from ASR

    # aligned_transcriptions = [transcriptions[0]]

    # print('aligned_transcriptions:', aligned_transcriptions)

    # if len(transcriptions) > 1:
    
        # for t in transcriptions[1:]:

            # #print('transcriptions[0]:', transcriptions[0])
            # #print('t', t)
            # create_transcription_files(transcriptions[0], t)
            # aligned = read_transcription_file()
            # aligned_transcriptions.append(aligned)

    # return aligned_transcriptions











