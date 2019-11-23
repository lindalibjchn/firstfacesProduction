def get_text(sentence, judgement, prompt, indexes):

    if judgement == "P":

        tia_to_say = prompt

    elif judgement == "M":

        unsure_strings = " "
        reduced_indexes = reduce_indexes(indexes)

        for i in range(len(reduced_indexes)):
            if i != 0:
                unsure_strings += " or "
            unsure_word_list = []
            for j in reduced_indexes[i]:
                unsure_word_list.append(sentence[j][0])
            unsure_strings += "'" + ' '.join(unsure_word_list) + "'"

        tia_to_say = ["I'm not sure what you mean by" + unsure_strings + ", could you try again?"]

        # if there are additional prompts
        if prompt is not None:
            tia_to_say += prompt

    elif judgement == "B":

        reduced_indexes = reduce_indexes(indexes)
        better_bit = " ".join([sentence[k][0] for k in reduced_indexes[0]])

        tia_to_say = ["It would be more natural to say '" + prompt[ 0 ] + "', instead of '" + better_bit + "'"]

        # if there are additional prompts
        if len(prompt) > len(reduced_indexes):
            remaining_prompts = prompt[len(reduced_indexes):]
            tia_to_say += remaining_prompts

    return tia_to_say

def reduce_indexes(ind):
    reduced_inds = []
    for i in ind:
        reduced_inds.append([int((j-1)/2) for j in i if j%2!=0])
    return reduced_inds


