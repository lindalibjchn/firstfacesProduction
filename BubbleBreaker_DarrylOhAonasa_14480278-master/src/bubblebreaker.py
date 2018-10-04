import praw
from config_constants import *
from article_parser import ArticleParser
from text_summarise import TextSummarise
from comment_utilities import CommentUtilities
from tagged_comment import TaggedComment
from select_comments import SelectComments
from filler_text_generator import FillerTextGenerator
from HTML_generator import HTMLGenerator
from javascript_generator import JavaScriptGenerator

'''
	Bubble Breaker, Darryl o hAonasa (07/10/17 - 5/04/18)

	The following must be installed to run Bubble breaker:
		- NLTK
		- PRAW
		- Beautiful Soup
		- Gensim (NumPy, SciPy)
		- nltk.download('vader-lexicon') command must be run prior to program execution.
		- Twython (to suppress sentiment analysis warnings)
'''

# Reddit instance and thread selection
reddit = praw.Reddit(client_id = CLIENT_ID, client_secret = CLIENT_SECRET, user_agent = USER_AGENT)
subreddit = reddit.subreddit(SUBREDDIT)
thread_list = subreddit.top(THREAD_FILTER) # return list of top threads from past 24 hours.

no_user_option = False # should be 'False' for running normally.
thread_options_list = []
thread = None

if not no_user_option:
	for i in range(0, NUM_THREAD_OPTIONS):
		thread_options_list.append(thread_list.next())
		print("\n{0}. \"{1}\"".format(i + 1, thread_options_list[i].title))

	index = int(input("\nWhat would you like to read about? "))
	thread = thread_options_list[index - 1]
else:
	thread = reddit.submission('87bbio') # hard code the thread.


# Return and parse the text of the article at the given URL.
parser = ArticleParser(thread.url) # thread.url
article_text = parser.parse() # raw text of the article

# Summarise the article
summariser = TextSummarise(article_text, SUMMARY_RATIO, MIN_FREQ, MAX_FREQ) # article_text
summary_text = summariser.summarise_article()


# User comments
thread.comment_sort = COMMENT_FILTER
thread.comments.replace_more(limit = 0)

all_comments = thread.comments

# 'all_comments' contains every root comment, and excludes deleted/removed comments.
all_comments = CommentUtilities.filter_deleted_comments(all_comments)
all_comments = CommentUtilities.filter_root_comments(all_comments, MIN_REPLIES)

# 'root_comments' contains the same as 'all_comments', but limited to 'MAX_COMMENTS' number of comments.
root_comments = all_comments

if len(root_comments) > MAX_COMMENTS:
    del root_comments[MAX_COMMENTS:len(root_comments)]

# Create lists of tagged comments, and compute the polarity scores for each.
tagged_root_comments = []
tagged_all_comments = []

for comment in root_comments:
	comment_sentiment = CommentUtilities.compute_comment_sentiment(comment.body)
	tagged_root_comments.append(TaggedComment(comment, comment_sentiment))

for comment in all_comments:
	comment_sentiment = CommentUtilities.compute_comment_sentiment(comment.body)
	tagged_all_comments.append(TaggedComment(comment, comment_sentiment))


# 0.0 <= swing <= 1.0
# 0.0, 0.2, 0.4, 0.5, 0.6, 0.8, 1.0
swing = 1.0
sel = SelectComments(tagged_root_comments, swing)
comment_options = sel.options
selected_comments = sel.get_comments(tagged_all_comments)

for comment in selected_comments:
	comment.set_body(CommentUtilities.clean_comment(comment.body()))

filler_text = FillerTextGenerator()

fillers = []
fillers.append(filler_text.generate_text_for_root(selected_comments[0], comment_options[0]))
fillers.append(filler_text.generate_text(selected_comments[0], selected_comments[1], comment_options[0], comment_options[1]))
fillers.append(filler_text.generate_text(selected_comments[1], selected_comments[2], comment_options[1], comment_options[2]))


