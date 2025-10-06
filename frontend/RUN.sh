#!/bin/sh
if ! [ -d "./node_modules" ]; then
  npm install
fi
ng serve --poll 1000 --host 0.0.0.0
