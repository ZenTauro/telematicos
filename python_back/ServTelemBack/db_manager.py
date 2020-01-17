from base64 import b64encode
from typing import List, Tuple

from passlib.hash import argon2
from ServTelemBack.app_cfg import CONFIG
from ServTelemBack.tables.account import Account as User
from ServTelemBack.tables.rooms import Room
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session, sessionmaker

global_engine = create_engine(CONFIG.db_addr)
global_session = sessionmaker(bind=global_engine)()


class DBManager():
    """
    The object used to interact with the database. Every single instance
    of this class will refer to the same connection.
    """
    engine: Engine = None
    session: Session = None

    def __init__(self):
        self.engine = global_engine
        self.session = global_session

    def get_user(self, user: str) -> Tuple[str, str]:
        """
        Given a username it returns its associated login information.
        :param user: The username
        :return: A tuple with password (hash, salt)
        """
        res = self.session.query(User).filter(User.username == user).one()
        return (res.passhash, res.passsalt)

    def create_user(self, user: str, password: str, salt: bytes):
        """
        Creates a user in the database, if the user exists it will throw
        a IntegrityError or a InvalidRequestError.
        :param user: The username
        :param password: The plaintext password to be hashed
        :param salt: The salt to use in the hash
        """
        passhash: str = argon2.using(rounds=8, salt=salt).hash(password)
        user = User(user, passhash, b64encode(salt).decode('utf-8'))
        self.session.add(user)
        self.session.commit()

    def get_user_rooms(self, user: str) -> List[Room]:
        """
        Gets the given user associated rooms
        :param user: The user to lookup rooms for
        :return: The rooms
        """
        alyyy = self.session.query(User)\
                            .filter(User.username == 'alyyy')\
                            .one()
        rooms = self.session.query(Room)\
                            .filter(Room.user_id == alyyy.user_id)\
                            .all()
        return rooms

    def commit(self):
        self.session.commit()
