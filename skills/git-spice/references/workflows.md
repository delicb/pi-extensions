# git-spice Workflows

## Typical Stacking Workflow

```
# Start from trunk
gs trunk

# Create first feature branch
git add <files>
gs bc feat-auth -m "Add authentication"

# Stack second feature on top
git add <files>
gs bc feat-dashboard -m "Add dashboard"

# Make changes mid-stack
gs down                          # back to feat-auth
# edit files...
gs cc -m "Fix auth edge case"   # commit + auto-restack feat-dashboard

# Submit all PRs
gs ss --fill                     # submit entire stack

# After feat-auth merges on remote:
gs rs                            # sync: deletes feat-auth, rebases feat-dashboard onto main
gs bs                            # update feat-dashboard PR
```

## Import an Existing PR

```
gh pr checkout 123               # or: glab mr checkout 8
gs btr                           # track the branch
gs bs                            # re-submit to associate with existing CR
```
Works even for PRs not created by git-spice, as long as the local branch name
matches the remote branch name.

## Import a Stack of PRs

```
gh pr checkout 123
gh pr checkout 124
gh pr checkout 125
git checkout <topmost-branch>
gs dstr                          # downstack track - walks graph and tracks all
```

## Track an Existing Manual Stack

From the topmost branch:
```
git checkout feat3
gs dstr                          # prompts for base of each branch
```

Or individually:
```
git checkout feat1 && gs btr
git checkout feat2 && gs btr
git checkout feat3 && gs btr
```

## Mid-Stack Fixup (Edit + Restack)

```
gs bco feat1                     # check out the branch to fix
# edit files...
gs cc -a -m "fixup"             # commit all changes + restack upstack

# Or amend instead of new commit:
# edit files...
git add <files>
gs ca --no-edit                  # amend + restack
```

## Reorder Branches in a Stack

```
gs se                            # stack edit - opens editor with branch order
# Reorder lines in the editor, save and close
```
Only works with linear stacks (no branch has multiple upstack branches).

For downstack reordering: `gs dse`

## Move a Branch to a Different Base

Move branch + its upstack:
```
gs bco feat2
gs uso main                      # feat2 and everything above moves onto main
```

Move only the branch (upstack stays on old base):
```
gs bco feat2
gs bon main                      # only feat2 moves; upstack reattaches to feat1
```

## Insert a Branch Mid-Stack

```
gs bco feat1
git add <files>
gs bc --insert feat-between -m "Intermediate work"
# feat-between is now between feat1 and feat1's former upstack
```

## Create a Branch Below Current

```
gs bco feat2
git add <files>
gs bc --below feat-prep -m "Prep work"
# feat-prep is now between feat2's base and feat2
```

## Split a Branch

Interactive:
```
gs bsp                           # select commit split points interactively
```

Non-interactive:
```
gs bsp --at HEAD~2:part1 --at HEAD~1:part2
```
If the branch had a CR, you'll be prompted to assign it to one of the splits.

## Squash and Submit

```
gs bsq -m "Single clean commit"
gs bs --fill
```

## Working with Unsupported Remotes

For forges git-spice doesn't support (e.g. SourceHut):
```
git config spice.submit.publish false    # push branches only, no CRs
```
`gs rs` will still detect merge commits and fast-forwards. For squash-merged
branches, manually delete with `gs bd`.

## Handling Rebase Conflicts

When any restack/rebase operation hits a conflict:
```
# 1. Resolve conflicts in your editor
# 2. Stage resolved files
git add <resolved-files>
# 3. Continue
gs rbc

# Or abort entirely:
gs rba
```

## Force-Update Submitted Branches

```
gs bs --force                    # force push current branch
gs ss --force                    # force push entire stack
```

## Submit as Draft, Then Mark Ready

```
gs bs --draft                    # submit as draft
# ... iterate ...
gs bs --no-draft                 # mark ready for review
```

Or set default: `git config spice.submit.draft true`

## Update Only Existing CRs (Skip Unsubmitted)

```
gs ss --update-only              # push updates to existing CRs only
```
Useful when you have in-progress branches you don't want to submit yet.
