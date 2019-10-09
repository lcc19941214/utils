#!/bin/bash

# 使用 \( ... \) 和 -or 串联多个表达式
# 使用 -not 取反
find . \( -name '*.js' -or -name '*.jsx' \) \
  -not \( -path '*/node_modules/*' -or -path '*/build/*' \)

# 使用 --exclude-dir 排除目录
# 使用 {} 排除多个目录
grep -R --exclude-dir={node_modules,build,dist} 'some pattern' .
