import numpy as np
import matplotlib
matplotlib.use('Agg')
import pandas as pd
import time
import tabulate as tb
import os
import itertools
import collections
import matplotlib.pyplot as plt
from matplotlib.pyplot import figure
import ast
import math
from g2p_en import G2p
import wave
import contextlib
from scipy.io import wavfile
from django.conf import settings 
from PIL import Image
import cv2
from pydub import AudioSegment
from pydub.playback import play

sim_path = settings.BASE_DIR+"/face/text_files/pho_diffs.csv"
dict_path = settings.BASE_DIR+"/face/text_files/cmudict.txt"


similarities = pd.read_csv(sim_path, index_col=0)

idc = 0.8

############# Below This is Emmas Code to work out phonetic similarity #############

def compare(string1, string2):
    r = string1
    h = string2


    d = np.zeros((len(r)+1)*(len(h)+1), dtype=float)
    d = d.reshape((len(r)+1, len(h)+1))

    e = np.zeros((len(r)+1)*(len(h)+1), dtype=object)
    e = e.reshape((len(r)+1, len(h)+1))


    for i in range(len(r)+1):
        for j in range(len(h)+1):
            if i == 0:
                if j == 0:
                    d[0][0] = 0
                    e[0][j] = (0,0,0)
                else:
                    d[i][j] = d[i][j-1] + idc
                    e[0][j] = (0,0,1)
            elif j == 0:
                if i == 0:
                    e[i][0] = (0,0,0)
                else:
                    d[i][j] = d[i-1][j] + idc
                    e[i][0] = (1,0,0)

    for i in range(1, len(r)+1):
        for j in range(1, len(h)+1):
            if r[i-1] == h[j-1]:
                d[i][j] = d[i-1][j-1]
                e[i][j] = (0, 1, 0)                
            else:
                #some random extra stuff in here that doesn't get used - could clean up but works as is
                sub = ((d[i-1][j-1] + (score(r[i-1], h[j-1]))) , (str(e[i-1][j-1]) + 'substitution ' + str(j-1) + ', '))
                dell = (d[i-1][j] +idc, (str(e[i][j-1]) + 'deletion ' + str(j-1) + ' ,'))
                if j >= len(h):
                    ins = (d[i][j-1] +idc, (str(e[i-1][j]) + 'insertion ' + str(j) + ' ,'))
                else:
                    ins = (d[i][j-1] +idc, (str(e[i-1][j]) + 'insertion ' + str(j) + ' ,'))
                d[i][j] = min(sub, ins, dell)[0]
                e[i][j] = (dell[0]==d[i][j], sub[0]==d[i][j], ins[0]==d[i][j]) * 1    
    return d, e
    #return d[len(r)][len(h)]

#No idea what this bit was trying to do...
'''

    for i in (f[len(r)][len(h)]):
        #h[int(i)] = '<boundary duration="100"/> \n<t accent="H*">' + h[int(i)] + '</t> <boundary duration="100"/> \n'
        h[int(i)] = h[int(i)] , d[len(r)][len(h)] , e[len(r)][len(h)], f[len(r)][len(h)], 
    return (h)

'''

#scoring fuction for the cost of a substitution
def score(l1, l2):

    sim_score = similarities[str(l1)][str(l2)]
     
    if sim_score == 0:
        
        # print('sim_score = 0')
        sim_score = 0.079
    
    return sim_score
    
    
    
#Rest of the code taken from the internet - uses the backtrace to find 
#the optimum path and displays a nice alignment
#https://giov.dev/2016/01/minimum-edit-distance-in-python.html

def naive_backtrace(B_matrix):

    i, j = B_matrix.shape[0]-1, B_matrix.shape[1]-1
    backtrace_idxs = [(i, j)]
    while (i, j) != (0, 0):
        if B_matrix[i,j][1]:
            i, j = i-1, j-1
        elif B_matrix[i,j][0]:
            i, j = i-1, j
        elif B_matrix[i,j][2]:
            i, j = i, j-1
        backtrace_idxs.append((i,j))

    return backtrace_idxs
    
    
