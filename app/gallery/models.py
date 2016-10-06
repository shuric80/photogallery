#-*- coding:utf-8 -*-
import sys

from datetime import datetime

from sqlalchemy import Boolean, Column, Integer,Unicode, Date

from app import db


class User(db.Model):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(Unicode(128),nullable=False)
    tel = Column(Unicode(20), nullable=False)
    email = Column(Unicode(64), nullable=False)
    message = Column(Unicode(1024))
    tstamp = Column(Date, default = datetime.utcnow)
       


class Content(db.Model):
    __tablename__ = 'content'

    id = Column(Integer, primary_key=True)
    content = Column(Unicode(2058))
    tstamp = Column(Date, default = datetime.utcnow)
    hidden = Column(Boolean, default = True)

