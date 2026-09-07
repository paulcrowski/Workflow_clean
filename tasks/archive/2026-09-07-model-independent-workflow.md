# Archived Task

Closed At: 2026-09-07T08:45:50.493Z
Result: PASS
Source File: tasks/todo.md

# Current Task

Task ID: 2026-09-07-model-independent-workflow
Task Date: 2026-09-07
Task Status: ACTIVE

## Tryb pracy
CONTENT_FIX

Uzasadnienie trybu:
Agent wybral najmniejszy bezpieczny tryb pracy.

## Cel / Outcome
Usunąć sprzeczności instrukcji i dopasować wysiłek do zadania niezależnie od modelu.

## Kryteria sukcesu
- Audyt bez zapisów; dowody przed eskalacją; proporcjonalna weryfikacja i reasoning; gate:local PASS.

## Priorytet / Blocker
Największy blocker teraz: Usunąć sprzeczności instrukcji i dopasować wysiłek do zadania niezależnie od modelu.
Dowód blockera: polecenie użytkownika i aktualny task
Czy ten task rusza blocker: TAK
Jeśli NIE, powód: NOT_APPLICABLE
Dlaczego mimo to robimy teraz: nie dotyczy
Warunek powrotu do blockera: nie dotyczy

## Kontekst dla agenta
Moduł: workflow
Tryb zmiany: code-change
Dozwolone pliki do zmiany:
- AGENTS.md
- docs/CONTEXT_BUDGET_GUARD.md
- tasks/todo.md
- tasks/archive/**
Kontrakty do przeczytania: tylko pliki potrzebne do taska
Czego nie ruszać: pliki poza zakresem

## Zakres
Moduł: workflow
Pliki: AGENTS.md, docs/CONTEXT_BUDGET_GUARD.md

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
Root cause: bezwarunkowe zapisy taska i Parking Lot kolidują z audit-only; eskalacja pomija samodzielny odczyt dowodów; budżet wymusza ciężki reasoning na podstawie trybu.
Dowód: AGENTS.md sekcje Tryby pracy, Escalation, Klasyfikacja i Scope Lock; docs/CONTEXT_BUDGET_GUARD.md sekcje 6-7.
Minimalny fix: doprecyzowanie dwóch dokumentów. Non-goals: zmiany skryptów, konfiguracji modeli, globalnych skilli, runtime i obowiązkowych kontroli.
Test: odczyt diffu dla audytu, brakujących dowodów, copy i trudnej regresji; npm run gate:local; git diff --check.

## Plan
- [x] Przeczytać tylko pliki potrzebne do zmiany.
- [x] Wykonać minimalny diff.
- [x] Uruchomić weryfikację.

## Weryfikacja
Komendy:
npm run gate:local
git diff --check
Odczyt reguł: audit-only bez zapisów; odczyt przed eskalacją; copy bez dodatkowych testów; ryzykowna regresja z obowiązkowymi kontrolami.
Expected result: PASS.

## Review / Wyniki
Co zmieniono: doprecyzowano audyt bez zapisów, samodzielne zbieranie dowodów, proporcjonalne testy, krótki raport i dobór wysiłku niezależny od modelu.
Jak sprawdzono: npm run gate:local PASS; git diff --check PASS; ręczny przegląd reguł dla audytu, brakujących dowodów, copy i trudnej regresji PASS.
PASS / FAIL: PASS
Ryzyka: weryfikacja instrukcji i kontroli repo, bez eksperymentu porównującego wykonanie i koszt na różnych modelach.
Follow-up: brak wymaganych zmian; globalne skille i konfiguracja modeli poza zakresem.
