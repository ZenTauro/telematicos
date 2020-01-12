from ipdb import set_trace
from ServTelemBack.db_manager import DBManager, User
from ServTelemBack.tables.rooms import Room

db = DBManager()

# user1 = User("daniel", "pass", "salt1")
# user2 = User("juan", "pass", "salt2")
# user3 = User("pablo", "pass", "salt3")
# user4 = User("maria", "pass", "salt4")
# db.session.add(user1)
# db.session.add(user2)
# db.session.add(user3)
# db.session.add(user4)
# db.session.commit()

# users = db.session.query(User).all()
# for user in users:
# print(user.username)

# room1 = Room(
#     "Casa",
#     "Espana",
#     "Madrid",
#     "localhost",
#     40,
#     50,
#     "/tmp/photo.png",
#     True,
#     True,
#     True,
#     True,
#     True,
#     30,
#     18,
#     348,
#     26,
# )
# db.session.add(room1)
# db.session.commit()
alyyy = db.session.query(User).filter(User.username == 'alyyy').one()
rooms = db.session.query(Room).filter(Room.user_id == alyyy.user_id).all()

alyyy_rooms = db.session.query(User.user_id, Room)\
                        .outerjoin(Room, Room.user_id == User.user_id)\
                        .filter(User.username == 'alyyy')\
                        .all()

# for room in alyyy_rooms:
#     print(room.name)

# (hashv, saltv) = db.get_user("juan")
set_trace()
