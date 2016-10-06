#-*- coding:utf-8 -*-
import  markdown 
from flask import render_template, abort, \
    request, flash, \
    redirect, Response, \
    jsonify

from jinja2 import TemplateNotFound

from . import gallery
from . import logger
from models import User

#from form import RegisterForm

logger.info('Load views')

class Content():
    def __init__(self):
       self.title = u'title'
       self.head = u'head'
       self.txt = u'text'
       self.photo = 'http://placehold.it/450x300'

    
def markdown_to_html(md_txt):
    """Convert markdowm to html

    """
    html = markdown.markdown(md_txt.decode('utf-8'), ['markdown.extensions.extra']) \
                   .replace('<table>','<table class="table table-border table-condensed">')
    return html


@gallery.route('/', methods=['GET'])
def index():
    content =  Content()
    return render_template('index.html',content=content)
    

@gallery.route('/registration', methods=['POST'])
def register():
    logger.debug('registration')
    if request.method == 'POST':
        logger.info('Registration POST: %s%s' %(request.form['email'],request.form['name']))
        user = User()
        user.name = request.form['name']
        user.email = request.form['email']
        user.tel = request.form['tel']
        user.msg = request.form['msg']

        

    return jsonify('ok')

# e.g. failed to parse json
@gallery.errorhandler(400)
def page_not_found(e):
    return resp(400, {})


@gallery.errorhandler(404)
def page_not_found(e):
    return resp(400, {})


@gallery.errorhandler(405)
def page_not_found(e):
    return resp(405, {})
