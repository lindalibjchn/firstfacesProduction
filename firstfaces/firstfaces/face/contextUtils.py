import pandas as pd
import ast
import random
import en_core_web_sm

nlp = en_core_web_sm.load()
import requests
from bs4 import BeautifulSoup

# TO USE 
# call "get_context(word,POS)" with a given word and its Part of speech tag (POS tag must be in uppercase in format given by sapcy)


# Necessary variabes
url = "https://books.google.com/ngrams/graph?content={}&case_insensitive=on&year_start=2000&year_end=2008&corpus=15&smoothing=3"
request_agent = "Mozilla/5.0 Chrome/47.0.2526.106 Safari/537.36"

# List of POS tags supported by google n_grams
okay_pos = ["NOUN", "VERB", "ADJ", "ADV", "PRON", "DET", "ADP", "NUM", "CONJ"]

# Lists of bad start and ending POS tags
bad_ends = ["ADJ", "DET", "ADP", "CONJ", "PRON"]
bad_starts = ["NOUN", "VERB", "CONJ"]


# Creates basic dataframe from reddit and forum POS data
def create_dataframe():
    f = pd.read_csv('Data/Forums_BI.csv', index_col=0)
    r = pd.read_csv('Data/Reddit_BI.csv', index_col=0)

    f = f.set_index('POS_Bigram')

    for_freq = []
    for idx, row in r.iterrows():
        try:
            for_freq.append(f.loc[str(row.POS_Trigram)].Rel_Frequency)
        except:
            for_freq.append(0)

    r['Forum_Freq'] = for_freq
    r['Freq_Diff'] = r.Rel_Frequency - r.Forum_Freq
    r.to_csv("Data/Bigrams.csv")


# Creates columns for each individual POS tag
def create_new_cols():
    df = pd.read_csv('Data/Bigrams.csv', index_col=0)
    pos1 = []
    pos2 = []
    for i in df.POS_Bigram:
        tri = ast.literal_eval(i)
        pos1.append(tri[0])
        pos2.append(tri[1])
    df['POS_1'] = pos1
    df['POS_2'] = pos2
    df.to_csv("Data/Bigrams.csv")


# Checks pos tag is in trigram
def in_tri(POS, row):
    if (POS == row.POS_1 and row.POS_2 in okay_pos and row.POS_3 in okay_pos) or (
            POS == row.POS_2 and row.POS_1 in okay_pos and row.POS_3 in okay_pos) or (
            POS == row.POS_3 and row.POS_2 in okay_pos and row.POS_1 in okay_pos):
        return True
    else:
        return False


# Checks id pos tag is in bigram
def in_bi(POS, row):
    if (POS == row.POS_1 and row.POS_2 in okay_pos) or (POS == row.POS_2 and row.POS_1 in okay_pos):
        return True
    else:
        return False


# Gets the lower bound for POS group to be an outlier
def get_bounds(df):
    q1 = df["Freq_Diff"].quantile(0.25)
    q3 = df["Freq_Diff"].quantile(0.25)
    iqr = q3 - q1
    return q3 + (1.5 * iqr)


# Returns random Pos trigram which contains given POS tag and is also an outlier
def get_tri_with_pos(POS):
    df = pd.read_csv('Data/Trigrams.csv', index_col=0).reset_index(drop=True)
    ids = []
    df = df[df.Freq_Diff >= get_bounds(df)].reset_index(drop=True)
    for idx, row in df.iterrows():
        if in_tri(POS, row):
            ids.append(idx)
    df = df.iloc[ids]
    df = df[df.Freq_Diff <= 0].reset_index(drop=True)
    return ast.literal_eval(df.iloc[random.randint(0, len(df) - 1)].POS_Trigram)


