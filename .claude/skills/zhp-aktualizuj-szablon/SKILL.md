---
name: zhp-aktualizuj-szablon
description: Zaciąga najnowszą wersję szablonu ZHP (upstream) do repo jednostki przez git merge, rozwiązuje konflikty według reguł własności plików i sprawdza, że strona nadal się buduje. Użyj, gdy użytkownik chce zaktualizować szablon, wygląd lub skille z repo GK.
---

# Aktualizuj szablon

Cel: wciągnąć zmiany z repo szablonu, nie tracąc treści jednostki. Wynik ląduje na osobnej gałęzi —
na produkcję trafia dopiero przez `/zhp-generuj-podglad` → `/zhp-wgraj-zmiany`.

## 1. Przygotowanie

1. `git status` — jeśli są niezapisane zmiany, zatrzymaj się i zapytaj użytkownika, co z nimi zrobić
   (zwykle: najpierw `/zhp-generuj-podglad` albo commit na obecnej gałęzi).
2. Adres szablonu weź z `zhp-template.json` (pola `repo`, `branch`).
3. Jeśli nie ma remote `upstream` — `git remote add upstream <repo>`. Jeśli jest, ale wskazuje inny adres,
   zapytaj użytkownika, zanim go zmienisz.
4. `git fetch upstream`.
5. Pokaż użytkownikowi, co się zmieniło: `git log --oneline HEAD..upstream/<branch>` oraz wersję
   z `zhp-template.json` przed i po. Jeśli nic nowego — powiedz to i zakończ.

## 2. Merge na osobnej gałęzi

```bash
git switch -c aktualizacja-szablonu-$(date +%Y-%m-%d)
git merge upstream/<branch> --no-ff -m "Aktualizacja szablonu ZHP do wersji <wersja>"
```

Jeśli git odpowie `refusing to merge unrelated histories` (repo założone przyciskiem „Use this template”),
powtórz z `--allow-unrelated-histories` — przy tym pierwszym merge'u konfliktów może być dużo; reguły poniżej
nadal obowiązują.

## 3. Rozwiązywanie konfliktów

Lista plików w konflikcie: `git diff --name-only --diff-filter=U`. Rozstrzygaj według właściciela pliku
(szczegóły w CLAUDE.md):

| Pliki | Właściciel | Rozstrzygnięcie |
|---|---|---|
| `core/`, `.claude/`, `.github/`, `CLAUDE.md`, `astro.config.mjs`, `wrangler.jsonc`, `tsconfig.json`, `zhp-template.json` | szablon | zawsze wersja z szablonu: `git checkout --theirs -- <plik>` |
| `package-lock.json` | wspólny | `git checkout --theirs -- package-lock.json`, potem `npm install` (odtworzy zależności jednostki) |
| `package.json` | wspólny | wersje i skrypty z szablonu + dodatkowe zależności jednostki zachowane — połącz ręcznie |
| `site.config.ts`, `src/`, `content/`, `public/`, `JEDNOSTKA.md` | jednostka | zachowaj treść jednostki (`--ours`), ale dostosuj ją do zmian szablonu (np. nowe wymagane pole w schemacie) |

Pliki szablonu rozwiązujesz wyłącznie przez `git checkout --theirs` — nie edytuj ich ręcznie (blokuje to hook).
Jeśli jednostka miała własne zmiany w plikach szablonu, wypisz je użytkownikowi przed nadpisaniem i zaproponuj
przeniesienie ich do `src/`.

Po rozwiązaniu: `git add` rozwiązanych plików i `git commit --no-edit`.

## 4. Weryfikacja

1. `npm ci`
2. `npm run verify` — jeśli build albo `astro check` zgłasza błędy w plikach jednostki (np. zmieniony schemat
   `site.config.ts` albo zmienione propsy komponentu z `core/`), popraw pliki jednostki i zrób osobny commit
   „Dostosowanie do szablonu <wersja>”.
3. Jeśli nie da się tego naprawić bez zmian w plikach szablonu — zatrzymaj się i opisz problem użytkownikowi;
   to sygnał do zgłoszenia opiekunom szablonu.

## 5. Zakończ

Podsumuj: wersja przed → po, najważniejsze zmiany z logu, jak rozwiązano konflikty, czy były poprawki
w plikach jednostki. Zaproponuj `/zhp-generuj-podglad`, żeby obejrzeć wynik przed wypuszczeniem.
Nie pushuj i nie merguj do `main` w ramach tego skilla.
