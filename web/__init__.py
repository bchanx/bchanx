'''
Copyright 2013. All Rights Reserved.
Author: Brian Chan
Contact: bchanx@gmail.com
'''

from flask import Flask
app = Flask(import_name='web')

from web import errors, index, fantasy, jukebox

