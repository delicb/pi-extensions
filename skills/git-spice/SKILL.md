---
name: git-spice
description: >
  Manage stacked Git branches with git-spice (gs). Use when the user wants to
  create, navigate, restack, or submit stacked branches and Change Requests
  (PRs/MRs). Triggers on: stacking branches, gs commands, submitting stacked PRs,
  restacking, navigating branch stacks, syncing with trunk.
---

# git-spice

git-spice (`gs`) manages stacks of Git branches. It tracks branch relationships,
rebases dependents automatically, and submits stacked PRs/MRs to GitHub, GitLab,
or Bitbucket.

Assume `gs` is aliased to `git-spice`. Use shorthands (e.g. `gs bc` instead of
`gs branch create`) in commands you run.

## Core Workflow

```
# 1. Initialize (auto-inits on first use, so optional)
gs repo init

# 2. Create a stacked branch (stages + commits + tracks)
git add <files>
gs bc feat1 -m "Add feature 1"

# 3. Stack another branch on top
git add <files>
gs bc feat2 -m "Add feature 2"

# 4. Navigate the stack
gs down          # move to branch below
gs up            # move to branch above
gs top / gs bottom
gs bco           # interactive branch picker (tree view)
gs trunk         # check out trunk

# 5. Commit and auto-restack upstack branches
gs cc -m "msg"   # commit create + restack
gs ca            # commit amend + restack
gs ca --no-edit  # amend without editing message

# 6. Submit Change Requests
gs bs            # submit current branch
gs ss            # submit entire stack
gs uss           # submit current + upstack
gs dss           # submit current + downstack

# Use --fill / -c to auto-fill title/body from commits
gs ss --fill

# 7. Sync with remote (pulls trunk, deletes merged branches, restacks)
gs rs
```

## Key Concepts

- **Stack**: branches stacked on each other; each has a base branch
- **Trunk**: the default branch (main/master) - has no base
- **Upstack**: branches above the current branch
- **Downstack**: branches below, down to (but not including) trunk
- **Restack**: rebase a branch onto its base to maintain linear history
- **Change Request (CR)**: PR (GitHub/Bitbucket) or MR (GitLab)

## Shorthands

| Short  | Command              | Short  | Command              |
|--------|----------------------|--------|----------------------|
| gs bc  | branch create        | gs cc  | commit create        |
| gs bco | branch checkout      | gs ca  | commit amend         |
| gs bd  | branch delete        | gs csp | commit split         |
| gs be  | branch edit          | gs ss  | stack submit         |
| gs bon | branch onto          | gs sr  | stack restack        |
| gs br  | branch restack       | gs bs  | branch submit        |
| gs brn | branch rename        | gs uss | upstack submit       |
| gs bsp | branch split         | gs usr | upstack restack      |
| gs bsq | branch squash        | gs uso | upstack onto         |
| gs bfo | branch fold          | gs dss | downstack submit     |
| gs btr | branch track         | gs dse | downstack edit       |
| gs bdi | branch diff          | gs rs  | repo sync            |
| gs ri  | repo init            | gs rr  | repo restack         |
| gs ls  | log short            | gs ll  | log long             |
| gs rbc | rebase continue      | gs rba | rebase abort         |

## Common Operations

### Create branch without committing
```
gs bc feat --no-commit
```
Or set globally: `git config --global spice.branchCreate.commit false`

### Insert branch mid-stack
```
gs bco feat1
gs bc --insert feat-between
```
This places the new branch between feat1 and its upstack branches.

### Create branch below current
```
gs bc --below feat-below
```

### Move branch to different base
```
gs uso main           # move current + upstack onto main
gs bon main           # move only current branch onto main (upstack stays)
```

### Edit commits in a branch (interactive rebase scoped to branch)
```
gs be                 # opens rebase -i for just this branch's commits
```

### Split a branch into multiple
```
gs bsp                # interactive: pick split points
gs bsp --at HEAD~2:part1 --at HEAD~1:part2   # non-interactive
```

### Squash branch commits
```
gs bsq -m "Single commit message"
```

### Fold branch into its base
```
gs bfo                # merges current into base, deletes current
```

### Handle rebase conflicts
```
# resolve conflicts, then:
gs rbc                # rebase continue
# or:
gs rba                # rebase abort
```

### Restack everything
```
gs rr                 # repo restack - all tracked branches
gs sr                 # stack restack - current stack only
gs usr                # upstack restack - current + above
```

### Submit with options
```
gs bs --draft         # submit as draft
gs bs --no-draft      # mark ready for review
gs bs --fill          # auto-fill from commit messages
gs ss --update-only   # only update existing CRs, skip new
gs bs --label bug --label urgent
gs bs --reviewer alice --reviewer bob
gs bs --assign alice
gs bs --force         # force push
```

### View the stack
```
gs ls                 # short log (branch names)
gs ll                 # long log (branches + commits)
gs ls -a              # all tracked branches, not just current stack
```

### Delete branches
```
gs bd feat2           # delete + restack upstack onto base
gs bd --force feat2   # force delete even with unmerged changes
```

## Reference Files

- **Commands & flags**: See [references/commands.md](references/commands.md) for full
  command details and all flags
- **Configuration**: See [references/config.md](references/config.md) for `git config`
  options that customize git-spice behavior
- **Workflows**: See [references/workflows.md](references/workflows.md) for advanced
  patterns like importing PRs, tracking existing stacks, and working with
  unsupported remotes

<!-- Last synced with git-spice docs: 2026-03-15. Source: https://abhinav.github.io/git-spice/llms-full.txt -->
