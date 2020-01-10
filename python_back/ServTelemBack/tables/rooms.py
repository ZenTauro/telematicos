from passlib.hash import argon2
from ServTelemBack.tables.base import Base
from sqlalchemy import (Boolean, Column, ForeignKey, Integer, String,
                        create_engine)
from sqlalchemy.engine import Engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session, sessionmaker


class Room(Base):
    """Represents the registered rooms"""
    __tablename__ = "rooms"

    room_id = Column('id', Integer, primary_key=True)
    name = Column('name', String, nullable=False)
    country = Column('country', String, nullable=False)
    city = Column('city', String, nullable=False)
    link = Column('link', String, nullable=False)
    x_coord = Column('x-coord', Integer, nullable=False)
    y_coord = Column('y-coord', Integer, nullable=False)
    photo_path = Column('photo-path', String, nullable=False)
    sensor_temp = Column('sensor-temp', Boolean, nullable=False)
    sensor_humid = Column('sensor-humidity', Boolean, nullable=False)
    sensor_noise = Column('sensor-noise', Boolean, nullable=False)
    sensor_light = Column('sensor-light', Boolean, nullable=False)
    sensor_movement = Column('sensor-movement', Boolean, nullable=False)
    max_temp = Column('max-temp', Integer, nullable=False)
    min_temp = Column('min-temp', Integer, nullable=False)
    user_id = Column('user_id', Integer, ForeignKey('account.id'))

    def __init__(self, name: str, country: str, city: str, link: str,
                 x_coord: int, y_coord: int, photo_path: str,
                 sensor_temp: bool, sensor_humid: bool, sensor_noise: bool,
                 sensor_light: bool, sensor_movement: bool, max_temp: int,
                 min_temp: int):
        self.name = name
        self.country = country
        self.city = city
        self.link = link
        self.x_coord = x_coord
        self.y_coord = y_coord
        self.photo_path = photo_path
        self.sensor_temp = sensor_temp
        self.sensor_humid = sensor_humid
        self.sensor_noise = sensor_noise
        self.sensor_light = sensor_light
        self.sensor_movement = sensor_movement
        self.max_temp = max_temp
        self.min_temp = min_temp
