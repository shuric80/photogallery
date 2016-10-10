from wtforms import TextAreaField
from wtforms.widgets import TextArea
from flask.ext import login
from flask_admin.contrib.sqla import ModelView


class CKTextAreaWidget(TextArea):
    def __call__(self, field, **kwargs):
        if kwargs.get('class'):
            kwargs['class'] += " ckeditor"
        else:
            kwargs.setdefault('class', 'ckeditor')
        return super(CKTextAreaWidget, self).__call__(field, **kwargs)

class CKTextAreaField(TextAreaField):
    widget = CKTextAreaWidget()

class TestAdmin(ModelView):
    def is_accessible(self):
        print "Called ME!!!!!!!!"
        return login.current_user.is_authenticated()
        

    def inaccessible_callback(self, name, **kwargs):
        # redirect to login page if user doesn't have access
        return redirect(url_for('login', next=request.url))

    excluded_list_columns = ('password',)
    form_overrides = dict(text=CKTextAreaField)

    create_template = 'edit.html'
    edit_template = 'edit.html'

