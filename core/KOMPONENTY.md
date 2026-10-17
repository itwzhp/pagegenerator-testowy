# Komponenty, layouty i dane szablonu

Katalog dla agenta: co jest w `core/`, kiedy tego używać i jak przekłada się to na [DESIGN.md](DESIGN.md).
Plik należy do szablonu (upstream). Zasady marki (ton, kolory, logo, zdjęcia) są w DESIGN.md, a tu jest
tylko to, jak je zastosować w kodzie.

## DESIGN.md a szablon

| W DESIGN.md | W szablonie |
|---|---|
| token `green`, `surface-brand`, `space-4`… | zmienna CSS `--zhp-green`, `--zhp-surface-brand`, `--zhp-space-4` (`core/styles/tokens.css`) |
| style tekstu `display`, `h1`…`h4`, `lead`, `eyebrow`, `meta`, `caption` | klasy `.zhp-display`, `.zhp-h1`…, `.zhp-lead`, `.zhp-eyebrow`, `.zhp-meta`, `.zhp-caption`; `h1`–`h4` mają je domyślnie |
| `components/bundle.css` | `core/styles/komponenty.css` (te same klasy `zhp-*`) + komponenty Astro poniżej |
| `assets/Logos/…`, `assets/Znaki/…` | `core/assets/logo/`, `core/assets/znaki/`; używaj przez `<Identyfikator>` i `<ZnakGrupy>` |
| `fonts/` | `core/assets/fonty/`, ładowane automatycznie przez layout |
| identyfikator jednostki `jednostka-<nazwa>-<kolor>.svg` | pliki w `public/` + `identyfikator` w `site.config.ts` |

Gotowe klasy pomocnicze: `.zhp-kontener` (wyśrodkowana treść 1200px), `.zhp-sekcja` / `.zhp-sekcja--tint`,
`.zhp-tekst` (max 70 znaków), `.zhp-proza` (treść z Markdown), `.zhp-siatka` / `--2` / `--4` (siatka kart),
`.zhp-przyciski` (rząd przycisków), `.zhp-sr-only`.

## Layouty (`core/layouts/`)

| Layout | Kiedy | Najważniejsze propsy |
|---|---|---|
| `Strona.astro` | strona główna i strony o własnym układzie | `tytul?`, `opis?`, `obraz?`, `dofinansowanie?` |
| `Podstrona.astro` | podstrony z pasem tytułowym (O nas, Kontakt, Dla rodziców…) | `tytul`, `wstep?`, `proza?`, `opis?`, slot `pod` (sekcje na pełną szerokość) |

## Komponenty podstawowe (`core/components/`)

| Komponent | DESIGN.md | Użycie |
|---|---|---|
| `Przycisk` | Button | `<Przycisk href="/kontakt">Napisz do nas</Przycisk>`; `wariant="drugorzedny"` lub `"odwrocony"` (na zielonym). Jeden główny na widok. |
| `PasTytulowy` | SectionBand | tytuł podstrony (robi to `Podstrona`). Zawsze **poza** `.zhp-kontener`. Max jeden na ekran. |
| `Srodtytul` | SubHeading | tytuł sekcji z zieloną kreską; `rozmiar="maly"` dla podsekcji. |
| `Sekcja` | – | `<Sekcja tytul="Aktualności" tlo="tint">…</Sekcja>`: oddech pionowy, kontener i śródtytuł. |
| `Wyroznienie` | Highlight | jedno kluczowe zdanie (misja, ważna zasada). Max jedno na ekran. |
| `ListaZnakow` | Checklist | `pozycje={[...]}`, `rodzaj="tak" / "nie" / "moze"`, `tytul?`. |
| `Foto` | Figure | **jedyny sposób na zdjęcie**: `zdjecie={{ src, alt, autor }}`, `kadr="3x2" / "16x9" / "oryginal"`. |
| `KartaWpisu` | NewsCard | karta z linkiem: `href`, `tytul`, `nadtytul?`, `zajawka?`, `meta?`, `zdjecie?`. |
| `ZnakGrupy` | GroupBadge | `grupa="zuchy"`, `wariant="bialy"` na ciemnym tle, `wiek={false}`. |
| `PasekInfo` | InfoBar | jedno zdanie + `akcja={{ etykieta, href }}`. |
| `Identyfikator` | logo | nagłówek i stopka robią to same; ręcznie tylko w wyjątkowych układach. |

## Sekcje gotowe

