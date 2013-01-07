#!/bin/bash
# Deploy script for heroku

python ./compile.py
status=$(git status 2>&1)
if [[ ! $status =~ "nothing to commit" ]]; then
  git commit -a -m "update compiled resources"
  git push origin master
fi
git push heroku master

