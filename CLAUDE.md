# Strona jednostki ZHP

Statyczna strona jednostki Związku Harcerstwa Polskiego, zbudowana w Astro i hostowana jako statyczne
assety na Cloudflare Workers. Brak backendu: żadnych formularzy, wyszukiwarek ani komentarzy.
Każda zmiana treści to commit.

Ten plik należy do szablonu (upstream). Notatki konkretnej jednostki są w @JEDNOSTKA.md.

## Z kim rozmawiasz

Zwykle z instruktorem lub instruktorką ZHP, często osobą nietechniczną. Mów po polsku, prosto,
bez żargonu. Pytaj o fakty (skład zespołów, kontakty, daty) i nie wymyślaj ich.

## Skille

| Skill | Do czego |
|---|---|
| `/zhp-zbuduj-strone` | inicjalizacja albo przebudowa strony z materiałów użytkownika |
| `/zhp-generuj-podglad` | commit na gałęzi roboczej, push i adres testowy (nieprodukcyjny) |
| `/zhp-wgraj-zmiany` | merge do `main`, czyli publikacja na produkcji (zawsze po potwierdzeniu) |
| `/zhp-aktualizuj-szablon` | merge nowej wersji szablonu z upstream i rozwiązanie konfliktów |

## Własność plików: najważniejsza zasada

Repo jednostki jest forkiem szablonu. Aktualizacje szablonu przychodzą przez `git merge`, więc pliki
szablonu muszą pozostać nietknięte. Inaczej każda aktualizacja kończy się konfliktami.

**Szablon (upstream).** Nie edytuj. Hook `.claude/hooks/chron-szablon.mjs` blokuje takie zmiany.
- `core/` — layouty, komponenty, design tokeny, schematy danych
- `.claude/`, `.github/`, `CLAUDE.md`
- `astro.config.mjs`, `wrangler.jsonc`, `tsconfig.json`, `zhp-template.json`

**Jednostka.** Tu pracujesz.
- `site.config.ts` — dane jednostki: nazwa, typ, opis, kontakt, linki. Schemat: `core/lib/site-schema.ts`
- `src/pages/` — podstrony (routing plikowy Astro)
- `src/components/` — własne sekcje i komponenty
- `content/` — treści (Markdown/JSON), np. aktualności i wydarzenia
- `public/` — pliki statyczne serwowane bez zmian (logo, favicon, zdjęcia)
- `JEDNOSTKA.md` — notatki i ustalenia jednostki dla agenta

**Wspólne.** Zmieniaj ostrożnie.
- `package.json` / `package-lock.json` — zależność dodawaj tylko wtedy, gdy jest naprawdę potrzebna.
  Przy aktualizacji szablonu wersje bazowe pochodzą z upstream.

Jeśli zadanie wydaje się wymagać zmiany w `core/`, zbuduj rozwiązanie w `src/` (np. własny komponent
opakowujący komponent z `core/`). Gdy to niemożliwe, powiedz użytkownikowi, że to zmiana dla opiekunów
szablonu.

## Wygląd

- Używaj layoutu `@core/layouts/Strona.astro` i komponentów z `@core/components/`.
- Własne style buduj **wyłącznie** na zmiennych z `core/styles/tokens.css` (`--zhp-*`). Bez własnych
  kolorów hex/rgb i bez własnych fontów, bo spójność z identyfikacją wizualną ZHP jest wymogiem.
- Swoboda układu jest pełna: nowe sekcje, siatki i podstrony są w porządku, o ile trzymają się tokenów.
- Dane jednostki importuj z `@core/lib/site` (wersja zwalidowana), nie bezpośrednio z `site.config.ts`.

## Zdjęcia (etap PoC)

Zdjęcia leżą w `public/` (bez Git LFS). Przed dodaniem zmniejsz je do max 2560 px, zapisz jako WebP
i usuń metadane EXIF (zawierają m.in. lokalizację GPS). Pojedynczy plik nie powinien przekraczać 1 MB.

## Polecenia

```bash
npm ci            # instalacja zależności
npm run dev       # podgląd lokalny: http://localhost:4321
npm run verify    # astro check + testy + build; uruchom przed każdym pushem
```

## Wdrożenia

GitHub Actions (`.github/workflows/deploy.yml`) buduje każdy push:
- `main` → produkcja (`wrangler deploy`),
- inne gałęzie → podgląd: wersja Workera z aliasem o nazwie gałęzi.

Adres trafia do logu jako `ZHP_URL=…` i do podsumowania przebiegu. Nazwa Workera = nazwa repozytorium (np. `pagegenerator-hufiec-x`).
Na `main` nie commituj bezpośrednio. Publikacja idzie wyłącznie przez `/zhp-wgraj-zmiany`.
Nigdy nie używaj `git push --force`.
