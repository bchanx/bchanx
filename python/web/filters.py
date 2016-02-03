'''
Copyright (c) 2015 Brian Chan (bchanx.com)
All Rights Reserved.
'''

from web import app


@app.template_filter('enumerate')
def enumerate_iterator(e):
  """Wrapper for Python's enumerate."""
  return enumerate(e)

