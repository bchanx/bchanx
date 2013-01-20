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
import inspect
import subprocess

ROOT_FILE = os.path.abspath(inspect.stack()[-1][1])
APP_PATH = os.path.join(ROOT_FILE[:ROOT_FILE.rindex('/')], 'web')
COMPILED_PATH = '%s/static/compiled' % APP_PATH
LESS_PATH = '%s/static/uncompiled/less' % APP_PATH
JS_PATH = '%s/static/uncompiled/js' % APP_PATH

LESS_REGEX = re.compile(r"""css=('|")([\w]+)\.less('|")""")
JS_REGEX = re.compile(r"""js=('|")([\w]+)\.js('|")""")


def run(cmd):
  """Run a command."""
  return subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE).communicate()


def save(content, filename, extension):
  """Save compiled file."""
  
  print '[%s] Saving file: %s.%s' % (extension.upper(), filename, extension)
  with open('%s/%s.%s' % (COMPILED_PATH, filename, extension), 'w') as f:
    f.write(content)


def less(files):
  """Compile less to css files."""
  for f in files:
    content, err = run('lessc --yui-compress %s/%s.less' % (LESS_PATH, f))
    if not content:
      raise Exception('[LESS] %s.less produced an empty css file, aborting.' % f)
    save(content, f, 'css')


def js(files):
  """Compile js files."""
  for f in files:
    with open('%s/%s.js' % (JS_PATH, f)) as jsfile:
      content = jsfile.readlines()
      save(''.join(content), f, 'js')


def main():
  for handler in [os.path.join(APP_PATH, x) for x in os.listdir(APP_PATH) if x.endswith('.py')]:
    with open(handler, 'r+b') as f:
      m = mmap.mmap(f.fileno(), 0, prot=mmap.PROT_READ)
      less([x for _, x, _ in LESS_REGEX.findall(m)])
      js([x for _, x, _ in JS_REGEX.findall(m)])
      m.close()
    

if __name__ == '__main__':
  main()

