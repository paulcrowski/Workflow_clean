# Current Task

Task ID: 2026-05-12-future-work-gates
Task Date: 2026-05-12
Task Status: ACTIVE

## Tryb pracy
STRUCTURE_FIX

Uzasadnienie trybu:
Dodaję dwa mechaniczne guardy pod przyszłe aplikacje: realne komendy projektu oraz import boundaries.

## Cel / Outcome
Workflow ma lepiej chronić przyszłą pracę w realnych aplikacjach: jeśli pojawi się kod aplikacji, bramy mają wymagać `lint/typecheck/test/build`; jeśli jest skonfigurowana mapa warstw, bramy mają blokować zakazane importy.

## Kryteria sukcesu
- Starter bez aplikacji przechodzi bez fałszywych wymagań.
- Gdy app code istnieje, brak `lint/typecheck/test/build` failuje.
- Project gates potrafią uruchomić skonfigurowane komendy.
- Import-boundary checker używa konfigu, a nie twardych założeń o stacku.
- Zakazany import failuje w teście.
- `gate:local` i `gate:pr` uruchamiają nowe guardy.

## Kontekst dla agenta
Moduł: workflow guards
Tryb zmiany: code-change
Maksymalny zakres plików: workflow guard scripts, config, docs, task evidence
Dozwolone pliki do zmiany:
- README.md
- RELEASE_GATE.md
- package.json
- scripts/check-diff-size.js
- scripts/check-scope.js
- scripts/check-import-boundaries.js
- scripts/check-project-gates.js
- scripts/check-task-freshness.js
- tasks/TASK_TEMPLATE.md
- tasks/todo.md
- tasks/lessons.md
- workflow/import-boundaries.json
Kontrakty do przeczytania: AGENTS.md, README.md, RELEASE_GATE.md, docs/CODE_STRUCTURE_GUARDS.md
Pliki zakazane: kod aplikacji, artifacts/**
Czego nie ruszać: scope guard, diff-size guard, godfile guard, generator tasków

## Zakres
Moduł: workflow guards
Pliki: package scripts, two new guard scripts, import-boundary config, docs, task evidence

## Reprodukcja / dowód problemu
Obecny starter mówi, żeby po stworzeniu aplikacji dopiąć lint/typecheck/test/build i pilnować modularności, ale nie ma mechanicznego guarda, który to wymusi.

## Escalation
Czy brakuje danych do bezpiecznej zmiany?
NIE

Jeśli TAK:
Brakujące dane: brak
Czego nie da się potwierdzić: brak
Ryzyko kodowania teraz: średnie, bo guardy muszą być konfigurowalne i nie mogą blokować pustego startera
Najmniejszy następny krok: dodać wykrywanie app code oraz config-driven import-boundary checker

## Klasyfikacja
REQUIRED

Uzasadnienie:
To były dwa wskazane braki przed użyciem workflow w przyszłych aplikacjach.

## Diagnoza
Root cause: workflow miał dobre zasady modułowości i testowania, ale brakowało wykonawczych bram dla realnego stacka aplikacji.
Dowód: `package.json` nie ma `check:project-gates` ani `check:import-boundaries`; README mówi o ręcznym dopięciu komend.
Aktualny flow: agent może stworzyć appkę bez test/build scripts albo złamać zależności warstw i nadal przejść obecne starterowe gate'y.

## Granice
Moduły dotknięte: workflow guard scripts, package scripts, docs
Kontrakty dotknięte: `package.json` scripts, `workflow/import-boundaries.json`
Poza zakresem: ESLint plugin, TypeScript compiler integration, generator aplikacji

## Kontrakt
INPUT: `package.json`, opcjonalny kod aplikacji, opcjonalny `workflow/import-boundaries.json`.
SUCCESS: brak aplikacji = pass; aplikacja = wymagane i uruchomione project gates; import boundaries = brak zakazanych importów.
ERRORS: brak wymaganego scriptu, placeholder script, komenda failuje, zakazany import.
STATUSES: PASS / FAIL.
SIDE EFFECTS: uruchomienie project scripts, odczyt plików źródłowych.
LOGS: output guard scripts.
TESTS: env-based fixture tests i `npm run gate:local`.
DONE: przyszła aplikacja nie przejdzie bez realnych komend i zgodnych importów.

## Failure modes
Timeout: project scripts dziedziczą timeout procesu uruchamiającego gate.
Null/missing data: brak configu import boundaries kończy się SKIP/PASS, bo config jest per stack.
Invalid schema: zły config kończy się FAIL.
Duplicate request: checki są idempotentne.
Concurrent request: nie dotyczy.
Partial write: niepełny config albo package kończy się FAIL.
Worker crash: nie dotyczy.
Retry loop: nie dotyczy.
Provider unavailable: nie dotyczy.

## Guard Scope
REQUIRED GUARDS:
- wykrycie app code i wymaganie `lint/typecheck/test/build`.
- uruchomienie wymaganych project scripts.
- config-driven import-boundary checker.
- wpięcie guardów w `gate:local` i `gate:pr`.

NICE_TO_HAVE GUARDS:
- osobny preset dla Expo/Next/Vite.
- pełny AST parser importów.

OVERBUILD GUARDS:
- własny system build orchestratora.

ParkingLot.md updated:
NOT_NEEDED

## Runtime guards
State machine: nie dotyczy.
Error classification: CLI PASS / FAIL.
Idempotency: check można uruchamiać wielokrotnie.
Single-flight: nie dotyczy.
Worker lock: nie dotyczy.
Circuit breaker: nie dotyczy.
Backpressure: nie dotyczy.
UI truth: nie dotyczy.
Observability: output pokazuje wykrycie aplikacji, uruchomione scripts i naruszenia importów.

## Code Structure Guard
Czy dotykamy pliku >300 LOC?
NIE

Jeśli TAK:
Plik: brak
LOC: brak
Dlaczego zmiana trafia tutaj: brak
Czy plik ma wiele odpowiedzialności: brak
Minimalny fix: brak
Czy potrzebne wydzielenie odpowiedzialności: brak
Ryzyko: brak

## GOD_FILE_CHECK
Wymagane, jeśli plik >500 LOC.

Plik: brak
LOC: brak
Obecne odpowiedzialności: brak
Czy task dokłada nową odpowiedzialność: brak
Minimalny fix bez rozbicia: brak
Małe wydzielenie odpowiedzialności: brak
Ryzyko minimalnego fixu: brak
Ryzyko wydzielenia: brak
Rekomendacja: brak

## Dependency Direction Guard
Czy zmiana odwraca zależność?
NIE

Czy Business Logic importuje UI/DB/framework?
NIE

Czy adapter przecieka do core?
NIE

## Change Isolation
Ile modułów dotyka zmiana: jeden obszar workflow guards.
Czy to naturalne: tak.
Czy da się ograniczyć zmianę do jednego kontraktu: tak, package scripts plus import-boundaries config.

## Plan
- [x] Zdefiniować najmniejszy wariant bez fałszywych stack assumptions.
- [x] Dodać project-gates guard.
- [x] Dodać import-boundary guard i config.
- [x] Wpiąć guardy w gates.
- [x] Zaktualizować docs i lessons.
- [x] Uruchomić testy negatywne/pozytywne oraz `npm run gate:local`.

## Weryfikacja
Komendy:
`CHECK_PROJECT_ROOT=/tmp/app CHECK_PROJECT_DRY_RUN=1 node scripts/check-project-gates.js`
`CHECK_IMPORT_ROOT=/tmp/import-fixture CHECK_IMPORT_CONFIG=/tmp/import-fixture/workflow/import-boundaries.json node scripts/check-import-boundaries.js`
`npm run gate:local`
Expected result: brak scripts w app fixture failuje, poprawne scripts przechodzą w dry-run, zakazany import failuje, lokalny starter przechodzi.

## Definition of Done
- [x] test PASS
- [x] build NOT_NEEDED, starter nie ma aplikacji do zbudowania
- [x] brak ERROR w logach
- [x] zmiana nie wychodzi poza zakres
- [x] brak refaktoru przy okazji
- [x] failure modes obsłużone
- [x] brak silent fallbacków
- [x] brak empty success
- [x] UI truth zachowane, jeśli dotyczy
- [x] dependency direction zachowany
- [x] brak cyklicznych zależności
- [x] duże pliki nie zostały powiększone bez uzasadnienia
- [x] implementowano tylko REQUIRED GUARDS

## Review / Wyniki
Co zmieniono: dodano `check-project-gates`, `check-import-boundaries`, `workflow/import-boundaries.json`, wpięto nowe guardy w `gate:local` i `gate:pr`; dodatkowo naprawiono `check-scope`, żeby dla nowych katalogów sprawdzał realne pliki przez `--untracked-files=all`.
Jak sprawdzono: fixture bez project scripts failuje; fixture z project scripts przechodzi w dry-run; zakazany import core -> ui failuje; dozwolony import ui -> core przechodzi; `npm run gate:local` przechodzi.
PASS / FAIL: PASS
Ryzyka: import parser jest regex-based dla import/require; egzotyczne dynamic importy wymagają stack-specific toolingu.
Follow-up: preset per stack dopiero po realnym projekcie.
