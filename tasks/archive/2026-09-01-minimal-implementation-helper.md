# Archived Task

Closed At: 2026-09-01T17:36:48.264Z
Result: PASS
Source File: tasks/todo.md

# Current Task

Task ID: 2026-09-01-minimal-implementation-helper
Task Date: 2026-09-01
Task Status: ACTIVE

## Tryb pracy
MINIMAL_FIX

Uzasadnienie trybu:
Agent wybral najmniejszy bezpieczny tryb pracy.

## Cel / Outcome
Dodac zwięzły helper ograniczający overengineering bez zastępowania obecnego workflow

## Kryteria sukcesu
- AGENTS.md zawiera krótki, niesprzeczny helper minimalnej implementacji.

## Priorytet / Blocker
Największy blocker teraz: Dodac zwięzły helper ograniczający overengineering bez zastępowania obecnego workflow
Dowód blockera: polecenie użytkownika i aktualny task
Czy ten task rusza blocker: TAK
Jeśli NIE, powód: NOT_APPLICABLE
Dlaczego mimo to robimy teraz: nie dotyczy
Warunek powrotu do blockera: nie dotyczy

## Kontekst dla agenta
Moduł: workflow-policy
Tryb zmiany: code-change
Dozwolone pliki do zmiany:
- AGENTS.md
- tasks/todo.md
- tasks/archive/**
Kontrakty do przeczytania: tylko pliki potrzebne do taska
Czego nie ruszać: pliki poza zakresem

## Zakres
Moduł: workflow-policy
Pliki: AGENTS.md

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
Root cause: obecny workflow ogranicza zakres mechanicznie, ale nie nazywa jawnie non-goals ani kosztownych form overbuildingu w jednym krótkim anchorze.
Dowód: audit AGENTS.md, guardów struktury i skryptów scope/diff-size.
Minimalny fix: jeden pomocniczy blok w AGENTS.md bez zastępowania trybów, scope locka i Failure-First.
Test: gate workflow, diff check i kontrola budżetu słów.

## Plan
- [x] Przeczytać tylko pliki potrzebne do zmiany.
- [x] Wykonać minimalny diff.
- [x] Uruchomić weryfikację.

## Weryfikacja
Komendy:
`npm run gate:local`
`git diff --check`
`wc -w AGENTS.md`
Expected result: PASS.

## Review / Wyniki
Co zmieniono: dodano pięciopunktowy helper minimalnej implementacji w AGENTS.md bez zastępowania istniejących guardów.
Jak sprawdzono: `npm run gate:local` PASS, `git diff --check` PASS, AGENTS.md ma 757 słów i pozostaje w budżecie 500-900.
PASS / FAIL: PASS
Ryzyka: reguły są jakościowe; mechaniczne scope i diff-size pozostają źródłem egzekwowania zakresu.
Follow-up: brak.
