# Current Task

Task ID: 2026-05-19-failure-first-anchor
Task Date: 2026-05-19
Task Status: ACTIVE

## Tryb pracy
MINIMAL_FIX

Uzasadnienie trybu:
Mała poprawka dokumentacji workflow: istniejące runtime guardy są dobre, ale główna instrukcja powinna krótko przypominać failure-first mindset.

## Cel / Outcome
Workflow ma widocznie wymuszać pytanie: co się stanie, gdy flow dostanie złe dane, retry, duplikat, partial write albo kłamliwy UI state.

## Kryteria sukcesu
- `AGENTS.md` ma krótką failure-first kotwicę dla runtime/data/UI/status tasków.
- README mówi prostym językiem, że workflow blokuje happy-path-only coding i ma ocenę aktualnego stanu.
- Nie dokładamy nowego mechanicznego guarda, bo `docs/ARCHITECTURE_GUARDS.md` już pokrywa szczegóły.
- `npm run gate:local` PASS.

## Kontekst dla agenta
Moduł: workflow docs
Tryb zmiany: code-change
Maksymalny zakres plików: dokumentacja i task evidence
Dozwolone pliki do zmiany:
- AGENTS.md
- README.md
- tasks/todo.md
- tasks/lessons.md
Kontrakty do przeczytania: AGENTS.md, README.md, docs/ARCHITECTURE_GUARDS.md
Pliki zakazane: scripts/**, package.json, workflow/**
Czego nie ruszać: istniejące guard scripts, import boundary config, release gate

## Zakres
Moduł: workflow docs
Pliki: `AGENTS.md`, `README.md`, `tasks/todo.md`, `tasks/lessons.md`

## Reprodukcja / dowód problemu
`docs/ARCHITECTURE_GUARDS.md` pokrywa terminal states, retry, idempotency, backpressure i UI truth, ale `AGENTS.md` nie ma krótkiego failure-first skrótu widocznego przy szybkim tasku.

## Escalation
Czy brakuje danych do bezpiecznej zmiany?
NIE

Jeśli TAK:
Brakujące dane: brak
Czego nie da się potwierdzić: brak
Ryzyko kodowania teraz: niskie, zmiana jest dokumentacyjna
Najmniejszy następny krok: dodać krótką kotwicę bez nowych guardów

## Klasyfikacja
REQUIRED

Uzasadnienie:
To nie jest nowa polityka, tylko wyciągnięcie najważniejszej zasady runtime na poziom instrukcji startowej.

## Diagnoza
Root cause: failure-first zasady były w szczegółowym dokumencie, ale nie w krótkim entrypoincie.
Dowód: `AGENTS.md` odsyła do `docs/ARCHITECTURE_GUARDS.md`, ale nie streszcza 6 pytań runtime.
Aktualny flow: agent może przy szybkim tasku widzieć scope/diff rules, a nie zobaczyć od razu produkcyjnej nieufności.

## Granice
Moduły dotknięte: workflow docs
Kontrakty dotknięte: brak runtime kontraktów
Poza zakresem: nowe skrypty, parsery, task generator, task close

## Kontrakt
INPUT: dokumentacja workflow.
SUCCESS: zasada failure-first jest widoczna i nie dubluje całego `ARCHITECTURE_GUARDS`.
ERRORS: przeładowanie `AGENTS.md`, nowe zasady bez mechaniki, zmiana scope.
STATUSES: PASS / FAIL.
SIDE EFFECTS: brak.
LOGS: `npm run gate:local`.
TESTS: gate lokalny.
DONE: dokumentacja jasno mówi, że runtime/data/UI task wymaga root cause, kontraktu, failure modes, statusów, test planu i dowodu.

## Failure modes
Timeout: nie dotyczy.
Null/missing data: nie dotyczy.
Invalid schema: nie dotyczy.
Duplicate request: nie dotyczy.
Concurrent request: nie dotyczy.
Partial write: nie dotyczy.
Worker crash: nie dotyczy.
Retry loop: nie dotyczy.
Provider unavailable: nie dotyczy.

## Guard Scope
REQUIRED GUARDS:
- krótka failure-first kotwica w `AGENTS.md`.
- prosty opis w README.

NICE_TO_HAVE GUARDS:
- przyszły task generator.
- task close/archive command.

OVERBUILD GUARDS:
- nowy runtime checker bez konkretnej aplikacji.

ParkingLot.md updated:
NOT_NEEDED

## Runtime guards
State machine: nie dotyczy dla tej dokumentacyjnej zmiany.
Error classification: nie dotyczy.
Idempotency: nie dotyczy.
Single-flight: nie dotyczy.
Worker lock: nie dotyczy.
Circuit breaker: nie dotyczy.
Backpressure: nie dotyczy.
UI truth: nie dotyczy.
Observability: `gate:local` jako dowód.

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
Ile modułów dotyka zmiana: jeden obszar docs.
Czy to naturalne: tak.
Czy da się ograniczyć zmianę do jednego kontraktu: tak.

## Plan
- [x] Porównać wklejone zasady z realnymi docs/guardami.
- [x] Wskazać lukę widoczności w `AGENTS.md`.
- [x] Dodać krótki failure-first anchor.
- [x] Uruchomić `npm run gate:local`.

## Weryfikacja
Komendy:
`npm run gate:local`
Expected result: PASS.

## Definition of Done
- [x] test PASS
- [x] build NOT_NEEDED, dokumentacja
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
Co zmieniono: dodano krótką sekcję `Failure-first` do `AGENTS.md`, dopisano happy-path-only risk, ocenę workflow i brakujące 10/10 elementy do README oraz lesson.
Jak sprawdzono: `npm run gate:local`, `git diff --check`.
PASS / FAIL: PASS
Ryzyka: brak, o ile nie rozdmuchamy AGENTS.md.
Follow-up: brak.
