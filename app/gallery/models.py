#-*- coding:utf-8 -*-

from app import bcrypt
from datetime import datetime
from sqlalchemy import Column, Integer, \
    Unicode, Text, \
    DateTime, Boolean
from sqlalchemy.ext.hybrid import hybrid_property
#from sqlalchemy_utils import URLType

from app import db


class MixinModel:
    def save(self):
        db.session.add(self)
        db.session.commit()


class SuperUser(db.Model, MixinModel):
    __tablename__ = 'superuser'

    id = Column(Integer, primary_key=True)
    login = Column(Unicode(128), nullable=True)
    email = Column(Unicode(128), nullable=True)
    _password_hash = Column(Unicode(128), nullable=True)

    @hybrid_property
    def password(self):
        return self._password_hash

    @password.setter
    def _set_password(self, plaintext):
        self._password_hash = bcrypt.generate_password_hash(plaintext)

    def is_check_password(self, plaintext):
        return bcrypt.check_password_hash(self._password_hash, plaintext)

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return unicode(self.id)

    def __repr__(self):
        return '<User %r>' % (self.login)



class User(db.Model, MixinModel):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(Unicode(128), nullable=False)
    tel = Column(Unicode(20), nullable=False)
    email = Column(Unicode(64), nullable=False)
    message = Column(Unicode(1024))
    tstamp = Column(DateTime, default=datetime.utcnow)

    @property
    def is_valid(self):
        if self.name and self.tel and self.email:
            return True
        else:
            return False


class Event(db.Model, MixinModel):
    __tablename__ = 'event'

    id = Column(Integer, primary_key=True)
    title = Column(Unicode(512))
    content = Column(Text(10000))
    tstamp = Column(DateTime, default=datetime.utcnow)
    time_start = Column(DateTime)
    time_end = Column(DateTime)
    hidden = Column(Boolean, default=False)


class Mail(db.Model):
    __tablename__ = 'email'

    id = Column(Integer, primary_key=True)
    subject = Column(Unicode(1024))
    text = Column(Text(5000))


class News(db.Model, MixinModel):
    __tablename__ = 'news'

    id = Column(Integer, primary_key=True)
    subject = Column(Unicode(128))
    content = Column(Text(10124))
    tstamp = Column(DateTime, default=datetime.utcnow)
    hidden = Column(Boolean, default=False)


class About(db.Model, MixinModel):
    __tablename__ = 'about'

    id = Column(Integer, primary_key=True)
    content = Column(Text(2048))


class NewsFeed(db.Model, MixinModel):
    __tablename__ = 'newsfeed'

    id = Column(Integer, primary_key=True)
    title = Column(Unicode(128))
    content = Column(Unicode(512))
    #url = Column(URLType)
    tstamp = Column(DateTime, default=datetime.utcnow)
