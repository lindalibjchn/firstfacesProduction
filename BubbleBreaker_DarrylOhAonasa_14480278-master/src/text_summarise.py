from nltk.tokenize import word_tokenize
from nltk.tokenize import sent_tokenize
from nltk.corpus import stopwords
from string import punctuation
from math import ceil
from heapq import nlargest
from collections import defaultdict
from difflib import SequenceMatcher

'''
    Extract sentences from the article that cover the main topics.
    If a sentence contains the most frequent words, it's a good indicator
    that this sentence is relevant and covers the main topics from the article.
'''

class TextSummarise:

    def __init__(self, source_text, ratio, min_freq, max_freq):
        self.source_text = source_text
        self.summary_text = ''
        self.min_freq = min_freq
        self.max_freq = max_freq
        self.ratio = ratio
        self.stopwords = set(stopwords.words('english') + list(punctuation))


    def summarise_article(self):
        sentences = sent_tokenize(self.source_text) # list of sentences from source.
        sentence_count = self.__ratio_to_sentence_count(len(sentences))

        word_sentences = [word_tokenize(sentence.lower()) for sentence in sentences] # list of sents, list of words.

        self._frequencies = self.__word_frequencies(word_sentences)
        ranking = defaultdict(int)

        for i, sentence in enumerate(word_sentences):
            for word in sentence:
                if word in self._frequencies:
                    ranking[i] += self._frequencies[word]

        sentences_index = nlargest(sentence_count, ranking, key=ranking.get) # the index of the n highest rankd sentences.
        sentences_index.sort()
        
        self.summary_text = ' '.join(sentences[j] for j in sentences_index)
        return self.summary_text


    # Input: list of tokenized sentences.
    # Output: Dictionary, where frequencies[word] = the (normalised) frequency of a word 'word'.
    def __word_frequencies(self, sentences):
        frequencies = defaultdict(int)

        for sentence in sentences:
            for word in sentence:
                if word not in self.stopwords:
                    frequencies[word] += 1

        # frequencies normalisation and filtering.
        max_freq = float(max(frequencies.values()))

        temp_freq = frequencies.copy()
        for word in temp_freq.keys():
            frequencies[word] = frequencies[word] / max_freq

            if frequencies[word] <= self.min_freq or frequencies[word] >= self.max_freq:
                del frequencies[word]

        return frequencies


    # Based on the ratio given, calculate the number of sentences to use in the summary.
    def __ratio_to_sentence_count(self, number_of_sentences):
        # Use ceil to be sure of at least 1 in the result.
        return ceil(self.ratio * number_of_sentences)


    # Returns the article summary (str)
    def get_article_summary(self):
        return self.summary_text


    # The percentage of the article reduced (float)
    def actual_percentage_reduction(self):
        return (100 - ((len(self.summary_text) / len(self.source_text)) * 100))


    # The percentage of the text we wished to have reduced (float)
    def desired_percentage_reduction(self):
        return (100 - (self.ratio * 100))

