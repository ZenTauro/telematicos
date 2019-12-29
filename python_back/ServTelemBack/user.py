from json import JSONEncoder
from session_manager import SessionManager
from datetime import datetime, timedelta
from calendar import timegm
from uuid import uuid4

class User(JSONEncoder):
    name: str = None
    password: str = None
    token: str = None
    manager = SessionManager()

    def as_json(self):
        return {'name': self.name, 'token': self.token.decode("utf-8")}

    def login(self) -> bool:
        db_user_pass = '' # db.lookup_user(user)
        if db_user_pass == self.password:
            self.token = self.manager.generate(self.name, \
                str(uuid4()), \
                timegm((datetime.now() + timedelta(days=1)).utctimetuple()))
            return True
        else:
            return False

    def logout(self) -> bool:
        ret = False
        if self.is_valid():
            ret = True
            self.manager.revoke(self.token)
        else:
            ret = False
        return ret

    def is_valid(self) -> bool:
        return self.manager.validate(self.token)
