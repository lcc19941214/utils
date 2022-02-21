cd repo
# clone a repo
git clone repo-a

# change directory to your repo
cd repo-b

# add remote repo
git remote add -f repo-a ../repo-a

# check conf
git remote

# create a branch to operate
git checkout -b feat-branch

# ---

# specify a directory as the root
git filter-branch -f --prune-empty \
  --subdirectory-filter <directory>

# run specify code
git filter-branch -f --prune-empty \
  --tree-filter 'ls -a | egrep -v "front\-end|\.git|\.$" | xargs rm -rf' HEAD
