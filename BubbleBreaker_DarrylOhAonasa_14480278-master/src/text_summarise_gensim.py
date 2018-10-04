import warnings
warnings.filterwarnings(action='ignore', category=UserWarning, module='gensim')
from gensim.summarization import summarize

'''
    This class summarises text using the Gensim summariser.
    Primarily this class was used to compare against the results
    produced by the newly developed summariser.
'''

class TextSummariseGensim:

    def __init__(self, source_text, ratio):
        self.source_text = source_text
        self.ratio = ratio
        self.summary_text = ""


    def summarise_article(self):
        # 0.0 <= ratio <= 1.0 - percentage of sentences from source text. default = 20%
        self.summary_text = summarize(self.source_text, self.ratio)

        # word_count = maximum amount of words we want.
        #summarize(text, word_count = 50)
        return self.summary_text


    # Returns the article summary (str)
    def get_article_summary(self):
        return self.summary_text


    # Returns the keywords from the article (str)
    def get_article_keywords(self):
        return keywords(self.source_text)


    # The percentage of the text we wished to have reduced (float)
    def desired_percentage_reduction(self):
        return (100 - (self.ratio * 100))


    # The percentage of the text actually reduced (float)
    def actual_percentage_reduction(self):
        return (100 - ((len(self.summary_text) / len(self.source_text)) * 100))

