# from urllib3 import http
import http
import json
import mysql.connector

last_value = [0, 0, 0, 0, 0, 0, 0, 0]

try:
    response = http.request('GET', 'http://10.0.8.20:8000/temperature')
    data = json.loads(response.data)
    value = data['temperature']
except ValueError:
    print('Error al recibir datos')

MySQLdb = mysql.connector()

db = MySQLdb.connect(host="localhost", user="adroom", passwd="adminroom",
                     db="iroom")
cursor = db.cursor()
try:
    cursor.execute("""INSERT INTO sensors(nombre, valor) values(%s, %s)""",
                   ('temperatura', value))
except ValueError:
    print('Error al insertar en la base de datos')

cursor.execute("""SELECT valor FROM sensors""" +
               """WHERE nombre='red' order by time desc""")
red = int(cursor.fetchone()[0])

response = http.request('PUT', 'http://10.0.8.20:8000/red/' + str(red))

db.close()
