# Current Task

## Tryb pracy
STRUCTURE_FIX

Uzasadnienie trybu:
Naprawa dotyczy workflow startera, skryptów guardów i CI.

## Cel / Outcome
Starter workflow ma mieć guardy, które nie przepuszczają pustego template i działają lokalnie oraz w GitHub Actions.

## Kryteria sukcesu
- `check:task` odrzuca placeholdery.
- `check:diff-size` działa dla staged diff i PR diff.
- `check:godfiles` działa dla staged diff i PR diff.
- `gate:pr` obejmuje diff-size.

## Kontekst dla agenta
Moduł: workflow guardrails
Maksymalny zakres plików: scripts, package.json, GitHub Actions, tasks
Kontrakty do przeczytania: AGENTS.md
Pliki zakazane: brak
Czego nie ruszać: runtime aplikacji, bo to repo jest starterem

## Zakres
Moduł: workflow guardrails
Pliki: scripts/check-task.js, scripts/check-diff-size.js, scripts/check-godfiles.js, package.json, .github/workflows/pr-gate.yml, tasks/todo.md, tasks/TASK_TEMPLATE.md

## Reprodukcja / dowód problemu
`npm run gate:local` przechodziło na pustym `tasks/todo.md`, bo template zawierał słowa `PASS / FAIL`. `gate:pr` nie uruchamiał `check:diff-size`.

## Escalation
Czy brakuje danych do bezpiecznej zmiany?
NIE

Jeśli TAK:
Brakujące dane:
Czego nie da się potwierdzić:
Ryzyko kodowania teraz:
Najmniejszy następny krok:

## Klasyfikacja
REQUIRED

Uzasadnienie:
Bez tego starter przenosi fałszywie zielone guardy do nowych projektów.

## Diagnoza
Root cause: skrypty walidowały obecność tekstu, nie wypełnienie taska ani realny PR diff.
Dowód: `check:task` szukał dowolnego `PASS|FAIL`, a `check-diff-size` używał tylko `git diff --cached`.
Aktualny flow: lokalnie staged diff, w CI PR diff przez `origin/<base>...HEAD`.

## Granice
Moduły dotknięte: workflow guardrails
Kontrakty dotknięte: npm scripts, PR gate
Poza zakresem: test runner konkretnej aplikacji

## Kontrakt
INPUT: tasks/todo.md, staged diff albo PR diff.
SUCCESS: guardy przechodzą tylko przy wypełnionym tasku i mieszczącym się diffie.
ERRORS: placeholder taska, zbyt duży diff, zbyt duży plik bez GOD_FILE_CHECK.
STATUSES: PASS / FAIL.
SIDE EFFECTS: brak poza logami CLI.
LOGS: komunikaty skryptów npm.
TESTS: npm run gate:local, npm run gate:pr.
DONE: guardy działają lokalnie i w CI.

## Failure modes
Timeout: nie dotyczy.
Null/missing data: brak `tasks/todo.md` kończy FAIL.
Invalid schema: placeholder lub brak wymaganych sekcji kończy FAIL.
Duplicate request: nie dotyczy.
Concurrent request: nie dotyczy.
Partial write: nie dotyczy.
Worker crash: nie dotyczy.
Retry loop: nie dotyczy.
Provider unavailable: brak base ref w CI powinien zakończyć błędem git, nie silent pass.

## Guard Scope
REQUIRED GUARDS:
- `check:task` musi odrzucać placeholdery.
- `check:diff-size` musi działać w CI na PR diffie.
- `gate:pr` musi uruchamiać `check:diff-size`.

NICE_TO_HAVE GUARDS:
- Projektowe lint/test/build per aplikacja.

OVERBUILD GUARDS:
- Generator całego nowego projektu.

ParkingLot.md updated:
NOT_NEEDED

## Runtime guards
State machine: nie dotyczy.
Error classification: CLI fail/pass.
Idempotency: skrypty read-only.
Single-flight: nie dotyczy.
Worker lock: nie dotyczy.
Circuit breaker: nie dotyczy.
Backpressure: nie dotyczy.
UI truth: nie dotyczy.
Observability: jawne logi npm.

## Code Structure Guard
Czy dotykamy pliku >300 LOC?
NIE

Jeśli TAK:
Plik:
LOC:
Dlaczego zmiana trafia tutaj:
Czy plik ma wiele odpowiedzialności:
Minimalny fix:
Czy potrzebne wydzielenie odpowiedzialności:
Ryzyko:

## GOD_FILE_CHECK
Wymagane, jeśli plik >500 LOC.

Plik:
LOC:
Obecne odpowiedzialności:
Czy task dokłada nową odpowiedzialność:
Minimalny fix bez rozbicia:
Małe wydzielenie odpowiedzialności:
Ryzyko minimalnego fixu:
Ryzyko wydzielenia:
Rekomendacja:

## Dependency Direction Guard
Czy zmiana odwraca zależność?
NIE

Czy Business Logic importuje UI/DB/framework?
NIE

Czy adapter przecieka do core?
NIE

## Change Isolation
Ile modułów dotyka zmiana: jeden obszar, workflow guardrails.
Czy to naturalne: tak, bo skrypty i CI muszą być spójne.
Czy da się ograniczyć zmianę do jednego kontraktu: tak, npm gates.

## Plan
- [x] Zaostrzyć `check:task`.
- [x] Dodać PR diff do diff-size i godfile guardów.
- [x] Spiąć `gate:pr` z diff-size.
- [x] Oddzielić aktualny task od template.

## Weryfikacja
Komendy:
`npm run gate:local`
`npm run gate:pr`
Expected result: PASS

## Definition of Done
- [x] test PASS
- [x] build PASS
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
Co zmieniono: zaostrzono walidację taska, PR diff i gate:pr.
Jak sprawdzono: npm run gate:local, npm run gate:pr.
PASS / FAIL: PASS
Ryzyka: konkretne projekty nadal muszą dodać własny lint/test/build.
Follow-up: dodać projektowy gate po utworzeniu pierwszej appki.
