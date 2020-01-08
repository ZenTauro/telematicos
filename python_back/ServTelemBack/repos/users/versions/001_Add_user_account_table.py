from sqlalchemy import String, Table, Column, MetaData, Integer

meta = MetaData()

account = Table(
    'account', meta,
    Column('id', Integer, primary_key=True),
    Column('username', String, unique=True),
    Column('hash', String),
    Column('salt', String),
)

def upgrade(migrate_engine):
    meta.bind = migrate_engine
    account.create()


def downgrade(migrate_engine):
    meta.bind = migrate_engine
    account.drop()
