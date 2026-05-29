# Current Task

Task ID: 2026-05-29-blocker-evidence-guard
Task Date: 2026-05-29
Task Status: ACTIVE

## Tryb pracy
FEATURE

Uzasadnienie trybu:
Task utworzony przez task lifecycle.

## Cel / Outcome
Wzmocnic blocker guard o dowod, kontrolowany powod NIE i limit kolejnych NIE

## Kryteria sukcesu
- check-task waliduje dowod blockera

## Priorytet / Blocker
Największy blocker teraz: Wzmocnic blocker guard o dowod, kontrolowany powod NIE i limit kolejnych NIE
Dowód blockera: poprzedni guard wymagał nazwania blockera, ale nie wymagał dowodu ani kontrolowanego powodu dla NIE.
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
- tasks/TASK_TEMPLATE.md
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
Pliki: AGENTS.md, README.md, tasks/TASK_TEMPLATE.md, tasks/todo.md, tasks/lessons.md, scripts/check-task.js, scripts/task-lifecycle.js

## Reprodukcja / dowód problemu
Task utworzony z polecenia użytkownika albo przez zamknięcie poprzedniego taska.

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
Root cause: pierwszy blocker guard wymuszał nazwanie blockera, ale `NIE` mogło mieć dowolne słabe uzasadnienie.
Dowód: w `scripts/check-task.js` brakowało walidacji `Dowód blockera`, kontrolowanego powodu i warunku powrotu.
Aktualny flow: `check-task` waliduje teraz jakość pól `Priorytet / Blocker`.

## Granice
Moduły dotknięte: workflow
Kontrakty dotknięte: format `tasks/todo.md`.
Poza zakresem: wszystko poza allowlistą.

## Kontrakt
INPUT: polecenie użytkownika i pliki z allowlisty.
SUCCESS: spełnione kryteria sukcesu.
ERRORS: brak dowodu, zmiana poza scope albo failujące gate'y.
STATUSES: PASS / FAIL.
SIDE EFFECTS: tylko zmiany w plikach z allowlisty.
LOGS: komendy weryfikacyjne.
TESTS: fixture pozytywny, brak dowodu fail, zły powód fail, drugi kolejny `NIE` fail, `gate:local`.
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
- [x] Dodać `Dowód blockera`.
- [x] Dodać kontrolowany `Jeśli NIE, powód`.
- [x] Dodać `Warunek powrotu do blockera`.
- [x] Dodać limit kolejnych tasków z `NIE`.
- [x] Uruchomić weryfikację.

## Weryfikacja
Komendy:
`npm run task:new -- --task-file /tmp/workflow-blocker2/todo.md --slug blocker-proof --mode MINIMAL_FIX --change-mode code-change --files src/example.js --outcome "Domknac live proof" --success "live proof PASS" --force`
`CHECK_TASK_FILE=/tmp/workflow-blocker2/todo.md CHECK_TASK_ARCHIVE_DIR=/tmp/workflow-blocker2/archive node scripts/check-task.js`
`CHECK_TASK_FILE=/tmp/workflow-blocker2/no-evidence.md CHECK_TASK_ARCHIVE_DIR=/tmp/workflow-blocker2/archive node scripts/check-task.js` expected FAIL
`CHECK_TASK_FILE=/tmp/workflow-blocker2/bad-reason.md CHECK_TASK_ARCHIVE_DIR=/tmp/workflow-blocker2/archive node scripts/check-task.js` expected FAIL
`CHECK_TASK_FILE=/tmp/workflow-blocker2/good-no.md CHECK_TASK_ARCHIVE_DIR=/tmp/workflow-blocker2/archive node scripts/check-task.js` expected PASS
`CHECK_TASK_FILE=/tmp/workflow-blocker2/good-no.md CHECK_TASK_ARCHIVE_DIR=/tmp/workflow-blocker2/archive node scripts/check-task.js` expected FAIL after archived previous `NIE`
`npm run gate:local && git diff --check`
Expected result: PASS.

## Definition of Done
- [x] test PASS
- [x] build NOT_NEEDED, workflow scripts
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
Co zmieniono: wzmocniono `Priorytet / Blocker` o dowód, kontrolowane powody `NIE`, warunek powrotu i limit drugiego kolejnego `NIE`.
Jak sprawdzono: fixture pozytywny, brak dowodu fail, zły powód fail, pierwszy `NIE` pass, drugi kolejny `NIE` fail, `npm run gate:local`, `git diff --check`.
PASS / FAIL: PASS
Ryzyka: limit kolejnych `NIE` sprawdza ostatni plik w `tasks/archive` po mtime; jeśli archiwum będzie ręcznie modyfikowane, sygnał może być mylący.
Follow-up: brak.
