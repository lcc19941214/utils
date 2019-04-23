#!/bin/bash

root=$(pwd)
README="$root/README.md"
echo -e '# Utils\n' >$README

function generate() {
  local DIR=$1
  local anchor=$2
  local filenames=$(ls $DIR)
  local files=()
  local dirs=()

  for filename in ${filenames[@]}; do
    local dir="$DIR/$filename"
    if [ $filename == 'README.md' ]; then
      echo "- [$filename]($dir)" >>$README
      return
    fi

    if [ -d $dir ]; then
      dirs=(${dirs[@]} $filename)
    elif [ -f $dir ]; then
      files=(${files[@]} $filename)
    fi
  done

  for file in ${files[@]}; do
    local dir="$DIR/$file"
    echo "- [$file]($dir)" >>$README
  done

  for file in ${dirs[@]}; do
    local dir="$DIR/$file"
    echo -e "\n$anchor $file\n" >>$README
    generate "$dir" "$anchor#"
  done
}

generate './src' '##'
echo 'done'
