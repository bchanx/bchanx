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


@app.route('/jukebox/playlistGetAll', methods=['GET'])
def playlistGetAll():
  playlists = []
  try:
    pl = Playlist.query.all()
    playlists = [{
      'pid': p.id,
      'userid': p.userid,
      'title': p.title,
    } for p in pl if p.state == PlaylistState.PUBLIC]
  except ProgrammingError:
    pass
  return json.dumps(playlists)


@app.route('/jukebox/playlistCreate', methods=['POST'])
def playlistCreate():
  """Creates a playlist."""
  title = request.form.get('playlist-title', '')
  state = request.form.get('playlist-state', PlaylistState.PUBLIC)
  # TODO: Insert with actual userId
  playlist = Playlist(0, title, state)
  db.session.add(playlist)
  db.session.commit()
  return json.dumps({'status': 'OK'})


@app.route('/jukebox/playlistEdit', methods=['GET', 'POST'])
def playlistEdit():
  """Edits a playlist."""
  # TODO: actually edit the playlist.
  if flask.current_app.debug:
    media = json.loads(mediaGet())
    mediaIdList = [mediaItem['id'] for mediaItem in media]
    playlist = Playlist.query.get(1)
    playlist.mediaIdList = json.dumps(mediaIdList)
    db.session.add(playlist)
    db.session.commit()
  return json.dumps({'status': 'WAT')


@app.route('/jukebox/playlistLoad', methods=['POST'])
def playlistLoad():
  """Loads a playlist."""
  result = {'status': 'OK'}
  try:
    pid = int(request.form.get('pid', 1))
    if pid > 0:
      return mediaGet()
  except ValueError:
    pass
  return json.dumps([])
    

def mediaGet(mediaIdList=None):
  """Get media items from db."""
  mediaList = []
  try:
    media = Media.query.all()
    mediaList = [{
      'id': mediaGetUniqueId(m),
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


@app.route('/jukebox/playlistAddMedia', methods=['POST'])
def playlistAddMedia():
  """Adds a media item to a playlist."""
  # TODO: Default to my playlist for now
  pid = request.form.get('pid', 1)
  mediaUrl = request.form.get('media-url', '')
  media = mediaAdd(url)
  if media and pid > 0:
    mediaUniqueId = mediaGetUniqueId(media)
    playlist = Playlist.query.filter_by(id=pid).first()
    mediaIdList = json.loads(playlist.mediaIdList)
    if mediaUniqueId not in mediaIdList:
      mediaIdList.append(mediaUniqueId)
      playlist.mediaIdList = json.dumps(mediaIdList)
      db.session.add(playlist)
      db.session.commit()
      return json.dumps({'status': 'OK'})
    return json.dumps({'status': 'ALREADY_EXISTS'})
  return json.dumps({'status': 'ERROR'})


def mediaGetUniqueId(media):
  """The unique representation of a media object."""
  return media and '%s:%s' % (str(media.mediaType), media.mediaId)


def mediaAdd(url):
  """Adds a Media object to db. Returns Media() object if successful, None otherwise."""
  if url:
    mediaId, mediaType = mediaGetIdAndType(url)
    if mediaId:
      exists = mediaExistsInDb(mediaId)
      if exists:
        return exists
      else:
        title, duration = mediaGetMetadata(mediaId, mediaType)
        if title and duration:
          media = Media(mediaId, mediaType, title, duration)
          db.session.add(media)
          db.session.commit()
          return media
  return None


def mediaGetMetadata(mediaId, mediaType):
  """Gets metadata for a media."""
  title, duration = '', ''
  if mediaType == MediaType.YOUTUBE:
    res = requests.get('https://gdata.youtube.com/feeds/api/videos/%s?v=2' % mediaId)
    if res.status_code == 200:
      dom = minidom.parseString(res.text.encode('utf-8'))
      title = dom.getElementsByTagName('title')[0].firstChild.nodeValue
      duration = dom.getElementsByTagName('yt:duration')[0].getAttribute('seconds')
  return title, duration
  

def mediaGetIdAndType(url):
  """Gets media id and type."""
  mediaId, mediaType = None, MediaType.UNKNOWN
  url = urlparse.urlparse(url)
  if url.netloc == 'www.youtube.com' and url.path == '/watch':
    mediaId = [token.split('=')[1] for token in url.query.split('&') if token.startswith('v=')]
    mediaId = mediaId[0] if mediaId[0] else None
    mediaType = MediaType.YOUTUBE
  return (mediaId, mediaType)


def mediaExistsInDb(mediaId):
  """Returns a Media() object if found, None otherwise."""
  return Media.query.filter_by(mediaId=mediaId).first()

