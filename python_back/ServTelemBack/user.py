from ServTelemBack.session_manager import SessionManager
from ServTelemBack.db_manager import DBManager

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

    def register(self, username: str) -> bool:
        salt = urandom(512)
        pass

    def login(self) -> bool:
        db_user_pass = '' # db.lookup_user(user)
        if db_user_pass == self.password:
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
