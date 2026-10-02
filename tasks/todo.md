# Current Task

Task ID: 2026-10-02-parking-lot-commit-before-close
Task Date: 2026-10-02
Task Status: ACTIVE

## Tryb pracy
CONTENT_FIX

Uzasadnienie trybu:
Agent wybral najmniejszy bezpieczny tryb pracy.

## Cel / Outcome
Dopisać do ParkingLot.md dwujęzyczny (PL/EN) wpis o commicie przed zamknięciem taska.

## Kryteria sukcesu
- ParkingLot.md ma wpis PL/EN

## Priorytet / Blocker
Największy blocker teraz: Dopisać do ParkingLot.md dwujęzyczny (PL/EN) wpis o commicie przed zamknięciem taska.
Dowód blockera: polecenie użytkownika i aktualny task
Czy ten task rusza blocker: TAK
Jeśli NIE, powód: NOT_APPLICABLE
Dlaczego mimo to robimy teraz: nie dotyczy
Warunek powrotu do blockera: nie dotyczy

## Kontekst dla agenta
Moduł: workflow parking lot
Tryb zmiany: code-change
Dozwolone pliki do zmiany:
- ParkingLot.md
- tasks/todo.md
- tasks/archive/**
Kontrakty do przeczytania: tylko pliki potrzebne do taska
Czego nie ruszać: pliki poza zakresem

## Zakres
Moduł: workflow parking lot
Pliki: ParkingLot.md

## Escalation
Czy brakuje danych do bezpiecznej zmiany?
NIE

Jeśli TAK:
Status: BLOCKED_BY_MISSING_EVIDENCE
Najmniejszy następny krok: audit albo test reprodukcyjny

## Klasyfikacja
REQUIRED

Uzasadnienie:
Zmiana jest wymagana dla aktualnego outcome.

## Diagnoza
Root cause: ustalic przed kodem.
Dowód: wskazac przed finalnym PASS.
Minimalny fix: najmniejszy diff w allowliscie.
Test: komenda albo visual/render proof dobrany przez agenta.

## Plan
- [ ] Przeczytać tylko pliki potrzebne do zmiany.
- [ ] Wykonać minimalny diff.
- [ ] Uruchomić weryfikację.

## Weryfikacja
Komendy:
ustali agent przed zamknieciem taska
Expected result: PASS.

## Review / Wyniki
Co zmieniono: nie zakończono.
Jak sprawdzono: nie uruchomiono jeszcze.
PASS / FAIL: Nie uruchomiono testów
Ryzyka: brak finalnej weryfikacji.
Follow-up: brak.
