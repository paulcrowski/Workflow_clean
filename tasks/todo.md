# Current Task

Task ID: 2026-05-19-task-lifecycle-tools
Task Date: 2026-05-19
Task Status: ACTIVE

## Tryb pracy
FEATURE

Uzasadnienie trybu:
Dodaję dwa małe narzędzia operacyjne dla agenta: tworzenie nowego taska i zamykanie taska do archiwum.

## Cel / Outcome
Codex ma móc uruchomić komendę zamiast ręcznie przepisywać `tasks/todo.md` przy starcie i końcu pracy.

## Kryteria sukcesu
- `npm run task:new -- ...` tworzy poprawny aktywny `tasks/todo.md`.
- `npm run task:close -- ...` archiwizuje zakończony task i zostawia repo w stanie gotowym na następny task.
- README prostym językiem pokazuje, kiedy Codex ma używać tych komend.
- Test na tymczasowym prostym tasku przechodzi bez ruszania realnego taska.
- `npm run gate:local` PASS.

## Kontekst dla agenta
Moduł: workflow task lifecycle
Tryb zmiany: code-change
Maksymalny zakres plików: skrypty task lifecycle, package scripts, README, task evidence
Dozwolone pliki do zmiany:
- package.json
- README.md
- scripts/task-lifecycle.js
- tasks/todo.md
- tasks/lessons.md
Kontrakty do przeczytania: AGENTS.md, README.md, tasks/TASK_TEMPLATE.md, scripts/check-task.js, scripts/check-scope.js
Pliki zakazane: docs/**, workflow/**, istniejące check-* scripts poza odczytem
Czego nie ruszać: gate logic, import boundaries, diff limits, project gates

## Zakres
Moduł: workflow task lifecycle
Pliki: `package.json`, `README.md`, `scripts/task-lifecycle.js`, `tasks/todo.md`, `tasks/lessons.md`

## Reprodukcja / dowód problemu
Nowy task trzeba dziś składać ręcznie w `tasks/todo.md`; przy zamykaniu pracy nie ma jednej komendy do archiwizacji i przygotowania czystego następnego stanu.

## Escalation
Czy brakuje danych do bezpiecznej zmiany?
NIE

Jeśli TAK:
Brakujące dane: brak
Czego nie da się potwierdzić: brak
Ryzyko kodowania teraz: niskie, bo narzędzia działają na plikach workflow i można je testować na fixture
Najmniejszy następny krok: dodać dwa skrypty bez zmieniania istniejących guardów

## Klasyfikacja
REQUIRED

Uzasadnienie:
To są dwa wskazane brakujące elementy do codziennego używania workflow przez Codexa, bez ręcznego przepisywania taska.

## Diagnoza
Root cause: workflow ma guardy, ale lifecycle taska jest ręczny.
Dowód: `package.json` nie ma `task:new` ani `task:close`; README każe kopiować `TASK_TEMPLATE.md`.
Aktualny flow: agent ręcznie edytuje task na początku i końcu pracy.

## Granice
Moduły dotknięte: task lifecycle scripts, README
Kontrakty dotknięte: format `tasks/todo.md`
Poza zakresem: stack presets, nowe gate'y, zmiany w check-scope/check-task

## Kontrakt
INPUT: CLI args, `tasks/todo.md`, opcjonalny katalog archiwum.
SUCCESS: nowy task ma pełny format; zamknięty task trafia do archiwum; repo ma świeży aktywny task techniczny po close.
ERRORS: brak slug, brak plików w code-change, próba nadpisania bez `--force`, zamknięcie bez PASS/FAIL.
STATUSES: PASS / FAIL.
SIDE EFFECTS: zapis `tasks/todo.md`, opcjonalny zapis `tasks/archive/*.md`.
LOGS: output skryptów.
TESTS: fixture przez env vars i `npm run gate:local`.
DONE: Codex może użyć komend zamiast ręcznie kleić task lifecycle.

## Failure modes
Timeout: skrypty są krótkie i synchroniczne.
Null/missing data: brak wymaganych argumentów kończy się FAIL.
Invalid schema: wygenerowany task musi przejść `check-task`.
Duplicate request: istniejący archive file failuje bez `--force`.
Concurrent request: nieobsługiwane; lokalny workflow zakłada jeden agent na repo.
Partial write: zapis idzie przez temp file i rename.
Worker crash: nie dotyczy.
Retry loop: nie dotyczy.
Provider unavailable: nie dotyczy.

## Guard Scope
REQUIRED GUARDS:
- walidacja minimalnych argumentów `task:new`.
- odmowa nadpisania aktywnego niezamkniętego taska bez `--force`.
- odmowa `task:close`, jeśli review nie ma PASS albo FAIL.
- test na tymczasowym tasku.

NICE_TO_HAVE GUARDS:
- interaktywny prompt CLI.
- stack presets.

OVERBUILD GUARDS:
- pełny task orchestrator.
- baza tasków.

ParkingLot.md updated:
NOT_NEEDED

## Runtime guards
State machine: task jest ACTIVE, a close tworzy archive i nowy ready task.
Error classification: błędy CLI kończą proces z kodem 1.
Idempotency: `--force` wymagany do nadpisania archive albo aktywnego taska.
Single-flight: nie dotyczy.
Worker lock: nie dotyczy.
Circuit breaker: nie dotyczy.
Backpressure: nie dotyczy.
UI truth: nie dotyczy.
Observability: skrypty wypisują utworzony task albo archiwum.

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
Ile modułów dotyka zmiana: jeden obszar task lifecycle.
Czy to naturalne: tak.
Czy da się ograniczyć zmianę do jednego kontraktu: tak, format `tasks/todo.md`.

## Plan
- [x] Przeczytać istniejące task/check scripts.
- [x] Dodać `task:new`.
- [x] Dodać `task:close`.
- [x] Dodać package scripts i README.
- [x] Sprawdzić na prostym fixture.
- [x] Uruchomić `npm run gate:local`.

## Weryfikacja
Komendy:
`npm run task:new -- --task-file /tmp/workflow-task/todo.md --slug simple-code-check --mode MINIMAL_FIX --change-mode code-change --files src/example.js --outcome "Sprawdzic prosty kod" --success "Task ma poprawny format" --force`
`npm run task:close -- --task-file /tmp/workflow-task/todo.md --archive-dir /tmp/workflow-task/archive --result PASS --force`
`npm run gate:local && git diff --check`
Expected result: PASS.

## Definition of Done
- [x] test PASS
- [x] build NOT_NEEDED, skrypty Node bez buildu
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
Co zmieniono: dodano `task:new` i `task:close` przez `scripts/task-lifecycle.js`, podpięto npm scripts, opisano workflow w README i dopisano lesson.
Jak sprawdzono: fixture `/tmp/workflow-task` dla prostego `src/example.js`, `npm run gate:local`, `git diff --check`.
PASS / FAIL: PASS
Ryzyka: `task:close` resetuje repo do `ready-for-next-task`, więc przed kolejnym kodowaniem trzeba użyć `task:new`.
Follow-up: stack presets dopiero po realnym projekcie.
