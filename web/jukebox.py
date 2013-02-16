#
# Copyright 2013. All Rights Reserved.
# Author: Brian Chan
# Contact: bchanx@gmail.com
#

import json
import urlparse
import requests
import xml.dom.minidom as minidom
from web import app, db
from web.base import render, staticUrl
from flask import request



@app.route('/jukebox')
def jukebox():
  """Render the jukebox!"""
  return render('jukebox.html', css='jukebox.less', js='jukebox.js', yt=True)


def getVideoMetadata(videoid):
  """Gets metadata for a video."""
  title, duration = '', ''
  r = requests.get('https://gdata.youtube.com/feeds/api/videos/%s?v=2' % videoid)
  if r.status_code == 200:
    dom = minidom.parseString(r.text)
    title = dom.getElementsByTagName('title')[0].firstChild.nodeValue
    duration = dom.getElementsByTagName('yt:duration')[0].getAttribute('seconds')
  return title, duration
  

def getVideoId(video):
  """Gets video id."""
  url = urlparse.urlparse(video)
  if url.netloc == 'www.youtube.com' and url.path == '/watch':
    videoid = [token.split('=')[1] for token in url.query.split('&') if token.startswith('v=')]
    return videoid[0] if videoid[0] else None

  
@app.route('/jukebox/add', methods=['POST'])
def addVideo():
  """Adds a video object to db."""
  result = {}
  videourl = request.form.get('videourl', '')
  if videourl:
    videoid = getVideoId(videourl)
    if videoid:
      result.update({'videoid': videoid})
      title, duration = getVideoMetadata(videoid)
      if title and duration:
        result.update({'title': title, 'duration': duration})
#        video = Video(videoid, title, duration)
#        db.session.add(video)
#        db.session.commit()
  return json.dumps(result)

