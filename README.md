# del-boy Pi Personal Pack

Personal installable Pi package containing:

- Extensions (`extensions/`)
- Skills (`skills/`)
- Themes (`themes/`)

## Install

### Local path

```bash
pi install /Users/del-boy/src/pi-extensions
```

### Local path (project scope)

```bash
pi install -l /Users/del-boy/src/pi-extensions
```

### Git (once pushed)

```bash
pi install git:github.com/<you>/<repo>
```

## What is included

- `extensions/prevent-cmd-c-scroll.ts` - Prevents macOS Cmd+C copy from jumping Pi back to the input.
- `extensions/session-breakdown.ts` - Session statistics and breakdown UI.
- `extensions/ssh.ts` - SSH remote tool execution extension.
- `skills/background-processes` - Pi-specific background process workflow skill.

Shared personal skills live in `~/.agents/skills` and are managed from the dotfiles repo.
- `themes/catppuccin-mocha-contrast.json` - Catppuccin Mocha theme with extra contrast.

Theme is a fork of https://github.com/ujj/pi-catppuccin, with more contrast to distinguish user messages from responses.

## Development

```bash
pnpm install
pnpm run typecheck
```

## Package manifest

Resources are declared in `package.json` under `pi`:

```json
{
  "pi": {
    "extensions": ["./extensions"],
    "skills": ["./skills"],
    "themes": ["./themes"]
  }
}
```
