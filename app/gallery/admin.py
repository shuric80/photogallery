# -*- coding:utf-8 -*-

from flask import request, redirect, url_for
from wtforms import TextAreaField
from wtforms.widgets import TextArea
import flask_login as login
from flask_admin.contrib.sqla import ModelView
from flask_admin import AdminIndexView, helpers, expose, form
from jinja2 import Markup
from form import LoginForm
from app import logger
from models import file_path


class CKTextAreaWidget(TextArea):
    def __call__(self, field, **kwargs):
        if kwargs.get('class'):
            kwargs['class'] += " ckeditor"
        else:
            kwargs.setdefault('class', 'ckeditor')
        return super(CKTextAreaWidget, self).__call__(field, **kwargs)

    
class CKTextAreaField(TextAreaField):
    widget = CKTextAreaWidget()

    
class BaseView(ModelView):

    def is_accessible(self):
       return login.current_user.is_authenticated

    def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for('login', next=request.url))

    form_overrides = dict(content=CKTextAreaField)

    create_template = 'edit.html'
    edit_template = 'edit.html'


class MailView(BaseView):
    pass


class EventView(BaseView):
    def _list_thumbnail(view, context, model, name):
        if not model.photo:
            return ''

        return Markup('<img src="%s"' % url_for('static',filename=form.thumbgen_filename(model.photo)))

    column_formatters = {
        'photo': _list_thumbnail
    }

    form_extra_fields = {
        'photo': form.ImageUploadField('Image',
                                       base_path=file_path,
                                       thumbnail_size=(400, 300, True))
    }

    column_exclude_list = ('event')



class ImageAdmin(ModelView):

    def is_accessible(self):
        return login.current_user.is_authenticated

    def _list_thumbnail(view, context,model, name):
        if not model.path:
            return ''

        return Markup('<img src="%s">' % url_for('static', filename=form.thumbgen_filename(model.path)))

    column_formatters = {
        'path':_list_thumbnail  
    }

    form_extra_fields = {
        'path': form.ImageUploadField('Image',
                                      base_path=file_path,
                                      thumbnail_size=(400, 300, True))
    }


class AdminView(ModelView):

    def is_accessible(self):
        return login.current_user.is_authenticated

    column_exclude_list = ('_password_hash')


class UserView(ModelView):
    def is_accessible(self):
        return login.current_user.is_authenticated


class CustomAdminIndexView(AdminIndexView):

    @expose('/')
    def index(self):
        if not login.current_user.is_authenticated:
            return redirect(url_for('.login_view'))

        return super(CustomAdminIndexView, self).index()

    
    @expose('/login/', methods=('GET','POST'))
    def login_view(self):
        logger.info('LOGIN')
        form = LoginForm(request.form)
        logger.debug(form)
        if helpers.validate_form_on_submit(form):
            user = form.get_user()
            login.login_user(user)

        if login.current_user.is_authenticated:
            return redirect(url_for('.index'))
        
        link = '<p>Input login and pasword for admin.</p>'
        self._template_args['form'] = form
        self._template_args['link'] = link
        return super(CustomAdminIndexView, self).index()

    @expose('logout')
    def logout_view(self):
        login.logout_user()
        return redirect(url_for('.index'))

