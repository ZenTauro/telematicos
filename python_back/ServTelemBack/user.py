from ServTelemBack.session_manager import SessionManager
from ServTelemBack.db_manager import DBManager

from passlib.hash import argon2
from base64 import b64decode
from datetime import datetime, timedelta
from calendar import timegm
from uuid import uuid4
from os import urandom

class User():
    name: str = None
    password: str = None
    token: str = None
    session_mgr = SessionManager()
    db_manager = DBManager()

    def as_json(self):
        return {'name': self.name, 'token': self.token.decode("utf-8")}

    def signup(self) -> bool:
        salt = urandom(60)
        self.db_manager.create_user(self.name, self.password, salt)
        return True

    def login(self) -> bool:
        (db_user_hash, salt) = self.db_manager.get_user(self.name)
        is_equal = argon2.verify(self.password, db_user_hash)
        if is_equal:
            self.token = self.session_mgr.generate(self.name, \
                str(uuid4()), \
                timegm((datetime.now() + timedelta(days=1)).utctimetuple()))
            return True
        else:
            return False

    def logout(self) -> bool:
        ret = False
        if self.is_valid():
            ret = True
            self.session_mgr.revoke(self.token)
        else:
            ret = False
        return ret

    def is_valid(self) -> bool:
        return self.session_mgr.validate(self.token)
