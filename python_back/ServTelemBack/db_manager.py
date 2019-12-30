from ServTelemBack.app_cfg import CONFIG

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
    __tablename__ = "account"

    user_id  = Column('id', Integer, primary_key=True, )
    username = Column(String, unique=True)
    passhash = Column('hash', String)
    passsalt = Column('salt', String)


    def __init__(self, username: str, password: str, salt: str):
        self.username = username
        self.passhash = password
        self.passsalt = salt

class DBManager():
    engine: Engine = None
    session: Session = None

    def __init__(self):
        self.engine = global_engine
        self.session = global_session

    def get_user(self, user: str) -> (str, str):
        res = self.session.query(User).filter(User.username == user).one()
        return (res.passhash, res.passsalt)
    
    def create_user(self, user: str, password: str, salt: bytes):
        passhash: str = argon2.using(rounds=8, salt=salt).hash(password)
        user = User(user, passhash, b64encode(salt).decode('utf-8'))
        self.session.add(user)
        self.session.commit()
            
