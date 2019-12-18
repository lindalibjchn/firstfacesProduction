import ast
import pandas as pd
from django.conf import settings
from g2p_en import G2p
import glob
import json
import numpy as np


valid = [v.split("/")[-1][:-4] for v in glob.glob(settings.BASE_DIR+'/face/text_files/Trigrams/*.txt')]


g2p = G2p()



def get_phonemes(g2p_, word):
    phos = g2p_(word)
    return remove_numbers_vowel_phonemes(phos)

def convertor(p_l):
    vl = []
    for p in p_l:
        if p in p2v_dict.keys():
            vl.append(p2v_dict[p])
    return vl

def convert_phonemes_to_visemes(p_l_):

    viseme_list = []
    for p in p_l_:
        viseme_list.append([p2v_dict[i] for i in p if i in p2v_dict_keys])

    return viseme_list

p2v_dict = {
    'AA': 'e',
    'AE': 'e',
    'AH': 'e',
    'AO': 'e',
    'AW': 'e',
    'AY': 'e',
    'B': 'b',
    'CH': 's',
    'D': 't',
    'DH': 'th',
    'EH': 'e',
    'ER': 'r',
    'EY': 'e',
    'F': 'f',
    'G': 'k',
    'HH': 'e',
    'IH': 'e',
    'IY': 'i',
    'JH': 's',
    'K': 'k',
    'L': 'l',
    'M': 'b',
    'N': 't',
    'NG': 'k',
    'OW': 'e',
    'OY': 'e',
    'P': 'b',
    'R': 'r',
    'S': 's',
    'SH': 's',
    'T': 't',
    'TH': 'th',
    'UH': 'e',
    'UW': 'u',
    'V': 'f',
    'W': 'w',
    'Y': 'e',
    'Z': 's',
    'ZH': 's'
}

p2v_dict_keys = p2v_dict.keys()

def Visemes(word):
    return convertor(get_phonemes(g2p, word))

def remove_numbers_vowel_phonemes(inp):
    phos = []
    for pho in inp:
        try:
            val = int(pho[-1])
            phos.append(pho[:-1])
        except:
            phos.append(pho)
    return phos


def load_tris():
    temp = pd.read_csv(settings.BASE_DIR+'/face/text_files/'+'tri_df.csv',index_col=0)
    temp = temp.drop_duplicates()
    temp.Words = temp.Words.apply(ast.literal_eval)
    temp.Levels = temp.Levels.apply(ast.literal_eval)
    temp.Trigram = temp.Trigram.apply(ast.literal_eval)
    temp.Trigram_Visemes = temp.Trigram_Visemes.apply(ast.literal_eval)
    return temp


def get_word_dataframe():
    temp = pd.read_csv(settings.BASE_DIR+'/face/text_files/'+'word_tri.csv', index_col=0).drop_duplicates(keep="first")
    temp.Visemes = temp.Visemes.apply(ast.literal_eval)
    return temp


tri_df = load_tris()
word_df = get_word_dataframe()


def get_word_visemes(word):
    temp = word_df[word_df.Word == word.strip().lower()]
    if len(temp) == 0:
        return []
    else:
        return list(temp.Visemes)[0]


def create_tile(level,word,pos,class_,idx):
    return '<div id="tile_{}" class="tile-word {} {} "><div class="tile-top-row"><div class="tile-right-box tile-corner-font wide {}f"><div class="cont"><span class="right">{}</span></div></div><div class="tile-left-box tile-corner-font info">&#9432;</div></div><div class="tile-center-row"><span class="tile-main-word">{}</span></div><div class="tile-bottom-row"><div class="tile-right-box wide tile-corner-font {}f"><div class="cont"><span class="right">{}</span></div></div></div></div>'.format(str(idx),level,class_,level,level,word, level, pos)


def create_placeholder_tile(level,word,pos,class_):
    return '<div class="tile-word {} {} "><div class="tile-top-row"><div class="tile-right-box tile-corner-font wide {}f"><div class="cont"><span class="right">{}</span></div></div><div class="tile-left-box tile-corner-font info">&#9432;</div></div><div class="tile-center-row"><span class="tile-main-word">{}</span></div><div class="tile-bottom-row"><div class="tile-right-box wide tile-corner-font {}f"><div class="cont"><span class="right">{}</span></div></div></div></div>'.format(level,class_,level,level,word, level, pos)


def get_word_details(word, pos):
    # [Level, defintions, examples]
    temp = word_df[word_df.Word == word]
    temp = temp[temp.S_POS == pos].reset_index(drop=True)
    defs = []
    exs = []
    levels = []
    for idx,row in temp.iterrows():
        defs.append(str(idx+1)+"."+row.Definition[0].upper()+row.Definition[1:])
        if isinstance(row.Example, str):
            exs.append(str(idx+1)+"."+row.Example[0].upper()+row.Example[1:])
        else:
            exs.append("")
        levels.append((str(idx+1)+". "+row.Level))
    return [levels, defs, exs]


