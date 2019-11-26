def get_mean_by_text(sentence, indexes):

    unsure_strings = " "
    reduced_indexes = reduce_indexes(indexes)

    for i in range(len(reduced_indexes)):
        if i != 0:
            unsure_strings += " or "
        unsure_word_list = []
        for j in reduced_indexes[i]:
            unsure_word_list.append(sentence[j][0])
        unsure_strings += "'" + ' '.join(unsure_word_list) + "'"

    return unsure_strings

def reduce_indexes(ind):
    reduced_inds = []
    for i in ind:
        reduced_inds.append([int((j-1)/2) for j in i if j%2!=0])
    return reduced_inds


