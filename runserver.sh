#!/usr/bin/env bash
#TODO: getopts
cd /code/backend/
echo "=================== Install Requirements ==================="
pip install --upgrade pip
pip install -r requirement.txt

echo "=================== Migrate ==================="
python manage.py migrate
python manage.py collectstatic --noinput

rm -rf ./docker_worker.pid
celery multi restart -A ChatApp docker_worker -l DEBUG -B --logfile=beat_worker.log

echo "=================== Run debug server at 0.0.0.0:8000 ======================"
python manage.py runserver 0.0.0.0:8888
#echo "### run debug server at 0.0.0.0:8000 ###"
#gunicorn ChatApp.wsgi:application -w 3 -k gevent --threads 100 --max-requests 100000 --bind 0.0.0.0:8000 --log-file gunicorn.log --log-level info --timeout 60
