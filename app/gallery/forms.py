#-*- coding: utf-8 -*-

from flask.ext.wtf import Form
from wtforms import fields
from wtforms import validators 

class RegisterForm(Form):
    email = fields.TextField(u'Email',validators=[validators.required()])
    phone = fields.TextField(u'Phone', validators=[validators.required()])
    
