FROM python:alpine3.6
RUN apk add --update postgresql-dev gcc musl-dev git
RUN pip install --upgrade pip psycopg2
RUN apk del gcc musl-dev
WORKDIR /code
ENV PYTHONUNBUFFERED 0

