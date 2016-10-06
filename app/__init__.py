#-*- coding:utf-8 -*-

import os
import sys

import logging
from flask import Flask
from flask.ext.bower import Bower
from flask.ext.sqlalchemy import SQLAlchemy

from extlog import logger


fl = "hello"

def create_app():
    app = Flask(__name__)
    app_envvar = os.environ.get('PROJECT_SETTINGS',False)
    
    app.config.from_object(app_envvar)
    logger.debug('Create app')
    return app


from  gallery import gallery
def init_app(app):
    
    app.register_blueprint(gallery)
    Bower(app)

app = create_app()
db = SQLAlchemy(app)
init_app(app)
    
