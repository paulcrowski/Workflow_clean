# Current Task

## Tryb pracy
MINIMAL_FIX / RUNTIME_FIX / STRUCTURE_FIX / FEATURE / AUDIT:

Uzasadnienie trybu:
...

## Cel / Outcome
...

## Kryteria sukcesu
...

## Kontekst dla agenta
Moduł:
Maksymalny zakres plików:
Kontrakty do przeczytania:
Pliki zakazane:
Czego nie ruszać:

## Zakres
Moduł:
Pliki:

## Reprodukcja / dowód problemu
...

## Escalation
Czy brakuje danych do bezpiecznej zmiany?
TAK / NIE

Jeśli TAK:
Brakujące dane:
Czego nie da się potwierdzić:
Ryzyko kodowania teraz:
Najmniejszy następny krok:

## Klasyfikacja
REQUIRED / NICE_TO_HAVE / OVERBUILD:

Uzasadnienie:
...

## Diagnoza
Root cause:
Dowód:
Aktualny flow:

## Granice
Moduły dotknięte:
Kontrakty dotknięte:
Poza zakresem:

## Kontrakt
INPUT:
SUCCESS:
ERRORS:
STATUSES:
SIDE EFFECTS:
LOGS:
TESTS:
DONE:

## Failure modes
Timeout:
Null/missing data:
Invalid schema:
Duplicate request:
Concurrent request:
Partial write:
Worker crash:
Retry loop:
Provider unavailable:

## Guard Scope
REQUIRED GUARDS:
- ...

NICE_TO_HAVE GUARDS:
- ...

OVERBUILD GUARDS:
- ...

ParkingLot.md updated:
YES / NO / NOT_NEEDED

## Runtime guards
State machine:
Error classification:
Idempotency:
Single-flight:
Worker lock:
Circuit breaker:
Backpressure:
UI truth:
Observability:

## Code Structure Guard
Czy dotykamy pliku >300 LOC?
TAK / NIE

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
TAK / NIE

Czy Business Logic importuje UI/DB/framework?
TAK / NIE

Czy adapter przecieka do core?
TAK / NIE

## Change Isolation
Ile modułów dotyka zmiana:
Czy to naturalne:
Czy da się ograniczyć zmianę do jednego kontraktu:

## Plan
- [ ] Krok 1
- [ ] Krok 2
- [ ] Krok 3

## Weryfikacja
Komendy:
Expected result:

## Definition of Done
- [ ] test PASS
- [ ] build PASS
- [ ] brak ERROR w logach
- [ ] zmiana nie wychodzi poza zakres
- [ ] brak refaktoru przy okazji
- [ ] failure modes obsłużone
- [ ] brak silent fallbacków
- [ ] brak empty success
- [ ] UI truth zachowane, jeśli dotyczy
- [ ] dependency direction zachowany
- [ ] brak cyklicznych zależności
- [ ] duże pliki nie zostały powiększone bez uzasadnienia
- [ ] implementowano tylko REQUIRED GUARDS

## Review / Wyniki
Co zmieniono:
Jak sprawdzono:
PASS / FAIL:
Ryzyka:
Follow-up:
