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
            usr.login()
            ret = json.dumps({'ok': usr.default()})
        except:
            ret = json.dumps({'err':
                              "expected fields name and pass to be set"})

    return ret


@app.route('/api/user/logout')
def logout():
    ret = json.dumps({'err': "JSON was expected"})
    login_obj = request.get_json()
    if login_obj is not None:
        usr = user.User()
        try:
            usr.name = login_obj["name"]
            usr.token = login_obj["token"]
            usr.logout()
            ret = json.dumps({'ok': 'ok'})
        except:
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
