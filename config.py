'''
Copyright (c) 2013 Brian Chan (bchanx.com)
All Rights Reserved.
'''

import os


def loadProperties():
  """Load config properties from .env"""
  properties = {}
  if os.path.isfile('.env'):
    with open('.env', 'rb') as f:
      props = f.readlines()
      for p in props:
        key, value = p.strip().split('=')
        properties[key] = value
  return properties

localProperties = loadProperties()


def getProperty(key):
  """Get a property from local .env or from os.environ"""
  return localProperties.get(key, os.environ.get(key, None))



class Properties(object):
  """Flask config properties to load."""
  SQLALCHEMY_DATABASE_URI = getProperty('DATABASE_URL')
  JUKEBOX_KEY = getProperty('JUKEBOX_KEY')

