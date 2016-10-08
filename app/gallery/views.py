#-*- coding:utf-8 -*-

from threading import Thread
import  markdown 

from flask import render_template, abort, \
    request, flash, \
    redirect, Response, \
    jsonify, Blueprint

from jinja2 import TemplateNotFound

#from . import gallery
from app import logger, mail, app
from models import User, Admin
from flask_mail import Message

logger.info('Load views')

mod = Blueprint('event',__name__, url_prefix='/event', template_folder='templates') 

def _send_async_email(msg):
    with app.app_context():
        mail.send(msg)

def _send_email_backup(user):
    admin =Admin.query.fisrt()
    subject = 'new user'
    email_sender = app.config.get('ADMINS')[0]
    
    msg = Message(subject, sender=email_sender, recipients=[admin.email])
    msg.html = render_template('admin_mail.html', user=user)
    
    thr =Thread(target=_send_async_email, args=[msg])
    thr.start()

    
        
def _send_mail(user):
    subject = 'Registration'
    email_sender = app.config.get('ADMINS')[0]
    
    msg = Message(subject, sender=email_sender, recipients=[user.email])
    msg.html = render_template('mail.html', user=user)
    
    thr =Thread(target=_send_async_email, args=[msg])
    thr.start()


def markdown_to_html(md_txt):
    """Convert markdowm to html

    """
    html = markdown.markdown(md_txt.decode('utf-8'), ['markdown.extensions.extra']) \
                   .replace('<table>','<table class="table table-border table-condensed">')
    return html


@mod.route('/', methods=['GET'])
def index():

    return render_template('index.html',content=None)
    

@mod.route('/registration', methods=['POST'])
def register():
    if request.method == 'POST':
        logger.info('Registration POST: %s%s%s' %(request.form['email'],request.form['name'], request.form['tel']))
        user = User()
        user.name = request.form.get('name',None)
        user.email = request.form.get('email',None)
        user.tel = request.form.get('tel',None)
        user.msg = request.form.get('message',None)

        if not user.is_valid:
            logger.error('No valid form. Request:%s' % request)
            return Response('Error:')

        try:
           user.save()
        except:
            logger.error('Don\'t save in base. Request:%s' %request)
            return Response('Error')
        
        logger.info('Register:Done!')
        _send_mail(user)
        _send_email_backup(user)
        return Response('ok')

    else:
        return Response('Error:')

    
