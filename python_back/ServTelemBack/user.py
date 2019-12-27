import jwt
from json import JSONEncoder
import logging

class User(JSONEncoder):
    name = None
    password = None
    token = None

    def default(self):
        if isinstance(self, User):
            return {'name': self.name, 'token': self.token}
        else:
            return JSONEncoder.default(self)

    def login(self):
        db_user_pass = '' # db.lookup_user(user)
        if db_user_pass == self.password:
            self.token = "token" # We should generate a token and add it to the session
            logging.info(f'User \'{self.name}\' logged in successfully')
        else:
            logging.info(f'User \'{self.name}\' failed to log in')

    def logout(token: str):
        logging.info(f'User \'{self.name}\' logged out')