def align(word_1, word_2, bt):
    
    aligned_word_1 = []
    aligned_word_2 = []
    operations = []

    backtrace = bt[::-1]  # make it a forward trace

    for k in range(len(backtrace) - 1): 
        i_0, j_0 = backtrace[k]
        i_1, j_1 = backtrace[k+1]

        w_1_letter = None
        w_2_letter = None
        op = None

        if i_1 > i_0 and j_1 > j_0:  # either substitution or no-op
            if word_1[i_0] == word_2[j_0]:  # no-op, same symbol
                w_1_letter = word_1[i_0]
                w_2_letter = word_2[j_0]
                op = " "
            else:  # cost increased: substitution
                w_1_letter = word_1[i_0]
                w_2_letter = word_2[j_0]
                op = "s"
        elif i_0 == i_1:  # insertion
            w_1_letter = " "
            w_2_letter = word_2[j_0]
            op = "i"
        else: #  j_0 == j_1,  deletion
            w_1_letter = word_1[i_0]
            w_2_letter = " "
            op = "d"

        aligned_word_1.append(w_1_letter)
        aligned_word_2.append(w_2_letter)
        operations.append(op)
    
    

    return aligned_word_1, aligned_word_2, operations
    
    
def make_table(word_1, word_2, D, B, bt):
    w_1 = word_1
    w_2 = word_2

    w_1 = ["#"] + w_1
    w_2 = ["#"] + w_2

    table = []
    # table formatting in emacs, you probably don't need this line
    table.append(["<r>" for _ in range(len(w_2)+1)])
    table.append([""] + list(w_2))

    max_n_len = len(str(np.max(D)))

    for i, l_1 in enumerate(w_1):
        row = [l_1]
        for j, l_2 in enumerate(w_2):

                v, d, h = B[i,j]
                direction = ("⇑" if v else "") +\
                    ("⇖" if d else "") +\
                    ("⇐" if h else "")
                dist = str(D[i,j])

                cell_str = "{direction} {star}{dist}{star}".format(
                                     direction=direction,
                                     star=" *"[((i,j) in bt)],
                                     dist=dist)
                row.append(cell_str)
        table.append(row)

    return table
	
def compareDem(word1, word2):
    D, B = compare (word1, word2)
    bt = naive_backtrace(B)
    alignment_table = align(word1, word2, bt)
    score_cost = float(D[len(word1), len(word2)]) / (len(alignment_table[2]))
    #print (tb.tabulate(alignment_table, tablefmt='orgtbl'))
    return score_cost
	
###################################################################
        
#Removes the numerical constant after vowel phones
def remove_numbers_vowel_phonemes(inp):
    phos = []
    for pho in inp:
        try:
            val = int(pho[-1])
            phos.append(pho[:-1])
        except:
            phos.append(pho)
    return phos


# Function gets phones for given string
def get_phonemes(word):
    g2p = G2p()
    phos = g2p(word)
    return remove_numbers_vowel_phonemes(phos)

def get_phonemes_num(word):
    g2p = G2p()
    return g2p(word)


#t1 = correct
#t2 = incorrect

## Removes spaces from the list of phones
def remove_spaces_list(l):
    l = [x.strip(' ') for x in l]
    return list(filter(bool,l))

# Gets the phonetic similarity beteewn two strings
def get_sim(t1,t2):
    p1 = []
    p2 = []
    g2p = G2p()
    for word in t1.split():
        p1 += remove_numbers_vowel_phonemes(remove_spaces_list(g2p(word)))
    for word in t2.split():
        p2 += remove_numbers_vowel_phonemes(remove_spaces_list(g2p(word)))
    return compareDem(p1,p2)

