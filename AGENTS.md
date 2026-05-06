# AGENTS.md

## Zasada główna

Pracuj outcome-first.

Najpierw ustal:
1. jaki jest oczekiwany wynik,
2. jakie są kryteria sukcesu,
3. jakie są ograniczenia,
4. jakie dowody są dostępne,
5. jaka jest najmniejsza bezpieczna zmiana.

Nie zaczynaj od kodowania.

Jeśli brakuje danych do bezpiecznej zmiany, nie koduj. Użyj ESCALATION.

## Tryb pracy

Każdy task oznacz jako:

MINIMAL_FIX - mały bugfix, max 3 pliki, max 50 LOC.
RUNTIME_FIX - API, worker, parser, kolejka, cache, UI status, provider.
STRUCTURE_FIX - duży plik, zależności, granice modułów, god file.
FEATURE - nowa funkcja.
AUDIT - tylko diagnoza, bez kodowania.

Nie stosuj pełnej procedury do drobnego fixa, jeśli nie dotyczy runtime/danych/krytycznego flow.
Nie omijaj pełnej procedury, jeśli task dotyczy runtime, danych, API, workerów, providerów, kontraktów albo dużych plików.

## Escalation

Jeśli brakuje danych do bezpiecznej zmiany:
- nie koduj,
- wypisz brakujące dowody,
- zaproponuj najmniejszy audit albo test reprodukcyjny,
- oznacz status jako BLOCKED_BY_MISSING_EVIDENCE.

## Klasyfikacja zmiany

Każdą zmianę oznacz jako:

REQUIRED - trzeba zrobić teraz, bo blokuje działanie.
NICE_TO_HAVE - dobre, ale na później.
OVERBUILD - nie robić.

Jeśli zmiana jest NICE_TO_HAVE albo OVERBUILD, nie koduj jej.
Zapisz ją do ParkingLot.md.

## Guard Scope

Nie wdrażaj wszystkich guardów naraz.

Dla każdego taska wskaż:

REQUIRED GUARDS:
- guardy konieczne do naprawy aktualnego błędu.

NICE_TO_HAVE GUARDS:
- dobre, ale niepotrzebne teraz.

OVERBUILD GUARDS:
- nie robić w tym tasku.

Implementuj tylko REQUIRED.
Resztę zapisz do ParkingLot.md.

## Zasady pracy

1. Jedna zmiana = jeden commit.
2. Jeden task = jeden problem.
3. Każdy task ma mieć PASS / FAIL.
4. Nie ma DONE bez dowodu.
5. Nie refaktoruj przy okazji.
6. Nie dodawaj funkcji poza zakresem.
7. Nie zmieniaj stylu kodu bez potrzeby.
8. Nie twórz helperów użytych raz.
9. Nie twórz nowego subsystemu bez zgody.
10. Nie dotykaj plików poza zakresem.
11. Jeśli task wymaga >20 plików albo >250 LOC diffu, przerwij i zrób re-plan.
12. Jeśli task dotyczy API, workera, kolejki, parsera, UI statusu albo providera, stosuj docs/ARCHITECTURE_GUARDS.md.
13. Jeśli task dotyka dużego pliku, core, runtime albo wielu modułów, stosuj docs/CODE_STRUCTURE_GUARDS.md.
14. Jeśli task jest długi albo kosztowny tokenowo, stosuj docs/CONTEXT_BUDGET_GUARD.md.

## Modularność

Repo ma być AI-readable.

Każdy moduł:
- ma jedną odpowiedzialność,
- ma własne pliki,
- ma własny kontrakt,
- nie importuje wnętrza obcych modułów,
- nie wymaga czytania całego repo.

Presentation nie zna implementacji Business Logic.
Business Logic nie zna UI ani szczegółów DB.
Data Access nie liczy reguł domenowych.
Moduły komunikują się przez kontrakty.

Jeśli agent musi czytać całe repo, task albo architektura są źle zaprojektowane.

## Minimalny format przed kodowaniem

Pokaż tylko to, co potrzebne dla trybu pracy.

Dla MINIMAL_FIX:
- tryb pracy,
- root cause,
- dowód,
- minimalny fix,
- test.

Dla RUNTIME_FIX / STRUCTURE_FIX / FEATURE:
- tryb pracy,
- diagnoza,
- granice,
- kontrakt,
- failure modes,
- Guard Scope,
- plan testów,
- plan zmiany.

Dla AUDIT:
- fakty,
- dowody,
- ryzyka,
- plan naprawczy,
- zero kodu.

## Zakaz

- happy-path only,
- silent fallback,
- empty success,
- infinite retry,
- any/null jako wynik biznesowy,
- mieszanie fetch/parse/validate/state/UI,
- retry dla parse/schema/validation/business errors,
- zapisywanie niezweryfikowanych danych jako faktu,
- przepisywanie całego pliku bez potrzeby,
- duży refactor bez osobnego taska,
- powiększanie god file bez planu,
- odwracanie kierunku zależności,
- obchodzenie kontraktów modułów,
- zgadywanie bez dowodu,
- ładowanie wszystkich guardów do każdego promptu.

## Raport po zmianie

Po zmianie pokaż:

Zrobione:
Pliki:
Dlaczego:
Jak sprawdzono:
Wynik: PASS / FAIL
Czego nie ruszałem:
Ryzyka:
Follow-up / Parking Lot:
