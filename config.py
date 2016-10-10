# coding: utf-8
import os

class BaseConfig(object):
    DEBUG = False
    SECRET_KEY = "MY_VERY_SECRET_KEY"
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    CSRF_ENABLED = True
    ROOT_PATH = os.path.abspath(os.path.dirname(__file__))

    BLUEPRINTS = [
        'auth.base',
        'info.info',
        'shop.shop_route',
        'resources.resource'
    ]

    EXTENSIONS = [
        'ext.db',
        #'ext.login_manager',
        #'ext.gravatar',
        #'ext.toolbar',
        # If you want Flask-RESTPlus out of the box
        # 'ext.api',
    ]

    CONTEXT_PROCESSORS = [
       # 'auth.context_processors.common_context',
       # 'auth.context_processors.navigation',
       # 'auth.context_processors.common_forms',
    ]

    CSS_BASE_BUNDLE = [
        'css/reset.css',
        'css/typo.css',
        'css/style.css',
        'css/page.css',
        'css/forms.css',
    ]

    JS_BASE_BUNDLE = [
        'js/libs/jquery-1.11.3.js',
        'js/libs/underscore-1.8.3.js',
        'js/libs/backbone-1.2.0.js',
    ]


class DevelopmentConfig(BaseConfig):
    DEBUG = True
    DEBUG_TB_PROFILER_ENABLED = True
    DEBUG_TB_INTERCEPT_REDIRECTS = False


class TestingConfig(BaseConfig):
    TESTING = True


class DebugConfig(BaseConfig):
    DEBUG = True
    DEBUG_TB_PROFILER_ENABLED = True
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'
