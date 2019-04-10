#!/bin/bash

# exit immediately after one part of the scripts failed
set -e

./src/awk/generate-readme.sh
git add -A
git commit -m 'update README.md'