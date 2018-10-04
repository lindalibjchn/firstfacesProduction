from nltk.sentiment.vader import SentimentIntensityAnalyzer
from config_constants import USELESS_SYMBOLS
from nltk.tokenize import sent_tokenize

class CommentUtilities:

    # Method removes all deleted comments from a list of comments.
    # On Reddit, deleted comments are strings or either '[deleted]' or '[removed]'.
    @staticmethod
    def filter_deleted_comments(comments):
        filtered_comments = []

        for comment in comments:
            if comment.body != "[deleted]" and comment.body != "[removed]":
                filtered_comments.append(comment)

        return filtered_comments


    # Method removes root comments with fewer than 'min_replies' children.
    @staticmethod
    def filter_root_comments(comments, min_replies):
        filtered_comments = []

        for comment in comments:
            children = comment.replies
            children.replace_more(limit=0)

            if len(children) >= min_replies:
                filtered_comments.append(comment)
            else:
                continue

        return filtered_comments


    # Computes the overall polarity score for a comment, by using sentence
    # tokenization and computing the polarity score of each of these sentences.
    # The overall score for the opinion then is the average of all the sentences.
    # Input: Comment as a string
    # Ouput: Dictionary (hashmap) of sentiment scores.
    @staticmethod
    def compute_comment_sentiment(comment):
        sent_analysis = SentimentIntensityAnalyzer()
        sentences = sent_tokenize(comment)
        n = len(sentences)
        pos = 0.0
        neg = 0.0
        neu = 0.0
        compound = 0.0

        for sentence in sentences:
            sentence_sentiment = sent_analysis.polarity_scores(sentence)
            pos += sentence_sentiment['pos']
            neg += sentence_sentiment['neg']
            neu += sentence_sentiment['neu']
            compound += sentence_sentiment['compound']

        pos /= n
        neg /= n
        neu /= n
        compound /= n

        return {'pos': pos, 'neg': neg, 'neu': neu, 'compound': compound}


    # Remove Reddit formatting characters, and change all double quote
    # characters to single quote, in order to avoid printing issues.
    @staticmethod
    def clean_comment(comment):
        new_comment = comment

        for symbol in USELESS_SYMBOLS:
            new_comment = new_comment.replace(symbol, '')

        new_comment = new_comment.replace('"', '\'')

        # Remove all occurences of more than one space character (also \n \t).
        new_comment = " ".join(new_comment.split())

        return new_comment









