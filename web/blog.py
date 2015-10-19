'''
Copyright (c) 2015 Brian Chan (bchanx.com)
All Rights Reserved.
'''

import os
import flask
from web import app
from web.base import render, staticUrl
from flask import redirect, url_for


@app.route('/logos-in-pure-css')
def logosInPureCSS():
  return render('blog/logos-in-pure-css.html', css='blog.less')

@app.route('/logos-in-pure-css/')
def logosInPureCSS2():
  return redirect(url_for('logosInPureCSS'))

# TODO: fill the rest in
def gameboyCode():
  components = ['processor', 'text']
  code = {}
  for c in components:
    for type in ['html', 'css']:
      if c not in code:
        code[c] = {}
      path = os.path.join(flask.current_app.root_path, 'code', 'gameboy', '%s.%s' % (c, type))
      with open(path, 'r') as f:
        code[c][type] = f.read()
  return code


@app.route('/animated-gameboy-in-css-blog')
def gameboyCSSBlog():
  return render('blog/animated-gameboy-in-css-blog.html', css='gameboy-blog.less', js='blog/gameboy-blog.js', code=gameboyCode())
