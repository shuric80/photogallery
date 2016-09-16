#-*- coding:utf-8 -*-

import subprocess
from flask.ext.script import Shell, Manager
from flask_migrate import Migrate, MigrateCommand

from app import app#create_app, init_app
from app.extlog import logger

logger.info('Start app')

#migrate = Migrate(app, db)
manager = Manager(app)

@manager.command
def clean():
    clean_pyc = "find . -name *.pyc -delete".split()
    subprocess.call(clean_pyc)

@manager.command
def create_admin():
    db.drop_all()
    db.create_all()

    root = User(username='admin',email='admin@mail.ru', password='admin')
    root.save()
    

manager.add_command('shell', Shell(make_context=lambda:{'app':app}))
manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run()
    
    
