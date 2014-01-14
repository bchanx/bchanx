'''
Copyright (c) 2014 Brian Chan (bchanx.com)
All Rights Reserved.
'''

from web import app
from web.base import render


@app.route('/')
def index():
  return render('index.html', css='index.less', js='index.js')

