#
# Copyright 2013. All Rights Reserved.
# Author: Brian Chan
# Contact: bchanx@gmail.com
#

from web import db



class Video(db.Model):
  """Video object."""
  id = db.Column(db.Integer, primary_key=True)
  videoid = db.Column(db.String(80), index=True, unique=True)
  title = db.Column(db.String(200))
  duration = db.Column(db.String(20))


  def __init__(self, videoid, title, duration):
    self.videoid = videoid
    self.title = title
    self.duration = duration

