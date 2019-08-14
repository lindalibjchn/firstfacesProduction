import ast
import subprocess
from pydub.playback import play
from pydub import AudioSegment
#from django.utils import timezone 


def get_phone_audio_files(t1,t2,pho,audio):
    audio = audio[t1:t2]
    #fn = str(pho)+"_"+timezone.now().strftime( '%H-%M-%S' )+".wav"
    fn = str(pho)+".wav"
    audio.export(fn,format="wav")
    return fn
                                                                   

def get_synth_audio_phones(sid,wav_path):
    #data = load_json(sid)

    f = open('map.json','r')
    f_str = ""
    for l in f:
        f_str+=l+" "
    f.close()
    fa = ast.literal_eval(f_str)

    word = fa['words'][0]
    start = word['start']*1000
    lent = word['end']*1000 - start

    begining = start
    files = []
    audio = AudioSegment.from_wav(wav_path)
    for pho in word['phones']:
        phone = pho['phone']
        st = begining
        end = (pho['duration']*1000)+st
        per = ((end-st)/lent)
        files.append(get_phone_audio_files(st,end,phone,audio))
        begining = end

    return files

get_synth_audio_phones("1","audio.wav")

def do_allignment(wav_path,):
    

def create_allignment_file(trans,sid):
    f = open(get_allignment_file(sid),"r+")
    for word in trans.split():
        f.write(word+"\n")
    f.close()
    return get_allignment_file(sid)

def get_allignment_file(sid):
    return "error_"+sid+"allign.txt"    

