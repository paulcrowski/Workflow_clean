# Current Task

## Tryb pracy
STRUCTURE_FIX

Uzasadnienie trybu:
Wzmacniam mechaniczny guard workflow, bo obecny limit dla MINIMAL_FIX jest opisany w polityce, ale nieegzekwowany w skrypcie.

## Cel / Outcome
Mały fix nie może przejść jako duży diff tylko dlatego, że globalny limit `check:diff-size` jest luźniejszy.

## Kryteria sukcesu
- `MINIMAL_FIX` failuje powyżej 3 liczonych plików.
- `MINIMAL_FIX` failuje powyżej 50 liczonych linii.
- Obecny `STRUCTURE_FIX` nadal przechodzi w `gate:local`.
- Test seam jest zgodny z istniejącym stylem env-based guard tests.
- README i release gate opisują limity diffu per tryb pracy.

## Kontekst dla agenta
Moduł: workflow guards
Tryb zmiany: code-change
Maksymalny zakres plików: guard script plus task evidence
Dozwolone pliki do zmiany:
- README.md
- RELEASE_GATE.md
- scripts/check-diff-size.js
- tasks/todo.md
- tasks/lessons.md
Kontrakty do przeczytania: AGENTS.md, AGENT_DEV_POLICY.md, docs/CONTEXT_BUDGET_GUARD.md
Pliki zakazane: kod aplikacji, artifacts/**
Czego nie ruszać: scope guard, godfile guard, task checker, dokumenty niezwiązane z diff-size limits

## Zakres
Moduł: workflow guards
Pliki: `scripts/check-diff-size.js`, `README.md`, `RELEASE_GATE.md`, `tasks/todo.md`, `tasks/lessons.md`

## Reprodukcja / dowód problemu
`AGENTS.md` deklaruje `MINIMAL_FIX - mały bugfix, max 3 pliki, max 50 LOC`, ale `scripts/check-diff-size.js` używa jednego limitu: 12 liczonych plików i 250 liczonych linii.

## Escalation
Czy brakuje danych do bezpiecznej zmiany?
NIE

Jeśli TAK:
Brakujące dane: brak
Czego nie da się potwierdzić: brak
Ryzyko kodowania teraz: niskie, zmiana dotyczy jednego guarda i zachowuje obecne limity dla większych trybów
Najmniejszy następny krok: dodać limity zależne od trybu pracy i negatywne testy przez env input

## Klasyfikacja
REQUIRED

Uzasadnienie:
Bez egzekwowania limitu MINIMAL_FIX workflow pozwala na dokładanie niepotrzebnego kodu mimo poprawnie wypełnionego taska.

## Diagnoza
Root cause: limit małego fixa żył tylko w instrukcji, nie w bramie.
Dowód: `check-diff-size.js` miał stałe warunki `countedFiles.length > 12` i `countedTotal > 250`.
Aktualny flow: agent może oznaczyć task jako MINIMAL_FIX, a gate nadal przepuści do 12 plików i 250 linii.

## Granice
Moduły dotknięte: workflow guard scripts
Kontrakty dotknięte: `tasks/todo.md` jako źródło trybu pracy dla diff-size guard
Poza zakresem: nowe guardy instrukcji, import-boundary checker, test-quality checker, generator tasków

## Kontrakt
INPUT: `tasks/todo.md` z wybranym trybem pracy oraz git diff numstat.
SUCCESS: diff mieści się w limitach dla trybu pracy.
ERRORS: brak trybu pracy, przekroczona liczba plików, przekroczona liczba linii.
STATUSES: PASS / FAIL.
SIDE EFFECTS: brak poza odczytem git diff i task file.
LOGS: output `npm run check:diff-size`.
TESTS: env-based pozytywne i negatywne uruchomienia skryptu.
DONE: `MINIMAL_FIX` ma realny limit 3 pliki / 50 LOC.

## Failure modes
Timeout: nie dotyczy.
Null/missing data: brak task file albo trybu pracy kończy się FAIL.
Invalid schema: nieznany tryb pracy kończy się FAIL.
Duplicate request: check jest idempotentny.
Concurrent request: git diff obejmuje bieżący stan roboczy.
Partial write: przekroczony limit kończy się FAIL.
Worker crash: nie dotyczy.
Retry loop: nie dotyczy.
Provider unavailable: nie dotyczy.

## Guard Scope
REQUIRED GUARDS:
- limity diffu zależne od trybu pracy.
- twardy limit `MINIMAL_FIX`: 3 pliki / 50 LOC.
- test seam dla symulowanych numstat/task file.

NICE_TO_HAVE GUARDS:
- osobny guard długości AGENTS.md/CLAUDE.md.
- checker jakości testów po wybraniu stacka.

OVERBUILD GUARDS:
- pełny subsystem planowania z własnym parserem zadań.

ParkingLot.md updated:
NOT_NEEDED

## Runtime guards
State machine: nie dotyczy.
Error classification: CLI PASS / FAIL.
Idempotency: check można uruchamiać wielokrotnie.
Single-flight: nie dotyczy.
Worker lock: nie dotyczy.
Circuit breaker: nie dotyczy.
Backpressure: nie dotyczy.
UI truth: nie dotyczy.
Observability: output pokazuje tryb pracy i wykorzystany limit.

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
Ile modułów dotyka zmiana: jeden guard script.
Czy to naturalne: tak.
Czy da się ograniczyć zmianę do jednego kontraktu: tak, `tasks/todo.md` jako źródło trybu.

## Plan
- [x] Zidentyfikować lukę między polityką MINIMAL_FIX i skryptem.
- [x] Dodać limity zależne od trybu pracy.
- [x] Uruchomić negatywne testy dla MINIMAL_FIX.
- [x] Uruchomić `npm run gate:local`.
- [x] Uzupełnić dokumentację limitów trybu pracy.

## Weryfikacja
Komendy:
`CHECK_DIFF_TASK_FILE=/tmp/minimal-task.md CHECK_DIFF_NUMSTAT=$'10\t41\tsrc/a.ts' node scripts/check-diff-size.js`
`CHECK_DIFF_TASK_FILE=/tmp/minimal-task.md CHECK_DIFF_NUMSTAT=$'10\t40\tsrc/a.ts' node scripts/check-diff-size.js`
`CHECK_DIFF_TASK_FILE=/tmp/minimal-task.md CHECK_DIFF_NUMSTAT=$'1\t1\tsrc/a.ts\n1\t1\tsrc/b.ts\n1\t1\tsrc/c.ts\n1\t1\tsrc/d.ts' node scripts/check-diff-size.js`
`npm run gate:local`
Expected result: przekroczenia MINIMAL_FIX failują, limit 50 linii przechodzi, gate lokalny przechodzi.

## Definition of Done
- [x] test PASS
- [x] build NOT_NEEDED, starter nie ma aplikacji do zbudowania
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
Co zmieniono: `scripts/check-diff-size.js` czyta tryb pracy i egzekwuje limity zależne od trybu; `MINIMAL_FIX` ma twarde 3 pliki / 50 LOC; README i release gate opisują tabelę limitów.
Jak sprawdzono: env-based testy negatywne dla 51 LOC i 4 plików w `MINIMAL_FIX`, pozytywny test 50 LOC, `npm run gate:local`.
PASS / FAIL: PASS
Ryzyka: workflow docs/tasks są nadal ignorowane przez licznik diffu, więc osobny instruction-size guard może być kolejnym taskiem.
Follow-up: rozważyć osobny guard długości instrukcji, jeśli CLAUDE.md/AGENTS.md zaczną puchnąć.
