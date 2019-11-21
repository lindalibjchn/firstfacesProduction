import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from scipy import signal
from scipy.io import wavfile
import ffmpeg
import os
from django.conf import settings
import subprocess
import json
from pydub.playback import play
from pydub import AudioSegment
from gtts import gTTS
import ast

#Gets path for spectograms to be saved
def get_praat_path():
    return os.path.join(settings.BASE_DIR, 'media',"images")+"/"

#Generates relative paths for spectograms
def get_rel_praat_paths():
    base = "media/images/"
    return base+"ref.png", base+"hyp.png"

#No longer used but geneates spectograms
def get_praat_image(wav_path,code,att):
    # print('wav path:', wav_path)
    samplingFrequency, signalData = wavfile.read(wav_path)
    temp = []
    for i in range(len(signalData)):
        if signalData[i] == 0:
            continue
        else:
            temp.append(signalData[i])
    fig = plt.figure(num=None, figsize=(18,3), dpi=80, facecolor='w', edgecolor='k')
    ax = plt.subplot(111)
    if code == 0: #Hyp
        ax.specgram(temp,Fs=samplingFrequency,cmap='OrRd')
    elif code ==1: # Ref
        ax.specgram(temp,Fs=samplingFrequency,cmap='YlGn')
    elif code == 2: #correct att
        ax.specgram(temp,Fs=samplingFrequency,cmap='YlGn')
    elif code == 3: #incorrect att
        ax.specgram(temp,Fs=samplingFrequency,cmap='OrRd')
    ax.axis('off')
    plt.subplots_adjust(left=0, bottom=0, right=1, top=1, wspace=0, hspace=0)
    fig.tight_layout()
    if code == 0:
        plt.savefig(get_praat_path()+"hyp.png", transparent = True, bbox_inches = 'tight', pad_inches = 0)
    elif code == 1:
        plt.savefig(get_praat_path()+"ref.png", transparent = True, bbox_inches = 'tight', pad_inches = 0)
    else:
        plt.savefig(get_praat_path()+"att_"+str(att)+".png", transparent = True, bbox_inches = 'tight',pad_inches = 0)

#returns path to file
def convert_audio(filename):
    output_aud_loc = os.path.join(settings.BASE_DIR, 'media', 'wav', filename[:-4] + 'wav')
    return output_aud_loc

#Gets error audio path
def get_error_audio_path(filename):
    return os.path.join(settings.BASE_DIR, 'media', 'wav', filename)

#Gets relative path for file
def ref_path(fn):
    return "media/wav/"+fn

#Returns pth to allign file
def get_text_path(sid):
    path = os.path.join(settings.BASE_DIR, 'face', 'text_files','allign_'+str(sid)+'.txt')
    return path

#Returns path to map file
def get_out_path(sid):
    path = os.path.join(settings.BASE_DIR, 'face', 'text_files','map_'+str(sid)+'.json')
    # print('path:', path)
    return path

# UNUSED but returns path to where Aeneas force alligner 
def get_aeneas_path():
    path = os.path.join(settings.BASE_DIR, 'face', 'aeneas')
    return path+"/"

# Fucntion opens and loads json from map file
def load_json(sid):
    f = open( get_out_path(sid), 'r')
    out_str = ''
    for i in f:
        out_str += i + " "
    data = ast.literal_eval( out_str )
    return data

# Fucntion gets the begining and ending timestamps for a word or series of words
def get_timestamps(startIDX,endIDX,sid):
    data = load_json(sid)
    # print("\n\n",startIDX," ",endIDX,"\n\n\n")
    start = float(data['words'][startIDX]['start'])
    end = float(data['words'][endIDX]['end'])
    return start*1000,end*1000

# Function gets the audio between the provided timestamps and saves it
def play_errored_text(wav_path,timestamp,filename):
    t1 = timestamp[0]
    t2 = timestamp[1]
    newAudio = AudioSegment.from_wav(wav_path)
    newAudio = newAudio[t1:t2]
    path = get_error_audio_path(filename)
    newAudio.export(path, format="wav")
    return path
    

#Function plays audio UNUSED
def play_audio(wav_path):
    sound = AudioSegment.from_file(path, format="wav")
    play(sound)

#Gets paths to a sythn audio
def get_synth_path(filename):
    return os.path.join(settings.BASE_DIR, 'media', 'synths', filename)

# Gets relative path to attempt audio
def get_hyp_audio_path(fn):
    return "media/synths/"+fn[:-3]+'wav'

#UNUSED gets synth audio
def generate_synth_audio(text,filename):
    tts = gTTS(text=text, lang='en')
    tts.save(get_synth_path(filename[:-4]+'.mp3'))
    output_aud_loc = os.path.join(settings.BASE_DIR, 'media', 'synths', filename[:-3] + 'wav')
    ffmpeg.input(get_synth_path(filename[:-4]+".mp3")).output(output_aud_loc).run()
    return output_aud_loc

#Gtes the lenght in milliseconds for a audio file
def get_audio_length(wav_path):
    samplingFrequency, signalData = wavfile.read(wav_path)
    return int((len(signalData)/samplingFrequency)*1000)
