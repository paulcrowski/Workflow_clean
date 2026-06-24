# Archived Task

Closed At: 2026-06-24T05:59:19.275Z
Result: PASS
Source File: tasks/todo.md

# Current Task

Task ID: 2026-06-24-context-entrypoint-and-lifecycle-tightening
Task Date: 2026-06-24
Task Status: ACTIVE

## Tryb pracy
STRUCTURE_FIX

Uzasadnienie trybu:
Task utworzony przez task lifecycle.

## Cel / Outcome
Odchudzic workflow entrypoint i domknac lifecycle taskow bez utraty guardow runtime

## Kryteria sukcesu
- AGENTS.md jest jedynym always-on entrypointem.
- Pelny task nie wymaga juz README.md jako domyslnego kontraktu do przeczytania.
- Po `task:close` stan oczekiwania nie udaje juz aktywnego taska.

## Priorytet / Blocker
Największy blocker teraz: Odchudzic workflow entrypoint i domknac lifecycle taskow bez utraty guardow runtime
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
- AGENT_DEV_POLICY.md
- CLAUDE.md
- CODEX.md
- README.md
- docs/AGENT_READY_WORKFLOW.md
- docs/TASK_LIFECYCLE.md
- docs/CONTEXT_BUDGET_GUARD.md
- scripts/task-lifecycle.js
- scripts/check-task-freshness.js
- tasks/TASK_TEMPLATE.md
- tasks/lessons.md
- tasks/todo.md
- tasks/archive/**
Kontrakty do przeczytania: AGENTS.md oraz tylko potrzebne docs dla tego taska
Pliki zakazane: wszystko poza allowlistą
Czego nie ruszać: pliki poza zakresem

## Zakres
Moduł: workflow
Pliki: AGENTS.md, AGENT_DEV_POLICY.md, CLAUDE.md, CODEX.md, README.md, docs/AGENT_READY_WORKFLOW.md, docs/TASK_LIFECYCLE.md, docs/CONTEXT_BUDGET_GUARD.md, scripts/task-lifecycle.js, scripts/check-task-freshness.js, tasks/TASK_TEMPLATE.md, tasks/lessons.md, tasks/todo.md

## Reprodukcja / dowód problemu
Audit pokazal trzy zbedne koszty wejscia: `AGENTS.md` wymagalo zawsze `AGENT_DEV_POLICY.md`, generator pelnego taska wpisywal `README.md` jako domyslny kontrakt do przeczytania, a `task:close` zostawial `tasks/todo.md` w stanie `ACTIVE`, mimo ze repo czekalo juz na nastepny task.

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
Root cause: workflow mial dobry podzial guardow, ale entrypointy i lifecycle nadal ladowaly za duzo stalego kontekstu i zostawialy mylacy stan po zamknieciu taska.
Dowód: `AGENTS.md` wymagalo zawsze `AGENT_DEV_POLICY.md`; `scripts/task-lifecycle.js` wpisywal `README.md` do pelnego taska; `task:close` resetowal `tasks/todo.md` do `Task Status: ACTIVE`.
Aktualny flow: agent ma startowac od `AGENTS.md`, doczytywac tylko potrzebne guardy, a po zamknieciu taska repo ma przejsc do jawnego stanu oczekiwania.

## Granice
Moduły dotknięte: workflow
Kontrakty dotknięte: entrypoint instrukcji agenta, domyslny kontekst task lifecycle i status gotowosci `tasks/todo.md`.
Poza zakresem: wszystko poza allowlistą.

## Kontrakt
INPUT: polecenie użytkownika i pliki z allowlisty.
SUCCESS: spełnione kryteria sukcesu.
ERRORS: brak dowodu, zmiana poza scope albo failujące gate'y.
STATUSES: `ACTIVE`, `READY_FOR_NEXT_TASK`, PASS / FAIL w review.
SIDE EFFECTS: tylko zmiany w plikach z allowlisty.
LOGS: komendy weryfikacyjne.
TESTS: `npm run check:task`, `npm run check:task-freshness`, `npm run gate:local`, `git diff --check`.
DONE: review ma konkretny wynik.

## Failure modes
Timeout: przerwac i pokazac ostatni bezpieczny stan.
Null/missing data: nie zgadywac, uzyc ESCALATION.
Prompt drift: nie przeniesc guardow z AGENTS.md do README albo AGENT_DEV_POLICY.md.
Lifecycle drift: nie zostawic po `task:close` stanu, ktory wyglada jak aktywny task.
Partial write: nie zostawiac pustego sukcesu ani mieszanej semantyki statusow.
Gate mismatch: nie zmieniac statusu gotowosci bez wsparcia w `check-task-freshness`.

## Guard Scope
REQUIRED GUARDS:
- AGENTS.md ma byc jedynym always-on entrypointem.
- pelny task nie moze wymagac README.md jako domyslnego kontraktu.
- `READY_FOR_NEXT_TASK` musi byc rozumiane przez lifecycle i freshness.
- trzymac sie allowlisty i uruchomic wskazane testy.

NICE_TO_HAVE GUARDS:
- lessons jako index + search-first zamiast jednego rosnacego pliku.

OVERBUILD GUARDS:
- nie robic automatycznego streszczania lessons ani nowego subsystemu pamieci.

ParkingLot.md updated:
NOT_NEEDED

## Runtime guards
State machine: do uzupełnienia, jeśli dotyczy.
State machine: `ACTIVE` podczas realnego taska, `READY_FOR_NEXT_TASK` po `task:close`.
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
- [x] Uszczelnic entrypoint i lifecycle w dokumentach oraz skryptach.
- [x] Uruchomić weryfikację.

## Weryfikacja
Komendy:
`npm run check:task`
`npm run check:task-freshness`
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
Co zmieniono: `AGENTS.md` stalo sie jedynym always-on entrypointem, `AGENT_DEV_POLICY.md` zostalo zdegradowane do reference/on-demand, pelny task nie wpisuje juz `README.md` jako domyslnego kontraktu, a `task:close` zostawia `tasks/todo.md` w stanie `READY_FOR_NEXT_TASK`.
Jak sprawdzono: `npm run check:task` PASS, `npm run check:task-freshness` PASS, `npm run gate:local` PASS, `git diff --check` PASS, oraz test tymczasowego taska z `CHECK_TASK_FILE=/tmp/workflow-ready-state-check.md node scripts/check-task-freshness.js` potwierdzil `READY_FOR_NEXT_TASK`.
PASS / FAIL: PASS
Ryzyka: `tasks/lessons.md` nadal jest jednym rosnacym plikiem; index/search-first zostaje jako osobny follow-up.
Follow-up: jesli lessons dalej beda rosnac, zrobic osobny task na index + search-first bez budowania nowego subsystemu pamieci.
