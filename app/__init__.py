#-*- coding:utf-8 -*-

import os
import sys
import logging
from flask import Flask
from flask_bower import Bower
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, MigrateCommand
from flask_script import Shell, Manager


from extlog import logger

app =Flask(__name__)
app.config.from_object('config.DebugConfig')

print app.config

db = SQLAlchemy(app)

"""
    GENERATE SECRET KEY
   """

def install_secret_key(app, filename="secret_key"):
    filename = os.path.join(app.instance_path, filename)

    try:
        app.config['SECRET_KEY'] = open(filename,'r').read()
    except IOError:
        print filename
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

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('shell', Shell(make_context=lambda:{'app':app}))
manager.add_command('db', MigrateCommand)

from app.gallery.views import mod as event
app.register_blueprint(event)
