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

- `extensions/ssh.ts` - SSH remote tool execution extension
- `skills/personal-workflow/SKILL.md` - Starter personal skill
- `themes/catppuccin-mocha-contrast.json` - Starter custom theme

Theme is a fork of https://github.com/ujj/pi-catppuccin, just added a bit more contrast to distinguish user messages from responses. 

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
