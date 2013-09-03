'''
Copyright (c) 2013 Brian Chan (bchanx.com)
All Rights Reserved.
'''

from web import app
from web.base import render, staticUrl


@app.route('/fantasy')
def fantasy():
  players = []
  with open(staticUrl('fantasy.txt', False)) as f:
    lines = f.readlines()
    for l in lines:
      name, pos = tuple(l.split(':'))
      players.append({'name':name.strip(), 'pos':pos.strip()})
  return render('fantasy.html', css='fantasy.less', js='fantasy.js', players=players)

