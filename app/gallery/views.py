#-*- coding:utf-8 -*-
import  markdown 
from flask import render_template, abort
from jinja2 import TemplateNotFound

from . import gallery
from . import logger

logger.info('Load views')


def markdown_to_html(md_txt):
    """Convert markdowm to html

    """
    html = markdown.markdown(md_txt.decode('utf-8'), ['markdown.extensions.extra']) \
                   .replace('<table>','<table class="table table-border table-condensed">')
    return html

## Debug mode
class Image:
    def __init__(self, title, txt):
        self.path = u'http://placehold.it/500x350'
        self.title = title
        self.caption = txt

    
@gallery.route('/')
def index():
    logger.debug('index')
    with open('app/gallery/test.md','r') as file:
        md_text = file.read()
        html_body = markdown_to_html(md_text)

    images = list()
    for i in range(4):
        img = Image('title','caption')
        images.append(img)
        
    return render_template('index.html', images=images, content=None)
    
