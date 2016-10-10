import os
from flask import session, redirect, url_for
from wtforms import TextAreaField
from wtforms.widgets import TextArea
from flask.ext import login
from flask_admin.contrib.sqla import ModelView
from flask_admin import AdminIndexView
from flask_admin import helpers, expose
from flask_login import current_user


class CKTextAreaWidget(TextArea):
    def __call__(self, field, **kwargs):
        if kwargs.get('class'):
            kwargs['class'] += " ckeditor"
        else:
            kwargs.setdefault('class', 'ckeditor')
        return super(CKTextAreaWidget, self).__call__(field, **kwargs)

    
class CKTextAreaField(TextAreaField):
    widget = CKTextAreaWidget()

    
class ContentAdmin(ModelView):

    def inaccessible_callback(self, name, **kwargs):
        # redirect to login page if user doesn't have access
        return redirect(url_for('login', next=request.url))

    form_overrides = dict(text=CKTextAreaField)

    create_template = 'edit.html'
    edit_template = 'edit.html'


class AdminView(ModelView):
    excluded_list_column = ('password',)
    execlude_list = ['password']


def logged_in():
    return session.get('logged')


class CustomAdminIndexView(AdminIndexView):

    def is_accessible(self):
        #return current_user.is_authenticated
        return logged_in()

    @expose('/')
    def index(self):
        if not logged_in():
            return redirect(url_for('.login_view'))

        return super(CustomAdminIndexView, self).index()

    @expose('/login/', methods=('GET','POST'))
    def login_view(self):
        form = LoginForm(request.form)
        if helpers.validate_form_on_submit(form):
            user = form.get_user()
            login.login_user(user)
            session.update({'logged':True})
            session.modified = True

        if logged_in():
            return redirect(url_for('.index'))

        link = '<p>Don\'t have account?<a href="'+url_for('.register_view')+'">Click here to register</a></p>'
        self._template_args['form'] = form
        self._template_args['link'] = link
        return super(CustomAdminIndexView, self).index()

    @expose('logout')
    def logout_view(self):
        session.pop('logged',None)
        return redirect(url_for('.index'))
