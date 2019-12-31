from ServTelemBack.session_manager import SessionManager
from ServTelemBack.db_manager import DBManager

from typing import Dict
from passlib.hash import argon2
from base64 import b64decode
from datetime import datetime, timedelta
from calendar import timegm
from uuid import uuid4
from os import urandom


class User():
    """
    A proxy between the users and the storage and session managers
    """
    name: str
    password: str
    token: bytes
    session_mgr = SessionManager()
    db_manager = DBManager()

    def as_json(self) -> Dict:
        """
        Returns a dictionary in the form of
        {'name':'username', 'token':'login_token'}
        :return: The object representation in a dict form
        """
        return {'name': self.name, 'token': self.token.decode("utf-8")}

    def signup(self) -> bool:
        """
        Creates a random salt and attempts to register the user in the
        database
        """
        salt = urandom(60)
        self.db_manager.create_user(self.name, self.password, salt)
        return True

    def login(self) -> bool:
        """
        Checks if the user is credentials are valid and generates a
        login token if so.
        :return: Whether it succeeded or not
        """
        (db_user_hash, _) = self.db_manager.get_user(self.name)
        is_equal = argon2.verify(self.password, db_user_hash)
        if is_equal:
            self.token = self.session_mgr.generate(self.name,
                                                   str(uuid4()),
                                                   timegm((datetime.now()
                                                           + timedelta(days=1))
                                                          .utctimetuple()))
            return True
        else:
            return False

    def logout(self) -> bool:
        """
        Checks if the session token is correct and invalidates it if so
        :return: Whether it succeeded or not
        """
        ret = False
        if self.is_valid():
            ret = True
            self.session_mgr.revoke(self.token)
        else:
            ret = False
        return ret

    def is_valid(self) -> bool:
        """
        Checks token's validity
        """
        return self.session_mgr.validate(self.token)
