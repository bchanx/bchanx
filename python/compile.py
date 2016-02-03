#!/usr/bin/env python

'''
Copyright (c) 2015 Brian Chan (bchanx.com)
All Rights Reserved.
'''

# TODO: (py/js) add linters.
# TODO: (js) missing semicolons break compile.
# TODO: (js) inline comments also break compile.
# TODO: (js) js requires for http links (aka github).

import re
import os
import sys
import mmap
import inspect
import subprocess

ROOT_FILE = os.path.abspath(inspect.stack()[-1][1])
APP_PATH = os.path.join(ROOT_FILE[:ROOT_FILE.rindex(os.sep)], 'web')
COMPILED_PATH = '%s/static/compiled' % APP_PATH
LESS_PATH = '%s/static/uncompiled/less' % APP_PATH
JS_PATH = '%s/static/uncompiled/js' % APP_PATH

LESS_REGEX = re.compile(r"""css=('|")([\w/-]+)\.less('|")""")
JS_REGEX = re.compile(r"""js=('|")([\w/-]+)\.js('|")""")

JS_REQUIRE = re.compile(r"""bchanx\.require\(('|")(.*)('|")\);""")
JS_MAPPING = {}
JS_IGNORED = {'slidr.js'}

def run(cmd):
  """Run a command."""
  return subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE).communicate()


def save(content, filename, extension):
  """Save compiled file."""
  filename = filename.replace('/', '-')
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


def copyright():
  """Add copyright information."""
  path = os.path.expanduser('~/bchanx/misc/copyright.py')
  if os.path.exists(path):
    run('python %s %s/' % (path, COMPILED_PATH))


def jsminify(f):
  """Gets a minified js file."""
  tmp = '/tmp/%s' % f.replace('/', '-')
  with open(tmp, 'w') as minify:
    minify.write('\n'.join(['var bchanx = bchanx || {};'] + [JS_MAPPING[js]['content'] for js in jsmapping(f)]))
  return subprocess.check_output(['java', '-jar', os.path.expanduser('~/bchanx/misc/closure-compiler.jar'), '--js', tmp, '--language_in', 'ECMASCRIPT5'])
  os.remove(tmp)


def jsmapping(f):
  """For file f, maps js dependencies and content to JS_MAPPING. Returns the dependency order."""
  js = '%s/%s' % (JS_PATH, f)
  if not os.path.isfile(js):
    raise Exception('[JS] %s does not exist, aborting.' % f)
  if not os.stat(js).st_size:
    raise Exception('[JS] %s is empty, aborting.' %f)
  if f not in JS_MAPPING:
    JS_MAPPING[f] = {}
    JS_MAPPING[f]['deps'] = None
    with open(js) as jsfile:
      m = mmap.mmap(jsfile.fileno(), 0, access=mmap.ACCESS_READ)
      deps = []
      requires = [x for _, x, _ in JS_REQUIRE.findall(m)]
      for r in requires:
        if r in JS_MAPPING and not JS_MAPPING[r]['deps']:
          raise Exception('[JS] %s has a circular dependency to %s, aborting.' % (f, r))
        if r not in JS_IGNORED:
          deps.extend([js for js in (JS_MAPPING[r]['deps'] if r in JS_MAPPING else jsmapping(r)) if js not in deps])
      content = []
      line = m.readline()
      while line:
        if line and not JS_REQUIRE.search(line):
          content.append(line)
        line = m.readline()
      m.close()
    deps.append(f)
    JS_MAPPING[f]['deps'] = deps
    JS_MAPPING[f]['content'] = ''.join([x for x in content])
  return JS_MAPPING[f]['deps']


def js(files):
  """Compile js files."""
  for f in files:
    content = jsminify(f)
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
  copyright()
    

if __name__ == '__main__':
  main()

