'''
Copyright 2013. All Rights Reserved.
Author: Brian Chan
Contact: bchanx@gmail.com
'''

from web import app
from web.base import render, staticUrl


@app.route('/logos-in-pure-css-demo')
def logosInPureCSSDemo():
  return render('demo/logos-in-pure-css.html', css='demo.less')

