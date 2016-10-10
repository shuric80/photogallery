#-*- coding:utf-8 -*-

import os
import sys
import logging
from flask import Flask, render_template, \
    request, redirect, flash, \
    url_for

from flask_bower import Bower
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, MigrateCommand
from flask_script import Shell, Manager
from flask_script.commands import ShowUrls, Clean
from flask_mail import Mail
from flask_bcrypt import Bcrypt
from flask_admin import Admin, AdminIndexView
from flaskext.markdown import Markdown
from flask_login import LoginManager
from flask_login import login_user , logout_user , current_user , login_required
from flask_debugtoolbar import DebugToolbarExtension

from extlog import logger

app =Flask(__name__, template_folder='templates')

app.config.from_object('config.DebugConfig')

Markdown(app)

db = SQLAlchemy(app)

mail = Mail(app)

Bower(app)

bcrypt = Bcrypt(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view ='login'


@app.route('/login', methods=['POST','GET'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    login = request.form['login']
    password = request.form['password']
    user = SuperUser.query.filter_by(login=login).first()

    if user ==None or not  user.is_check_password(password):
        logger.error('No correct password')
        flash('Login or password is invalid')
        return redirect(url_for('login'))

    login_user(user)
    flash('Logged in successfully')
    return redirect('/admin')
    
    

@login_manager.user_loader
def load_user(user_id):
    return SuperUser.query.get(user_id)


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect('/admin')


debug_toolbar = DebugToolbarExtension(app)

class MyAdminIndexView(AdminIndexView):
     def is_accessible(self):
        return current_user.is_authenticated

    
admin = Admin(app, name='event', template_mode='bootstrap3',index_view=MyAdminIndexView())



"""
    GENERATE SECRET KEY
   """

def install_secret_key(app, filename="secret_key"):
    filename = os.path.join(app.instance_path, filename)
    print filename
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
    return render_template('404.html'), 404

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('shell', Shell(make_context=lambda:{'app':app}))
manager.add_command('db', MigrateCommand)
manager.add_command('show-urls',ShowUrls)
manager.add_command('clean',Clean)

from app.gallery.views import *

#from app.gallery.views import mod as event
#app.register_blueprint(event)

from app.gallery.models import SuperUser
