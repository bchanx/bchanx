#
# Copyright 2013. All Rights Reserved.
# Author: Brian Chan
# Contact: bchanx@gmail.com
#

from web import app
from web.base import render, staticUrl


@app.route('/jukebox')
def jukebox():
  return render('jukebox.html', css='jukebox.less', js='jukebox.js', yt=True)

