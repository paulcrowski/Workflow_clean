# Archived Task

Closed At: 2026-09-07T11:24:13.039Z
Result: PASS
Source File: tasks/todo.md

# Current Task

Task ID: 2026-09-07-rename-workflow-clean
Task Date: 2026-09-07
Task Status: ACTIVE

## Tryb pracy
CONTENT_FIX

Uzasadnienie trybu:
Agent wybral najmniejszy bezpieczny tryb pracy.

## Cel / Outcome
Dostosować README do nazwy repozytorium Workflow_clean i zaktualizować origin.

## Kryteria sukcesu
- README używa nowej nazwy

## Priorytet / Blocker
Największy blocker teraz: Dostosować README do nazwy repozytorium Workflow_clean i zaktualizować origin.
Dowód blockera: polecenie użytkownika i aktualny task
Czy ten task rusza blocker: TAK
Jeśli NIE, powód: NOT_APPLICABLE
Dlaczego mimo to robimy teraz: nie dotyczy
Warunek powrotu do blockera: nie dotyczy

## Kontekst dla agenta
Moduł: workflow
Tryb zmiany: code-change
Dozwolone pliki do zmiany:
- README.md
- tasks/todo.md
- tasks/archive/**
Kontrakty do przeczytania: tylko pliki potrzebne do taska
Czego nie ruszać: pliki poza zakresem

## Zakres
Moduł: workflow
Pliki: README.md

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
Root cause: po zmianie nazwy repo README i lokalny origin wskazywały starą nazwę `cleanWorkflow`.
Dowód: README zawierało starą nazwę, a `git remote -v` wskazywało `paulcrowski/cleanWorkflow.git`.
Minimalny fix: zaktualizować dwa wystąpienia nazwy w README i origin. Non-goals: zmiana historii commitów, kodu i konfiguracji aplikacji.
Test: npm run gate:local; git diff --check; rg starej nazwy; git remote -v.

## Plan
- [x] Przeczytać tylko pliki potrzebne do zmiany.
- [x] Wykonać minimalny diff.
- [x] Uruchomić weryfikację.

## Weryfikacja
Komendy:
npm run gate:local
git diff --check
rg starej nazwy w README
git remote -v
Expected result: PASS.

## Review / Wyniki
Co zmieniono: README używa nazwy `Workflow_clean`, a lokalny origin wskazuje nowe repozytorium.
Jak sprawdzono: gate:local, diff check i kontrola referencji przechodzą.
PASS / FAIL: PASS
Ryzyka: GitHub może przekierowywać stary URL, ale historia commitów pozostaje bez zmian.
Follow-up: brak wymaganych zmian.
