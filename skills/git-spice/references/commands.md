# git-spice Command Reference

## Global Flags

All commands support:
- `-h`, `--help`
- `--version`
- `-v`, `--verbose` (or `$GIT_SPICE_VERBOSE`)
- `-C`, `--dir=DIR` - change directory before running
- `--[no-]prompt` - control interactive prompts

---

## Repository

### gs repo init (`gs ri`)
```
gs ri [--trunk=BRANCH] [--remote=NAME] [--reset]
```
Initialize git-spice in a repo. Re-run to change trunk or remote.
`--reset` discards all stored data.

### gs repo sync (`gs rs`)
```
gs rs [--restack]
```
Pull trunk, delete merged branches, optionally restack current stack.

### gs repo restack (`gs rr`)
```
gs rr
```
Restack all tracked branches in the repo.

---

## Branch

### gs branch create (`gs bc`)
```
gs bc [<name>] [-m MSG] [-a] [--no-commit] [--insert] [--below] [-t BRANCH]
    [--no-verify] [--signoff]
```
Create a stacked branch. Stages+commits by default. Without a name, generates
one from the commit message.

Key flags:
- `-a` / `--all`: stage modified/deleted files (like `git commit -a`)
- `-m MSG`: commit message (implies `--commit`)
- `--no-commit`: create branch without committing
- `--insert`: place between current and its upstack
- `--below`: place below current branch
- `-t BRANCH`: use a different target base branch

### gs branch track (`gs btr`)
```
gs btr [<branch>] [-b BASE]
```
Track an existing branch. Auto-guesses base unless `--base` is given.

### gs branch untrack (`gs buntr`)
```
gs buntr [<branch>]
```
Stop tracking a branch without deleting it.

### gs branch checkout (`gs bco`)
```
gs bco [<branch>] [-n] [--detach] [-u]
```
Check out a branch. Without args, shows interactive tree picker.
`-n` prints target without checking out. `-u` includes untracked branches.

### gs branch delete (`gs bd`)
```
gs bd [<branches>...] [--force]
```
Delete branch(es) and restack upstack onto base.

### gs branch rename (`gs brn`)
```
gs brn [<old> [<new>]]
```
Rename a branch. With one arg, renames current branch. No args = interactive.

### gs branch edit (`gs be`)
```
gs be
```
Interactive rebase scoped to current branch's commits. Auto-restacks upstack.

### gs branch restack (`gs br`)
```
gs br [--branch=NAME]
```
Rebase current branch onto its base.

### gs branch onto (`gs bon`)
```
gs bon [<onto>] [--branch=NAME]
```
Move only the current branch to a new base. Upstack stays on original base.

### gs branch submit (`gs bs`)
```
gs bs [--branch=NAME] [--title=T] [--body=B] [-c/--fill] [--draft/--no-draft]
    [--force] [--no-publish] [--update-only] [--label=L] [--reviewer=R]
    [--assign=A] [-w/--web] [--nav-comment=true|false|multiple] [-n/--dry-run]
    [--no-verify]
```
Create or update a CR for a single branch.

### gs branch split (`gs bsp`)
```
gs bsp [--at COMMIT:NAME ...] [--branch=NAME]
```
Split a branch at commit boundaries. Interactive by default.
Non-interactive: `gs bsp --at HEAD~2:part1 --at HEAD~1:part2`

### gs branch squash (`gs bsq`)
```
gs bsq [-m MSG] [--no-edit] [--branch=NAME] [--no-verify]
```
Squash all commits in a branch into one.

### gs branch fold (`gs bfo`)
```
gs bfo [--branch=NAME]
```
Merge current branch's commits into its base, then delete the branch.

### gs branch diff (`gs bdi`)
```
gs bdi [--branch=NAME]
```
Show diff between a branch and its base (equivalent to `git diff base...branch`).

---

## Stack

### gs stack submit (`gs ss`)
```
gs ss [-c/--fill] [--draft/--no-draft] [--force] [--update-only]
    [--no-publish] [--label=L] [--reviewer=R] [--assign=A] [-n/--dry-run]
    [-w/--web] [--nav-comment=true|false|multiple] [--no-verify]
```
Submit all branches in the current stack.

