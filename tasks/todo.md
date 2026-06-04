# Current Task

Task ID: 2026-06-04-mode-aware-task-templates
Task Date: 2026-06-04
Task Status: ACTIVE

## Tryb pracy
FEATURE

Uzasadnienie trybu:
Task utworzony przez task lifecycle.

## Cel / Outcome
Zmniejszyc spalanie tokenow przez krotkie taski per tryb, bez recznego wypelniania przez uzytkownika

## Kryteria sukcesu
- task:new generuje krotkie taski dla MINIMAL_FIX/CONTENT_FIX/AUDIT i pelne taski dla runtime/structure/feature
- check-task waliduje wymagane sekcje zależnie od trybu pracy.
- uzytkownik nie musi wypelniac taska recznie; to jest obowiazek agenta.

## Priorytet / Blocker
Największy blocker teraz: Zmniejszyc spalanie tokenow przez krotkie taski per tryb, bez recznego wypelniania przez uzytkownika
Dowód blockera: polecenie użytkownika i aktualny task
Czy ten task rusza blocker: TAK
Jeśli NIE, powód: NOT_APPLICABLE
Dlaczego mimo to robimy teraz: nie dotyczy
Warunek powrotu do blockera: nie dotyczy

## Kontekst dla agenta
Moduł: workflow
Tryb zmiany: code-change
Maksymalny zakres plików: allowlista z taska
Dozwolone pliki do zmiany:
- AGENTS.md
- README.md
- tasks/todo.md
- tasks/lessons.md
- scripts/check-task.js
- scripts/task-lifecycle.js
- tasks/archive/**
Kontrakty do przeczytania: AGENTS.md, README.md
Pliki zakazane: wszystko poza allowlistą
Czego nie ruszać: pliki poza zakresem

## Zakres
Moduł: workflow
Pliki: AGENTS.md, README.md, tasks/todo.md, tasks/lessons.md, scripts/check-task.js, scripts/task-lifecycle.js

## Reprodukcja / dowód problemu
Obecny `task:new` generowal jeden duzy formularz dla kazdego trybu. To dawalo dobra jakosc, ale lekkie taski placily tokenowo za sekcje runtime, ktorych nie potrzebuja.

## Escalation
Czy brakuje danych do bezpiecznej zmiany?
NIE

Jeśli TAK:
Brakujące dane: brak
Czego nie da się potwierdzić: brak
Ryzyko kodowania teraz: niskie po utrzymaniu scope locka
Najmniejszy następny krok: wykonać najmniejszą zmianę z allowlisty

## Klasyfikacja
REQUIRED

Uzasadnienie:
Zmiana jest wymagana dla aktualnego stanu workflow.

## Diagnoza
Root cause: generator taskow nie rozroznial ryzyka trybu pracy, a walidator wymagal pelnego formularza nawet dla lekkich trybow.
Dowód: `scripts/task-lifecycle.js` mial jeden `render()`, a `scripts/check-task.js` mial jedna liste wymaganych sekcji.
Aktualny flow: agent tworzy task przez `task:new`; po zmianie formularz zalezy od trybu pracy.

## Granice
Moduły dotknięte: workflow
Kontrakty dotknięte: task lifecycle, check-task, AGENTS.md, README.md, lessons.
Poza zakresem: wszystko poza allowlistą.

## Kontrakt
INPUT: polecenie użytkownika i pliki z allowlisty.
SUCCESS: spełnione kryteria sukcesu.
ERRORS: brak dowodu, zmiana poza scope albo failujące gate'y.
STATUSES: PASS / FAIL.
SIDE EFFECTS: tylko zmiany w plikach z allowlisty.
LOGS: komendy weryfikacyjne.
TESTS: fixture task:new dla MINIMAL_FIX, CONTENT_FIX, AUDIT i RUNTIME_FIX; check-task; gate:local; git diff --check.
DONE: review ma konkretny wynik.

## Failure modes
Timeout: przerwać i pokazać ostatni bezpieczny stan.
Null/missing data: nie zgadywać, użyć ESCALATION.
Invalid schema: nie dotyczy, chyba że task dotyka danych.
Duplicate request: sprawdzić idempotencję, jeśli task ma side effecty.
Concurrent request: nie dotyczy, chyba że task dotyka runtime.
Partial write: nie zostawiać pustego sukcesu.
Worker crash: nie dotyczy, chyba że task dotyka workera.
Retry loop: nie dodawać retry bez klasyfikacji błędów.
Provider unavailable: nie dotyczy, chyba że task dotyka providera.

## Guard Scope
REQUIRED GUARDS:
- trzymać się allowlisty.
- uruchomić testy wskazane w tasku.

NICE_TO_HAVE GUARDS:
- pomysły poza zakresem zapisać do ParkingLot.md.

OVERBUILD GUARDS:
- nie tworzyć nowego subsystemu bez osobnego taska.

ParkingLot.md updated:
NOT_NEEDED

## Runtime guards
State machine: do uzupełnienia, jeśli dotyczy.
Error classification: do uzupełnienia, jeśli dotyczy.
Idempotency: do uzupełnienia, jeśli dotyczy.
Single-flight: do uzupełnienia, jeśli dotyczy.
Worker lock: do uzupełnienia, jeśli dotyczy.
Circuit breaker: do uzupełnienia, jeśli dotyczy.
Backpressure: do uzupełnienia, jeśli dotyczy.
UI truth: do uzupełnienia, jeśli dotyczy.
Observability: komendy weryfikacyjne jako dowód.

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
Ile modułów dotyka zmiana: jeden wskazany obszar.
Czy to naturalne: tak.
Czy da się ograniczyć zmianę do jednego kontraktu: tak.

## Plan
- [x] Przeczytać pliki z allowlisty.
- [x] Dodać mode-aware renderowanie taskow.
- [x] Dodać mode-aware wymagane sekcje w check-task.
- [x] Zaktualizować AGENTS.md, README.md i lessons.
- [x] Uruchomić weryfikację.

## Weryfikacja
Komendy:
`npm run task:new -- --task-file /tmp/workflow-mode-aware/minimal.md --slug tiny-fix --mode MINIMAL_FIX --files src/a.js --outcome "Naprawic literowke" --success "proof PASS" --force`
`CHECK_TASK_FILE=/tmp/workflow-mode-aware/minimal.md CHECK_TASK_ARCHIVE_DIR=/tmp/workflow-mode-aware/archive node scripts/check-task.js`
`test -z "$(rg '^## Failure modes$|^## Kontrakt$|^## Guard Scope$' /tmp/workflow-mode-aware/minimal.md || true)"`
`npm run task:new -- --task-file /tmp/workflow-mode-aware-content/content.md --slug copy-polish --mode CONTENT_FIX --files src/page.tsx --outcome "Poprawic copy" --success "visual proof PASS" --force`
`CHECK_TASK_FILE=/tmp/workflow-mode-aware-content/content.md CHECK_TASK_ARCHIVE_DIR=/tmp/workflow-mode-aware-content/archive node scripts/check-task.js`
`npm run task:new -- --task-file /tmp/workflow-mode-aware-audit/audit.md --slug inspect-flow --mode AUDIT --outcome "Sprawdzic flow" --success "audit PASS" --force`
`CHECK_TASK_FILE=/tmp/workflow-mode-aware-audit/audit.md CHECK_TASK_ARCHIVE_DIR=/tmp/workflow-mode-aware-audit/archive node scripts/check-task.js`
`rg '^Tryb zmiany: audit-only$|^## Fakty$|^## Plan naprawczy$' /tmp/workflow-mode-aware-audit/audit.md`
`npm run task:new -- --task-file /tmp/workflow-mode-aware-runtime/runtime.md --slug api-fix --mode RUNTIME_FIX --files src/api.ts --outcome "Naprawic API" --success "runtime proof PASS" --force`
`CHECK_TASK_FILE=/tmp/workflow-mode-aware-runtime/runtime.md CHECK_TASK_ARCHIVE_DIR=/tmp/workflow-mode-aware-runtime/archive node scripts/check-task.js`
`rg '^## Failure modes$|^## Kontrakt$|^## Guard Scope$' /tmp/workflow-mode-aware-runtime/runtime.md`
`npm run gate:local`
`git diff --check`
Expected result: PASS.

## Definition of Done
- [x] test PASS
- [x] build PASS albo NOT_NEEDED z uzasadnieniem
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
Co zmieniono: `task:new` generuje krotkie formularze dla MINIMAL_FIX/CONTENT_FIX/AUDIT i pelne formularze dla RUNTIME_FIX/STRUCTURE_FIX/FEATURE; `check-task` waliduje sekcje per tryb; README/AGENTS wyjasniaja, ze task lifecycle jest obowiazkiem agenta.
Jak sprawdzono: fixtures dla MINIMAL_FIX, CONTENT_FIX, AUDIT i RUNTIME_FIX przeszly check-task; lekkie taski nie maja runtime sekcji; AUDIT domyslnie ma audit-only; RUNTIME_FIX zachowuje kontrakt/failure modes/guard scope.
PASS / FAIL: PASS
Ryzyka: oszczednosc tokenow zalezy od tego, czy agent poprawnie wybierze lekki tryb; runtime i dane nadal musza isc pelnym trybem.
Follow-up: brak.
