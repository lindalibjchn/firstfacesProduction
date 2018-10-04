# from urllib import request
import requests
from bs4 import BeautifulSoup

class ArticleParser:

    def __init__(self, url):
        self.url = url
        self.text = ""


    def parse(self):
        headers = {'User-Agent': 'Bubblebreaker'}
        html = requests.get(self.url)
        soup = BeautifulSoup(html.text, 'html.parser')

        self.text = ' '.join(map(lambda p: p.text, soup.find_all('p')))

        if self.text is "":
            raise ValueError('Cannot parse article from this site!')

        self.__clean_article()
        return self.text


    def get_text(self):
        return self.text


    def __clean_article(self):
        self.text = " ".join(self.text.split())

