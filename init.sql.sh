#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE chatapp;
    GRANT ALL PRIVILEGES ON DATABASE chatapp TO $POSTGRES_USER;
EOSQL

