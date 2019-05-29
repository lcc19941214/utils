arr=( 1 2 3)

function print {
  local list=$1
  echo "all parameters: $*"
  for item in $list
  do
    echo $item
  done
}

# 直接传入，not work
print $arr

# 使用 [*] 进行展开，但是会发现数组被展开为多个参数了
print ${arr[@]}

# 使用 [*] 进行展开，用字符串进行包裹
print "${arr[*]}"
print "${arr[@]}" # [@] not work