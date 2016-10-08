#-*- coding:utf-8 -*-

import bcrypt
from datetime import datetime
from sqlalchemy import Boolean, Column, Integer,Unicode, Date
from app import db

class MixinModel:
    def save(self):
        db.session.add(self)
        db.session.commit()

class Admin(db.Model, MixinModel):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    login = Column(Unicode(128), nullable=True)
    email = Column(Unicode(128), nullable=True)
    password_hash = Column(Unicode(1028), nullable=True)

    def check_password(self,plain_text_password):
        return bcrypt.checkpw(plain_text_password,self.password_hash)
 
    @property
    def password(self, password_text):
        self.password_hash = bcrypt.hashpw(password_text, bcrypt.gensalt())

        
        
class User(db.Model, MixinModel):
    __tablename__ = 'register_user'

    id = Column(Integer, primary_key=True)
    name = Column(Unicode(128),nullable=False)
    tel = Column(Unicode(20), nullable=False)
    email = Column(Unicode(64), nullable=False)
    message = Column(Unicode(1024))
    tstamp = Column(Date, default = datetime.utcnow)

    @property
    def is_valid(self):
        if self.name and self.tel and self.email:
            return True
        else:
            return False



class Content(db.Model, MixinModel):
    __tablename__ = 'content'

    id = Column(Integer, primary_key=True)
    content = Column(Unicode(2058))
    tstamp = Column(Date, default = datetime.utcnow)



    
class Mail:
    __tablename__ = 'mail'

    id = Column(Integer, primary_key=True)
    subject = Column(Unicode(1024))
    body = Column(Unicode(2048))
    
    
