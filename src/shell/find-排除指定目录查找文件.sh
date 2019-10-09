#!/bin/bash

# 使用 \( ... \) 和 -or 串联多个表达式
# 使用 -not 取反
find . \( -name '*.js' -or -name '*.jsx' -or -name '*.ts' -or -name '*.tsx' -or -name '*.html' \) \
  -not \( -path '*/node_modules/*' -or -path '*/build/*' \) \
  > ~/Desktop/output