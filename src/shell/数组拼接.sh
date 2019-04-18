#!/bin/bash

# make a statement
arr=(1 2 3 4 5 6 7 8 9 10)
olist=()
jlist=()

# do a iteration
for i in ${arr[@]}
do
  if [[ `expr ${i} % 2` == 0 ]]; then
    # use ${array[@]} or ${array[*]} to spread the array
    olist=(${olist[@]} $i)
  else
    jlist=(${jlist[@]} $i)
  fi
done

echo ${jlist[*]}
echo ${olist[@]}

# use `#` to get length
echo ${#jlist[@]}