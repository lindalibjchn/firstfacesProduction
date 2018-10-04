'''
    This class is used to store comment information extending the
    available attributes offered by the 'Comment' class.
    The attributes provided by this class are those that are relevant
    to identifying appropriate comments for the opinion range, such as
    the individual sentiment scores, and other comment information
    such as its author, etc.
'''

class TaggedComment:

    def __init__(self, comment, comment_sentiment):
        self.__comment = comment
        self.__body = comment.body
        self.pos = comment_sentiment['pos']
        self.neg = comment_sentiment['neg']
        self.neu = comment_sentiment['neu']
        self.compound = comment_sentiment['compound']


    # Return the body text of the comment (Type str).
    def body(self):
        return self.__body


    def set_body(self, new_body):
        self.__body = new_body


    # Return the author name of the comment (Type 'Redditor').
    def author(self):
        return self.__comment.author


    # Return a list of the child comments for the comment (Type 'CommentForest').
    def replies(self):
        return self.__comment.replies


    def is_root(self):
        return self.__comment.is_root


    def sentiment(self):
        return "[pos: {:1.3f}, neg: {:1.3f}, neu: {:1.3f}]".format(self.pos, self.neg, self.neu)







