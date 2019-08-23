import ast
import subprocess
from pydub.playback import play
from pydub import AudioSegment
from scipy.io import wavfile 
import numpy as np
from PIL import Image
import cv2            
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt    
import os
import time
from matplotlib import cm
from matplotlib.colors import ListedColormap, LinearSegmentedColormap
import matplotlib.colors as mcolors

#from django.utils import timezone 

#To use this call 
# get_phone_full(path_to_wav_file, transcription, session_id)
# examles of the putput can be seen in the dan_test folder


#Initialises color maps for phone groups
c = mcolors.ColorConverter().to_rgb 
def init_cmaps():
    g1 = make_colormap([c('#e4f7d8'), c('#7cd93d'), 0.4, c('#7cd93d'), c('#3F751B'), 0.85, c('#3F751B')])
    g2 = make_colormap([c('#e4f7dc'), c('#78db52'), 0.4, c('#78db52'), c('#3f751b'), 0.85, c('#3f751b')])
    g3 = make_colormap([c('#eaf9da'), c('#9ae447'), 0.4, c('#9ae447'), c('#3f751b'), 0.85, c('#3f751b')])
    g4 = make_colormap([c('#e0f4d2'), c('#90c858'), 0.4, c('#90c858'), c('#3f751b'), 0.85, c('#3f751b')])
    g5 = make_colormap([c('#e4f3db'), c('#7ac54c'), 0.4, c('#7ac54c'), c('#3f751b'), 0.85, c('#3f751b')])
    g6 = make_colormap([c('#e6f9df'), c('#82e35f'), 0.4, c('#82e35f'), c('#3f751b'), 0.85, c('#3f751b')])
    g7 = make_colormap([c('#ebfbd9'), c('#9ceb43'), 0.4, c('#9ceb43'), c('#3f751b'), 0.85, c('#3f751b')])
    g8 = make_colormap([c('#e7f7dc'), c('#89D751'), 0.4, c('#89D751'), c('#3f751b'), 0.85, c('#3f751b')])
    return [g1,g2,g3,g4,g5,g6,g7,g8]

# Fucntion allows for the creation of custom color maps
def make_colormap(seq):
    seq = [(None,) * 3, 0.0] + list(seq) + [1.0, (None,) * 3]
    cdict = {'red': [], 'green': [], 'blue': []}
    for i, item in enumerate(seq):
        if isinstance(item, float):
            r1, g1, b1 = seq[i - 1]
            r2, g2, b2 = seq[i + 1]
            cdict['red'].append([item, r1, r2])
            cdict['green'].append([item, g1, g2])
            cdict['blue'].append([item, b1, b2])
    return mcolors.LinearSegmentedColormap('CustomMap', cdict)



#Initialises the dictionary of color maps associated with each phone
def init_color_dict():
    cols = init_cmaps()
    cmaps = {
		#Vowels
		'aa':cols[0],
		'er':cols[0],
		'ah':cols[0],
		'ax':cols[0],
		'ao':cols[0],
		'iy':cols[0],
		'ih':cols[0],
		'eh':cols[0],
		'ae':cols[0],
		'uw':cols[0],
		'uh':cols[0],
		'ow':cols[0],
		#Diphthongs
		'ay':cols[1],
		'oy':cols[1],
		'aw':cols[1],
		'ey':cols[1],
		#Semivowels
		'w':cols[2],
		'l':cols[2],
		'r':cols[2],
		'y':cols[2],
		#Nasals
		'm':cols[3],
		'n':cols[3],
		'nx':cols[3],
		#Stops
		'b':cols[4],
		'd':cols[4],
		'g':cols[4],
		'p':cols[4],
		't':cols[4],
		'k':cols[4],
		#Fricatives
		'v':cols[5],
		'dh':cols[5],
		'jh':cols[5],
		'z':cols[5],
		'zh':cols[5],
		'f':cols[5],
		'th':cols[5],
		's':cols[5],
		'sh':cols[5],
		#Affricatives
		'j':cols[6],
		'ch':cols[6],
		#Whisper
		'h':cols[7]
    }
    return cmaps

