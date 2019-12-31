from ServTelemBack.app_cfg import CONFIG

from typing import Tuple
from base64 import b64encode
from passlib.hash import argon2
from sqlalchemy import create_engine, String, Column, Integer
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.engine import Engine
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
global_engine = create_engine(CONFIG.db_addr)
global_session = sessionmaker(bind=global_engine)()


class User(Base):
    """
    Represents the users column called account in the database
    """
    __tablename__ = "account"

    user_id = Column('id', Integer, primary_key=True, )
    username = Column(String, unique=True)
    passhash = Column('hash', String)
    passsalt = Column('salt', String)

    def __init__(self, username: str, password: str, salt: str):
        self.username = username
        self.passhash = password
        self.passsalt = salt


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
