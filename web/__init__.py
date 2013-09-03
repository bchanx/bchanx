'''
Copyright (c) 2013 Brian Chan (bchanx.com)
All Rights Reserved.
'''

import os
from flask import Flask, current_app, abort, request
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(import_name='web')
app.config.from_object('config.Properties')
db = SQLAlchemy(app)

from web import errors, index, fantasy, jukebox, models, filters, blog, demo


@app.before_request
def validate():
  if request.endpoint == 'static':
    if '..' in request.path or \
    not request.path.startswith('/static/') or \
    not os.path.exists(os.path.join(current_app.static_folder, request.path.split('/static/')[1])) or \
    request.environ.get('HTTP_HOST') not in ['localhost:5000', '127.0.0.1:5000', 'bchanx.com']:
      abort(404)