# Creates audio phile for each phone
def get_phone_audio_files(t1,t2,pho,audio):
    audio = audio[t1:t2]
    #fn = str(pho)+"_"+timezone.now().strftime( '%H-%M-%S' )+".wav"
    fn = str(pho)+"_"+str(time.time())+".wav"
    audio.export(fn,format="wav")
    return fn
                                                                   
#Creates audio file and claculates widths for each spectogram 
def get_synth_audio_phones(sid,wav_path):
    data = load_map(sid)
    
    #Works only for single words right now
    word = data['words'][0]
    start = word['start']*1000
    lent = word['end']*1000 - start

    begining = start
    files = []
    widths = []
    phos = []
    audio = AudioSegment.from_wav(wav_path)
    for pho in word['phones']:
        phone = pho['phone']
        phos.append(phone)
        st = begining
        end = (pho['duration']*1000)+st
        per = ((end-st)/lent)
        widths.append(per*18)
        files.append(get_phone_audio_files(st,end,phone,audio))
        begining = end

    return files,widths,phos


# Function does all the work
def get_phone_full(wav_path,trans,sid):
    sid = str(sid)	
    cmaps = init_color_dict()
    #Does allignment of transcription and synth audio file
    do_allignment(wav_path,trans,sid)
    #gets phone audio and widths for each spectogram
    files,widths,phos = get_synth_audio_phones(sid,wav_path)
    imgs = []
    tot = 0
    # Creates array of spectograms one for each phone and deletes the individual images
    for i in range(len(files)):
        fn = get_spectogram_portion(files[i],i,str(i)+".png",widths[i],phos[i],cmaps)
        img = Image.open(str(i)+".png")
        os.remove(fn)
        tot+=img.size[0]        
        imgs.append(img)
               
    #Appends all spectograms into a single image 
    result = Image.new("RGB", (tot,214))
    x = 0
    y = 0
    for img in imgs:
        w,h = img.size
        result.paste(img,(x,y,x+w,y+h))
        x = w+x 
    #Saves the complete spectogram
    result.save("temp.png")
    return


#Function loads the allignment json
def load_map(sid):
    f = open('map_{}.json'.format(sid),'r')
    f_str = ""
    for l in f:
        f_str+=l+" "
    f.close()
    return ast.literal_eval(f_str)

#Function does the allignment
def do_allignment(wav_path,trans,sid):
    tf = create_allignment_file(trans, sid)
    out = "../map_{}.json".format(sid)
    wd = "gentle-master/"
    com = "python3 align.py "+'../'+wav_path+" "+tf+" -o "+out
    p = subprocess.Popen(com.split(), cwd= wd)
    p.wait()
    return out
		
#Function writes trans to file one word to a line
def create_allignment_file(trans,sid):
    fp = get_allignment_file(sid)
    f = open(fp,"w+")
    for word in trans.split():
        f.write(word+"\n")
    f.close()
    return '../'+fp

# Return name of allignment file
def get_allignment_file(sid):
    return "error_"+sid+"allign.txt"    


# Function generates the section of spectogram relating to a particular phone
def get_spectogram_portion(wav_path,idx,filename,width,pho,cmaps):   
    samplingFrequency, signalData = wavfile.read(wav_path)                                            
    temp = []                                                                                         
    for i in range(len(signalData)):                                                                  
        if signalData[i] == 0:                                                                        
            continue                                                                                  
        else:                                                                                         
            temp.append(signalData[i])                                                                
    height = 3                                                                                                                                                                      
    fig = plt.figure(num=None, figsize=(width,height), dpi=80, facecolor='w', edgecolor='k')             
    ax = plt.subplot(111)                                                                             
    ax.specgram(temp,Fs=samplingFrequency,cmap=cmaps[pho.split("_")[0]])                                         
    ax.axis('off')                                                                                    
    plt.subplots_adjust(left=0, bottom=0, right=1, top=1, wspace=0, hspace=0)                         
    fig.tight_layout()                                                                                
    out = filename                                                                    
    plt.savefig(out, transparent= True, bbox_inches = 'tight', pad_inches = 0)  
    return out              


                                                                         
                         



