KEEP BRANCHES SMALL!!!!!!
MAKE SURE WE ALL KNOW WHAT EVERYONE IS WORKING ON SO WE DONT WORK ON THE SAME FILES!!

#make a new branch everytime you work on something. Never work directly on the dev branch:

```
git checkout -b <branch name>
```

#commit your branch often to your local and forked repo:

```
git add <files>
git commit -m 'your message'
```

#when you are ready to merge in to the upstream dev branch,
#make sure that the dev branch is up to date with upstream dev:

```
git checkout dev
git pull upstream dev
```

## alternatively, fetch the upstream dev branch and overwrite your local dev branch:

```
// while in your dev branch
git fetch upstream dev
git reset --hard FETCH_HEAD
```

#switch back to your working branch:

```
git checkout <branch name>
```

#rebase the latest dev branch under the head of your working branch:

```
git rebase dev
```

IF THERE IS A MERGE CONFLICT TALK WITH THE GROUP BEFORE CHANGING ANYTHING

#push branch to your forked repo.
#do a pull request of your branch to the upstream dev.

#once pull request is approved update your local dev branch

rinse and repeat

## pre-commit hook

add the pre-commit hook to your local repo to
disable commiting on master and dev branches.

## tips

- if you find yourself doing work on the dev branch:

  - just checkout a new branch and continue working.

- if you need to make changes to something thats NOT related to the branch you are on:
  - stash uncommited files
  - checkout to a new branch,
  - change what needs to be changed
  - stage and commit those files to that branch
  - move back to working branch
  - rebase fixed branch into working branch
  - unstash code
  - fix merge conflicts
  - keep going

* stash unstaged files using
  ```
  git stash
  // or
  git stash save <name of stash>
  ```
* to 'paste' your stash back in

  ```
  // will apply the stash and drop it from the stash list
  git stash pop

  // if you have multiple stashes
  // use 'git stash list' to see all your stashes and use git stash apply)
  git stash apply stash@{#}
  ```

- delete branches that you have done successful prs on and don't plan on working on anymore:
  ```
  git -D <branch name>
  ```

# accidentally pull/commit something you didnt want to?

roll back one commit

```
//keeps the uncommited work
git reset --soft HEAD~1
// OR
// removes everything thats not in
// the previous commit
git reset --hard HEAD~1
```

```

```
