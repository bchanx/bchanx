#
# Copyright 2013. All Rights Reserved.
# Author: Brian Chan
# Contact: bchanx@gmail.com
#

from web import app


@app.template_filter('enumerate')
def enumerate_iterator(e):
  """Wrapper for Python's enumerate."""
  return enumerate(e)

