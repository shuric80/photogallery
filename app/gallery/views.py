#-*- coding:utf-8 -*-
from flask import render_template, abort
from jinja2 import TemplateNotFound

from . import gallery
from . import logger

logger.info('Load views')

@gallery.route('/')
def index():
    logger.debug('index')
    return render_template('index.html')
    
