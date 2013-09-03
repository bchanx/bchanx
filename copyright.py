#!/usr/bin/env python

import os
import re
import sys

YEAR = '2013'

NAME = 'Brian Chan'

WEBSITE = 'bchanx.com'

COPYRIGHT = 'Copyright (c) %s %s (%s)' % (YEAR, NAME, WEBSITE)

BASEPATH = '/Users/brianchan/bchanx'

WEBPATH = os.path.join(BASEPATH, 'bchanx')

GITPATH = os.path.join(BASEPATH, 'github')

GIT_PROJECTS = {
  'logos-in-pure-css': {
    'desc': 'Company logos created in pure CSS',
  },
  'slidr': {
    'desc': 'A Javascript library for adding slide effects.',
    'version': ' v0.1.0'
  }
}

PYTHON_FORMATS = {
  r"""'''[^']+'''[\s]*""",
  r"""#(?:.*?)#\n[\s]*"""
}
PYTHON_RE = re.compile('(%s)' % '|'.join(PYTHON_FORMATS), re.DOTALL)

JS_FORMATS = {
  r"""/\*!(?:.*?) \*/[\s]*""",
  r"""//(?:.*?)//\n[\s]*"""
}
JS_RE = re.compile('(%s)' % '|'.join(JS_FORMATS), re.DOTALL)


def python(fname, opensource=False):
  """Add python copyright info."""
  c = """'''
%s
All Rights Reserved.
'''\n\n""" % COPYRIGHT
  add(fname, c, PYTHON_RE)


def javascript(fname, opensource=None):
  """Add javascript copyright info."""
  c = """/*!
 * %s
 * All Rights Reserved.
 */\n\n""" % COPYRIGHT if not opensource else """/*!
 * %s%s - %s
 * %s/%s
 * MIT licensed
 *
 * %s
 */\n""" % (opensource, GIT_PROJECTS[opensource].get('version', ''), 
  GIT_PROJECTS[opensource]['desc'], WEBSITE, opensource, COPYRIGHT)
  add(fname, c, JS_RE)


def add(fname, copyright, regex):
  """Add copyright info to fname."""
  with open(fname, 'r') as f:
    lines = f.readlines()
    content = ''.join(lines)
  modified = False
  existing = regex.search(content)
  if existing:
    match = existing.groups()[0]
    if 'Copyright' in match and NAME in match and match != copyright and len(match) < 200:
      modified = True
      content = content.replace(match, copyright).strip()
  elif not any(['Copyright' in x for x in lines[:min(8, len(lines))]]):
    modified = True
    content = ''.join([copyright, content.lstrip()])
  if modified:
    sys.stderr.write('[%s]' % fname + '\n')
    with open(fname, 'w') as f:
      f.write(content)


def copyright(fname):
  """Validate filetype."""
  path = os.path.realpath(fname)
  if '/.git/' not in path:
    if path.startswith(WEBPATH) and '/dist/' not in path or \
      (path.startswith(GITPATH) and any([x in path for x in GIT_PROJECTS])):
      opensource = None if path.startswith(WEBPATH) else path.split(GITPATH)[1].strip('/').split('/')[0]
      if fname.endswith('.py'):
        python(fname, opensource)
      elif fname.endswith('.js'):
        javascript(fname, opensource)


def main():
  """Main runner."""
  name = sys.argv[1]
  if os.path.isfile(name):
    copyright(name)
  elif os.path.isdir(name):
    for dirpath, dirnames, filenames in os.walk(name):
      for f in filenames:
        copyright(os.path.join(dirpath, f))


if __name__ == '__main__':
  if len(sys.argv) < 2:
    sys.stderr.write('[Usage]: python ./copyright.py <filename|path>\n')
    sys.exit(-1)
  main()
