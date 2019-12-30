from configparser import ConfigParser
from os import environ


class ConfigObj:
    options: ConfigParser = ConfigParser()
    db_addr: str = None

    def __init__(self):
        self.options.read('priv/config.cfg')

        db_name = None
        db_pass = None
        db_addr = None
        db_port = None

        try:
            db_name = environ['DB_NAME']
        except KeyError:
            db_name = self.options['database']['db_name']

        print(f'db_name is {db_name}')

        try:
            username = environ['DB_USER']
        except KeyError:
            username = self.options['database']['db_username']

        print(f'db_username is {username}')

        try:
            db_pass = environ['DB_PASS']
        except KeyError:
            passwd = self.options['database']['db_password']
            if len(passwd) == 0:
                login = f'{username}'
            else:
                login = f'{username}:{passwd}'
        finally:
            login = f'{username}:{db_pass}'

        print(f'login is {login}')

        try:
            db_addr = environ['DB_ADDR']
        except KeyError:
            if self.options['database']['db_addr'] == "":
                db_addr = 'localhost'
            else:
                db_addr = self.options['database']['db_addr']

        print(f'db_addr is {db_addr}')

        try:
            db_port = environ['DB_PORT']
        except KeyError:
            if self.options['database']['db_port'] == "":
                db_port = 5432
            else:
                db_port = self.options['database']['db_port']

        print(f'db_port is {db_port}')

        self.db_addr = f'postgresql://{login}@{db_addr}:{db_port}/{db_name}'



CONFIG = ConfigObj()