### gs stack restack (`gs sr`)
```
gs sr [--branch=NAME]
```
Restack all branches in the current stack.

### gs stack edit (`gs se`)
```
gs se [--branch=NAME] [--editor=STRING]
```
Reorder branches in a stack via editor. Requires a linear stack.

### gs stack delete (`gs sd`)
```
gs sd --force
```
Delete all branches in the stack. Requires `--force`.

---

## Upstack

### gs upstack submit (`gs uss`)
```
gs uss [--branch=NAME] [same flags as gs ss]
```
Submit current branch and all upstack branches.

### gs upstack restack (`gs usr`)
```
gs usr [--branch=NAME] [--skip-start]
```
Restack current branch and everything above it.

### gs upstack onto (`gs uso`)
```
gs uso [<onto>] [--branch=NAME]
```
Move current branch + upstack onto a new base.

### gs upstack delete (`gs usd`)
```
gs usd --force
```
Delete all branches above current. Requires `--force`.

---

## Downstack

### gs downstack submit (`gs dss`)
```
gs dss [--branch=NAME] [same flags as gs ss]
```
Submit current branch and all downstack branches.

### gs downstack edit (`gs dse`)
```
gs dse [--branch=NAME] [--editor=STRING]
```
Reorder downstack branches via editor.

### gs downstack track (`gs dstr`)
```
gs dstr [<branch>]
```
Track all untracked branches below a branch. Walks the commit graph downward.

---

## Commit

### gs commit create (`gs cc`)
```
gs cc [-a] [-m MSG] [--allow-empty] [--fixup=COMMIT] [--no-verify] [--signoff]
```
Commit + auto-restack upstack.

### gs commit amend (`gs ca`)
```
gs ca [-a] [-m MSG] [--no-edit] [--allow-empty] [--no-verify] [--signoff]
```
Amend last commit + auto-restack upstack.

### gs commit split (`gs csp`)
```
gs csp [-m MSG] [--no-verify]
```
Interactively split the last commit into two.

### gs commit fixup (`gs cf`) [experimental]
```
gs cf [<commit>]
```
Apply staged changes to an older commit in the branch. Enable with:
`git config spice.experiment.commitFixup true`

### gs commit pick (`gs cp`) [experimental]
```
gs cp [<commit>] [--from=NAME]
```
Stack-aware cherry-pick. Enable with:
`git config spice.experiment.commitPick true`

---

## Navigation

| Command        | Short  | Description                                    |
|----------------|--------|------------------------------------------------|
| gs up [N]      | gs u   | Move up N branches (default 1)                 |
| gs down [N]    | gs d   | Move down N branches                           |
| gs top         | gs U   | Move to topmost branch                         |
| gs bottom      | gs D   | Move to bottommost branch (above trunk)        |
| gs trunk       |        | Check out trunk                                |

All support `-n` (dry-run: print target without checking out) and `--detach`.

---

## Rebase

### gs rebase continue (`gs rbc`)
```
gs rbc [--no-edit]
```
Continue an interrupted rebase. Replaces `git rebase --continue`.

### gs rebase abort (`gs rba`)
```
gs rba
```
Abort an interrupted rebase. Replaces `git rebase --abort`.

---

## Log

### gs log short (`gs ls`)
```
gs ls [-a] [-S/--cr-status] [--json]
```
List branches in current stack. `-a` for all tracked branches.

### gs log long (`gs ll`)
```
gs ll [-a] [-S/--cr-status] [--json]
```
List branches + commits.

---

## Auth

```
gs auth login [--refresh]
gs auth status
gs auth logout
```
Authenticate with GitHub, GitLab, or Bitbucket. Supports OAuth, GitHub App,
Git Credential Manager, Personal Access Token, service CLI, and env vars
(`GITHUB_TOKEN`, `GITLAB_TOKEN`, `BITBUCKET_TOKEN`).
