'''
Copyright (c) 2014 Brian Chan (bchanx.com)
All Rights Reserved.
'''

def equals(x, y):
  """
  Constant time string comparison to mitigate timing side-channel attacks.
  Does x == y? Runtime does not depend on the bytes in the strings.
  """
  x = x.encode('utf-8') if isinstance(x, unicode) else x
  y = y.encode('utf-8') if isinstance(y, unicode) else y

  if len(x) != len(y):
    return False

  result = i = 0
  for i in xrange(len(x)):
    result |= ord(x[i]) ^ ord(y[i])
  return result == 0