# Returns random Pos bigram which contains given POS tag and is also an outlier
def get_bi_with_pos(POS):
    df = pd.read_csv('Data/Bigrams.csv', index_col=0).reset_index(drop=True)
    ids = []
    df = df[df.Freq_Diff >= get_bounds(df)].reset_index(drop=True)
    for idx, row in df.iterrows():
        if in_bi(POS, row):
            ids.append(idx)
    df = df.iloc[ids]
    return ast.literal_eval(df.iloc[random.randint(0, len(df) - 1)].POS_Bigram)
    print(len(df))


# Function returns tags for a supplied sentence
def tag_sentence(sent):
    tags = []
    doc = nlp(sent)
    for token in doc:
        tags.append(token.pos_)
    return tags


# Gets html for provided url
def getSoup(url):
    return BeautifulSoup(requests.get(url, headers={'User-Agent': request_agent}).text, 'lxml')


# Returns the top word to come before provided word
def get_word_before(word, POS):
    temp_url = url.format("*_" + POS + "+" + word)
    soup = getSoup(temp_url)
    word_str = soup.find("textarea", {"id": "share_url_text"}).text.split('direct_url')[1][1:]
    ws = word_str.split("%20")
    idx = 1
    if '%' not in ws[1]:
        idx = 2
    first = ws[idx].split('%3B%2Cc0%3B%2Cs0%3B%3B')[1].split("_")[0].lower()
    return first


# Returns the top word to come after provided word
def get_word_after(word, POS):
    temp_url = url.format(word + "+*_" + POS)
    soup = getSoup(temp_url)
    word_str = soup.find("textarea", {"id": "share_url_text"}).text.split('direct_url')[1][1:]
    ws = word_str.split("%20")
    i = 0
    while True:
        first = ws[2:][i]
        if '%' not in first:
            i += 1
        first = ws[2:][i].split("_")[0].lower()
        if '%' not in first:
            break
        i += 1
    return first


def get_needed_pos_tri(word, POS):
    tri = get_tri_with_pos(POS)
    print(tri)
    if tri[0] == POS:
        w1 = get_word_after(word, tri[1])
        try:
            w2 = get_word_after(word + "+" + w1, tri[2])
        except:
            w2 = get_word_after(w1, tri[2])
        print(word + " " + w1 + " " + w2)

    elif tri[1] == POS:
        w1 = get_word_before(word, tri[0])
        try:
            w2 = get_word_after(w1 + "+" + word, tri[2])
        except:
            w2 = get_word_after(word, tri[2])
        print(w1 + " " + word + " " + w2)


    else:
        w1 = get_word_before(word, tri[1])
        try:
            w2 = get_word_before(w1 + "+" + word, tri[0])
        except:
            w2 = get_word_before(w1, tri[0])
        print(w2 + " " + w1 + " " + word)


