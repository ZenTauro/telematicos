from ServTelemBack.db_manager import DBManager, User
from ipdb import set_trace

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

(hashv, saltv) = db.get_user("juan")
set_trace()