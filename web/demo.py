'''
Copyright (c) 2013 Brian Chan (bchanx.com)
All Rights Reserved.
'''

from web import app
from web.base import render, staticUrl


@app.route('/logos-in-pure-css-demo')
def logosInPureCSSDemo():
  return render('demo/logos-in-pure-css.html', css='demo/logos-in-pure-css.less')

@app.route('/slidr')
def slidr():
  return render('demo/slidr.html', css='demo/slidr.less', js='demo/slidr.js')
