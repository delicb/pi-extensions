---
name: background-processes
description: Manage background processes (dev servers, watchers, builds). Use when starting long-running commands, debugging server issues by comparing client responses with server-side logs, or when you need to run a process that doesn't exit on its own. Prevents process leaks.
---

# Background Processes

Use the `process` tool for long-running commands instead of `bash`.

## When to Use

**Use `process` when:**
- Starting a dev server (e.g. `npm run dev`, `python -m http.server`)
- Starting a file watcher or build tool in watch mode
- Running any command that does not exit on its own
- You need to check the output of a running process later
- You need to send input to a running process via stdin

**Use `bash` when:**
- Running a command that finishes quickly (ls, grep, git, npm install, etc.)
- You need the command's output immediately to proceed

## Anti-patterns

Never do this:
```bash
npm run dev &
# or
nohup some-server &
# or
bash -c "some-server &"
```
These leak processes that are never cleaned up.

## Workflow

```
process({ action: "start", name: "backend", command: "npm run dev" })
process({ action: "output", id: "backend" })
process({ action: "kill", id: "backend" })
```

1. `start` - launch the process with a descriptive name
2. `output` - check recent stdout/stderr to verify it started correctly
3. Do your work (test, browse, etc.)
4. `output` - check again after actions to see server-side output
5. `kill` - stop the process when done

You don't need to poll. Use alert flags on `start` to get notified automatically when a process finishes or fails.

## Debugging with Logs

When debugging a web server or API:
1. Start the server with `start`
2. Send a request with `bash` (curl, wget, etc.)
3. Check the response AND call `output` to see server-side logs (errors, stack traces, request logs)
4. Compare both sides to diagnose the problem

Always check output after unexpected responses - the server-side error is often more informative than the client-side symptom.

For large output that gets truncated, use `logs` to get the log file paths and read them directly with the `read` tool.

## Stdin Interaction

For processes that read from stdin (e.g. REPLs, interactive CLIs):
```
process({ action: "start", name: "repl", command: "python3" })
process({ action: "write", id: "repl", input: "print('hello')\n" })
process({ action: "output", id: "repl" })
```

Set `end: true` on `write` to close stdin (for programs that read until EOF).

## Actions Reference

| Action | Required params | Description |
|--------|----------------|-------------|
| `start` | `name`, `command` | Start a background process. Optional: `cwd`, `alertOnSuccess`, `alertOnFailure`, `alertOnKill`. |
| `list` | (none) | Show all tracked processes with IDs, names, and status. |
| `output` | `id` | Get recent stdout/stderr content (truncated). `id` can be proc_N or name. |
| `logs` | `id` | Get log file paths to inspect with `read` tool. Use when output is too large. |
| `kill` | `id` | Terminate a process (SIGTERM, then SIGKILL). |
| `clear` | (none) | Remove all finished processes from the list. |
| `write` | `id`, `input` | Write to process stdin. Optional `end` to close stdin after writing. |

## Alert Flags

Set on `start` to control when the agent gets notified automatically:
- `alertOnSuccess` (default: false) - process completed successfully. Use for builds/tests.
- `alertOnFailure` (default: true) - process crashed or exited with error.
- `alertOnKill` (default: false) - process killed by external signal. Killing via tool never triggers this.

The user always sees process status updates in the UI regardless of these flags.
