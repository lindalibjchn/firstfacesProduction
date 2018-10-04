'''
	Generate a HTML page presenting the information in the desired format, i.e.
	Headline, Summary, User Opinions.
'''

class HTMLGenerator:

	def __init__(self, article_title, article_URL, summary, fillers, comments, styles):
		self.PAGE_FILE = '../web/bubblebreaker.html'

		self.article_title = article_title
		self.article_URL = article_URL
		self.summary = summary
		self.fillers = fillers
		self.comments = comments
		self.styles = []

		for s in styles:
			if s == '+':
				self.styles.append("pos")
			elif s == '-':
				self.styles.append("neg")
			else:
				self.styles.append("neu")

		self.page = []
		self.header = self.__generate_header()



	def generate_page(self):
		message = "Failed to generate HTML page..."

		self.__generate_page_elements()

		# clear file, and write 'page' to the file.
		with open(self.PAGE_FILE, 'r+') as f:
			f.truncate()

			for element in self.page:
				f.write(element)

			message = "HTML page generated..."

		return message


	def __generate_page_elements(self):
		self.page.append("<!DOCTYPE html>\n<html lang=\"en\">")
		self.page.append(self.header)
		self.page.append("<body>\n<div id=\"article_title\">\n")
		self.page.append("<h2>{0}</h2>\n".format(self.article_title))
		self.page.append("</div>\n")
		self.page.append("<div id=\"article_URL\">\n")
		self.page.append("<a href=\"{0}\">From: {1}</a>\n".format(self.article_URL, self.article_URL))
		self.page.append("</div>\n")
		self.page.append("<div id=\"summary\">\n<p>Summary:</p>\n")
		self.page.append("<p>{0}</p>\n".format(self.summary))
		self.page.append("</div>\n")
		self.page.append("<div id=\"comments\">\n<p>User Opinions:</p>\n")
		self.page.append("<div id=\"slider_container\">\n<input type=\"range\" min=\"0\" max=\"60\" step=\"10\" value=\"60\" oninput=\"update_comments()\" class=\"slider\" id=\"explore_slider\">\n</div>\n") # Slider

		self.page.append("<div class=\"{0}\" id=\"X\">\n".format(self.styles[0]))
		self.page.append("<p id=\"X_filler\">{0}</p>\n".format(self.fillers[0]))
		self.page.append("<p id=\"X_comment\">\"{0}\"</p>\n".format(self.comments[0].body()))
		self.page.append("</div>\n")

		self.page.append("<div class=\"{0}\" id=\"Y\">\n".format(self.styles[1]))
		self.page.append("<p id=\"Y_filler\">{0}</p>\n".format(self.fillers[1]))
		self.page.append("<p id=\"Y_comment\">\"{0}\"</p>\n".format(self.comments[1].body()))
		self.page.append("</div>\n")

		self.page.append("<div class=\"{0}\" id=\"Z\">\n".format(self.styles[2]))
		self.page.append("<p id=\"Z_filler\">{0}</p>\n".format(self.fillers[2]))
		self.page.append("<p id=\"Z_comment\">\"{0}\"</p>\n".format(self.comments[2].body()))
		self.page.append("</div>\n")

		self.page.append("</div><br><br><br>\n")
		self.page.append("</body>\n")
		self.page.append("</html>\n")



	# Static header for every page
	def __generate_header(self):
		header = ""

		header = ("<head>\n<title>Bubble Breaker</title>\n<meta charset=\"utf-8\">\n"
					"<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n"
					"<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\">\n"
					"<script src=\"functions.js\"></script>\n"
        			"<script src=\"opinions.js\"></script>\n"
					"</head>\n"
				)

		return header


