from filler_text import FillerText

'''
    Darryl o hAonasa
    Program configuration and constant values.
'''

# Reddit Authorisation
CLIENT_ID = 'o6vQfnmzh4Pg3w'
CLIENT_SECRET = 'wkmfvonjIbuGM_38-vAwEcTGwpY'
USER_AGENT = 'bubblebreaker by /u/bubblebreakerdarryl'
SUBREDDIT = 'worldnews'
THREAD_FILTER = 'day'
COMMENT_FILTER = 'best'

# How many story options will be presented to the user to choose from.
NUM_THREAD_OPTIONS = 4

# Summarisation
SUMMARY_RATIO = 0.3 # i.e. 0.3 indicates summary length 30% that of the original (so 70% reduction).
MIN_FREQ = 0.1 # words less frequent than e.x. 0.1 (10%) are discarded when summarising.
MAX_FREQ = 0.9 # same as above, but for more frequent words.

# Comments Utilities
MAX_COMMENTS = 70 # The maximum number of comments retrieved from Reddit for analysis.
MIN_REPLIES = 4 # Comments with fewer replies will be ignored (since our X/Y pair are directly related).
USELESS_SYMBOLS = ['*', '>', '_', '^', '~'] # Reddit formatting symbols that can be removed.

# Filler text options
IGNORE_OPTIONS = [] # list of filler text options that should be ignored by the generator (avoids repetition).

POS_POS = [
    FillerText("Similarly, {0} agreed, writing:", 101),
    FillerText("User {0} was of the same opinion, adding:", 102),
    FillerText("Other users shared positive opinions on the issue, such as {0} who had this to say:", 103)
]

POS_NEG = [
    FillerText("However {0} couldn't agree, repsonding with:", 201),
    FillerText("Although disagreeing with the above point, {0} offers insight into why, replying with:", 202),
    FillerText("User {0} however chose to ignore this positivity, replying instead with a pessimistic belief:", 203),
    FillerText("But user {0} disagreed with this point, and instead thought:", 204)
]

NEG_NEG = [
    FillerText("Another user, {0}, shared a similarly negative view on the topic, adding:", 301),
    FillerText("{0} was of the same opinion, adding:", 302),
    FillerText("Continuing the trend of negativity, {0} wrote:", 303)
]

NEG_POS = [
    FillerText("Disagreeing with the above point, {0} was of the opinion:", 401),
    FillerText("Providing a more positive opinion, {0} thought:", 402),
    FillerText("On a more positive note, {0} had this to say:", 403)
]

NEU_NEU = [
    FillerText("User {0} was of the same opinion, adding:", 501),
    FillerText("Taking a similarly neutral stance, {0} responded:", 502),
    FillerText("Following this, user {0} also made their opinion known, responding with:", 503)
]

NEU_POS = [
    FillerText("Other users shared positive opinions on the issue, such as {0} who had this to say:", 601),
    FillerText("Despite neutral responses, user {0} took a more positive view of the issue, stating:", 602),
    FillerText("{0} however saw the positive side of the story, and thought this:", 603)
]

NEU_NEG = [
    FillerText("Other users shared more negative opinions on the issue, such as {0} who said:", 701),
    FillerText("{0} chose to ignore a balanced neutral response, and instead replied with a bleaker stance:", 702),
    FillerText("{0} however saw the negative side of the story, and thought this:", 703)
]

ROOT_POS = [
    FillerText("User {0} had a positive opinion on the issue, writing:", 801)
]

ROOT_NEG = [
    FillerText("User {0} had a negative opinion on the issue, writing:", 901)
]

ROOT_NEU = [
    FillerText("User {0} maintained a neutral opinion on the issue, writing:", 1001)
]

