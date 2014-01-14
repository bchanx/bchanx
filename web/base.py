'''
Copyright (c) 2014 Brian Chan (bchanx.com)
All Rights Reserved.
'''

from web import app
import flask
import os
import sys


def render(template, css=None, js=None, yt=False, **kwargs):
  """Renders the page."""
  ctx = flask.current_app
  debug = ctx.debug
  if not template or not os.path.exists(os.path.join(ctx.root_path, ctx.template_folder, template)):
    flask.abort(404)

  css = resolvePath(css, debug)
  js = resolvePath(js, debug)
  if debug:
    js = resolvePath('debug.js') + js
    js.append('/static/dist/less.min.js')
  if yt:
    js.append('https://www.youtube.com/iframe_api')
    js.append('https://apis.google.com/js/client.js?onload=googleApiClientReady')

  settings = {}
  settings['debug'] = debug
  settings['css'] = css
  settings['js'] = js

  env = {}
  env['type'] = 'devel' if debug else 'prod'

  return flask.render_template(template, settings=settings, env=env, **kwargs), 200


def staticUrl(filename, forFlask=True):
  """Gets the static url for a file."""
  try:
    path = os.path.join(flask.current_app.static_folder, filename)
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
        asset = asset.replace('/', '-')
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

