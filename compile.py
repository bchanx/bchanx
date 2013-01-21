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

JS_REQUIRE = re.compile(r"""b\.require\(('|")(.*)('|")\);""")
JS_MAPPING = {}

def run(cmd):
  """Run a command."""
  return subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE).communicate()


def save(content, filename, extension):
  """Save compiled file."""
  print '[%s] Saving file: %s' % (extension.upper(), filename)
  with open('%s/%s' % (COMPILED_PATH, filename), 'w') as f:
    f.write(content)


def less(files):
  """Compile less to css files."""
  for f in files:
    content, err = run('lessc --yui-compress %s/%s' % (LESS_PATH, f))
    if not content:
      raise Exception('[LESS] %s produced an empty css file, aborting.' % f)
    save(content, ''.join([f[:-5], '.css']), 'css')


def jsminify(f, jsDepTree):
  """Simple js minification."""
  js = '%s/%s' % (JS_PATH, f)
  if not os.path.isfile(js):
    raise Exception('[JS] %s does not exist, aborting.' % f)
  if not os.stat(js).st_size:
    raise Exception('[JS] %s is empty, aborting.' %f)
  if f in jsDepTree:
    return ''
  jsDepTree.add(f)
  if f not in JS_MAPPING:
    with open(js) as jsfile:
      m = mmap.mmap(jsfile.fileno(), 0, prot=mmap.PROT_READ)
      content = []
      requires = [x for _, x, _ in JS_REQUIRE.findall(m)]
      for r in requires:
        content.append(jsminify(r, jsDepTree))
      line = m.readline()
      while line:
        line = line.strip()
        if line and not line.startswith('//') and not JS_REQUIRE.match(line):
          content.append(line)
        line = m.readline()
      m.close()
    JS_MAPPING[f] = ''.join([x for x in content])
  return JS_MAPPING[f]


def js(files):
  """Compile js files."""
  for f in files:
    content = jsminify(f, set())
    if not content:
      raise Exception('[JS] %s produced an empty js file, aborting.' % f)
    save(content, f, 'js')


def main():
  for handler in [os.path.join(APP_PATH, x) for x in os.listdir(APP_PATH) if x.endswith('.py')]:
    with open(handler, 'r+b') as f:
      m = mmap.mmap(f.fileno(), 0, prot=mmap.PROT_READ)
      less([''.join([x, '.less']) for _, x, _ in LESS_REGEX.findall(m)])
      js([''.join([x, '.js']) for _, x, _ in JS_REGEX.findall(m)])
      m.close()
    

if __name__ == '__main__':
  main()

