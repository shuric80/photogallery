#-*- coding:utf-8 -*-

import os
import sys

import logging
from flask import Flask
from flask.ext.bower import Bower
from flask.ext.sqlalchemy import SQLAlchemy

from extlog import logger

app =Flask(__name__)
app.config.from_object('config')

db = SQLAlchemy(app)

"""
    GENERATE SECRET KEY
   """

def install_secret_key(app, filename="secret_key"):
    filename = os.path.join(app.instance_path, filename)

    try:
        app.config['SECRET_KEY'] = open(filename,'r').read()
    except IOError:
        print ('Error: No secret key.Create it with:')
        full_path = os.path.dirname(filename)
        if not os.path.dirname(full_path):
            print ('head -c 24 /dev/urandom > {filename}'.format(filename=filename))
            sys.exit(1)

if not app.config['DEBUG']:
    install_secret_key(app)


@app.errorhandler(404)
def not_found(error):
    return render_to_template('404.html'), 404


from app.gallery.views import mod as event
app.register_blueprint(event)

        
