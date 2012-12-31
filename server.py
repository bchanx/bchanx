#!/usr/bin/env python
# Copyright 2013 Brian Chan (bchanx@gmail.com).  All Rights Reserved.

import os
import sys
import flask
from flask import Flask, render_template, request


app = Flask(__name__)


@app.route('/')
def index():
  return render('index.html', css='index.less')


@app.errorhandler(404)
def page404(error):
  return render_template('error/404.html'), 404


with app.app_context():
  def render(template, css=[], js=[], status=200):
    ctx = flask.current_app
    root = ctx.root_path
    debug = ctx.debug
    if not template or not os.path.exists(os.path.join(root, ctx.template_folder, template)):
      flask.abort(404)

    css = resolvePaths(root, css, debug)
    js = resolvePaths(root, js, debug)
    # TODO: debug/prod logic
    # if debug:
    js.append(staticUrl(root, 'less.js'))

    settings = {}
    settings['debug'] = debug
    settings['css'] = css
    settings['js'] = js

    return render_template(template, settings=settings), status


def fileType(f):
  """Returns the filetype."""
  if f.endswith('.less'):
    return 'less'
  elif f.endswith('.css'):
    return 'css'
  elif f.endswith('.js'):
    return 'js'


def staticUrl(root, filename):
  """Gets the static url for a file."""
  try:
    if os.path.exists(os.path.join(root, 'static', filename)):
      return flask.url_for('static', filename=filename)
  except Exception as e:
    # log the error
    pass
  return None


def resolvePaths(root, files, debug):
  """Return the list of paths for static files."""
  # TODO: debug/prod paths
  files = [files] if type(files) is str else files if type(files) is list else []
  paths = []
  for f in files:
    filename = 'uncompiled/%s/%s' % (fileType(f), f)
    path = staticUrl(root, filename)
    if path:
      paths.append(path)
  return paths


def loadSettings():
  """Loads argument settings for app server."""
  settings = {}
  for arg in sys.argv:
    if arg.startswith('--'):
      opt = arg[2:].split('=')
      if len(opt):
        settings[opt[0]] = True if len(opt) < 2 else int(opt[1]) if opt[0] == 'port' else opt[1]
  # Run in prod
  if not settings.get('debug', None):
    settings['host'] = '0.0.0.0'
  return settings


if __name__ == '__main__':
  settings = loadSettings()
  app.run(**settings)

