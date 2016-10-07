#-*- coding:utf-8 -*-

import subprocess

from app import manager
from app.extlog import logger

logger.info('Start app')


if __name__ == '__main__':
    manager.run()
    
    
