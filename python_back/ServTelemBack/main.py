from flask import Flask, escape, request
import json
import user

app = Flask(__name__)

@app.route('/api/user/login', methods=['POST'])
def login():
    ret = json.dumps({'err': "JSON was expected"})
    login_obj = request.get_json()
    if login_obj is not None:
        usr = user.User()
        try:
            usr.name = login_obj["name"]
            usr.password = login_obj["pass"]
            if usr.login():
                ret = json.dumps({'ok': usr.as_json()})
                app.logger.info(f'User \'{usr.name}\' logged in successfully')
            else:
                ret = json.dumps({'err': "invalid credentials"})
                app.logger.info(f'User \'{usr.name}\' failed to log in')
        except KeyError:
            ret = json.dumps({'err':
                              "expected fields name and pass to be set"})

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


@app.route('/api/sensors/get')
def get_sensors():
    name = request.args.get("name", "World")
    return f'Hello, {escape(name)}!'


@app.route('/api/sensors/update')
def update_sensors():
    name = request.args.get("name", "World")
    return f'Hello, {escape(name)}!'
