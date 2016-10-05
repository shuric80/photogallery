#-*- coding:utf-8 -*-

from flask_wtf import Form, RecaptchaField
from wtforms import TextField,SubmitField


class RegisterForm(Form):
    email = TextField("Email")
    recaptcha = RecaptchaField()
    submit =SubmitField("Send")
    

    
    
