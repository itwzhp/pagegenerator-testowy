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
| `/zhp-napisz-aktualnosc` | nowy wpis w Aktualnościach (z relacji, notatek, zdjęć) |
| `/zhp-dodaj-wydarzenie` | nowe wydarzenie w kalendarzu (biwak, rajd, obóz, uroczystość) |
| `/zhp-generuj-podglad` | commit na gałęzi roboczej, push i adres testowy (nieprodukcyjny) |
| `/zhp-wgraj-zmiany` | merge do `main`, czyli publikacja na produkcji (zawsze po potwierdzeniu) |
| `/zhp-aktualizuj-szablon` | merge nowej wersji szablonu z upstream i rozwiązanie konfliktów |

## Własność plików: najważniejsza zasada

Repo jednostki jest forkiem szablonu. Aktualizacje szablonu przychodzą przez `git merge`, więc pliki
szablonu muszą pozostać nietknięte. Inaczej każda aktualizacja kończy się konfliktami.

**Szablon (upstream).** Nie edytuj. Hook `.claude/hooks/chron-szablon.mjs` blokuje takie zmiany.
- `core/` — layouty, komponenty, design tokeny, fonty, logotypy, schematy danych, `DESIGN.md`, `KOMPONENTY.md`
- `.claude/`, `.github/`, `CLAUDE.md`
- `astro.config.mjs`, `wrangler.jsonc`, `tsconfig.json`, `zhp-template.json`
- `src/content.config.ts` — tylko re-eksport schematów kolekcji z `core/` (Astro wymaga go w `src/`)

**Jednostka.** Tu pracujesz.
- `site.config.ts` — dane jednostki: nazwa, menu, kontakt, dane formalne, 1,5%, media społecznościowe.
  Schemat: `core/lib/site-schema.ts`
- `src/pages/` — podstrony (routing plikowy Astro)
- `src/components/` — własne sekcje i komponenty
- `content/` — treści: `aktualnosci/`, `wydarzenia/`, `jednostki/` (Markdown), `zespoly/` (YAML)
- `public/` — pliki statyczne serwowane bez zmian (logo, favicon, zdjęcia)
- `JEDNOSTKA.md` — notatki i ustalenia jednostki dla agenta

**Wspólne.** Zmieniaj ostrożnie.
- `package.json` / `package-lock.json` — zależność dodawaj tylko wtedy, gdy jest naprawdę potrzebna.
  Przy aktualizacji szablonu wersje bazowe pochodzą z upstream.

Jeśli zadanie wydaje się wymagać zmiany w `core/`, zbuduj rozwiązanie w `src/` (np. własny komponent
opakowujący komponent z `core/`). Gdy to niemożliwe, powiedz użytkownikowi, że to zmiana dla opiekunów
szablonu.

## Marka i wygląd

Strona ma wyglądać i brzmieć jak ZHP. Źródłem zasad jest [core/DESIGN.md](core/DESIGN.md) (na podstawie
Katalogu Identyfikacji Wizualnej ZHP). Przeczytaj go, zanim zaczniesz projektować sekcję albo pisać
dłuższy tekst. Katalog gotowych klocków i mapowanie DESIGN.md na kod: [core/KOMPONENTY.md](core/KOMPONENTY.md).

Najważniejsze zasady:
- Layout `@core/layouts/Strona.astro` albo `Podstrona.astro`, komponenty z `@core/components/`.
- Style **wyłącznie** na zmiennych `--zhp-*` z `core/styles/tokens.css` (nazwa = token z DESIGN.md
  z prefiksem, np. `surface-brand` → `--zhp-surface-brand`). Bez własnych kolorów, fontów, cieni,
  gradientów i zaokrąglonych kart.
- Biały dominuje, zielony jest jedynym mocnym kolorem. Biały tekst na `green` tylko od 32px; mniejszy
  tekst na zielonym tle to `surface-brand-strong`. Linki zawsze podkreślone.
- Tytuły sekcji pisz normalnie, bo WERSALIKI robi CSS. Nagłówki to polskie zdania, nie Title Case.
- Logo: tylko oficjalne pliki przez `<Identyfikator>`. Nigdy nie rysuj, nie przerabiaj i nie składaj
  identyfikatora jednostki. Gotowy plik jednostki trafia do `public/` i `identyfikator` w `site.config.ts`.
- Swoboda układu jest pełna: nowe sekcje, siatki i podstrony są w porządku, o ile trzymają się powyższego.
- Dane jednostki importuj z `@core/lib/site`, treści przez `@core/lib/tresci` (bez szkiców, posortowane).

## Treści

- Pisz po polsku, do jednego czytelnika na „Ty”, pozytywnie i konkretnie (DESIGN.md §2–3). Nazw harcerskich
  (drużyna, zbiórka, sprawność, hufiec…) nie tłumacz ani nie zastępuj.
- **Nie wymyślaj faktów**: liczb, dat, kwot, nazwisk, numerów KRS i kont. Gdy ich brakuje, zostaw widoczny
  placeholder w nawiasach kwadratowych, np. „[kwota składki]”, i zapytaj użytkownika.
- Typografia: cudzysłów „…”, półpauza „ – ”, zakresy „6–10 lat” bez spacji, daty „16 października 2026”.
  Bez emoji w treści i interfejsie. CTA zaczyna się od czasownika, ma max 3–4 słowa.
- Dane osobowe: imię i nazwisko + funkcja tylko za zgodą. Prywatne telefony i adresy tylko po wyraźnym
  potwierdzeniu, a lepiej skrzynki funkcyjne. E-maile wyłącznie w domenach `zhp.pl` i `zhp.net.pl`
  (pilnuje tego build).
- Przed publikacją sprawdź checklistę z DESIGN.md §13.

## Zdjęcia (etap PoC)

- Wstawiaj je wyłącznie komponentem `<Foto>` (albo polem `zdjecie` w treściach), nigdy przez `<img>` z adresem.
  Dzięki temu zdjęcia da się później przenieść do zewnętrznego magazynu bez zmian w treściach.
- Każde zdjęcie ma polski opis (`alt`) i autora („fot. Imię Nazwisko / ZHP”). Publikuj tylko prawdziwe
  zdjęcia ZHP i tylko za zgodą osób na nich (za osoby niepełnoletnie zgadzają się rodzice). Nigdy nie
  używaj zdjęć wygenerowanych przez AI ani zdjęć ze stocków udających harcerzy. Bez zdjęcia użyj bloku
  koloru, co komponenty robią same.
- Pliki leżą w `public/zdjecia/` (bez Git LFS). Przed dodaniem zmniejsz je do max 2560 px, zapisz jako WebP
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
