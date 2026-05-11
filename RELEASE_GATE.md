# RELEASE_GATE.md

Kryteria dopuszczenia zmiany do głównej gałęzi (main).

## Wymagania
1. `npm run check:task` PASS
2. `npm run check:scope` PASS
3. `npm run check:diff-size` PASS
4. `npm run check:godfiles` PASS
5. Brak błędów w logach
6. Review zakończone

## Scope lock

Każdy task musi wskazać `Tryb zmiany`:
- `code-change` - wolno zmienić tylko pliki z allowlisty.
- `audit-only` - nie wolno zmienić żadnego pliku.
- `release-build` - wolno zmieniać artefakty generowane, ale tylko jeśli są w allowliście.

`artifacts/**` jest domyślnie zablokowane poza `release-build`.
