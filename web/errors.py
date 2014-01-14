'''
Copyright (c) 2014 Brian Chan (bchanx.com)
All Rights Reserved.
'''

from web import app
from web.base import render
from flask import render_template


@app.errorhandler(404)
def page404(error):
  return render_template('errors/404.html'), 404

