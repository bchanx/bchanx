#
# Copyright 2013. All Rights Reserved.
# Author: Brian Chan
# Contact: bchanx@gmail.com
#

import json
from datetime import datetime
from web import db



class MediaType(object):
  """Media types."""

  UNKNOWN = -1
  YOUTUBE = 0



class Media(db.Model):
  """Media object."""
  id = db.Column(db.Integer, primary_key=True)
  mediaId = db.Column(db.String(80))
  mediaType = db.Column(db.Integer)
  title = db.Column(db.String(200))
  duration = db.Column(db.String(20))
  uniqueId = db.Column(db.String(100))


  def __init__(self, mediaId, mediaType, title, duration):
    self.mediaId = mediaId
    self.mediaType = mediaType
    self.title = title
    self.duration = duration
    self.uniqueId = '%s:%s' % (str(mediaType), mediaId)


  def __repr__(self):
    return '<Media - %s>' % (self.uniqueId)



class PlaylistState(object):
  """State of a playlist."""

  DELETED = -1
  PUBLIC = 0
  PRIVATE = 1



class Playlist(db.Model):
  """Playlist object."""
  id = db.Column(db.Integer, primary_key=True)
  userid = db.Column(db.Integer)
  title = db.Column(db.String(80))
  state = db.Column(db.Integer)
  mediaIdList = db.Column(db.Text)
  created = db.Column(db.DateTime)
  modified = db.Column(db.DateTime)

  
  def __init__(self, userid, title, state=PlaylistState.PUBLIC, mediaIdList=None):
    self.userid = userid
    self.title = title
    self.state = state
    self.mediaIdList = json.dumps(mediaIdList or [])
    now = datetime.utcnow()
    self.created = now
    self.modified = now


  def __repr__(self):
    return '<Playlist - User: %s, Title: %s>' % (self.userid, self.title)

