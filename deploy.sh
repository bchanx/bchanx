#!/bin/bash
# Deploy script for heroku

python ./compile.py
status=$(git status 2>&1)
if [[ ! $status =~ "nothing to commit" ]]; then
  commit_msg="update compiled resources"
  if [ ! -z "$1" ]; then
    commit_msg="$1"
  fi
  read -p "About to commit with message \"$commit_msg\". Proceed (y/n)? " CONFIRM
  if [[ ! $CONFIRM =~ [Yy] ]]; then
    exit 0
  fi
  git commit -a -m "$commit_msg"
  git push origin master
fi
git push heroku master

