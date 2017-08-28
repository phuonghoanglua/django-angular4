#!/bin/bash
echo "================= Building AOT angular files ================="
./node_modules/.bin/ngc -p tsconfig-aot.json

echo "================= Uglify javascripts code ===================="
./node_modules/.bin/rollup -c rollup-config.js

echo "================= Done =================="

