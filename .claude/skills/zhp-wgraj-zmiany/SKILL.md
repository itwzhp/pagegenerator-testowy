---
name: zhp-wgraj-zmiany
description: Wypuszcza zmiany z gałęzi roboczej na produkcję — merge do main przez pull request, czeka na deploy i wypisuje adres strony. Wymaga wyraźnego potwierdzenia użytkownika.
disable-model-invocation: true
---

# Wgraj zmiany na produkcję

Produkcja = gałąź `main`. Każdy push na `main` wdraża stronę publicznie, więc ten skill **zawsze**
prosi o potwierdzenie przed merge'em.

## 1. Warunki wstępne

1. Jesteś na gałęzi roboczej (nie na `main`). Jeśli na `main` są niewypchnięte commity albo niezapisane
   zmiany — zatrzymaj się i zaproponuj najpierw `/zhp-generuj-podglad`.
2. Brak niezapisanych zmian (`git status`). Jeśli są — zaproponuj `/zhp-generuj-podglad`, żeby je zapisać
   i obejrzeć.
3. Gałąź jest wypchnięta, a jej ostatni build w GitHub Actions zakończył się sukcesem:
   `gh run list --branch <gałąź> --workflow deploy.yml --limit 1`. Jeśli build nie przeszedł albo podglądu
   nie było — zaproponuj `/zhp-generuj-podglad` i zakończ.
4. `git fetch origin` i sprawdź, czy gałąź zawiera najnowszy `origin/main`
   (`git merge-base --is-ancestor origin/main HEAD`). Jeśli nie — `git merge origin/main`, `npm run verify`,
   push i ponowny podgląd.

## 2. Potwierdzenie

Sprawdź, czy nie zostały placeholdery do uzupełnienia: `grep -rn "[[^]]*]" src/pages content site.config.ts`
(pomiń składnię Markdown linków i tablic YAML). Jeśli są, wypisz je użytkownikowi i zapytaj, czy publikować mimo to.

Pokaż użytkownikowi:
- listę commitów, które wejdą: `git log --oneline origin/main..HEAD`,
- zmienione pliki: `git diff --stat origin/main...HEAD`,
- adres podglądu (z ostatniego przebiegu, linia `ZHP_URL=`).

Zapytaj wprost: „Czy wypuścić te zmiany na produkcję?” i czekaj na wyraźne „tak”.

## 3. Merge

Z `gh` (preferowane — zostaje ślad w postaci pull requesta):

```bash
gh pr create --base main --head <gałąź> --title "<krótki opis>" --body "<lista zmian>"   # jeśli PR nie istnieje
gh pr merge <gałąź> --merge --delete-branch
```

Jeśli repo wymaga recenzji PR (branch protection) — merge się nie uda; podaj link do PR i wyjaśnij,
że osoba z uprawnieniami musi go zatwierdzić.

Bez `gh`: `git switch main && git pull --ff-only && git merge --no-ff <gałąź> && git push origin main`.
Nigdy nie używaj `--force`.

## 4. Deploy produkcyjny

Poczekaj na przebieg workflow dla nowego commita na `main` (jak w `/zhp-generuj-podglad`:
`gh run list --branch main --workflow deploy.yml --limit 1`, `gh run watch <id> --exit-status`,
`gh run view <id> --log | grep -Eo 'ZHP_URL=https://[^ ]+' | tail -1`).

## Zakończ

Podaj adres produkcyjny i krótką listę tego, co zostało opublikowane. Przełącz lokalnie na zaktualizowany
`main` (`git switch main && git pull --ff-only`). Jeśli deploy się nie udał — pokaż błąd z logu
(`gh run view <id> --log-failed`); poprzednia wersja strony nadal działa.
