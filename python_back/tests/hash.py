from base64 import b64encode
from os import urandom

print(b64encode(urandom(120)).decode('utf-8'))
