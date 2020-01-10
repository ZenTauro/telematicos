from ServTelemBack.tables.base import Base
from sqlalchemy import Column, Integer, String


class Account(Base):
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
