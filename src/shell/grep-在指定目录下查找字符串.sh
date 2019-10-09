#!/bin/bash

# 搜索当前目录下所有文件
grep -R --exclude-dir={node_modules,build,dist} 'some pattern' .