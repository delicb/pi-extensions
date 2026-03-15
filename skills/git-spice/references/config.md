# git-spice Configuration

All options set via `git config`. Use `--global` for user-level, `--local` for repo-level.

## Branch Creation

| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `spice.branchCreate.commit` | true/false | true | Whether `gs bc` commits staged changes |
| `spice.branchCreate.prefix` | string | (none) | Prefix for branch names (e.g. `username/`) |
| `spice.branchCreate.generatedBranchNameLimit` | integer | 32 | Max length of auto-generated branch names |

## Commit

| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `spice.commit.signoff` | true/false | false | Add Signed-off-by trailer by default |

## Checkout & Navigation

| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `spice.branchCheckout.showUntracked` | true/false | false | Show untracked branches in `gs bco` picker |
| `spice.branchCheckout.trackUntracked` | prompt/always/never | prompt | Auto-track untracked branches on checkout |
| `spice.branchPrompt.sort` | refname/committerdate/authordate | refname | Sort order in branch prompts (prefix `-` for descending) |
| `spice.checkout.verbose` | true/false | true | Print message when switching branches |

## Submission

| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `spice.submit.draft` | true/false | false | Default draft status for new CRs |
| `spice.submit.publish` | true/false | true | Create CRs on submit (false = push only) |
| `spice.submit.updateOnly` | true/false | false | Multi-branch submits only update existing CRs |
| `spice.submit.web` | true/false/created | false | Open browser after submit |
| `spice.submit.label` | comma-separated | (none) | Default labels for all CRs |
| `spice.submit.reviewers` | comma-separated | (none) | Default reviewers (use `org/team` for teams) |
| `spice.submit.reviewers.addWhen` | always/ready | always | Skip configured reviewers for drafts when `ready` |
| `spice.submit.assignees` | comma-separated | (none) | Default assignees |
| `spice.submit.template` | filename | (none) | Auto-select CR template (e.g. `PULL_REQUEST_TEMPLATE.md`) |
| `spice.submit.listTemplatesTimeout` | duration | 1s | Timeout for fetching CR templates |
| `spice.submit.skipRestackCheck` | never/trunk/always | never | Skip restack check before submit |

## Navigation Comments

| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `spice.submit.navigationComment` | true/false/multiple | true | Post stack navigation comments on CRs |
| `spice.submit.navigationCommentSync` | branch/downstack | branch | Which branches' comments to sync on submit |
| `spice.submit.navigationCommentStyle.marker` | string | `◀` | Marker for current branch in nav comments |
| `spice.submit.navigationComment.downstack` | all/open | all | Which downstack CRs to show in nav comments |

## Log

| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `spice.log.all` | true/false | false | Show all stacks by default in `gs ls`/`gs ll` |
| `spice.log.crFormat` | url/id | id | Show CR URL or ID |
| `spice.log.crStatus` | true/false | false | Fetch and show CR status (adds network request) |
| `spice.log.pushStatusFormat` | true/false/aheadBehind | true | Show push sync status |

## Repo Sync

| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `spice.repoSync.closedChanges` | ask/ignore | ask | How to handle closed (not merged) CRs |

## Rebase

| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `spice.rebaseContinue.edit` | true/false | true | Open editor on `gs rbc` |

## Forge URLs (for self-hosted instances)

| Option | Env Var | Description |
|--------|---------|-------------|
| `spice.forge.github.url` | `GITHUB_URL` | GitHub instance URL |
| `spice.forge.github.apiUrl` | `GITHUB_API_URL` | GitHub API URL |
| `spice.forge.gitlab.url` | `GITLAB_URL` | GitLab instance URL |
| `spice.forge.gitlab.apiUrl` | `GITLAB_API_URL` | GitLab API URL |
| `spice.forge.gitlab.oauth.clientID` | `GITLAB_OAUTH_CLIENT_ID` | OAuth client ID for self-hosted GitLab |
| `spice.forge.gitlab.removeSourceBranch` | | Remove source branch on MR merge (default: true) |
| `spice.forge.bitbucket.url` | `BITBUCKET_URL` | Bitbucket instance URL |
| `spice.forge.bitbucket.apiURL` | `BITBUCKET_API_URL` | Bitbucket API URL |

## Experiments

Enable with `git config spice.experiment.<name> true`:

| Experiment | Description |
|------------|-------------|
| `commitFixup` | Enable `gs cf` - amend any commit in the branch |
| `commitPick` | Enable `gs cp` - stack-aware cherry-pick |

## Custom Shorthands

Define custom shorthands under `spice.shorthand`:
```
git config --global spice.shorthand.ch "branch checkout"
git config --global spice.shorthand.can "commit amend --no-edit"
```

Shell command aliases (prefix with `!`):
```
git config spice.shorthand.from-up '!git checkout -p $(gs up -n) -- "$@"'
```