# Prints words filled in for bigram
def get_context(word, POS):
    w2 = ""
    w3 = ""
    bi = get_bi_with_pos(POS)
    # If supplied word is first in bigram
    if bi[0] == POS:
        w1 = get_word_after(word, bi[1])
        # If second word in bigram is bad end
        if bi[1] in bad_ends:
            st = find_tri_starting_in([POS, bi[1]])
            for i in st:
                if i not in bad_ends:
                    break

            if i == st[-1] and i in bad_ends:
                i = st[0]

            try:
                w2 = get_word_after(word + "+" + w1, i)
            except:
                w2 = get_word_after(w1, i)
        # If first word in bigram is bad start
        if POS in bad_starts:
            end = find_tri_ending_in([POS, bi[1]])
            for i in end:
                if i not in bad_starts:
                    break
            if i == end[-1] and i in bad_starts:
                i = end[0]
            try:
                w3 = get_word_before(word + "+" + w1, i)
            except:
                w3 = get_word_before(w1, i)

        # Conditions for printing
        if POS not in bad_starts and bi[1] not in bad_ends:
            print(word + " " + w1)
            return
        elif w2 != "" and w3 == "":
            print(word + " " + w1 + " " + w2)
            return
        elif w2 == "" and w3 != "":
            print(w3 + " " + word + " " + w1)
            return
        else:
            print(w3 + " " + word + " " + w1 + " " + w2)
            return

    # If supplied word is second in bigram
    elif bi[1] == POS:
        w1 = get_word_before(word, bi[0])
        # If second word in bigram is a bad ending
        if POS in bad_ends:
            st = find_tri_starting_in([bi[0], POS])
            for i in st:
                if i not in bad_ends:
                    break
            if i == st[-1] and i in bad_ends:
                i = st[0]

            try:
                w2 = get_word_after(word + "+" + w1, i)
            except:
                w2 = get_word_after(w1, i)
        # If first word in bigram is bad start
        if bi[0] in bad_starts:
            end = find_tri_ending_in([bi[1], POS])
            for i in end:
                if i not in bad_starts:
                    break
            if i == end[-1] and i in bad_starts:
                i = end[0]
            try:
                w3 = get_word_before(w1 + "+" + word, i)
            except:
                w3 = get_word_before(w1, i)

                # Conditions for printing
        if bi[0] not in bad_starts and POS not in bad_ends:
            print(w1 + " " + word)
            return
        elif w2 != "" and w3 == "":
            print(w1 + " " + word + " " + w2)
            return
        elif w2 == "" and w3 != "":
            print(w3 + " " + w1 + " " + word)
            return
        else:
            print(w3 + " " + word + " " + w1 + " " + w2)
            return

        # Ensures remaing POS tags in trigrams are valid pos tags and returns top five remainging


def remaining_tris_are_okay_end(n, df):
    if n == 1:
        ids = []
        for idx, row in df.iterrows():
            if row.POS_1 in okay_pos:
                ids.append(idx)
        return list(df.iloc[ids].reset_index(drop=True).sort_values('Frequency', ascending=False).POS_3[:5])

    elif n == 2:
        ids = []
        for idx, row in df.iterrows():
            if row.POS_1 in okay_pos and row.POS_2 in okay_pos:
                ids.append(idx)
        return list(df.iloc[ids].reset_index(drop=True).sort_values('Frequency', ascending=False).POS_3[:5])


def remaining_tris_are_okay_start(n, df):
    if n == 1:
        ids = []
        for idx, row in df.iterrows():
            if row.POS_3 in okay_pos:
                ids.append(idx)
        return list(df.iloc[ids].reset_index(drop=True).sort_values('Frequency', ascending=False).POS_3[:5])

    elif n == 2:
        ids = []
        for idx, row in df.iterrows():
            if row.POS_2 in okay_pos and row.POS_3 in okay_pos:
                ids.append(idx)
        return list(df.iloc[ids].reset_index(drop=True).sort_values('Frequency', ascending=False).POS_3[:5])


# Finds trigram containing provided list at start
def find_tri_ending_in(li):
    df = pd.read_csv('Data/Trigrams.csv', index_col=0).reset_index(drop=True)
    if len(li) == 0 or len(li) > 2:
        return 1

    elif len(li) == 1:
        temp = df[df.POS_3 == li[0]].reset_index(drop=True)
        return remaining_tris_are_okay_end(2, temp)

    else:
        temp = df[df.POS_2 == li[0]]
        temp = temp[temp.POS_3 == li[1]].reset_index(drop=True)
        return remaining_tris_are_okay_end(1, temp)


# Finds trigram containing provided list at end
def find_tri_starting_in(li):
    df = pd.read_csv('Data/Trigrams.csv', index_col=0).reset_index(drop=True)
    if len(li) == 0 or len(li) > 2:
        return 1
    elif len(li) == 1:
        temp = df[df.POS_1 == li[0]].reset_index(drop=True)
        return remaining_tris_are_okay_start(2, temp)

    else:
        temp = df[df.POS_1 == li[0]]
        temp = temp[temp.POS_2 == li[1]].reset_index(drop=True)
        return remaining_tris_are_okay_start(1, temp)