#Ununsed but works out what woords in attempt are phontetically same as others
def replace_phonetically_same_words(t1,t2):
    p1 = get_pho_dict(t1)
    p2 = get_pho_dict(t2)
    
    t1 = t1.split()
    t2 = t2.split()
    out = ""
    curr = 0
    temp = 0
    start_idx = 0
    g2p = G2p()
    
    
    while curr < len(t2):
        temp = 0
        for word in t1[start_idx:]:
            if word.lower() == t2[curr].lower():
                out += word+" "
                curr+=1
                start_idx+=temp+1
                break
            elif p1[word] == p2[t2[curr]]:
                out += word+" "
                curr+=1
                start_idx+=temp+1
                break
            temp+=1
        
        if curr == start_idx:
            out += t2[curr]+" "
            curr+=1
    return out.strip()

# Gets color for spectogram based off similarity 
def get_cmap(threshold):
    if threshold == 0:
        return "Greens"
    elif threshold <= 0.15:
        return "YlOrBr"
    else:
        return "Reds"


def get_spectogram(wav_path,sim,filename,code):
    samplingFrequency, signalData = wavfile.read(wav_path)
    temp = []                                             
    for i in range(len(signalData)):                      
        if signalData[i] == 0:                            
            continue                                      
        else:                                             
            temp.append(signalData[i])
    if code == 0:
        height = 3
    else:
        height = 5
    fig = plt.figure(num=None, figsize=(18,height), dpi=80, facecolor='w', edgecolor='k')
    ax = plt.subplot(111)  
    ax.specgram(temp,Fs=samplingFrequency,cmap=get_cmap(sim))
    ax.axis('off')                          
    plt.subplots_adjust(left=0, bottom=0, right=1, top=1, wspace=0, hspace=0)    
    fig.tight_layout()
    out = "media/images/"+filename
    plt.savefig(settings.BASE_DIR+'/'+out, transparent= True, bbox_inches = 'tight', pad_inches = 0)
    if code !=0:
        new_out = "media/images/"+filename[:-4]+"_crop.png"
        crop_spectogram(settings.BASE_DIR+'/'+out,(0,162,1416,376), settings.BASE_DIR+'/'+new_out)
    
        return new_out
    return out


#Crops spectogram to remove unnessary space at top
def crop_spectogram(inpath,coords,outpath):
    img = cv2.imread(inpath)
    crop_img = img[coords[1]:coords[3], coords[0]:coords[2]]
    cv2.imwrite(outpath,crop_img)
    return

# t1, correct
# t2, not

#Unnnused but ensues every word in two strings are phonetically the same
def is_phonetically_same(t1,t2):
    t1 = t1.split()
    t2 = t2.split()
    if len(t1) != len(t2):
        return False

    for i in range(len(t1)):
        if t1[i].lower() != t2[i].lower():
            if get_phonemes_num(t1[i].lower()) != get_phonemes_num(t2[i].lower()):
                return False
    return True



# Unnused but cuts empty sapce at start and end of the audio file
def cut_wav(wav_path):
    # print('\n\nin cut_wav\n\n')
    start_pad = 0
    end_pad = 0

    samplingFrequency, signalData = wavfile.read(wav_path)
    window = int((samplingFrequency/1000)*10)

    start = int((samplingFrequency/1000)*10)
    end = int(window) + start
    prev_variability = 0
    for i in range(int(window),len(signalData),int(window/2)):
        data = signalData[start:end]
        # print('start:', start)
        # print('end:', end)
        curr_variabilty = data.mean()
        diff = curr_variabilty-prev_variability
        start += int(window/2)
        end += int(window/2)
        prev_variability = curr_variabilty
        if abs(diff) > 120:
            break
    begining = (i/samplingFrequency)*1000
    start = len(signalData)-window
    end = len(signalData)   
    prev_variability = 0
    for i in range(len(signalData),0,-int(window/2)):
        data = signalData[start:end]
        curr_variabilty = data.mean()
        diff = curr_variabilty-prev_variability
        start -= int(window/2)
        end -= int(window/2)
        prev_variability = curr_variabilty
        if abs(diff) > 120:
            break
    finish = (i/samplingFrequency)*1000
    newA = AudioSegment.from_wav(wav_path)
    newA = newA[begining:finish]
    newA.export(wav_path,format='wav')
    return
