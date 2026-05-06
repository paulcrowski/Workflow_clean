# Current Task

## Tryb pracy
STRUCTURE_FIX

Uzasadnienie trybu:
Dodanie README i repozytoryjnych hookow porzadkuje sposob uzycia workflow w nowych projektach.

## Cel / Outcome
Nowy projekt ma miec jasna instrukcje uzycia startera i lokalne hooki odpalajace guardy przed commitem oraz pushem.

## Kryteria sukcesu
- README wyjasnia start w nowym repo.
- `npm run hooks:install` ustawia `.githooks`.
- `pre-commit` odpala `gate:local`.
- `pre-push` odpala `gate:pr`.

## Kontekst dla agenta
Modul: workflow bootstrap
Maksymalny zakres plikow: README, package.json, .githooks, tasks
Kontrakty do przeczytania: AGENTS.md
Pliki zakazane: runtime aplikacji
Czego nie ruszac: guardow runtime poza zakresem

## Zakres
Modul: workflow bootstrap
Pliki: README.md, package.json, .githooks/pre-commit, .githooks/pre-push, tasks/todo.md

## Reprodukcja / dowód problemu
Audit wskazal brak README i brak hookow jako najprostsze usprawnienia przed uzywaniem startera w nowych projektach.

## Escalation
Czy brakuje danych do bezpiecznej zmiany?
NIE

Jesli TAK:
Brakujace dane: brak
Czego nie da sie potwierdzic: brak
Ryzyko kodowania teraz: niskie
Najmniejszy nastepny krok: dodac README i hooki

## Klasyfikacja
REQUIRED

Uzasadnienie:
Uzytkownik poprosil o szybkie dodanie rekomendowanych usprawnien.

## Diagnoza
Root cause: starter mial guardy, ale nie mial instrukcji startu ani latwego wlaczenia hookow.
Dowod: brak README i brak `.githooks`.
Aktualny flow: `npm run hooks:install` ustawia hooki, a hooki odpalaja istniejace gate'y.

## Granice
Moduly dotkniete: workflow bootstrap
Kontrakty dotkniete: npm scripts, git hooks
Poza zakresem: dopinanie lint/test/build konkretnej aplikacji

## Kontrakt
INPUT: repo z tym workflow.
SUCCESS: README prowadzi przez start, hooki odpalaja guardy.
ERRORS: brak executable hookow albo brak konfiguracji `core.hooksPath`.
STATUSES: PASS / FAIL.
SIDE EFFECTS: git config `core.hooksPath` po `npm run hooks:install`.
LOGS: output npm scripts.
TESTS: `npm run gate:local`, `npm run gate:pr`.
DONE: zmiany sa w commicie i wypchniete na GitHub.

## Failure modes
Timeout: nie dotyczy.
Null/missing data: brak README lub hookow bylby FAIL.
Invalid schema: nie dotyczy.
Duplicate request: ponowne `hooks:install` jest idempotentne.
Concurrent request: nie dotyczy.
Partial write: commit obejmuje wszystkie pliki.
Worker crash: nie dotyczy.
Retry loop: nie dotyczy.
Provider unavailable: push moze FAIL przy problemie GitHub.

## Guard Scope
REQUIRED GUARDS:
- README z instrukcja.
- Hooki lokalne.
- Skrypt instalacji hookow.

NICE_TO_HAVE GUARDS:
- Projektowe lint/test/build po utworzeniu aplikacji.

OVERBUILD GUARDS:
- Generator calego projektu.

ParkingLot.md updated:
NOT_NEEDED

## Runtime guards
State machine: nie dotyczy.
Error classification: CLI PASS / FAIL.
Idempotency: `git config core.hooksPath .githooks` mozna powtarzac.
Single-flight: nie dotyczy.
Worker lock: nie dotyczy.
Circuit breaker: nie dotyczy.
Backpressure: nie dotyczy.
UI truth: nie dotyczy.
Observability: output npm i git.

## Code Structure Guard
Czy dotykamy pliku >300 LOC?
NIE

Jesli TAK:
Plik: brak
LOC: brak
Dlaczego zmiana trafia tutaj: brak
Czy plik ma wiele odpowiedzialnosci: brak
Minimalny fix: brak
Czy potrzebne wydzielenie odpowiedzialnosci: brak
Ryzyko: brak

## GOD_FILE_CHECK
Wymagane, jesli plik >500 LOC.

Plik: brak
LOC: brak
Obecne odpowiedzialnosci: brak
Czy task doklada nowa odpowiedzialnosc: brak
Minimalny fix bez rozbicia: brak
Male wydzielenie odpowiedzialnosci: brak
Ryzyko minimalnego fixu: brak
Ryzyko wydzielenia: brak
Rekomendacja: brak

## Dependency Direction Guard
Czy zmiana odwraca zaleznosc?
NIE

Czy Business Logic importuje UI/DB/framework?
NIE

Czy adapter przecieka do core?
NIE

## Change Isolation
Ile modulow dotyka zmiana: jeden obszar workflow bootstrap.
Czy to naturalne: tak.
Czy da sie ograniczyc zmiane do jednego kontraktu: tak, npm scripts i git hooks.

## Plan
- [x] Dodac README.
- [x] Dodac `.githooks/pre-commit`.
- [x] Dodac `.githooks/pre-push`.
- [x] Dodac `hooks:install`.
- [x] Zaktualizowac aktualny task.

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
- [x] failure modes obsluzone
- [x] brak silent fallbackow
- [x] brak empty success
- [x] UI truth zachowane, jesli dotyczy
- [x] dependency direction zachowany
- [x] brak cyklicznych zaleznosci
- [x] duze pliki nie zostaly powiekszone bez uzasadnienia
- [x] implementowano tylko REQUIRED GUARDS

## Review / Wyniki
Co zmieniono: README, hooki lokalne, `hooks:install`, aktualny task.
Jak sprawdzono: `npm run gate:local`, `npm run gate:pr`.
PASS / FAIL: PASS
Ryzyka: konkretna aplikacja nadal musi dodac wlasne lint/test/build.
Follow-up: po pierwszym uzyciu startera dopiac projektowe gate'y.
