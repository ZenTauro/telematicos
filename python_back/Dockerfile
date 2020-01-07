FROM python:3.8-alpine

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN \
  apk add --no-cache postgresql-libs libffi-dev && \
  apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
  pip install --no-cache-dir -r requirements.txt && \
  apk --purge del .build-deps

COPY . .

ENTRYPOINT uwsgi --http :5000 --gevent 1000 --http-websockets --master --wsgi-file ServTelemBack/main.py --callable app -s :36837
