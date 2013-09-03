'''
Copyright (c) 2013 Brian Chan (bchanx.com)
All Rights Reserved.
'''

import os
from flask import Flask, current_app, abort
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(import_name='web')
app.config.from_object('config.Properties')
db = SQLAlchemy(app)

from web import errors, index, fantasy, jukebox, models, filters, blog, demo

@app.route('/dist/<filename>')
def serve(filename):
  if filename and os.sep not in filename:
    filepath = os.path.join('dist', filename)
    if os.path.exists(os.path.join(current_app.static_folder, filepath)):
      # Flask send_static_file does not like Window's os.sep. :(
      return app.send_static_file('dist/' + filename)
  abort(404)
