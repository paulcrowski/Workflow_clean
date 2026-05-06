# cleanWorkflow

Starter workflow dla nowych projektow budowanych z agentami AI.

## Co to daje

- `AGENTS.md` trzyma krotka instrukcje pracy dla agenta.
- `AGENT_DEV_POLICY.md` trzyma pelna polityke developerska.
- `docs/` trzyma guardy dla runtime, struktury kodu, kontraktow i budzetu kontekstu.
- `tasks/todo.md` jest aktualnym taskiem.
- `tasks/TASK_TEMPLATE.md` jest czystym formularzem do skopiowania przy nowym tasku.
- `scripts/` zawiera mechaniczne guardy dla taska, diffu i duzych plikow.

## Start w nowym projekcie

1. Skopiuj pliki workflow do nowego repo.
2. Uruchom:

```bash
npm install
npm run hooks:install
```

3. Skopiuj `tasks/TASK_TEMPLATE.md` do `tasks/todo.md` i wypelnij realny task.
4. Dopnij projektowe komendy do `package.json`, gdy aplikacja juz istnieje:

```json
{
  "scripts": {
    "lint": "...",
    "typecheck": "...",
    "test": "...",
    "build": "..."
  }
}
```

## Bramy

Lokalnie:

```bash
npm run gate:local
```

Przed PR / push:

```bash
npm run gate:pr
```

## Zasada

Repo trzyma procedure. Prompt trzyma outcome.

Nie doklejaj wszystkich guardow do kazdego promptu. Agent ma czytac repo i dobierac tylko to, co pasuje do taska.

## Po utworzeniu aplikacji

Ten starter pilnuje workflow. Nie zastepuje testow konkretnego projektu.

Po stworzeniu appki dopnij do `gate:local` i `gate:pr` realne:

- lint,
- typecheck,
- test,
- build.
