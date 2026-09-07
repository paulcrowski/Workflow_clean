# CONTEXT_BUDGET_GUARD.md

## Cel

Workflow ma poprawiać jakość kodowania, ale nie może sam stawać się ciężarem tokenowym.

Repo trzyma pełne zasady.
Prompt roboczy ma być krótki i outcome-first.

`AGENTS.md` ma byc jedynym always-on entrypointem. Reszta dokumentow jest ladowana on-demand.

## 1. AGENTS.md ma być krótki

Limit orientacyjny:
- idealnie: 500-900 słów
- maksymalnie: 1200 słów
- powyżej 1200 słów: przenieś szczegóły do docs/

AGENTS.md ma zawierać:
- tryby pracy,
- najważniejsze zakazy,
- linki do guardów,
- format krótkiego raportu.

AGENTS.md nie ma zawierać:
- pełnych definicji wszystkich guardów,
- długich przykładów,
- historii projektu,
- wszystkich edge-case’ów.

## 2. Ciężkie zasady tylko on-demand

Nie ładuj wszystkiego zawsze.

Używaj:
- docs/ARCHITECTURE_GUARDS.md tylko dla RUNTIME_FIX,
- docs/CODE_STRUCTURE_GUARDS.md tylko dla STRUCTURE_FIX,
- docs/CONTRACTS.md tylko gdy zmieniasz API/kontrakt,
- docs/MODULE_MAP.md tylko gdy task dotyka kilku modułów.

## 3. Hooki nie mogą pompować promptu

Hooki mają:
- blokować złe commity,
- odpalać testy,
- sprawdzać diff,
- sprawdzać god files.

Hooki nie mają:
- wstrzykiwać długich streszczeń,
- dodawać całych lessons,
- dopisywać historii projektu,
- ładować wielu plików kontekstu na każdy prompt.

## 4. Skille tylko gdy pasują do taska

Zasada:
- 3-5 aktywnych skills maksymalnie,
- skill ładowany tylko dla pasującego trybu pracy,
- nieużywane skills wyłączyć.

## 5. MCP/tools tylko per task

Nie trzymaj wszystkich MCP/tools jako always-on.

Zasada:
- always-on tylko narzędzia codzienne,
- reszta włączana per sesja/per task,
- jeśli task nie wymaga narzędzia, narzędzie jest OFF.

## 6. Limit długości sesji

Długie rozmowy są kosztowne i pogarszają precyzję.

Zasada:
- po 15-20 wymianach zrób compact summary,
- przy dużym tasku po każdym etapie zapisz outcome do tasks/todo.md, jeśli jest na allowliście; w `audit-only` podsumuj etap wyłącznie w rozmowie,
- nie trzymaj całego procesu tylko w rozmowie.

Summary ma zawierać:
- cel,
- root cause,
- decyzje,
- zmienione pliki,
- testy,
- ryzyka,
- next step.

## 7. Model i wysiłek dobrane do zadania

Workflow nie wymaga konkretnego modelu. Wybór modelu i ustawień należy do użytkownika; nie zmieniaj ich automatycznie ani nie deklaruj zmiany, której narzędzia nie potwierdziły.

- Do prostych, dobrze określonych zadań preferuj niższy koszt i mały wysiłek rozumowania spośród dostępnych ustawień.
- Większy wysiłek uzasadniają niepewność diagnozy, trudne regresje, zależności między modułami lub istotne ryzyko dla danych i użytkowników.
- Sam tryb `AUDIT`, `RUNTIME_FIX` lub `STRUCTURE_FIX` nie wymusza ciężkiego rozumowania.
- Gdy obecny model utknie mimo zebrania dowodów, przedstaw konkretny blocker i uzasadnij ewentualną propozycję użycia mocniejszego modelu.
- Oszczędzaj przez wąski kontekst, minimalny diff i proporcjonalną weryfikację; nie pomijaj obowiązkowych kontroli ani failure modes.
- Nie uruchamiaj subagentów domyślnie. Deleguj tylko na wyraźne polecenie użytkownika, do ograniczonych, niezależnych zadań; unikaj powielania analizy.

## 8. Prompt roboczy ma być krótki

Codzienny prompt:

Cel:
...

Kryteria sukcesu:
...

Ograniczenia:
...

Dowody:
...

Tryb pracy:
...

Weryfikacja:
...

Nie wklejaj całej konstytucji. Agent ma ją czytać z repo.

## 9. Weekly context audit

Raz w tygodniu sprawdź:
- długość AGENTS.md / CLAUDE.md,
- aktywne hooki,
- aktywne skills,
- aktywne MCP/tools,
- średnią długość sesji,
- czy prompt roboczy nie stał się za długi.

Cel:
- AGENTS.md poniżej 1200 słów,
- tylko potrzebne hooki,
- 3-5 aktywnych skills,
- minimalne always-on MCP,
- prompt roboczy outcome-first.
