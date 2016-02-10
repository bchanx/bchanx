'''
Copyright (c) 2015 Brian Chan (bchanx.com)
All Rights Reserved.
'''

import hmac
import json
import flask
import urlparse
import requests
import xml.dom.minidom as minidom
from web import app, db
from datetime import datetime
from web.base import render, staticUrl
from models import Media, MediaType, Playlist, PlaylistState
from utils import equals
from flask import request, redirect
from sqlalchemy.exc import ProgrammingError


@app.route('/jukebox')
def jukebox():
  """Render the jukebox!"""
  return render('jukebox.html', css='jukebox.less', js='jukebox.js', yt=True,
      googleApiKey=app.config.get('GOOGLE_API_PUBLIC_KEY'),
      jukeboxKey=app.config.get('JUKEBOX_KEY'))


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
    media = mediaGet()
    mediaIdList = [mediaItem['id'] for mediaItem in media]
    playlist = Playlist.query.get(1)
    playlist.mediaIdList = json.dumps(mediaIdList)
    db.session.add(playlist)
    db.session.commit()
  return json.dumps({'status': 'WAT'})


@app.route('/jukebox/playlistLoad', methods=['POST'])
def playlistLoad():
  """Loads a playlist."""
  result = {'pid': request.form.get('pid'), 'data': []}
  try:
    pid = int(request.form.get('pid'))
    if pid > 0:
      playlist = Playlist.query.get(pid)
      if playlist:
        medialist = json.loads(playlist.mediaIdList)
        if medialist:
          result['data'] = mediaGet(medialist)
  except ValueError:
    pass
  return json.dumps(result)


# Disable POST for now
@app.route('/jukebox/playlistAddMedia', methods=['GET'])
def playlistAddMedia():
  """Adds a media item to a playlist."""
  params = request.args if request.method == 'GET' else request.form
  # TODO: Default to my playlist for now
  try:
    pid = max(1, int(params.get('pid')))
  except (ValueError, TypeError):
    pid = 1
  url = params.get('media-url', '').encode('utf-8')
  key = params.get('key', '').encode('utf-8')
  masterKey = app.config.get('JUKEBOX_KEY');
  hmacHash = hmac.new(masterKey, url).hexdigest()

  debug = flask.current_app.debug
  if equals(hmacHash, key) or (equals(masterKey, key) and debug):
    media = mediaAdd(url)
    if media and pid > 0:
      playlist = Playlist.query.filter_by(id=pid).first()
      mediaIdList = json.loads(playlist.mediaIdList)
      if media.uniqueId not in mediaIdList:
        mediaIdList.append(media.uniqueId)
        playlist.mediaIdList = json.dumps(mediaIdList)
        playlist.modified = datetime.utcnow()
        db.session.add(playlist)
        db.session.commit()
        return json.dumps({'status': 'OK'}) if debug else redirect(url + '#ok')
      return json.dumps({'status': 'ALREADY_EXISTS'}) if debug else redirect(url + '#exists')
  return json.dumps({'status': 'ERROR'}) if debug else redirect(url + '#error')


# Disable POST for now
@app.route('/jukebox/playlistRemoveMedia', methods=['GET'])
def playlistRemoveMedia():
  """Removes a media item from a playlist."""
  params = request.args if request.method == 'GET' else request.form
  debug = flask.current_app.debug
  if debug:
    pid = mediaId = None
    try:
      pid = int(params.get('pid'))
      mediaId = params.get('mediaId')
      if mediaId and pid > 0:
        playlist = Playlist.query.filter_by(id=pid).first()
        mediaIdList = json.loads(playlist.mediaIdList)
        if (mediaId in mediaIdList):
          mediaIdList.remove(mediaId)
          playlist.mediaIdList = json.dumps(mediaIdList)
          playlist.modified = datetime.utcnow()
          db.session.add(playlist)
          db.session.commit()
          return json.dumps({'status': 'REMOVED: pid: %s: mediaId: %s' % (pid, mediaId)})
        else:
          return json.dumps({'status': 'No mediaId %s in pid %s' % (mediaId, pid)})
    except(ValueError, TypeError):
      pass
    return json.dumps({'status': 'ERROR: pid: %s, mediaId: %s' % (pid, mediaId)})
  flask.abort(404)


def mediaGet(mediaIdList=None):
  """Get media items from db."""
  mediaList = []
  try:
    if mediaIdList:
      media = Media.query.filter(Media.uniqueId.in_(mediaIdList)).all()
    else:
      media = Media.query.all()
    mediaList = [{
      'id': m.uniqueId,
      'meta': {
        'mediaId': m.mediaId,
        'mediaType': m.mediaType,
        'title': m.title,
        'duration': m.duration
      }
    } for m in media]
  except ProgrammingError:
    pass
  return mediaList


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
