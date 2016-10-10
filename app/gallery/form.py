#-*- coding:utf-8 -*-

from wtforms import form, fields, validators
from models import SuperUser

class LoginForm(form.Form):
    login = fields.TextField(validators=[validators.required()])
    password = fields.PasswordField(validators=[validators.required()])

    def validate_login(self, field):

        admin = SuperUser.query.filter_by(login =self.login.data).first()
        if not admin or not admin.check_password_hash(self.password.data):
            raise validators.ValidationError('Invalid login or password')
                      
