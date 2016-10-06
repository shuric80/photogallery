#-*- coding:utf-8 -*-
import sys

from datetime import datetime

from sqlalchemy import Boolean, Column, Integer,Unicode, Date
from sqlalchemy import ForeignKey, create_engine
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('sqlite:///mail.db', echo=False)
Base = declarative_base()


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(Unicode(128),nullable=False)
    tel = Column(Unicode(20), nullable=False)
    email = Column(Unicode(64), nullable=False)
    message = Column(Unicode(1024))
    tstamp = Column(Date, default = datetime.utcnow)
       


class Content(Base):
    __tablename__ = 'content'

    id = Column(Integer, primary_key=True)
    content = Column(Unicode(2058))
    tstamp = Column(Date, default = datetime.utcnow)
    hidden = Column(Boolean, default = True)