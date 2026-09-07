# Archived Task

Closed At: 2026-09-07T11:15:10.736Z
Result: PASS
Source File: tasks/todo.md

# Current Task

Task ID: 2026-09-07-bilingual-readme
Task Date: 2026-09-07
Task Status: ACTIVE

## Tryb pracy
CONTENT_FIX

Uzasadnienie trybu:
Agent wybral najmniejszy bezpieczny tryb pracy.

## Cel / Outcome
Uprościć README i dodać pełną instrukcję użycia po polsku i angielsku.

## Kryteria sukcesu
- README prowadzi nową osobę od instalacji do gate:local

## Priorytet / Blocker
Największy blocker teraz: Uprościć README i dodać pełną instrukcję użycia po polsku i angielsku.
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
Root cause: README było głównie onboardingiem po polsku bez zwartej instrukcji dwujęzycznej i bez jasnej ścieżki od instalacji do gate:local.
Dowód: poprzednia treść mieszała opis repo, lifecycle i guardy, a nie miała sekcji angielskiej.
Minimalny fix: przepisać README jako instrukcję PL/EN. Non-goals: zmiany AGENTS.md, skryptów, kontraktów workflow, aplikacji i konfiguracji modeli.
Test: npm run gate:local; git diff --check; sprawdzenie istnienia linkowanych plików docs.

## Plan
- [x] Przeczytać tylko pliki potrzebne do zmiany.
- [x] Wykonać minimalny diff.
- [x] Uruchomić weryfikację.

## Weryfikacja
Komendy:
npm run gate:local
git diff --check
Test linków: wszystkie ścieżki docs użyte w README istnieją.
Expected result: PASS.

## Review / Wyniki
Co zmieniono: README przepisano po polsku i angielsku, dodając instalację, tryby, lifecycle, audyt, gate'y, koszty modeli i mapę dokumentów.
Jak sprawdzono: npm run gate:local PASS; git diff --check PASS; linkowane pliki docs istnieją.
PASS / FAIL: PASS
Ryzyka: README nie zastępuje kontraktu z AGENTS.md; opisy komend muszą zostać zaktualizowane, jeśli zmienią się skrypty.
Follow-up: brak wymaganych zmian.
