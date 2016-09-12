#-*- coding:utf-8 -*-

import os

class BaseConfig(object):
    DEBUG = False
    SECRET_KEY = "adasae23"
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    CSRF_ENABLED = True
    ROOT_PATH = os.path.abspath(os.path.dirname(__file__))
    BOWER_COMPONENTS_ROOT = '../bower_components'

class DevelopmentConfig(BaseConfig):
    DEBUG= False

class DebugConfig(BaseConfig):
    DEBUG = True
    
