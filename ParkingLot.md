# Parking Lot

## Import-boundary checker per framework

## Dlaczego nie teraz
Obecny task naprawia brak mechanicznego scope locka w starterze. Import-boundary checker wymaga reguł zależnych od stacka konkretnej aplikacji.

## Kiedy wrócić
Po utworzeniu realnej aplikacji web/mobile i ustaleniu mapy modułów oraz aliasów importów.

## Ryzyko
Dodanie tego teraz stworzyłoby fałszywie uniwersalny guard, który będzie blokował poprawne projekty albo przepuszczał złe granice.

## Generator tasków

## Dlaczego nie teraz
Szablon i checki wystarczają do obecnego problemu. Generator byłby nowym subsystemem workflow.

## Kiedy wrócić
Gdy ręczne wypełnianie `tasks/todo.md` zacznie regularnie powodować błędy.

## Ryzyko
Overbuild i kolejna warstwa utrzymania zamiast prostego repo-native workflow.

## Commit przed zamknięciem taska / Commit before closing a task

## Dlaczego nie teraz / Why not now
PL: Zmiany taska 2026-10-02-entrypoint-and-gate-consistency zostały zacommitowane przez `CHECK_SCOPE_TASK_FILE` wskazujący na archiwum, więc problem nie blokuje pracy.
EN: The changes from task 2026-10-02-entrypoint-and-gate-consistency were committed with `CHECK_SCOPE_TASK_FILE` pointing at the archive, so the issue does not block work.

## Kiedy wrócić / When to return
PL: Gdy kolejny task zostanie zamknięty przed commitem i pre-commit zablokuje `check:scope`.
EN: When another task is closed before its commit and the pre-commit hook blocks `check:scope`.

## Ryzyko / Risk
PL: Pokusa obchodzenia hooka przez `--no-verify`; rozjazd między zamkniętym taskiem a niezacommitowanymi zmianami.
EN: Temptation to bypass the hook with `--no-verify`; drift between a closed task and uncommitted changes.
