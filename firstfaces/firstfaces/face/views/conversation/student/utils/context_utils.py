import ast
import pandas as pd
from django.conf import settings



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
    temp = word_df[word_df.Word == word]
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


def get_tris(word, pos):
    if word.strip().lower() in tri_df.Word.unique():
        temp = tri_df[tri_df.Word == word.strip().lower()]
        if len(temp == 1):
            out = temp.reset_index().iloc[0]
            return out.Words,out.Levels,int(out.T_IDX),out.Trigram, out.Trigram_Visemes
        elif len(temp == 2):
            temp = temp[temp.POS == pos]
            if len(temp == 1):
                out = temp.reset_index().iloc[0]
                return out.Words, out.Levels, int(out.T_IDX), out.Trigram, out.Trigram_Visemes


def get_tile_class(len_, idx):
    if (len_ > 5):
        len_ = 5
    if idx > 5:
        return 'hidden_tile'

    else:

        one = {0: 'main-tile'}
        two = {0: 'main-tile', 0: "second-tile-bottom"}
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

        return class_dic[len_][idx]


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