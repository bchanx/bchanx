'''
Copyright 2013. All Rights Reserved.
Author: Brian Chan
Contact: bchanx@gmail.com
'''

from web import app
from web.base import render, staticUrl


@app.route('/logos-in-pure-css')
def logosInPureCSS():
  return render('blog/logos-in-pure-css.html', css='blog.less')

