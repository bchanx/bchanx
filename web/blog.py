'''
Copyright (c) 2015 Brian Chan (bchanx.com)
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

def gameboyCode():
  code = {}
  code['processor'] = {
    'html': '<div id="processor"></div>',
    'css': """#processor {
  position: absolute;
  width: 56px;
  height: 56px;
  top: 285px;
  left: 142px;
  z-index: 4;
  background-color: #222222;
  color: #ffffff;
  font-size: 15px;
  letter-spacing: 3px;
  font-weight: 700;
  font-family: 'Oxygen', Helvetica, arial, sans-serif;
  -webkit-animation: processor 8s infinite linear;
  animation: processor 8s infinite linear;
}"""
  }
  return code


@app.route('/animated-gameboy-in-css-blog')
def gameboyCSSBlog():
  return render('blog/animated-gameboy-in-css-blog.html', css='gameboy-blog.less', js='blog/gameboy-blog.js', code=gameboyCode())
