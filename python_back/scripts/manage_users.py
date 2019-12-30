#!/usr/bin/env python
from os import environ
from migrate.versioning.shell import main

db_name = ''
db_pass = ''
username = ''

login = ''

try:
    db_name = environ['DB_NAME']
    username = environ['USER']
except KeyError as e:
    print(f'The env_var {e} was not found')
    exit(1)

try:
    db_pass = environ['DB_PASS']
except KeyError:
    login = f'{username}'
finally:
    login = f'{username}:{db_pass}'

url = f'postgresql://{login}@localhost:5432/{db_name}'
print(f'The url being used is "{url}"')

if __name__ == '__main__':
    main(repository='ServTelemBack/repos/users/', url=url, debug='False')
