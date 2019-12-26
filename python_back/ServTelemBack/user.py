import jwt
import logging

def login_fn(user: str, passw: str) -> bool:
    db_user_pass = db.lookup_user(user)
    if db_user_pass == passw:
        jwt
        logging.info(f'User \'{user}\' logged in successfully')
        return True
    else:
        logging.info(f'User \'{user}\' failed to log in')
        return False

def logout_fn(user: str, token: str):
    logging.info(f'User \'{user}\' logged out')
