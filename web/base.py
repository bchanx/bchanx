'''
Copyright 2013. All Rights Reserved.
Author: Brian Chan
Contact: bchanx@gmail.com
'''

from web import app
import flask
import os
import sys


def render(template, css=None, js=None, status=200, **kwargs):
  """Renders the page."""
  with app.app_context():
    ctx = flask.current_app
    debug = ctx.debug
    if not template or not os.path.exists(os.path.join(ctx.root_path, ctx.template_folder, template)):
      flask.abort(404)

    css = resolvePath(css, debug)
    js = resolvePath(js, debug)
    if debug:
      js = resolvePath('debug.js') + js
      js.append(staticUrl('less.js'))

    settings = {}
    settings['debug'] = debug
    settings['css'] = css
    settings['js'] = js

    return flask.render_template(template, settings=settings, **kwargs), status


def staticUrl(filename, forFlask=True):
  """Gets the static url for a file."""
  with app.app_context():
    try:
      path = os.path.join(flask.current_app.root_path, 'static', filename)
      if os.path.exists(path):
        return flask.url_for('static', filename=filename) if forFlask else path
    except Exception as e:
      # log the error
      pass
    return None


def resolvePath(assets, debug=True):
  """Return a list containing the absolute path for a static file if found."""
  pathList = []
  if assets:
    assets = [assets] if type(assets) == str else assets
    for asset in assets:
      if debug:
        asset = 'uncompiled/%s/%s' % (fileType(asset), asset)
      else:
        asset = 'compiled/%s' % (''.join([asset[:-5], '.css']) if asset.endswith('.less') else asset)
      path = staticUrl(asset)
      if path:
        pathList.append(path)
  return pathList


def fileType(f):
  """Returns the filetype."""
  if f.endswith('.less'):
    return 'less'
  elif f.endswith('.css'):
    return 'css'
  elif f.endswith('.js'):
    return 'js'

