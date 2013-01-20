'''
Copyright 2013. All Rights Reserved.
Author: Brian Chan
Contact: bchanx@gmail.com
'''

from web import app
from web.base import render
from flask import render_template


@app.errorhandler(404)
def page404(error):
  return render_template('errors/404.html'), 404

