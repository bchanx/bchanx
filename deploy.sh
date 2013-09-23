#!/bin/bash
# Deploy script for heroku!

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
if [[ ! $status =~ "nothing to commit, working directory clean" ]]; then
  if [[ $status =~ "Untracked files:" ]]; then
    read -e -p "Untracked files present, continue? (y/n): " UNTRACKED
    if [[ -z "$UNTRACKED" ]] || [[ $UNTRACKED == "n" ]] || [[ $UNTRACKED == "N" ]]; then
      printError "Untracked files present, aborting."
      exit 1
    fi
  fi
  UNSTAGED=false
  if [[ $status =~ "Changes not staged for commit:" ]]; then
    read -e -p "Unstaged changes, add them? (y/n): " UNSTAGED
    if [[ -z "$UNSTAGED" ]] || [[ $UNSTAGED == "n" ]] || [[ $UNSTAGED == "N" ]]; then
      UNSTAGED=false
    else 
      UNSTAGED=true
    fi
  fi
  if [[ $status =~ "Changes to be committed" ]] || $UNSTAGED; then
    printStatus "Pushing changes to Github"
    read -e -p "Please enter a commit message (empty to abort): " COMMIT_MSG
    if [[ -z "$COMMIT_MSG" ]]; then
      printError "No commit message, aborting."
      exit 1
    fi
    if $UNSTAGED; then
      git commit -a -m "$COMMIT_MSG"
    else
      git commit -m "$COMMIT_MSG"
    fi
    git push origin master
  fi
fi

#####
# Deploy to heroku
#####
printStatus "Deploying to Heroku"
heroku config:push
git push heroku master

#####
# Finish
#####
echo
sleep 0.5
printStatus "Done"

