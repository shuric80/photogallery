#-*- coding:utf-8 -*-

import os

class BaseConfig(object):
    DEBUG = False
    SECRET_KEY = "adasae23"
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    CSRF_ENABLED = True
    ROOT_PATH = os.path.abspath(os.path.dirname(__file__))
    BOWER_COMPONENTS_ROOT = '../bower_components'
    RECAPTCHA_PARAMETERS = {'hl': 'zh', 'render': 'explicit'}
    RECAPTCHA_PUBLIC_KEY = 'public'
    RECAPTCHA_USE_SSL = False
    RECAPTCHA_PUBLIC_KEY = 'public'  
    RECAPTCHA_PRIVATE_KEY = 'private'
    RECAPTCHA_OPTIONS = {'theme': 'white'}

class DevelopmentConfig(BaseConfig):
    DEBUG= False

class DebugConfig(BaseConfig):
    DEBUG = True
    
