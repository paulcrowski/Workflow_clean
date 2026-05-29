# Lessons

## Data
2026-05-11

## Błąd
Workflow miał zasady zakresu, ale nie miał mechanicznego scope locka.

## Przyczyna
Gate sprawdzał formularz taska, rozmiar diffu i duże pliki, ale nie porównywał realnie zmienionych plików z allowlistą taska.

## Reguła zapobiegawcza
Każdy task deklaruje `Tryb zmiany` i `Dozwolone pliki do zmiany`; gate failuje przy zmianach spoza allowlisty, przy diffie w `audit-only` i przy `artifacts/**` poza `release-build`.

## Test / guardrail
`npm run check:scope` wpięty w `gate:local` i `gate:pr`.

## Data
2026-05-12

## Błąd
`MINIMAL_FIX` miał deklarowany limit 3 pliki / 50 LOC, ale brama diff-size stosowała luźny globalny limit 12 plików / 250 LOC.

## Przyczyna
Polityka workflow i mechaniczny guard rozjechały się: instrukcja ograniczała mały fix, ale skrypt nie czytał trybu pracy z `tasks/todo.md`.

## Reguła zapobiegawcza
Limity rozmiaru diffu muszą wynikać z trybu pracy, a nie z jednego globalnego progu.

## Test / guardrail
`scripts/check-diff-size.js` egzekwuje `MINIMAL_FIX` jako 3 liczone pliki / 50 liczonych linii i ma env-based test seam dla numstat/task file.

## Data
2026-05-12

## Błąd
Workflow mógł użyć starego `tasks/todo.md` jako przepustki, jeśli formularz i allowlista nadal pasowały do diffu.

## Przyczyna
Guardy sprawdzały strukturę taska, scope i rozmiar diffu, ale nie wymagały aktywnego statusu, identyfikatora ani świeżej daty taska.

## Reguła zapobiegawcza
Bieżący task musi mieć `Task ID`, `Task Date` i `Task Status: ACTIVE`; stary albo zamknięty task ma failować przed sprawdzeniem scope.

## Test / guardrail
`scripts/check-task-freshness.js` jest wpięty w `gate:local` i `gate:pr`; negatywne testy obejmują `DONE` oraz task starszy niż limit.

## Data
2026-05-12

## Błąd
Starter mógł zostać użyty do realnej aplikacji bez faktycznych `lint/typecheck/test/build` oraz bez mechanicznego sprawdzania granic importów.

## Przyczyna
Dokumenty mówiły o dopięciu testów i modularności, ale `gate:local` / `gate:pr` nie miały guardów dla project scripts ani import boundaries.

## Reguła zapobiegawcza
Pusty starter nie udaje testów, ale po wykryciu kodu aplikacji musi wymagać realnych project gates; import boundaries muszą być konfigurowane per stack w repo.

## Test / guardrail
`scripts/check-project-gates.js` wymaga `lint/typecheck/test/build` po wykryciu app code; `scripts/check-import-boundaries.js` blokuje zakazane lokalne importy według `workflow/import-boundaries.json`.

## Data
2026-05-19

## Błąd
Failure-first zasady były dobrze opisane w `docs/ARCHITECTURE_GUARDS.md`, ale krótki entrypoint `AGENTS.md` nie przypominał wprost 6 pytań dla runtime/data/UI/status tasków.

## Przyczyna
Szczegółowa procedura była poprawna, ale najważniejszy skrót produkcyjnej nieufności mógł zniknąć przy szybkim tasku.

## Reguła zapobiegawcza
Dla runtime, danych, API, workerów, parserów, providerów, UI statusu i side-effectów agent musi przed kodem wskazać root cause, kontrakt, failure modes, state/statusy, test plan i dowód PASS/FAIL.

## Test / guardrail
`AGENTS.md` ma krótki `Failure-first` anchor, a szczegóły nadal żyją w `docs/ARCHITECTURE_GUARDS.md`.

## Data
2026-05-19

## Błąd
Agent musiał ręcznie przepisywać `tasks/todo.md` przy starcie i końcu pracy.

## Przyczyna
Workflow miał mechaniczne guardy, ale nie miał mechanicznego lifecycle taska.

## Reguła zapobiegawcza
Codex powinien tworzyć nowy task przez `task:new`, a zakończony task archiwizować przez `task:close`.

## Test / guardrail
`scripts/task-lifecycle.js` obsługuje `task:new` i `task:close`; ma fixture-friendly opcje `--task-file` i `--archive-dir`, więc można je testować bez ruszania realnego taska.

## Data
2026-05-29

## Błąd
Agent może mylić łatwy zielony progres w repo z realnym postępem wobec najważniejszego blockera produktu.

## Przyczyna
Task miał scope, testy i dowód PASS/FAIL, ale nie wymuszał odpowiedzi, czy aktualna praca rusza największy blocker.

## Reguła zapobiegawcza
Każdy task musi mieć `Priorytet / Blocker`: największy blocker teraz, czy task go rusza, a jeśli nie, dlaczego mimo to robimy go teraz.

## Test / guardrail
`scripts/check-task.js` wymaga sekcji `Priorytet / Blocker`, a `scripts/task-lifecycle.js` generuje ją dla nowych tasków.
