#!/bin/bash

root=`pwd`
README="$root/README.md"
echo -e '# Utils\n' > $README

function generate {
  local DIR=$1
  local anchor=$2
  for file in `ls $DIR`;
  do
    local dir="$DIR/$file"
    if [ -d $dir ]; then
      echo -e "\n$anchor $file\n" >> $README
      generate "$dir" "$anchor#"
    elif [ -f $dir ]; then
      echo "- [$file]($dir)" >> $README
    fi
  done
}

generate './src' '##'
echo 'done'