# Generate every combination of comment options.
# This then allows for the 'explore' slider on the webpage.
# options = [0.0, 0.2, 0.4, 0.5, 0.6, 0.8, 1.0]

# POS POS POS 1.0
pos_pos_pos_fillers = []
choose_comments = SelectComments(tagged_root_comments, 1.0)
pos_pos_pos_options = choose_comments.options
pos_pos_pos = choose_comments.get_comments(tagged_all_comments)

for comment in pos_pos_pos:
	comment.set_body(CommentUtilities.clean_comment(comment.body()))

pos_pos_pos_fillers.append(filler_text.generate_text_for_root(pos_pos_pos[0], pos_pos_pos_options[0]))
pos_pos_pos_fillers.append(filler_text.generate_text(pos_pos_pos[0], pos_pos_pos[1], pos_pos_pos_options[0], pos_pos_pos_options[1]))
pos_pos_pos_fillers.append(filler_text.generate_text(pos_pos_pos[1], pos_pos_pos[2], pos_pos_pos_options[1], pos_pos_pos_options[2]))


# POS NEG POS 0.8
pos_neg_pos_fillers = []
choose_comments = SelectComments(tagged_root_comments, 0.8)
pos_neg_pos_options = choose_comments.options
pos_neg_pos = choose_comments.get_comments(tagged_all_comments)

for comment in pos_neg_pos:
	comment.set_body(CommentUtilities.clean_comment(comment.body()))

pos_neg_pos_fillers.append(filler_text.generate_text_for_root(pos_neg_pos[0], pos_neg_pos_options[0]))
pos_neg_pos_fillers.append(filler_text.generate_text(pos_neg_pos[0], pos_neg_pos[1], pos_neg_pos_options[0], pos_neg_pos_options[1]))
pos_neg_pos_fillers.append(filler_text.generate_text(pos_neg_pos[1], pos_neg_pos[2], pos_neg_pos_options[1], pos_neg_pos_options[2]))


# NEU POS NEG 0.6
neu_pos_neg_fillers = []
choose_comments = SelectComments(tagged_root_comments, 0.6)
neu_pos_neg_options = choose_comments.options
neu_pos_neg = choose_comments.get_comments(tagged_all_comments)

for comment in neu_pos_neg:
	comment.set_body(CommentUtilities.clean_comment(comment.body()))

neu_pos_neg_fillers.append(filler_text.generate_text_for_root(neu_pos_neg[0], neu_pos_neg_options[0]))
neu_pos_neg_fillers.append(filler_text.generate_text(neu_pos_neg[0], neu_pos_neg[1], neu_pos_neg_options[0], neu_pos_neg_options[1]))
neu_pos_neg_fillers.append(filler_text.generate_text(neu_pos_neg[1], neu_pos_neg[2], neu_pos_neg_options[1], neu_pos_neg_options[2]))


# NEU NEU NEU 0.5
neu_neu_neu_fillers = []
choose_comments = SelectComments(tagged_root_comments, 0.5)
neu_neu_neu_options = choose_comments.options
neu_neu_neu = choose_comments.get_comments(tagged_all_comments)

for comment in neu_neu_neu:
	comment.set_body(CommentUtilities.clean_comment(comment.body()))

neu_neu_neu_fillers.append(filler_text.generate_text_for_root(neu_neu_neu[0], neu_neu_neu_options[0]))
neu_neu_neu_fillers.append(filler_text.generate_text(neu_neu_neu[0], neu_neu_neu[1], neu_neu_neu_options[0], neu_neu_neu_options[1]))
neu_neu_neu_fillers.append(filler_text.generate_text(neu_neu_neu[1], neu_neu_neu[2], neu_neu_neu_options[1], neu_neu_neu_options[2]))


