#!/bin/bash
dir='dir';

# 查询并输出结果
grep -R 'pattern' . > ~/$dir/grep;

# 截取文件名
awk -F ':' '{print $1}' ~/$dir/grep > ~/$dir/awk;

# 排序并去重
sort ~/$dir/awk | uniq -u > ~/$dir/sort;