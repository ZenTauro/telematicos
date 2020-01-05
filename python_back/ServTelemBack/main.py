import json

from flask import Flask, escape, make_response, request
from flask_socketio import SocketIO, emit
from ServTelemBack import user
from sqlalchemy.exc import IntegrityError, InvalidRequestError
from sqlalchemy.orm.exc import NoResultFound

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app)


@app.route('/api/user/login', methods=['POST'])
def login():
    ret = json.dumps({'err': "JSON was expected"}), 400
    login_obj = request.get_json()
    if login_obj is not None:
        usr = user.User()
        try:
            usr.name = login_obj["name"]
            usr.password = login_obj["pass"]
            if usr.login():
                ret = make_response(json.dumps({'ok': usr.as_json()}))
                ret.set_cookie('Auth', usr.token, max_age=60*60*24, httponly=True)
                app.logger.info(f'User \'{usr.name}\' logged in successfully')
            else:
                ret = json.dumps({'err': "invalid credentials"}), 401
                app.logger.info(f'User \'{usr.name}\' failed to log in')
        except KeyError:
            ret = json.dumps({'err':
                              "expected fields name and pass to be set"}), 400
        except NoResultFound:
            ret = json.dumps({'err': 'invalid credentials'}), 401

    return ret


@app.route('/api/user/logout', methods=['POST'])
def logout():
    ret = json.dumps({'err': "JSON was expected"})
    login_obj = request.get_json()
    if login_obj is not None:
        usr = user.User()
        try:
            usr.name = login_obj["name"]
            usr.token = login_obj["token"]
            if usr.logout():
                ret = json.dumps({'ok': 'logout'})
                app.logger.info(f'User \'{usr.name}\' logged out')
            else:
                ret = json.dumps({'err': 'invalid token'})
                app.logger.info(f'User \'{usr.name}\' failed logged out')
        except KeyError:
            ret = json.dumps({'err':
                              "expected fields name and pass to be set"})

    return ret


@app.route('/api/user/validate', methods=['POST'])
def validate():
    ret = json.dumps({'err': "JSON was expected"})
    login_obj = request.get_json()
    if login_obj is not None:
        usr = user.User()
        try:
            usr.name = login_obj["name"]
            usr.token = login_obj["token"]
            if usr.is_valid():
                ret = json.dumps({'ok': 'valid'})
                app.logger.info(f'Session for \'{usr.name}\' validated')
            else:
                ret = json.dumps({'err': 'invalid session'})
                app.logger.info(f'Session for \'{usr.name}\' failed to validate')
        except KeyError:
            ret = json.dumps({'err':
                              "expected fields name and pass to be set"})

    return ret

@app.route('/api/user/signup', methods=['POST'])
def sign_up():
    ret = make_response(json.dumps({'err': "JSON was expected"}))
    login_obj = request.get_json()
    if login_obj is not None:
        usr = user.User()
        try:
            usr.name = login_obj["name"]
            usr.password = login_obj["pass"]
            try:
                usr.signup()
                usr.login()
                ret = make_response(json.dumps({'ok': usr.as_json()}))
                ret.set_cookie('Auth', usr.token, max_age=60*60*24)
                app.logger.info(f'Account for \'{usr.name}\' created')
            except IntegrityError:
                ret = json.dumps({'err': 'duplicate username'})
                app.logger.info(f'Session for \'{usr.name}\' validated')
            except InvalidRequestError:
                ret = json.dumps({'err': 'duplicate username'})
                app.logger.info(f'Session for \'{usr.name}\' validated')

        except KeyError:
            ret = json.dumps({'err':
                              "expected fields name and pass to be set"})

    return ret


@app.route('/api/sensors/', methods=['GET', 'PUT'])
def get_sensors():
    ret = ''
    usr = user.User()
    try:
        usr.token = request.cookies.get('Auth')
        if usr.is_valid():
            if request.method == 'GET':
                ret = 'GET'
            elif request.method == 'PUT':
                ret = 'PUT'
        else:
            ret = make_response('Invalid credentials'), 401
    except:
        ret = make_response('Invalid credentials'), 401

    return ret


@socketio.on('connect')
def socket_connect():
    app.logger.info('New socket conexion')
    emit('update')


if __name__ == '__main__':
    socketio.run(app)
