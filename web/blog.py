'''
Copyright (c) 2014 Brian Chan (bchanx.com)
All Rights Reserved.
'''

from web import app
from web.base import render, staticUrl
from flask import redirect, url_for


@app.route('/logos-in-pure-css')
def logosInPureCSS():
  return render('blog/logos-in-pure-css.html', css='blog.less')

@app.route('/logos-in-pure-css/')
def logosInPureCSS2():
  return redirect(url_for('logosInPureCSS'))
