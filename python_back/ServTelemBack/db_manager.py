from ServTelemBack.app_cfg import CONFIG

from sqlalchemy import create_engine, String, Column, Integer
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.engine import Engine
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

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
        self.engine = create_engine(CONFIG.db_addr)
        self.session = sessionmaker(bind=self.engine)()

    def get_user(self, user: str) -> (str, str):
        res = self.session.query(User).filter(User.username == user).one()
        return (res.passhash, res.passsalt)