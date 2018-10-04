from comment_utilities import CommentUtilities
from tagged_comment import TaggedComment


class SelectComments:

    def __init__(self, root_comments, swing):
        self.root_comments = root_comments
        self.swing = swing
        self.__check_parameters()
        self.pos = '+'
        self.neg = '-'
        self.neu = 'N'
        self.options = self.__generate_options()
        self.comments = []


    def get_comments(self, all_comments):
        # From the root comments, select the best one that satisfies the desired option.
        # I.e. highest positive, negative, neutral.
        x_comment = self.__find_comment_for_type(self.root_comments, self.options[0])
        self.comments.append(x_comment)

        # 'x_children' contains the child comments of 'x'.
        x_children = x_comment.replies()
        x_children.replace_more(limit=0)

        # 'x_children' now contains comments without deleted/removed.
        x_children = CommentUtilities.filter_deleted_comments(x_children)

        # 'tagged_x_children' contains 'x_children' of type TaggedComment,
        # with sentiment polarity scores computed for each.
        tagged_x_children = []

        for comment in x_children:
            comment_sentiment = CommentUtilities.compute_comment_sentiment(comment.body)
            tagged_x_children.append(TaggedComment(comment, comment_sentiment))

        # 'y' is always a child of 'x', and is determined in the same way 'x' was.
        y_comment = self.__find_comment_for_type(tagged_x_children, self.options[1])
        self.comments.append(y_comment)

        # Check for z comment from group of all root comments and x's children.
        all_comments += tagged_x_children
        filtered_all_comments = []

        # Remove comments already selected from the pool.
        for comment in all_comments:
            if self.comments[0].body() != comment.body() and self.comments[1].body() != comment.body():
                filtered_all_comments.append(comment)

        z_comment = self.__find_comment_for_type(filtered_all_comments, self.options[2])
        self.comments.append(z_comment)

        return self.comments


    def __find_comment_for_type(self, comment_list, symbol):
        comment = None
        temp_score = -1

        if symbol is self.pos:
            for com in comment_list:
                if com.pos > temp_score and com.pos > com.neg:
                    temp_score = com.pos
                    comment = com
        elif symbol is self.neg:
            for com in comment_list:
                if com.neg > temp_score and com.neg > com.pos:
                    temp_score = com.neg
                    comment = com
        else:
            for com in comment_list:
                if com.neu > temp_score:
                    temp_score = com.neu
                    comment = com

        # If an appropriate comment can't be assigned from above,
        # default to the first comment in the list.
        if comment is None:
            comment = comment_list[0]

        return comment


    def __generate_options(self):
        temp = []

        if self.swing == 0.0:
            temp.extend([self.neg, self.neg, self.neg]) # -,-,-
        elif self.swing == 0.2:
            temp.extend([self.neg, self.pos, self.neg]) # -,+,-
        elif self.swing == 0.4:
            temp.extend([self.neu, self.neg, self.pos]) # N,-,+
        elif self.swing == 0.5:
            temp.extend([self.neu, self.neu, self.neu]) # N,N,N
        elif self.swing == 0.6:
            temp.extend([self.neu, self.pos, self.neg]) # N,+,-
        elif self.swing == 0.8:
            temp.extend([self.pos, self.neg, self.pos]) # +,-,+
        elif self.swing == 1.0:
            temp.extend([self.pos, self.pos, self.pos]) # +,+,+

        return temp


    def __check_parameters(self):
        if self.swing < 0.0 or 1.0 < self.swing:
            raise ValueError('\'swing\' parameter must be between 0.0 and 1.0')
        elif len(self.root_comments) == 0:
            raise ValueError('Empty list of root comments provided')


