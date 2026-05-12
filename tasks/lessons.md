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

## Data
2026-05-12

## Błąd
`MINIMAL_FIX` miał deklarowany limit 3 pliki / 50 LOC, ale brama diff-size stosowała luźny globalny limit 12 plików / 250 LOC.

## Przyczyna
Polityka workflow i mechaniczny guard rozjechały się: instrukcja ograniczała mały fix, ale skrypt nie czytał trybu pracy z `tasks/todo.md`.

## Reguła zapobiegawcza
Limity rozmiaru diffu muszą wynikać z trybu pracy, a nie z jednego globalnego progu.

## Test / guardrail
`scripts/check-diff-size.js` egzekwuje `MINIMAL_FIX` jako 3 liczone pliki / 50 liczonych linii i ma env-based test seam dla numstat/task file.
