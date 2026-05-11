# Lessons

## Data
2026-05-11

## Błąd
Workflow miał zasady zakresu, ale nie miał mechanicznego scope locka.

## Przyczyna
Gate sprawdzał formularz taska, rozmiar diffu i duże pliki, ale nie porównywał realnie zmienionych plików z allowlistą taska.

## Reguła zapobiegawcza
Każdy task deklaruje `Tryb zmiany` i `Dozwolone pliki do zmiany`; gate failuje przy zmianach spoza allowlisty, przy diffie w `audit-only` i przy `artifacts/**` poza `release-build`.

## Test / guardrail
`npm run check:scope` wpięty w `gate:local` i `gate:pr`.
