#-*-cofing:utf-8 -*-

import os
import logging
from flask import Flask
from extlog import logger
from  gallery import gallery

def create_app():
    app = Flask(__name__)
    app_envvar = os.environ.get('PROJECT_SETTINGS',False)
    
    app.config.from_object(app_envvar)
    logger.debug('Create app')
    return app

def init_app(app):
    app.register_blueprint(gallery)

app = create_app()
init_app(app)
    
