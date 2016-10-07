#-*- coding:utf-8 -*-
import  markdown 

from flask import render_template, abort, \
    request, flash, \
    redirect, Response, \
    jsonify, Blueprint

from jinja2 import TemplateNotFound

#from . import gallery
from app import logger
from models import User

logger.info('Load views')

mod = Blueprint('event',__name__, url_prefix='/event') 

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


@mod.route('/', methods=['GET'])
def index():
    content =  Content()
    return render_template('index.html',content=content)
    

@mod.route('/registration', methods=['POST'])
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

