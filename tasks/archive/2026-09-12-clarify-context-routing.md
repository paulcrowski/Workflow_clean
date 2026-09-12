# Archived Task

Closed At: 2026-09-12T10:09:33.777Z
Result: PASS
Source File: tasks/todo.md

# Current Task

Task ID: 2026-09-12-clarify-context-routing
Task Date: 2026-09-12
Task Status: ACTIVE

## Tryb pracy
CONTENT_FIX

Uzasadnienie trybu:
Agent wybral najmniejszy bezpieczny tryb pracy.

## Cel / Outcome
Doprecyzować dobór dokumentów i skilli według potrzeb zadania.

## Kryteria sukcesu
- Routing zgodny z AGENTS.md; katalog skilli odróżniony od wczytanych instrukcji; gate:local PASS

## Priorytet / Blocker
Największy blocker teraz: Doprecyzować dobór dokumentów i skilli według potrzeb zadania.
Dowód blockera: polecenie użytkownika i aktualny task
Czy ten task rusza blocker: TAK
Jeśli NIE, powód: NOT_APPLICABLE
Dlaczego mimo to robimy teraz: nie dotyczy
Warunek powrotu do blockera: nie dotyczy

## Kontekst dla agenta
Moduł: workflow
Tryb zmiany: code-change
Dozwolone pliki do zmiany:
- docs/CONTEXT_BUDGET_GUARD.md
- tasks/todo.md
- tasks/archive/**
Kontrakty do przeczytania: tylko pliki potrzebne do taska
Czego nie ruszać: pliki poza zakresem

## Zakres
Moduł: workflow
Pliki: docs/CONTEXT_BUDGET_GUARD.md

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
Root cause: guard wiązał dokumenty z nazwą trybu i nie odróżniał katalogu skilli od pełnych instrukcji.
Dowód: sekcje 2 i 4 guarda; routing w AGENTS.md jest oparty na problemie.
Minimalny fix: doprecyzować sekcje 2 i 4 oraz odpowiadające im punkty przeglądu w sekcji 9. Non-goals: zmiany skilli, konfiguracji, modeli, skryptów i zasad bezpieczeństwa.
Test: odczyt diffu i scenariuszy FEATURE z runtime oraz skilla niepasującego do zadania; gate:local i git diff --check.

## Plan
- [x] Przeczytać tylko pliki potrzebne do zmiany.
- [x] Wykonać minimalny diff.
- [x] Uruchomić weryfikację.

## Weryfikacja
Komendy:
npm run gate:local; git diff --check; przegląd scenariuszy i zgodności z AGENTS.md
Expected result: PASS.

## Review / Wyniki
Co zmieniono: routing dokumentów według problemu; katalog skilli odróżniony od instrukcji; precyzyjne wyzwalacze zamiast limitu 3–5.
Jak sprawdzono: gate:local PASS; git diff --check PASS; przegląd diffu potwierdza routing FEATURE z runtime i brak aktywacji skilla tylko po słowie kluczowym.
PASS / FAIL: PASS
Ryzyka: sprawdzono treść reguł i kontrole repo; brak pomiaru oszczędności tokenów.
Follow-up: przegląd własnych skilli poza zakresem tej zmiany.
