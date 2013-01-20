'''
Copyright 2013. All Rights Reserved.
Author: Brian Chan
Contact: bchanx@gmail.com
'''

from web import app
from web.base import render


@app.route('/')
def index():
  return render('index.html', css='index.less')

