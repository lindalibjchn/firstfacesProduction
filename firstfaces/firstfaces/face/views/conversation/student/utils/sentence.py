from nltk import word_tokenize, pos_tag
import json
from g2p_en import G2p
from django.utils import timezone
import time

def change_sentence_to_list_n_add_data(s_):

    text = word_tokenize(s_) # {"I", "have,..
    pos_tags = pos_tag_sentence(text) # ["PR", "VBP",..
    phonemes = get_phonemes_for_sentence(text) # [["AA", "TH",..
    visemes = convert_phonemes_to_visemes(phonemes) # [['e', 'th',..

    return [list(a) for a in zip(text, pos_tags, visemes)]

def pos_tag_sentence(t_):
    # t_ = ["the", "boy",.."

    pos_tagged = [i[1] for i in pos_tag(t_)]
    return pos_tagged

def get_phonemes_for_sentence(t_):

    g2p = G2p()
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

def jsonify_or_none(item_from_db):

    if item_from_db != None:
        return json.loads(item_from_db)
    else:
        return None

def floatify( decimal_from_db ):

    if decimal_from_db != None:
        return float(decimal_from_db)
    else:
        return None

def int_time_or_none( timestamp_from_db ):

    if timestamp_from_db != None:
        return int(time.mktime(timezone.localtime(timestamp_from_db).timetuple())) * 1000
    else:
        return None

