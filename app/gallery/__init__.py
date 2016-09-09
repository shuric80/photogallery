#-*- coding:utf-8 -*-

from flask import Blueprint
from ..extlog import logger

logger.info('Load gallery')

gallery = Blueprint('gallery', __name__,template_folder='templates')

from views import *
