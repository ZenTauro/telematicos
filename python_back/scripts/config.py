from configparser import ConfigParser
from os.path import isfile

config = ConfigParser()

if isfile('priv/config.cfg'):
    config.read('priv/config.cfg')
    
else:
    config['database']

    with open('priv/config.cfg', 'x') as configfile:
        config.write(configfile)