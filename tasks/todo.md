# Current Task

Task ID: 2026-05-29-blocker-priority-guard
Task Date: 2026-05-29
Task Status: ACTIVE

## Tryb pracy
FEATURE

Uzasadnienie trybu:
Task utworzony przez task lifecycle.

## Cel / Outcome
Zablokowac dryf w latwe zielone slice'y przez jawny blocker taska

## Kryteria sukcesu
- Task wymaga odpowiedzi czy praca rusza najwiekszy blocker

## Priorytet / Blocker
Największy blocker teraz: workflow nie zatrzymuje agenta przed łatwym zielonym slicem, gdy znany jest ważniejszy blocker produktu/live proof.
Czy ten task rusza blocker: TAK
Dlaczego mimo to robimy teraz: nie dotyczy

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
Root cause: task wymagał scope i testów, ale nie wymagał odpowiedzi, czy aktualna praca rusza najważniejszy blocker.
Dowód: agent mógł wybrać kolejny łatwy zielony slice mimo znanego blockera produktu/live proof.
Aktualny flow: `check-task` waliduje formularz, ale przed tą zmianą nie walidował priorytetu względem blockera.

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
TESTS: fixture z poprawnym taskiem, fixture bez `Priorytet / Blocker`, `npm run gate:local`.
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
- [x] Dodać `Priorytet / Blocker` do template i generatora tasków.
- [x] Dodać walidację w `check-task`.
- [x] Zaktualizować README/AGENTS/lessons.
- [x] Uruchomić weryfikację.

## Weryfikacja
Komendy:
`npm run task:new -- --task-file /tmp/workflow-blocker/todo.md --slug live-proof --mode MINIMAL_FIX --change-mode code-change --files src/example.js --outcome "Domknac live proof" --success "live proof PASS" --force`
`CHECK_TASK_FILE=/tmp/workflow-blocker/todo.md node scripts/check-task.js`
`CHECK_TASK_FILE=/tmp/workflow-blocker/no-blocker.md node scripts/check-task.js` expected FAIL
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
Co zmieniono: dodano obowiązkowy blok `Priorytet / Blocker`, walidację w `check-task`, generowanie bloku przez `task:new`, opis w README/AGENTS i lesson.
Jak sprawdzono: fixture pozytywny, fixture bez bloku failuje, `npm run gate:local`, `git diff --check`.
PASS / FAIL: PASS
Ryzyka: guard wymusza uczciwe nazwanie blockera, ale nadal nie oceni sam jakości uzasadnienia, jeśli agent wpisze słaby tekst.
Follow-up: brak.
