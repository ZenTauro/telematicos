from sqlalchemy import (
    String,
    Table,
    Column,
    MetaData,
    Integer,
    Boolean,
    ForeignKey
)
from sqlalchemy.orm import relationship, backref
from migrate.changeset.constraint import ForeignKeyConstraint

meta = MetaData()

room = Table(
    'rooms', meta,
    Column('id', Integer, primary_key=True),
    Column('name', String, nullable=False),
    Column('country', String, nullable=False),
    Column('city', String, nullable=False),
    Column('link', String, nullable=False),
    Column('x-coord', Integer, nullable=False),
    Column('y-coord', Integer, nullable=False),
    Column('photo-path', String, nullable=False),
    Column('sensor-temp', Boolean, nullable=False),
    Column('sensor-humidity', Boolean, nullable=False),
    Column('sensor-noise', Boolean, nullable=False),
    Column('sensor-light', Boolean, nullable=False),
    Column('sensor-movement', Boolean, nullable=False),
    Column('max-temp', Integer, nullable=False),
    Column('min-temp', Integer, nullable=False),

    Column('user_id', Integer, ForeignKey('account.id'))
)

def upgrade(migrate_engine):
    meta.bind = migrate_engine

    account = Table('account', meta, autoload=True)
    rooms = Column('rooms', Integer)
    room.create()
    rooms.create(account)

    cons = ForeignKeyConstraint([account.c.rooms], [room.c.id])

    cons.create()


def downgrade(migrate_engine):
    meta.bind = migrate_engine

    account = Table('account', meta, autoload=True)
    cons = ForeignKeyConstraint([account.c.rooms], [room.c.id])

    account = Table('account', meta, autoload=True)
    cons.drop()
    account.c.rooms.drop()
    room.drop()
