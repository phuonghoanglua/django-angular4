#!/usr/bin/env bash
echo "### Run npm install and bower install for webapp"
cd /code/frontend
npm install                          # use when deploy new app
./node_modules/@angular/cli/bin/ng serve --host 0.0.0.0
