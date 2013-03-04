#
# Copyright 2013. All Rights Reserved.
# Author: Brian Chan
# Contact: bchanx@gmail.com
#

import json
import flask
import urlparse
import requests
import xml.dom.minidom as minidom
from web import app, db
from web.base import render, staticUrl
from models import Media, MediaType, Playlist, PlaylistState
from flask import request
from sqlalchemy.exc import ProgrammingError



@app.route('/jukebox')
def jukebox():
  """Render the jukebox!"""
  return render('jukebox.html', css='jukebox.less', js='jukebox.js', yt=True, debug=flask.current_app.debug)


@app.route('/jukebox/getAllPlaylists', methods=['GET'])
def getAllPlaylists():
  playlists = []
  try:
    pl = Playlist.query.all()
    playlists = [{
      pid: p.id,
      userid: p.userid,
      title: p.title,
    } for p in pl if p.state == PlaylistState.PUBLIC]
  except ProgrammingError:
    pass
  return json.dumps(playlists)


@app.route('/jukebox/getAll', methods=['GET'])
def getAllMedia():
  """Get all media items."""
  mediaList = []
  try:
    media = Media.query.all()
    mediaList = [{
      'id': ':'.join([str(m.mediaType), m.mediaId]),
      'meta': {
        'mediaId': m.mediaId,
        'mediaType': m.mediaType,
        'title': m.title,
        'duration': m.duration
      }
    } for m in media]
  except ProgrammingError:
    pass
  return json.dumps(mediaList)


@app.route('/jukebox/add', methods=['POST'])
def addMedia():
  """Adds a Media object to db."""
  result = {'status': 'ERROR'}
  url = request.form.get('url', '')
  if url:
    mediaId, mediaType = getMediaIdAndType(url)
    if mediaId:
      if mediaExistsInDb(mediaId):
        result['status'] = 'ALREADY_EXISTS'
      else:
        result['media'] = {'mediaId': mediaId}
        title, duration = getMediaMetadata(mediaId, mediaType)
        if title and duration:
          result['status'] = 'OK'
          result['media'].update({'title': title, 'duration': duration})
          media = Media(mediaId, mediaType, title, duration)
          db.session.add(media)
          db.session.commit()
  return json.dumps(result)


def getMediaMetadata(mediaId, mediaType):
  """Gets metadata for a media."""
  title, duration = '', ''
  if mediaType == MediaType.YOUTUBE:
    res = requests.get('https://gdata.youtube.com/feeds/api/videos/%s?v=2' % mediaId)
    if res.status_code == 200:
      dom = minidom.parseString(res.text.encode('utf-8'))
      title = dom.getElementsByTagName('title')[0].firstChild.nodeValue
      duration = dom.getElementsByTagName('yt:duration')[0].getAttribute('seconds')
  return title, duration
  

def getMediaIdAndType(url):
  """Gets media id and type."""
  mediaId, mediaType = None, MediaType.UNKNOWN
  url = urlparse.urlparse(url)
  if url.netloc == 'www.youtube.com' and url.path == '/watch':
    mediaId = [token.split('=')[1] for token in url.query.split('&') if token.startswith('v=')]
    mediaId = mediaId[0] if mediaId[0] else None
    mediaType = MediaType.YOUTUBE
  return (mediaId, mediaType)


def mediaExistsInDb(mediaId):
  """Check if media already exists."""
  return bool(Media.query.filter_by(mediaId=mediaId).first())

