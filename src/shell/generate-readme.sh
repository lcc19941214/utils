#!/bin/bash

root=`pwd`
README="$root/README.md"
echo -e '# Utils\n' > $README

function generate {
  local DIR=$1
  local anchor=$2
  # `--group-directories-first` must be used with coreutils (brew install coreutils)
  for file in `gls --group-directories-first $DIR`;
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