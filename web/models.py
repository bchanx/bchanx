#
# Copyright 2013. All Rights Reserved.
# Author: Brian Chan
# Contact: bchanx@gmail.com
#

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


  def __init__(self, mediaId, mediaType, title, duration):
    self.mediaId = mediaId
    self.mediaType = mediaType
    self.title = title
    self.duration = duration


  def __repr__(self):
    return '<Media - %s:%s>' % (self.mediaType, self.mediaId)

