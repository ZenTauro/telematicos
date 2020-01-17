import json
from logging import DEBUG
from typing import Dict

from flask import Flask, escape, make_response, request
from flask_socketio import SocketIO, disconnect, emit
from gevent import Greenlet, monkey, sleep, spawn
from ServTelemBack import sensor, user
from sqlalchemy.exc import IntegrityError, InvalidRequestError
from sqlalchemy.orm.exc import NoResultFound

monkey.patch_all()

app = Flask(__name__)
app.logger.setLevel(DEBUG)
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app, message_queue='redis://localhost:6379')

socket_connections: Dict[str, Greenlet] = {}


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


@app.route('/api/leds', methods=['GET', 'POST'])
def leds():
    ret = ''
    usr = user.User()
    usr.token = ''
    app.logger.info('Attempting led fetch')
    try:
        usr.token = request.cookies.get('Auth')
        if usr.is_valid():
            if request.method == 'GET':
                app.logger.info(f'Fetching rooms for {usr.name}')
                rooms = usr.get_rooms()
                ret = make_response(json.dumps({"ok": rooms[0].color})), 200
            elif request.method == 'POST':
                try:
                    login_obj = request.get_json()
                    if login_obj is not None:
                        rooms = usr.get_rooms()
                        usr.set_room(0, login_obj['color'])
                        app.logger.info(f'Setting rooms for {usr.name}')
                        ret = make_response(json.dumps({"ok": rooms[0].color})), 200
                    else:
                        ret = make_response('{"err": "JSON was expected"}'), 400
                except KeyError:
                    ret = make_response('{"err": "Malformed request"}'), 400
        else:
            ret = make_response('{"err": "Invalid credentials"}'), 401
    except KeyError:
        pass

    return ret


@socketio.on('connect')
def socket_connect():
    app.logger.info(f'New socket conexion {request.sid}')
    usr = user.User()
    usr.token = request.cookies.get('Auth')
    if (usr.is_valid() and request.sid not in socket_connections):
        socket_connections[request.sid] = \
            socketio.start_background_task(sensor_update_loop,
                                           usr,
                                           socketio.emit,
                                           app.logger.info)
    else:
        emit('message', '{"err": "Unauthorized"}')
        disconnect()
        return False


@socketio.on('disconnect')
def socket_disconnect():
    app.logger.info(f'Disconnection of {request.sid}')
    usr = user.User()
    usr.token = request.cookies.get('Auth')
    if request.sid in socket_connections:
        socket_connections.pop(request.sid).kill(block=False, timeout=1)


def sensor_update_loop(session: user.User, msg_emit, logger):
    while session.is_valid():
        msg_emit('message',
                 json.dumps(sensor.get_sensors()))
        logger('Update')
        sleep(1)


if __name__ == '__main__':
    socketio.run(app, debug=True)
