# Current Task

## Tryb pracy
STRUCTURE_FIX

Uzasadnienie trybu:
Task wzmacnia fundament workflow dla nowych aplikacji przez mechaniczne guardy zakresu zmian.

## Cel / Outcome
AI nie może zostawić zmian poza zadeklarowanym zakresem, nie może kodować w tasku audit-only i nie może mieszać artefaktów generowanych ze zmianami logicznymi bez jawnego trybu release/build.

## Kryteria sukcesu
- `gate:local` i `gate:pr` uruchamiają scope lock.
- `code-change` failuje przy pliku spoza allowlisty.
- `audit-only` failuje przy dowolnym zmienionym pliku.
- `artifacts/**` failuje poza `release-build`.
- Template i dokumenty opisują ten sam mechaniczny flow.

## Kontekst dla agenta
Moduł: workflow guards
Tryb zmiany: code-change
Maksymalny zakres plików: workflow docs, task template, guard scripts, package scripts
Dozwolone pliki do zmiany:
- AGENTS.md
- AGENT_DEV_POLICY.md
- ParkingLot.md
- README.md
- RELEASE_GATE.md
- package.json
- scripts/check-diff-size.js
- scripts/check-godfiles.js
- scripts/check-scope.js
- scripts/check-task.js
- tasks/TASK_TEMPLATE.md
- tasks/lessons.md
- tasks/todo.md
Kontrakty do przeczytania: AGENTS.md, README.md, RELEASE_GATE.md
Pliki zakazane: kod aplikacji, artifacts/**
Czego nie ruszać: framework-specific lint/test/build, logika biznesowa aplikacji, generator projektów

## Zakres
Moduł: workflow guards
Pliki: package scripts, scope guard, task template, workflow docs

## Reprodukcja / dowód problemu
Obecne `gate:local` sprawdza task, rozmiar diffu i duże pliki, ale nie sprawdza, czy realnie zmienione pliki mieszczą się w zadeklarowanym zakresie. Brak też mechanicznego trybu `audit-only`.

## Escalation
Czy brakuje danych do bezpiecznej zmiany?
NIE

Jeśli TAK:
Brakujące dane: brak
Czego nie da się potwierdzić: brak
Ryzyko kodowania teraz: niskie, bo zmiana dotyczy tylko workflow startera
Najmniejszy następny krok: dodać scope guard i wpiąć go w istniejące gate'y

## Klasyfikacja
REQUIRED

Uzasadnienie:
Bez mechanicznego scope locka workflow nadal zależy od dyscypliny agenta, a nie od gate'a.

## Diagnoza
Root cause: zasada "nie dotykaj plików poza zakresem" była deklaracją, nie automatycznym checkiem.
Dowód: `package.json` nie ma `check:scope`, a skrypty w `scripts/` nie porównują git diffu z allowlistą taska.
Aktualny flow: agent wypełnia task, ale gate nie zatrzymuje zmian ubocznych.

## Granice
Moduły dotknięte: workflow guard scripts, task template, workflow docs
Kontrakty dotknięte: `tasks/todo.md` deklaruje tryb zmiany i allowlistę
Poza zakresem: framework-specific architecture checker, AST import checker, generator tasków

## Kontrakt
INPUT: `tasks/todo.md` z `Tryb zmiany` i `Dozwolone pliki do zmiany`.
SUCCESS: wszystkie zmienione pliki są w allowliście albo task jest `audit-only` bez zmian.
ERRORS: brak trybu zmiany, brak allowlisty przy zmianach, plik poza allowlistą, `artifacts/**` poza release-build.
STATUSES: PASS / FAIL.
SIDE EFFECTS: brak poza odczytem git status/diff.
LOGS: output `npm run check:scope`.
TESTS: pozytywne i negatywne uruchomienia `scripts/check-scope.js`, `npm run gate:local`.
DONE: gate blokuje scope creep mechanicznie.

## Failure modes
Timeout: nie dotyczy.
Null/missing data: brak trybu zmiany albo allowlisty kończy się FAIL.
Invalid schema: nieznany tryb zmiany kończy się FAIL.
Duplicate request: ponowne uruchomienie checka jest idempotentne.
Concurrent request: git status pokazuje wszystkie lokalne zmiany; pliki spoza scope kończą się FAIL.
Partial write: gate failuje, jeśli partial write stworzy plik spoza allowlisty.
Worker crash: nie dotyczy.
Retry loop: nie dotyczy.
Provider unavailable: nie dotyczy.

## Guard Scope
REQUIRED GUARDS:
- scope lock po allowliście.
- audit-only no-diff.
- blokada `artifacts/**` poza `release-build`.
- wpięcie scope checka w `gate:local` i `gate:pr`.
- synchronizacja template i dokumentów.

NICE_TO_HAVE GUARDS:
- framework-specific import-boundary checker.
- generator tasków.

OVERBUILD GUARDS:
- własny subsystem workflow.

ParkingLot.md updated:
YES

## Runtime guards
State machine: nie dotyczy.
Error classification: CLI PASS / FAIL.
Idempotency: check można uruchamiać wielokrotnie.
Single-flight: nie dotyczy.
Worker lock: nie dotyczy.
Circuit breaker: nie dotyczy.
Backpressure: nie dotyczy.
UI truth: nie dotyczy.
Observability: output checka pokazuje zmienione pliki i allowlistę.

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
Czy da się ograniczyć zmianę do jednego kontraktu: tak, `tasks/todo.md` jako scope contract.

## Plan
- [x] Dodać scope-lock guard script.
- [x] Wpiąć guard w npm gates.
- [x] Zaktualizować template i docs.
- [x] Uruchomić pozytywne i negatywne checki.

## Weryfikacja
Komendy:
`npm run check:scope`
`CHECK_SCOPE_CHANGED_FILES="README.md\nsrc/unexpected.ts" node scripts/check-scope.js`
`CHECK_SCOPE_CHANGED_FILES="README.md" CHECK_SCOPE_TASK_FILE=/tmp/audit-task.md node scripts/check-scope.js`
`CHECK_SCOPE_CHANGED_FILES="artifacts/report.html" node scripts/check-scope.js`
`npm run gate:local`
Expected result: pozytywne checki PASS, negatywne checki FAIL.

## Definition of Done
- [x] test PASS
- [x] build NOT_NEEDED, starter nie ma aplikacji do zbudowania
- [ ] brak ERROR w logach
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
Co zmieniono: scope-lock guard, npm gate wiring, template i docs.
Jak sprawdzono: `npm run check:scope`, negatywne testy dla scope creep / artifacts / audit-only, pozytywny test `release-build` dla `artifacts/**`, `npm run gate:local`, `npm run gate:pr`.
PASS / FAIL: PASS
Ryzyka: konkretny projekt nadal musi dodać własne lint/typecheck/test/build.
Follow-up: framework-specific import-boundary checker dopiero po wybraniu stacka aplikacji.
