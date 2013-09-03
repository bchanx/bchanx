#!/usr/bin/env python

'''
Copyright (c) 2013 Brian Chan (bchanx.com)
All Rights Reserved.
'''

from web import app
import os
import sys


def loadSettings():
  """Loads argument settings for app server."""
  settings = {}
  for arg in sys.argv:
    if arg.startswith('--'):
      opt = arg[2:].split('=')
      if len(opt):
        settings[opt[0]] = True if len(opt) < 2 else int(opt[1]) if opt[0] == 'port' else opt[1]
  # Run in prod
  if not settings.get('debug', None):
    settings['host'] = '0.0.0.0'
    settings['port'] = int(os.environ.get('PORT', settings.get('port', 5000)))
  return settings


if __name__ == '__main__':
  settings = loadSettings()
  app.run(**settings)