# NEU NEG POS 0.4
neu_neg_pos_fillers = []
choose_comments = SelectComments(tagged_root_comments, 0.4)
neu_neg_pos_options = choose_comments.options
neu_neg_pos = choose_comments.get_comments(tagged_all_comments)

for comment in neu_neg_pos:
	comment.set_body(CommentUtilities.clean_comment(comment.body()))

neu_neg_pos_fillers.append(filler_text.generate_text_for_root(neu_neg_pos[0], neu_neg_pos_options[0]))
neu_neg_pos_fillers.append(filler_text.generate_text(neu_neg_pos[0], neu_neg_pos[1], neu_neg_pos_options[0], neu_neg_pos_options[1]))
neu_neg_pos_fillers.append(filler_text.generate_text(neu_neg_pos[1], neu_neg_pos[2], neu_neg_pos_options[1], neu_neg_pos_options[2]))


# NEG POS NEG 0.2
neg_pos_neg_fillers = []
choose_comments = SelectComments(tagged_root_comments, 0.2)
neg_pos_neg_options = choose_comments.options
neg_pos_neg = choose_comments.get_comments(tagged_all_comments)

for comment in neg_pos_neg:
	comment.set_body(CommentUtilities.clean_comment(comment.body()))

neg_pos_neg_fillers.append(filler_text.generate_text_for_root(neg_pos_neg[0], neg_pos_neg_options[0]))
neg_pos_neg_fillers.append(filler_text.generate_text(neg_pos_neg[0], neg_pos_neg[1], neg_pos_neg_options[0], neg_pos_neg_options[1]))
neg_pos_neg_fillers.append(filler_text.generate_text(neu_neg_pos[1], neg_pos_neg[2], neg_pos_neg_options[1], neg_pos_neg_options[2]))


# NEG NEG NEG 0.0
neg_neg_neg_fillers = []
choose_comments = SelectComments(tagged_root_comments, 0.0)
neg_neg_neg_options = choose_comments.options
neg_neg_neg = choose_comments.get_comments(tagged_all_comments)

for comment in neg_neg_neg:
	comment.set_body(CommentUtilities.clean_comment(comment.body()))

neg_neg_neg_fillers.append(filler_text.generate_text_for_root(neg_neg_neg[0], neg_neg_neg_options[0]))
neg_neg_neg_fillers.append(filler_text.generate_text(neg_neg_neg[0], neg_neg_neg[1], neg_neg_neg_options[0], neg_neg_neg_options[1]))
neg_neg_neg_fillers.append(filler_text.generate_text(neg_neg_neg[1], neg_neg_neg[2], neg_neg_neg_options[1], neg_neg_neg_options[2]))


# Program statistics
print("\n\nSummary statistics:")
print("Article length:", len(article_text)) # article_text
print("Summary length:", len(summary_text))
print("Desired % reduction:", summariser.desired_percentage_reduction(), '%')
print("Actual % reduction:", "{:2.2f} %".format(summariser.actual_percentage_reduction()))

print("\nComments options:", comment_options)

print("\nPolarity scores:")
print("X:", selected_comments[0].sentiment())
print("Y:", selected_comments[1].sentiment())
print("Z:", selected_comments[2].sentiment())

# Generate a HTML page to present results.
html_page = HTMLGenerator(thread.title, thread.url, summary_text, fillers, selected_comments, comment_options)
html_response = html_page.generate_page()

# Write all the comment combinations as variables to a JavaScript file.
js_script = JavaScriptGenerator(pos_pos_pos, pos_neg_pos, neu_pos_neg, neu_neu_neu, neu_neg_pos,
				neg_pos_neg, neg_neg_neg, pos_pos_pos_fillers, pos_neg_pos_fillers, neu_pos_neg_fillers,
				neu_neu_neu_fillers, neu_neg_pos_fillers, neg_pos_neg_fillers, neg_neg_neg_fillers)
js_response = js_script.generate_script()


print("\n\n{0}".format(html_response))
print("{0}".format(js_response))
print("Finished OK!")