## New Trigram Structure

def load_tri(word, pos):
    with open(settings.BASE_DIR+'/face/text_files/Trigrams/{}_{}.txt'.format(word, pos)) as json_file:
        data = json.load(json_file)
    json_file.close()
    return data


def get_random_tri(word, pos):
    out = {}
    tris = load_tri(word, pos)

    a = select_tri(tris)
    fw = list(a['Trigram'].keys())[0]
    print(fw)
    fl = list(a['Levels'].keys())[0]

    fv = list(a['Visemes'].keys())[0]

    poss = select_tri_words(a)
    levels = []
    words = []
    viss = []
    for word in poss:
        w, idx = word.split("_")
        words.append(w)
        levels.append(a['Levels'][fl][int(idx)])
        viss.append(a['Visemes'][fv][int(idx)])
    return {fw: words}, {fl: levels},  a['C_IDX'],  a['F_IDX'], {fv: viss}


def get_probs(tris):
    p = []
    for tri in tris:
        p.append(tri['P'])
    return p


def select_tri(tris):
    p = normalise(get_probs(tris))
    return list(np.random.choice(tris, 1,replace=False, p=p))[0]


def select_tri_words(tri):
    p = []
    w = []
    count = 0
    for i in tri['Trigram'][list(tri['Trigram'].keys())[0]]:
        p.append(i[1])
        w.append(i[0].split("_")[0] + "_" + str(count))
        count += 1
    ss = 6
    if len(w) < 6:
        ss = len(w)

    return list(np.random.choice(w, ss, replace=False, p=normalise(p)))

def normalise(vals):
    prob_factor = 1/sum(vals)
    return [prob_factor * v for v in vals]


def get_tris(word, pos):
    if word+'_'+pos in valid:
        print(word+'_'+pos)
        return get_random_tri(word, pos)

    #if word.strip().lower() in tri_df.Word.unique():
     #   temp = tri_df[tri_df.Word == word.strip().lower()]
      #  if len(temp == 1):
       #     out = temp.reset_index().iloc[0]
        #    return out.Words,out.Levels,int(out.T_IDX),out.Trigram, out.Trigram_Visemes
        #elif len(temp == 2):
         #   temp = temp[temp.POS == pos]
          #  if len(temp == 1):
            #    out = temp.reset_index().iloc[0]
           #     return out.Words, out.Levels, int(out.T_IDX), out.Trigram, out.Trigram_Visemes



def get_tile_class(len , idx):
    if (len > 5):
        len = 5
    if idx >= 5:
        return 'hidden_tile'

    else:

        one = {0: 'main-tile'}
        two = {0: 'main-tile', 1: "second-tile-bottom"}
        three = {0: 'second-tile-top', 1: 'main-tile', 2: "second-tile-bottom"}
        four = {0: 'second-tile-top', 1: 'main-tile', 2: "second-tile-bottom", 3: "third-tile-bottom"}
        five = {0: 'third-tile-top', 1: "second-tile-top", 2: 'main-tile', 3: "second-tile-bottom",
                4: "third-tile-bottom"}

        class_dic = {
            1: one,
            2: two,
            3: three,
            4: four,
            5: five,
        }

        return class_dic[len][idx]


def append_tile_list(len_):
    if len_ == 1:
        return ['', '', 'tile_0', '', '']
    elif len_ == 2:
        return ['', '', 'tile_0', 'tile_1', '']
    elif len_ == 3:
        return ['', 'tile_0', 'tile_1', 'tile_2', '']
    elif len_ == 4:
        return ['', 'tile_0', 'tile_1', 'tile_2', 'tile_3']
    else:
        return ['tile_0', 'tile_1', 'tile_2', 'tile_3', 'tile_4']


def hidden_tiles(len_):
    if len_ <= 5:
        return []
    else:
        out = []
        for i in range(5, len_):
            out.append('tile_' + str(i))
        return out


def get_audio_path(word):
    return 'media/prePreparedWords/audio/'+word+'.wav'

def create_fixed_tile(word,pos,level):
    return '<div id="fixedWordTile" class="tile-word-fixed {} main-tile-fixed"><div class="tile-top-row"><div class="tile-right-box tile-corner-font wide {}f"><div class="cont"><span class="right">{}</span></div></div><div class="tile-left-box tile-corner-font info">&#9432;</div></div><div class="tile-center-row"><span class="tile-main-word">{}</span></div><div class="tile-bottom-row"><div class="tile-right-box wide tile-corner-font {}f"><div class="cont"><span class="right">{}</span></div></div></div></div>'.format(level,level,level,word,level,pos)