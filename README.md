# cleanWorkflow

Starter workflow dla nowych projektow budowanych z agentami AI.

## W skrocie

Ten repozytorium daje maly, mechaniczny workflow dla pracy z agentem AI.

Cel jest prosty: agent ma robic jedna potrzebna zmiane, w dozwolonych plikach, z dowodem PASS / FAIL. Workflow blokuje typowe problemy:
- kodowanie bez aktualnego taska,
- zmiany poza zakresem,
- dryf w łatwe zielone slice'y zamiast największego blockera,
- za duzy diff dla malego fixa,
- happy-path-only coding bez terminal states, retry policy i failure modes,
- audit, ktory po cichu zmienia pliki,
- traktowanie prostego copy/statycznego UI jak runtime taska,
- aplikacje bez realnych `lint/typecheck/test/build`,
- importy lamiace granice warstw.

Dlaczego to istnieje: same instrukcje w promptach nie wystarczaja. Ten starter przenosi najwazniejsze zasady do repo i hookow, zeby bledy byly blokowane mechanicznie przed commitem albo PR.

## Ocena stanu

Aktualna ocena: **9/10 jako starter workflow**.

Mocne strony:
- guardy sa mechaniczne, nie tylko opisane w promptach,
- agent musi miec aktualny task, scope i dowod PASS / FAIL,
- task musi mówić, czy rusza największy blocker,
- agent moze tworzyc i zamykac taski komendami `task:new` / `task:close`,
- male fixy maja twarde limity diffu,
- proste copy/statyczne UI ma lekki tryb `CONTENT_FIX`,
- runtime/data/UI taski maja failure-first checklist,
- po dodaniu aplikacji workflow wymaga realnych `lint/typecheck/test/build`,
- import boundaries sa sprawdzane przez konfig w repo.

To nie jest jeszcze 10/10, bo celowo nie ma presetow per stack (`vite-react`, `next`, `expo`, `node-api`, `python`).

Presetow nie warto dodawac na slepo. Dodaj je dopiero, gdy konfiguracja nowego stacka zacznie realnie spowalniac prace.

## Co to daje

- `AGENTS.md` trzyma krotka instrukcje pracy dla agenta.
- `AGENT_DEV_POLICY.md` trzyma pelna polityke developerska.
- `docs/` trzyma guardy dla runtime, struktury kodu, kontraktow i budzetu kontekstu.
- `tasks/todo.md` jest aktualnym taskiem.
- `tasks/TASK_TEMPLATE.md` jest czystym formularzem do skopiowania przy nowym tasku.
- `scripts/` zawiera mechaniczne guardy dla taska, scope locka, diffu i duzych plikow.

## Task lifecycle dla Codexa

Ty dalej mowisz normalnie: "zrob X". Codex pod spodem moze uzyc tych komend, zeby nie przepisywac taska recznie.

Nowy task:

```bash
npm run task:new -- --slug simple-fix --mode MINIMAL_FIX --change-mode code-change --files src/example.js --outcome "Naprawic prosty blad" --success "gate PASS"
```

Co to robi:
- tworzy swiezy `tasks/todo.md`,
- ustawia date, task ID, tryb pracy i scope,
- dopisuje allowliste plikow,
- zostawia miejsce na root cause, testy i dowod.

Zamkniecie taska:

```bash
npm run task:close -- --result PASS
```

Co to robi:
- zapisuje skonczony task do `tasks/archive/`,
- zostawia `tasks/todo.md` w stanie `ready-for-next-task`,
- blokuje przypadkowe kodowanie na starym scope.

To sa narzedzia dla agenta. Nie musisz ich uruchamiac recznie, jesli pracujesz przez Codexa.

## Start w nowym projekcie

1. Skopiuj pliki workflow do nowego repo.
2. Uruchom:

```bash
npm install
npm run hooks:install
```

3. Utworz realny task komenda `npm run task:new -- --slug ... --files ...`.
4. W `tasks/todo.md` ustaw:
   - `Task ID`, `Task Date` i `Task Status: ACTIVE`,
   - `Tryb zmiany: code-change`, `audit-only` albo `release-build`,
   - `Dozwolone pliki do zmiany` jako twarda allowlista dla aktualnego taska.
5. Dopnij projektowe komendy do `package.json`, gdy aplikacja juz istnieje:

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

`gate:local` i `gate:pr` sprawdzaja:

- task ma wypelniony formularz,
- task wskazuje największy blocker i czy aktualna praca go rusza,
- jeśli task nie rusza blockera, musi podać kontrolowany powód i warunek powrotu,
- task ma aktywny status, identyfikator i swieza date,
- zmienione pliki mieszcza sie w scope locku,
- `audit-only` nie zmienia zadnych plikow,
- `artifacts/**` wolno zmieniac tylko w trybie `release-build`,
- lokalny diff wzgledem `HEAD` nie przekracza limitow dla wybranego trybu pracy,
- duze pliki nie sa powiekszane bez GOD_FILE_CHECK.

## Limity diffu

`scripts/check-diff-size.js` czyta `## Tryb pracy` z `tasks/todo.md`.

`CONTENT_FIX` jest dla malych zmian w copy, statycznej tresci albo prostym UI polish. Nie uzywaj go dla API, auth, DB, workerow, providerow, security, danych uzytkownika ani statusow bedacych zrodlem prawdy.

| Tryb pracy | Liczone pliki | Liczone linie |
| --- | ---: | ---: |
| `MINIMAL_FIX` | 3 | 50 |
| `CONTENT_FIX` | 3 | 80 |
| `RUNTIME_FIX` | 12 | 250 |
| `STRUCTURE_FIX` | 12 | 250 |
| `FEATURE` | 12 | 250 |
| `AUDIT` | 0 | 0 |

Pliki workflow, dokumenty, lockfile i generowane build artefakty sa ignorowane przez licznik rozmiaru diffu, ale nadal musza przejsc scope lock z `tasks/todo.md`.

## Swiezosc taska

`scripts/check-task-freshness.js` blokuje prace na starym albo zamknietym tasku.

Wymagane pola w `tasks/todo.md`:

```md
Task ID: 2026-05-12-short-slug
Task Date: 2026-05-12
Task Status: ACTIVE
```

Guard failuje, gdy:
- status nie jest `ACTIVE`,
- data taska jest z przyszlosci,
- task jest starszy niz 3 dni,
- `Task ID` nie zaczyna sie od `Task Date`.

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

## Project gates

`scripts/check-project-gates.js` wykrywa kod aplikacji w typowych katalogach (`src`, `app`, `pages`, `components`, `lib`, `server`, `tests`).

Jeśli aplikacja istnieje, guard wymaga realnych scriptow:
- `lint`,
- `typecheck`,
- `test`,
- `build`.

Placeholdery typu `...` albo `TODO` failuja. W pustym starterze guard przechodzi, zeby nie udawac testow projektu, ktorego jeszcze nie ma.

## Import boundaries

`scripts/check-import-boundaries.js` czyta `workflow/import-boundaries.json`.

Domyslny config pilnuje warstw:
- `ui`,
- `business`,
- `domain`,
- `data`,
- `shared`.

Config jest punktem startowym. Po wyborze stacka dopasuj `sourceRoots`, aliasy i wzorce plikow do realnej aplikacji. Guard sprawdza lokalne `import`, `export from` i `require`; importy z paczek npm sa ignorowane.
