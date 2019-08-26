from nltk import word_tokenize, pos_tag
import json

def pos_tag_sentence(s_): # sentence

    text = word_tokenize(s_)
    pos_tagged = json.dumps([list(i) for i in pos_tag(text)])

    return pos_tagged

