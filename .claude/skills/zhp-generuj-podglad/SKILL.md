---
name: zhp-generuj-podglad
description: Wypuszcza bieżące zmiany na testowy (nieprodukcyjny) adres Cloudflare i wypisuje URL podglądu. Zapisuje zmiany jako commit na gałęzi roboczej, pushuje ją i czeka na GitHub Actions. Użyj, gdy użytkownik chce zobaczyć stronę online przed publikacją.
---

# Generuj podgląd

Podgląd = build z gałęzi innej niż `main`. Workflow `.github/workflows/deploy.yml` wgrywa go jako wersję
Workera z aliasem nazwanym jak gałąź (produkcja pozostaje nietknięta).

## 1. Sprawdź zmiany

1. `npm run verify` — nie pushuj czegoś, co się nie buduje. Błędy popraw przed dalszymi krokami.
2. `git status` i `git diff --stat` — opisz użytkownikowi prostymi słowami, co zostanie wysłane.

## 2. Gałąź robocza

- Jeśli jesteś na `main`: utwórz gałąź `podglad/<krotki-opis>` (małe litery, myślniki, bez polskich znaków),
  np. `podglad/sklad-ksi`. Na `main` nigdy nie commituj w tym skillu.
- Jeśli jesteś już na innej gałęzi (np. `aktualizacja-szablonu-…`) — zostań na niej.

## 3. Commit i push

1. Jeśli są niezapisane zmiany: `git add -A` i commit z opisem po polsku (co i dlaczego, 1 linia).
   Upewnij się, że w commicie nie ma sekretów (`.env`, tokeny) ani dużych plików (> 1 MB).
2. `git push -u origin <gałąź>`.

## 4. Poczekaj na deploy i podaj adres

Jeśli dostępne jest `gh` (sprawdź `gh auth status`):

```bash
sha=$(git rev-parse HEAD)
# run pojawia się po kilku sekundach od pusha
gh run list --commit "$sha" --workflow deploy.yml --json databaseId,status --limit 1
gh run watch <databaseId> --exit-status
gh run view <databaseId> --log | grep -Eo 'ZHP_URL=https://[^ ]+' | tail -1
```

Podaj użytkownikowi adres podglądu (część po `ZHP_URL=`).

Jeśli `gh` nie jest dostępne: podaj link do zakładki Actions repozytorium
(`https://github.com/<właściciel>/<repo>/actions`) i wyjaśnij, że adres podglądu jest w podsumowaniu
przebiegu („👀 Podgląd: …”).

## Gdy coś pójdzie nie tak

- Run zakończony błędem — `gh run view <id> --log-failed`, wyjaśnij przyczynę, popraw, zrób nowy commit i push.
- W logu „Brak konfiguracji Cloudflare” — repo nie ma sekretu `CLOUDFLARE_API_TOKEN` albo zmiennej
  `CLOUDFLARE_ACCOUNT_ID`. Konfiguruje je Wydział IT ZHP — przekaż użytkownikowi, żeby się z nim skontaktował.
- Błąd uwierzytelnienia (401/403, „Authentication error”) albo „Worker nie istnieje” — token wygasł, został
  cofnięty albo Worker jednostki nie został jeszcze założony. Nie próbuj tego obchodzić; poproś użytkownika
  o kontakt z Wydziałem IT i podaj nazwę repozytorium oraz treść błędu.

## Zakończ

Podaj URL, przypomnij, że to wersja testowa, i zaproponuj: dalsze poprawki albo `/zhp-wgraj-zmiany`,
gdy wszystko wygląda dobrze.
