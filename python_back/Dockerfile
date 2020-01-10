FROM python:3.8-alpine

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN \
  apk add --no-cache postgresql-libs libffi-dev && \
  apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
  pip install --no-cache-dir -r requirements.txt && \
  apk --purge del .build-deps

COPY . .

ENTRYPOINT uwsgi service.ini
