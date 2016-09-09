#-*- coding:utf-8 -*-

from app import create_app, init_app
from app.extlog import logger

logger.info('Start app')

if __name__ == '__main__':
    app = create_app()
    init_app(app)
    app.run()
    
