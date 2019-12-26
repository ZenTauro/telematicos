from flask import Flask, escape, request

app = Flask(__name__)


@app.route('/api/user/login', methods=['POST'])
def login():
    name = request.args.get("name", "World")
    return f'Hello, {escape(name)}!'


@app.route('/api/user/logout')
def logout():
    name = request.args.get("name", "World")
    return f'Hello, {escape(name)}!'


@app.route('/api/sensors/get')
def get_sensors():
    name = request.args.get("name", "World")
    return f'Hello, {escape(name)}!'


@app.route('/api/sensors/update')
def update_sensors():
    name = request.args.get("name", "World")
    return f'Hello, {escape(name)}!'
