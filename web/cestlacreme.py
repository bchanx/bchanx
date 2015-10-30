'''
Copyright (c) 2015 Brian Chan (bchanx.com)
All Rights Reserved.
'''

from web import app
from web.base import render, staticUrl
from flask import redirect, url_for, current_app, abort, send_from_directory

@app.route('/cestlacreme.ico')
def clcFavicon():
  """Serve /cestlacreme.ico."""
  return send_from_directory(app.static_folder, 'cestlacreme.ico')

@app.route('/cestlacreme')
def cestLaCreme():
  """Load page"""
  return render('cestlacreme/index.html', css='cestlacreme/index.less', js='cestlacreme/index.js')
