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
  def render(template, css=None, js=None, status=200):
    ctx = flask.current_app
    root = ctx.root_path
    debug = ctx.debug
    if not template or not os.path.exists(os.path.join(root, ctx.template_folder, template)):
      flask.abort(404)

    css = resolvePath(root, css, debug)
    js = resolvePath(root, js, debug)
    if debug:
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


def resolvePath(root, fname, debug):
  """Return a list containing the absolute path for a static file if found."""
  pathList = []
  if fname:
    if debug:
      fname = 'uncompiled/%s/%s' % (fileType(fname), fname)
    else:
      if fname.endswith('.less'):
        fname = ''.join([fname[:-5], '.css'])
      fname = 'compiled/%s' % fname
    path = staticUrl(root, fname)
    if path:
      pathList.append(path)
  return pathList


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
    settings['port'] = int(os.environ.get('PORT', settings.get('port', 5000)))
  return settings


if __name__ == '__main__':
  settings = loadSettings()
  app.run(**settings)

