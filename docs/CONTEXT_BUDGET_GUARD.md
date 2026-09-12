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

Dobieraj dokumenty do problemu, niezależnie od nazwy trybu (także dla FEATURE):
- docs/ARCHITECTURE_GUARDS.md dla runtime/API/worker/UI/provider,
- docs/CODE_STRUCTURE_GUARDS.md dla dużych plików, granic modułów i zależności,
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
- odróżniaj katalog dostępnych skilli (nazwy i opisy) od pełnych instrukcji wczytanych do zadania; nie stosuj sztywnego limitu liczby skilli,
- opis skilla ma krótko i precyzyjnie wskazywać, kiedy go użyć; samo pokrewne słowo kluczowe nie wystarcza,
- czytaj pełny skill tylko wtedy, gdy pomaga w aktualnym zadaniu; dodatkowe materiały doczytuj według potrzeb,
- przy przeglądzie szukaj zbędnych lub nakładających się wyzwalaczy; zmiany skilli i konfiguracji wymagają osobnego zakresu.

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
- opisy dostępnych skilli i instrukcje faktycznie wczytywane do zadań,
- aktywne MCP/tools,
- średnią długość sesji,
- czy prompt roboczy nie stał się za długi.

Cel:
- AGENTS.md poniżej 1200 słów,
- tylko potrzebne hooki,
- precyzyjne wyzwalacze skilli i tylko potrzebne instrukcje w kontekście,
- minimalne always-on MCP,
- prompt roboczy outcome-first.
