'''
Copyright 2013. All Rights Reserved.
Author: Brian Chan
Contact: bchanx@gmail.com
'''

from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(import_name='web')
app.config.from_object('config')
db = SQLAlchemy(app)

from web import errors, index, fantasy, jukebox

