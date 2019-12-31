from authlib.jose import jwt
from authlib.jose.errors import (BadSignatureError, InvalidClaimError,
                                 MissingClaimError)
from datetime import datetime
from calendar import timegm
from redis import Redis

global_store = Redis()


class SessionManager:
    priv_key: str = ''
    pub_key: str = ''
    store: Redis

    def __init__(self):
        with open('smartroom_priv.pem') as cert:
            self.priv_key = cert.read()
        with open('smartroom_pub.pem') as cert:
            self.pub_key = cert.read()
        self.store = global_store

    def generate(self, user_name: str, ssid: int, exp: datetime) -> str:
        """
        Generates JWS RS512 signed session token
        :param ssid: The session id number
        :param exp: The expiration date
        :return: The token
        """
        header = {'alg': 'RS512'}
        body = {'iss': 'SmartRoom', 'sub': 'session', 'sid': ssid, 'exp': exp}
        ttl = exp - timegm(datetime.now()).utctimetuple()
        self.store.set(ssid, user_name, ex=ttl)
        s = jwt.encode(header, body, self.priv_key)
        return s

    def revoke(self, token: str):
        """
        Revokes a token elimintating it from the
        session store
        :param token: The token to be revoked
        """
        decoded = jwt.decode(token, self.pub_key)
        self.store.delete(decoded.get('sid'))

    def validate(self, token: str) -> bool:
        """
        Validates the given token, checking the date
        :param token: The token to be validated
        :return: true if it's still valid
        """
        ret = True

        try:
            claims = jwt.decode(token, self.pub_key,
            claims_options={
                "iss": {
                    "essential": True,
                    "value": "SmartRoom"
                },
                "sub": {
                    "essential": True,
                    "value": "session"
                },
                "sid": {
                    "essential": True,
                    "validate": validate_sid
                },
                "exp": {
                    "essential": True,
                    "validate": validate_exp
                }
            })
            claims.validate()
            if validate_sid(claims.get('sid')) and \
               validate_exp(claims.get('exp')):
                ret = True
            else:
                ret = False

        except BadSignatureError:
            ret = False
        except InvalidClaimError:
            ret = False
        except MissingClaimError:
            ret = False

        return ret


def validate_exp(exp: int) -> bool:
    now = timegm(datetime.now().utctimetuple())
    return exp > now

def validate_sid(sid: str) -> bool:
    ret = global_store.exists(sid) == 1
    return ret
