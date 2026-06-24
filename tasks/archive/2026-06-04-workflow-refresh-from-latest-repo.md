# Archived Task

Closed At: 2026-06-24T05:53:57.417Z
Result: PASS
Source File: tasks/todo.md

# Current Task

Task ID: 2026-06-04-workflow-refresh-from-latest-repo
Task Date: 2026-06-04
Task Status: ACTIVE

## Tryb pracy
FEATURE

Uzasadnienie trybu:
Task utworzony przez task lifecycle.

## Cel / Outcome
Odswiezyc starter workflow na podstawie najnowszego repo tak, zeby task design, policy entrypoint i template byly spójne z aktualnym sposobem pracy agenta.

## Kryteria sukcesu
- README odsyla do osobnego entrypointu task design.
- repo ma `docs/AGENT_READY_WORKFLOW.md`.
- `AGENTS.md`, `AGENT_DEV_POLICY.md` i `TASK_TEMPLATE.md` nie rozjezdzaja sie z tym, co robi `task:new`.

## Priorytet / Blocker
Największy blocker teraz: starter workflow ma rozjechane entrypointy dokumentacyjne i stary template wzgledem nowszego repo
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
- README.md
- docs/AGENT_READY_WORKFLOW.md
- docs/TASK_LIFECYCLE.md
- tasks/TASK_TEMPLATE.md
- tasks/todo.md
- tasks/archive/**
Kontrakty do przeczytania: AGENTS.md, README.md
Pliki zakazane: wszystko poza allowlistą
Czego nie ruszać: pliki poza zakresem

## Zakres
Moduł: workflow
Pliki: AGENTS.md, AGENT_DEV_POLICY.md, README.md, docs/AGENT_READY_WORKFLOW.md, docs/TASK_LIFECYCLE.md, tasks/TASK_TEMPLATE.md, tasks/todo.md

## Reprodukcja / dowód problemu
Po ostatnich zmianach logika jest juz w repo, ale starter nadal ma starszy zestaw entrypointow: brak `docs/AGENT_READY_WORKFLOW.md`, `AGENTS.md` nie wskazuje nowego dokumentu, a `TASK_TEMPLATE.md` jest ciezszy niz rzeczywisty mode-aware flow z `task:new`.

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
Root cause: workflow ma juz mode-aware generator taskow, ale dokumentacja i template nie sa jeszcze w pelni zestrojone z nowszym repo.
Dowód: brak `docs/AGENT_READY_WORKFLOW.md`, brak referencji do niego w `AGENTS.md`, oraz stary ciezki `TASK_TEMPLATE.md`.
Aktualny flow: agent sam tworzy task, ale starter powinien miec jeden jasny entrypoint dla task design i referencyjny template zgodny z `task:new`.

## Granice
Moduły dotknięte: workflow
Kontrakty dotknięte: dokumentacja workflow, policy entrypoint i referencyjny task template.
Poza zakresem: wszystko poza allowlistą.

## Kontrakt
INPUT: polecenie użytkownika i pliki z allowlisty.
SUCCESS: spełnione kryteria sukcesu.
ERRORS: brak dowodu, zmiana poza scope albo failujące gate'y.
STATUSES: PASS / FAIL.
SIDE EFFECTS: tylko zmiany w plikach z allowlisty.
LOGS: komendy weryfikacyjne.
TESTS: check-task, gate:local, git diff --check, kontrola linku i scope.
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
- [x] Dodać entrypoint `docs/AGENT_READY_WORKFLOW.md`.
- [x] Zestroić `AGENTS.md`, `AGENT_DEV_POLICY.md`, `README.md` i `TASK_TEMPLATE.md` z aktualnym flow.
- [x] Uruchomić weryfikację.

## Weryfikacja
Komendy:
`npm run check:task`
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
Co zmieniono: dodano `docs/AGENT_READY_WORKFLOW.md`, zaktualizowano `AGENTS.md` i `AGENT_DEV_POLICY.md` o nowy entrypoint task design, uproszczono `TASK_TEMPLATE.md` do referencyjnego szkicu zgodnego z `task:new`, oraz dopieto opis w `README.md`.
Jak sprawdzono: `npm run check:task` PASS, `npm run gate:local` PASS, `git diff --check` PASS.
PASS / FAIL: PASS
Ryzyka: `TASK_TEMPLATE.md` jest teraz szkicem referencyjnym, wiec przy przyszlych zmianach `task:new` trzeba utrzymywac go razem ze skryptem generatora.
Follow-up: jesli starter dostanie presety per stack, warto dopisac je do `README.md` i `docs/AGENT_READY_WORKFLOW.md`, ale nie teraz.
