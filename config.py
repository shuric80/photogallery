#-*- coding:utf-8 -*-

import os

class BaseConfig(object):
    DEBUG = False
    SECRET_KEY = "adqacfsae4adasae23"
    DATABASE_URL = os.path.join(os.path.dirname(__file__),'app.db')
    SQLALCHEMY_DATABASE_URI = 'sqlite:///{}'.format(DATABASE_URL)
    CSRF_ENABLED = True
    BOWER_COMPONENTS_ROOT = '../bower_components'
    SQLALCHEMY_TRACK_MODIFICATIONS = True

    
class DevelopmentConfig(BaseConfig):
    DEBUG= False

class DebugConfig(BaseConfig):
    DEBUG = True
    
