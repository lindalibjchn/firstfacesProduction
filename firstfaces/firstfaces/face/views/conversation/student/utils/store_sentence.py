from nltk import word_tokenize, pos_tag
import json
from g2p_en import G2p
from django.utils import timezone
import time
# import datetime
# import logging
# logger = logging.getLogger(__name__)
g2p = G2p()

def change_sentence_to_list_n_add_data(s_):

    # t0 = datetime.datetime.now()
    text = word_tokenize(s_) # {"I", "have,..
    # t1 = datetime.datetime.now()
    pos_tags = pos_tag_sentence(text) # ["PR", "VBP",..
    # t2 = datetime.datetime.now()
    phonemes = get_phonemes_for_sentence(text) # [["AA", "TH",..
    # t3 = datetime.datetime.now()
    visemes = convert_phonemes_to_visemes(phonemes) # [['e', 'th',..
    # t4 = datetime.datetime.now()
        
    # logger.error('\nword_tokenize:' + str(t1 - t0) + '\n')
    # logger.error('\npos_tags:' + str(t2 - t1) + '\n')
    # logger.error('\nphonemes:' + str(t3 - t2) + '\n')
    # logger.error('\nvisemes:' + str(t4 - t3) + '\n')

    return [list(a) for a in zip(text, pos_tags, visemes)]

def pos_tag_sentence(t_):
    # t_ = ["the", "boy",.."

    pos_tagged = [i[1] for i in pos_tag(t_)]
    return pos_tagged

def get_phonemes_for_sentence(t_):

    phoneme_list = []
    for i in t_:
        # for p in get_phonemes(g2p, i):
        phoneme_list.append(get_phonemes(g2p, i))

    return phoneme_list

# copied from DanUtils on my mac cause couldn't install all dependencies. Was slow so will use nltk except for OOV words
def get_phonemes(g2p_, word):

    phos = g2p_(word)
    return remove_numbers_vowel_phonemes(phos)

def remove_numbers_vowel_phonemes(inp):
    phos = []
    for pho in inp:
        try:
            val = int(pho[-1])
            phos.append(pho[:-1])
        except:
            phos.append(pho)
    return phos

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

