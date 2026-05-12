# RELEASE_GATE.md

Kryteria dopuszczenia zmiany do głównej gałęzi (main).

## Wymagania
1. `npm run check:task` PASS
2. `npm run check:scope` PASS
3. `npm run check:diff-size` PASS
4. `npm run check:godfiles` PASS
5. Brak błędów w logach
6. Review zakończone

## Limity diffu

`check:diff-size` używa trybu pracy z `tasks/todo.md`:

| Tryb pracy | Limit liczonych plików | Limit liczonych linii |
| --- | ---: | ---: |
| `MINIMAL_FIX` | 3 | 50 |
| `RUNTIME_FIX` | 12 | 250 |
| `STRUCTURE_FIX` | 12 | 250 |
| `FEATURE` | 12 | 250 |
| `AUDIT` | 0 | 0 |

Jeśli task przekracza limit, trzeba przerwać i zrobić re-plan albo rozbić zmianę na mniejsze commity.

## Scope lock

Każdy task musi wskazać `Tryb zmiany`:
- `code-change` - wolno zmienić tylko pliki z allowlisty.
- `audit-only` - nie wolno zmienić żadnego pliku.
- `release-build` - wolno zmieniać artefakty generowane, ale tylko jeśli są w allowliście.

`artifacts/**` jest domyślnie zablokowane poza `release-build`.
