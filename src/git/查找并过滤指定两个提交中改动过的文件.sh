#!/bin/bash

function getFilenames() {
  local from_commit=$1
  local to_commit=$2
  local filename=$3
  git show $from_commit..$to_commit --name-only | grep $filename >>./temp_diff
  local output=$(sort ./temp_diff | uniq -c | sort -rn | cut -c 6- | sort)
  rm ./temp_diff
  for filename in $output; do
    echo $filename
  done
}

getFilenames $1 $2 $3
