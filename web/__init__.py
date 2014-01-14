'''
Copyright (c) 2014 Brian Chan (bchanx.com)
All Rights Reserved.
'''

import os
from flask import Flask, abort, request, send_from_directory
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(import_name='web')
app.config.from_object('config.Properties')
db = SQLAlchemy(app)

from web import errors, index, fantasy, jukebox, models, filters, blog, demo


@app.route('/favicon.ico')
def favicon():
  """Serve /favicon.ico."""
  return send_from_directory(app.static_folder, 'favicon.ico')


@app.before_request
def validate():
  """Minor sanity checks for static files."""
  if request.endpoint == 'static' and ('..' in request.path or \
    not request.path.startswith('/static/') or \
    not os.path.exists(os.path.join(app.static_folder, request.path.split('/static/')[1]))):
      abort(404)

