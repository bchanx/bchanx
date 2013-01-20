#!/usr/bin/env python

'''
Copyright 2013. All Rights Reserved.
Author: Brian Chan
Contact: bchanx@gmail.com
'''

import re
import os
import sys
import mmap
import subprocess

HANDLER_PATH = './server.py'
COMPILED_PATH = './static/compiled'
LESS_PATH = './static/uncompiled/less'
JS_PATH = './static/uncompiled/js'

LESS_REGEX = re.compile(r"""css=('|")([\w]+)\.less('|")""")
JS_REGEX = re.compile(r"""js=('|")([\w]+)\.js('|")""")


def run(cmd):
  """Run a command."""
  return subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE).communicate()


def save(content, filename):
  """Save compiled file."""
  with open('%s/%s' % (COMPILED_PATH, filename), 'w') as f:
    f.write(content)


def less(files):
  """Compile less to css files."""
  for f in files:
    content, err = run('lessc %s/%s.less' % (LESS_PATH, f))
    if not content:
      raise Exception('[LESS] %s.less produced an empty css file, aborting.' % f)
    save(content, '%s.css' % f)


def js(files):
  """Compile js files."""
  for f in files:
    with open('%s/%s.js' % (JS_PATH, f)) as jsfile:
      content = jsfile.readlines()
      save(''.join(content), '%s.js' % f)


def main():
  with open(HANDLER_PATH, 'r+b') as f:
    m = mmap.mmap(f.fileno(), 0, prot=mmap.PROT_READ)
    less([x for _, x, _ in LESS_REGEX.findall(m)])
    js([x for _, x, _ in JS_REGEX.findall(m)])
    m.close()
    

if __name__ == '__main__':
  main()

