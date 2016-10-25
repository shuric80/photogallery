# -*- coding:utf-8 -*-

import os
import sys
from flask import Flask, render_template, \
    jsonify, request

from flask_bower import Bower
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, MigrateCommand
from flask_script import Shell, Manager
from flask_script.commands import ShowUrls, Clean
from flask_mail import Mail
from flask_bcrypt import Bcrypt
from flask_admin import Admin
from flaskext.markdown import Markdown
from flask_debugtoolbar import DebugToolbarExtension
import flask_login as login
from extlog import logger


app = Flask(__name__, template_folder='templates')

app.config.from_object('config.DebugConfig')

Markdown(app)

db = SQLAlchemy(app)

mail = Mail(app)

Bower(app)

bcrypt = Bcrypt(app)


#debug_toolbar = DebugToolbarExtension(app) if app.config['DEBUG'] else None


# Initialize flask-login
def init_login():
    login_manager = login.LoginManager()
    login_manager.init_app(app)

    # Create user loader function
    @login_manager.user_loader
    def load_user(user_id):
        return db.session.query(SuperUser).get(user_id)

init_login()

from app.gallery.admin import CustomAdminIndexView


admin = Admin( app, name='frm', \
               base_template = 'master.html', \
               index_view=CustomAdminIndexView())


from app.gallery.admin import AdminView, UserView, \
    EventView, MailView, AboutView, NewsView


from app.gallery.models import SuperUser, User, \
    Event, Mail, News, About


admin.add_view(AdminView(SuperUser, db.session))
admin.add_view(UserView(User, db.session))
admin.add_view(EventView(Event, db.session))   
admin.add_view(MailView(Mail, db.session))
admin.add_view(NewsView(News, db.session))
admin.add_view(AboutView(About, db.session))

"""
    GENERATE SECRET KEY
   """

def install_secret_key(app, filename="secret_key"):
    filename = os.path.join(app.instance_path, filename)
    print filename
    try:
        app.config['SECRET_KEY'] = open(filename, 'r').read()
    except IOError:
        logger.error('Error: No secret key.Create it with:')
        full_path = os.path.dirname(filename)
        if not os.path.dirname(full_path):
            print ('head -c 24 /dev/urandom > {filename}'.format(filename=filename))
            sys.exit(1)

            
if not app.config['DEBUG']:
    install_secret_key(app)


@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404


@app.route('/')
def index():
    debug = app.config['DEBUG']
    return render_template('index.html', debug=debug)


class Post:
    def __init__(self, n):
        self.photo = 'http://placehold.it/300x200'
        self.title = 'title:%s'%n
        self.text = 'text'

        
@app.route('/api/event', methods=['GET'])
def eventAll():
    return jsonify('all')


@app.route('/api/index')
def restindex():
    about_ext = About.query.first()
    news_ext = News.query.first()
    events_ext = Event.query

    about = dict(content=about_ext.content.split('<hr />')[0])
    news = dict(title=news_ext.subject, content=news_ext.content.split('<hr />')[0])

    events = dict()
    cnt = 0
    for event in events_ext[:5]:
        events[cnt] = dict(title=event.title,
                           photo_0='http://placehold.it/300x200',
                           photo_1='http://placehold.it/300x200',
                           photo_2='http://placehold.it/300x200',
                           content=event.content.split('<hr />')[0])
        
    return jsonify(dict(about=about, news=news, events=events))


@app.route('/api/event/<id>', methods=['GET','POST'])
def event(id):
    logger.debug(id)
    return jsonify(id)


migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('shell', Shell(make_context=lambda: {'app': app}))
manager.add_command('db', MigrateCommand)
manager.add_command('show-urls', ShowUrls)
manager.add_command('clean', Clean)

#from app.gallery.views import *

from app.gallery.views import mod as frm
app.register_blueprint(frm)

from app.gallery.models import SuperUser
