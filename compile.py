import re
import os
import sys
import mmap
import subprocess

HANDLER_PATH = './server.py'
COMPILED_PATH = './static/compiled'
LESS_PATH = './static/uncompiled/less'
LESS_REGEX = re.compile(r"""css=('|")([\w]+)\.less('|")""")


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


def main():
  with open(HANDLER_PATH, 'r+b') as f:
    m = mmap.mmap(f.fileno(), 0, prot=mmap.PROT_READ)
    less([x for _, x, _ in LESS_REGEX.findall(m)])
    m.close()
    

if __name__ == '__main__':
  main()