| Komponent | Dane | Uwagi |
|---|---|---|
| `Hero` | propsy | strona główna: `tytul`, `nadtytul`, `wstep`, `przyciski` (max 2), `szybkieLinki` (max 4 pytania), `zdjecie?` |
| `GrupyWiekowe` | stałe ZHP | zuchy, harcerze, harcerze starsi i wędrownicy z wiekiem; `grupy`, `opisy`, `linkDo` |
| `ListaAktualnosci` | kolekcja `aktualnosci` | `wpisy={await pobierzAktualnosci(3)}`, `ukryjPusta` |
| `ListaWydarzen` | kolekcja `wydarzenia` | `wydarzenia={await pobierzWydarzenia('nadchodzace')}`, `zOpisem`, `pusta` |
| `ListaJednostek` / `KartaJednostki` | kolekcja `jednostki` | `grupuj="grupa" / "miejscowosc" / "szczep" / "brak"` |
| `Zespol` | kolekcja `zespoly` | komenda, komisja rewizyjna, zespoły |
| `DaneKontaktowe` | `site.kontakt`, `site.daneFormalne` | `formalne={false}` ukrywa NIP/KRS/konta |
| `JedenProcent` | `site.jedenProcent` | KRS + cel szczegółowy zawsze razem; `wiecej="/wesprzyj"` |
| `Liczby` | `site.liczby` | zawsze z datą „stan na” |
| `Dofinansowanie` | `site.dofinansowanie` | włączany przez `<Strona dofinansowanie>` na stronach o działaniach dofinansowanych |

## Widoki (`core/widoki/`)

Całe strony, które jednostka tylko „wpina” cienkim plikiem w `src/pages/`:

- `Aktualnosc`: pojedynczy wpis; w `src/pages/aktualnosci/[...slug].astro` razem z `sciezkiAktualnosci`.
- `PolitykaPrywatnosci`: propsy `aktualizacja`, `administrator?`, `uslugiZewnetrzne?`.
- `DeklaracjaDostepnosci`: propsy `publikacja`, `aktualizacja`, `sporzadzenie`, `osobaKontaktowa?`, `wylaczenia?`, `architektoniczna?`.

## Dane

- `@core/lib/site`: zwalidowane `site.config.ts` (`site.nazwa`, `site.kontakt`…). Schemat: `core/lib/site-schema.ts`.
- `@core/lib/tresci`: `pobierzAktualnosci(limit?)`, `pobierzWydarzenia('nadchodzace' | 'minione' | 'wszystkie', limit?)`,
  `pobierzJednostki()`, `pobierzZespoly()`, `sciezkiAktualnosci`. Pomijają szkice i sortują. Nie używaj `getCollection` wprost.
- `@core/lib/format`: `formatujDate` („16 października 2026”), `formatujZakres`, `hrefTelefonu`, `bezSierotek`, `osobaZeStopniem`.
- `@core/lib/grupy`: `GRUPY` (nazwa, wiek, token koloru), `KLUCZE_GRUP`.

### Kolekcje treści (`content/`, schematy w `core/content/kolekcje.ts`)

| Kolekcja | Pliki | Pola obowiązkowe |
|---|---|---|
| `aktualnosci` | `content/aktualnosci/RRRR-MM-DD-slug.md` | `tytul`, `data`, `zajawka` (≤ 160 znaków) |
| `wydarzenia` | `content/wydarzenia/RRRR-MM-DD-slug.md` | `tytul`, `od` (`do`, `typ`, `miejsce`, `grupy`, `zapisy` opcjonalne) |
| `jednostki` | `content/jednostki/<slug>.md` | `nazwa`, `rodzaj`, `grupy` (zalecane: `zbiorki.termin` i `zbiorki.miejsce`) |
| `zespoly` | `content/zespoly/<slug>.yaml` | `nazwa`, `czlonkowie[]` (`stopien?`, `imie`, `funkcja`) |

Wspólne reguły walidacji (błąd builda, gdy niespełnione):
- e-maile tylko w domenach `zhp.pl`, `zhp.net.pl` i ich subdomenach,
- zdjęcia: `src` to ścieżka w `public/` zaczynająca się od `/`, `alt` i `autor` obowiązkowe,
- linki zewnętrzne tylko `https://`.

## Własny komponent jednostki

Gdy żaden komponent nie pasuje, zbuduj własny w `src/components/`: złóż go z komponentów powyżej
albo napisz go na tokenach `--zhp-*` (bez własnych kolorów, fontów, cieni i zaokrągleń). Jeśli wygląda
na przydatny dla wszystkich jednostek, zaproponuj przeniesienie do szablonu.
