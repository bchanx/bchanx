#!/bin/bash
# Deploy script for heroku

function printStatus {
  echo -e "\033[1;32m--- $1 ---\033[0m"
}

function printError {
  echo -e "\033[1;31m--- $1 ---\033[0m"
}


#####
# Compile assets
#####
printStatus "Compiling Assets"
python ./compile.py
if [[ $? != 0 ]]; then
  printError "Compiled Failed"
  exit 1
fi


#####
# Push changes to Git
#####
status=$(git status 2>&1)
if [[ ! $status =~ "nothing to commit" ]]; then
  printStatus "Pushing changes to Github"
  read -e -p "Please enter a commit message (empty to abort): " COMMIT_MSG
  if [[ -z "$COMMIT_MSG" ]]; then
    printError "No commit message, aborting."
    exit 1
  fi
  git commit -a -m "$COMMIT_MSG"
  git push origin master
fi

#####
# Deploy to heroku
#####
printStatus "Deploying to Heroku"
git push heroku master

#####
# Finish
#####
echo
sleep 0.5
printStatus "Done"

