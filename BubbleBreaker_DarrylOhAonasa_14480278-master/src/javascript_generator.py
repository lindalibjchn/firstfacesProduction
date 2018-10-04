'''
    This class writes the comment combinations to a javascript
    file as javascript variables, such that they can be used on the
    webpage, and such that the 'explore opinions' section can function
    correctly with the onpage slider.
'''

class JavaScriptGenerator:

    def __init__(self, pos_pos_pos, pos_neg_pos, neu_pos_neg, neu_neu_neu, neu_neg_pos,
                neg_pos_neg, neg_neg_neg, pos_pos_pos_fillers, pos_neg_pos_fillers, neu_pos_neg_fillers,
            	neu_neu_neu_fillers, neu_neg_pos_fillers, neg_pos_neg_fillers, neg_neg_neg_fillers):

        self.FILE_PATH = '../web/opinions.js'

        # Comments
        self.pos_pos_pos = pos_pos_pos
        self.pos_neg_pos = pos_neg_pos
        self.neu_pos_neg = neu_pos_neg
        self.neu_neu_neu = neu_neu_neu
        self.neu_neg_pos = neu_neg_pos
        self.neg_pos_neg = neg_pos_neg
        self.neg_neg_neg = neg_neg_neg

        # Fillers
        self.pos_pos_pos_fillers = pos_pos_pos_fillers
        self.pos_neg_pos_fillers = pos_neg_pos_fillers
        self.neu_pos_neg_fillers = neu_pos_neg_fillers
        self.neu_neu_neu_fillers = neu_neu_neu_fillers
        self.neu_neg_pos_fillers = neu_neg_pos_fillers
        self.neg_pos_neg_fillers = neg_pos_neg_fillers
        self.neg_neg_neg_fillers = neg_neg_neg_fillers


    def generate_script(self):
        message = "Failed to generate JavaScript..."

		# clear file, and write 'script' to the file.
        with open(self.FILE_PATH, 'r+') as f:
            f.truncate()

            f.write("var pos_pos_pos = [\"{0}\", \"{1}\", \"{2}\"];\n".format(self.pos_pos_pos[0].body(), self.pos_pos_pos[1].body(), self.pos_pos_pos[2].body()))
            f.write("var pos_neg_pos = [\"{0}\", \"{1}\", \"{2}\"];\n".format(self.pos_neg_pos[0].body(), self.pos_neg_pos[1].body(), self.pos_neg_pos[2].body()))
            f.write("var neu_pos_neg = [\"{0}\", \"{1}\", \"{2}\"];\n".format(self.neu_pos_neg[0].body(), self.neu_pos_neg[1].body(), self.neu_pos_neg[2].body()))
            f.write("var neu_neu_neu = [\"{0}\", \"{1}\", \"{2}\"];\n".format(self.neu_neu_neu[0].body(), self.neu_neu_neu[1].body(), self.neu_neu_neu[2].body()))
            f.write("var neu_neg_pos = [\"{0}\", \"{1}\", \"{2}\"];\n".format(self.neu_neg_pos[0].body(), self.neu_neg_pos[1].body(), self.neu_neg_pos[2].body()))
            f.write("var neg_pos_neg = [\"{0}\", \"{1}\", \"{2}\"];\n".format(self.neg_pos_neg[0].body(), self.neg_pos_neg[1].body(), self.neg_pos_neg[2].body()))
            f.write("var neg_neg_neg = [\"{0}\", \"{1}\", \"{2}\"];\n".format(self.neg_neg_neg[0].body(), self.neg_neg_neg[1].body(), self.neg_neg_neg[2].body()))

            f.write("var pos_pos_pos_fillers = [\"{0}\", \"{1}\", \"{2}\"];\n".format(self.pos_pos_pos_fillers[0], self.pos_pos_pos_fillers[1], self.pos_pos_pos_fillers[2]))
            f.write("var pos_neg_pos_fillers = [\"{0}\", \"{1}\", \"{2}\"];\n".format(self.pos_neg_pos_fillers[0], self.pos_neg_pos_fillers[1], self.pos_neg_pos_fillers[2]))
            f.write("var neu_pos_neg_fillers = [\"{0}\", \"{1}\", \"{2}\"];\n".format(self.neu_pos_neg_fillers[0], self.neu_pos_neg_fillers[1], self.neu_pos_neg_fillers[2]))
            f.write("var neu_neu_neu_fillers = [\"{0}\", \"{1}\", \"{2}\"];\n".format(self.neu_neu_neu_fillers[0], self.neu_neu_neu_fillers[1], self.neu_neu_neu_fillers[2]))
            f.write("var neu_neg_pos_fillers = [\"{0}\", \"{1}\", \"{2}\"];\n".format(self.neu_neg_pos_fillers[0], self.neu_neg_pos_fillers[1], self.neu_neg_pos_fillers[2]))
            f.write("var neg_pos_neg_fillers = [\"{0}\", \"{1}\", \"{2}\"];\n".format(self.neg_pos_neg_fillers[0], self.neg_pos_neg_fillers[1], self.neg_pos_neg_fillers[2]))
            f.write("var neg_neg_neg_fillers = [\"{0}\", \"{1}\", \"{2}\"];\n".format(self.neg_neg_neg_fillers[0], self.neg_neg_neg_fillers[1], self.neg_neg_neg_fillers[2]))

            message = "JavaScript generated..."

        return message


