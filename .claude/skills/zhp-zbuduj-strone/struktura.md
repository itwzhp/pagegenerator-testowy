# Modelowa struktura strony jednostki

To punkt wyjścia, nie obowiązek. Przedstaw go użytkownikowi, a potem dopasuj: pomiń to, czego jednostka
nie ma albo nie chce pokazywać, dodaj podstrony spoza listy, zmień nazwy i kolejność.

Podstawy: DESIGN.md §11 (wzorzec strony jednostki) i przegląd stron hufców Tarnowskie Góry, Kartuzy
i Białystok (październik 2026). Wszystkie trzy działają na wspólnym szablonie ZHP, więc mają podobny szkielet.
Przegląd pokazał, co działa, a czego brakuje.

## Dla kogo jest strona (kolejność ważności)

1. **Rodzice** szukający drużyny dla dziecka: gdzie, kiedy, ile kosztuje, czy bezpiecznie, do kogo pisać.
2. **Harcerze i kadra**: kalendarz, aktualności, kontakty do komendy i zespołów.
3. **Partnerzy, darczyńcy, media**: kim jesteśmy, dane formalne, 1,5%, kontakt.

Każda decyzja o strukturze powinna odpowiadać na pytanie: czy rodzic w minutę znajdzie drużynę i kontakt?

## Rdzeń (zalecany dla każdej jednostki)

| Podstrona | Adres | Co zawiera | Źródło danych |
|---|---|---|---|
| Strona główna | `/` | hero (kim jesteśmy, gdzie, dla kogo + CTA „Zapisz dziecko”) i 3–4 szybkie linki-pytania („Ile to kosztuje?”, „Gdzie są zbiórki?”), grupy wiekowe, 3 ostatnie aktualności (sekcja znika, gdy brak wpisów), najbliższe wydarzenia, pasek 1,5%, liczby z datą stanu | komponenty + kolekcje |
| Drużyny i gromady | `/jednostki` | każda jednostka: nazwa, grupa metodyczna, **miejsce i termin zbiórek**, kadra (stopień + imię + funkcja, za zgodą), e-mail funkcyjny, Facebook/Instagram; grupowanie wg grupy metodycznej, miejscowości lub szczepu | `content/jednostki/` |
| Dla rodziców | `/dla-rodzicow` | jak zapisać (kroki), grupy wiekowe, **koszty** (składka z rozbiciem, w tym NNW; koszty biwaków i obozów), bezpieczeństwo (przeszkolona kadra, polityka ochrony dzieci), mundur, co na pierwszą zbiórkę, FAQ | tekst od jednostki |
| Aktualności | `/aktualnosci` + wpisy | relacje, zapowiedzi, komunikaty | `content/aktualnosci/` |
| Kalendarz | `/wydarzenia` | nadchodzące biwaki, rajdy, obozy i uroczystości z datą, miejscem, grupami i linkiem do zapisów; niżej kilka minionych | `content/wydarzenia/` |
| Komenda i zespoły | `/komenda` | komenda (funkcje ze stopniami, kadencja, e-mail funkcyjny), komisja rewizyjna, zespoły i kluby (KSI, promocja, kwatermistrzostwo…) | `content/zespoly/` |
| Kontakt | `/kontakt` | e-mail, telefon, adres siedziby + link do mapy, **godziny dyżurów**, adres do faktur, IOD; dane formalne: NIP, REGON, KRS, konta (osobno podstawowe, składkowe, darowizny) | `site.config.ts` |
| Polityka prywatności | `/polityka-prywatnosci` | gotowy widok; uzupełnij administratora danych | `core/widoki` |
| Deklaracja dostępności | `/deklaracja-dostepnosci` | gotowy widok; uzupełnij daty i dostępność siedziby | `core/widoki` |

## Moduły opcjonalne (zaproponuj, gdy jednostka ma materiał)

| Moduł | Adres (propozycja) | Kiedy warto |
|---|---|---|
| O nas | `/o-nas` | krótka historia, obszar działania (gminy, miejscowości), misja ZHP, liczby „stan na” |
| Patron / bohater | `/patron` | jednostka ma patrona: biografia, oś czasu, związek z jednostką (przy dłuższym tekście osobna podstrona, przy krótkim sekcja w „O nas”) |
| Wesprzyj nas / 1,5% | `/wesprzyj` | KRS + cel szczegółowy zawsze razem, konto na darowizny, inne formy wsparcia |
| Baza / ośrodek / harcówka | `/baza` lub `/bazy/<nazwa>` | lokalizacja z odległościami (PKP, sklep, kąpielisko), pojemność, wyposażenie, kontakt do komendanta bazy, cennik lub informacja „cena na zapytanie” |
| Obóz / akcja letnia | `/oboz` | terminy, koszt, terminy wpłat, karta kwalifikacyjna, lista rzeczy, kontakt do komendanta obozu (lub wydarzenie w kalendarzu, gdy wystarczy) |
| Dokumenty do pobrania | `/dokumenty` | deklaracja członkowska, zgody, karta kwalifikacyjna, faktury i zwroty za wypoczynek; pliki PDF w `public/dokumenty/` |
| Szczepy | `/szczepy/<nazwa>` | duże szczepy z własną tożsamością (alternatywa: grupowanie `szczep` na `/jednostki`) |
| Partnerzy | `/partnerzy` lub sekcja | lokalni partnerzy (gmina, nadleśnictwo, szkoły), nie karuzela partnerów centralnych |
| Kształcenie | `/ksztalcenie` | kursy przybocznych, drużynowych, próby instruktorskie, KSI |
| Hala zasłużonych / historia | `/historia` | jednostki z bogatą historią i archiwum |
| Dofinansowanie NIW | pasek na podstronach | tylko na stronach o działaniach dofinansowanych, oficjalny plik + stała formułka (`<Strona dofinansowanie>`) |

## Menu

- Max 7 pozycji w `nawigacja` + jedno CTA (`cta`, zwykle „Zapisz dziecko” lub „Dołącz do nas”).
- Proponowana kolejność: Aktualności, Kalendarz, O nas, Drużyny, Komenda, Dla rodziców, Kontakt.
- Bez podmenu (szablon ich nie ma): mniej poziomów = szybsze znalezienie informacji. Podstrony z drugiego
  rzędu (patron, baza, dokumenty) linkuj z treści i ze stopki (`linki`).

## Czego unikać (błędy z przeglądu)

- **Zaślepki na produkcji**: „Lorem ipsum”, „Szczep 1/2/3”, linki `#`, linki do szkiców, puste sekcje i nagłówki.
  Placeholder „[…]” jest dopuszczalny tylko na podglądzie. Przed `/zhp-wgraj-zmiany` wypisz użytkownikowi
  wszystkie, które zostały (`grep -rn "\[" src content site.config.ts`).
- **Nieaktualność**: daty „stan na” przy liczbach, rok w stopce generuje szablon, minione wydarzenia znikają
  same z sekcji „Najbliższe” (przy każdym buildzie), sekcja aktualności znika, gdy nie ma wpisów.
- **Braki dla rodziców**: zawsze termin i miejsce zbiórek przy drużynie, koszt, kontakt; formularz zewnętrzny
  tylko z opisem, do czego służy.
- **1,5% bez KRS albo celu**: komponent wymaga obu.
- **Link „Chorągiew” prowadzący na zhp.pl**: `nadrzedna.url` ma wskazywać stronę chorągwi.
- **Dane osobowe**: preferuj skrzynki funkcyjne (`druzyna@hufiec.zhp.pl`) zamiast prywatnych telefonów.

## Dane do zebrania (lista kontrolna wywiadu)

- [ ] pełna nazwa (oficjalna pisownia), typ, patron, jednostka nadrzędna (nazwa + adres strony)
- [ ] gotowy identyfikator jednostki z repozytorium e-zhp (SVG kolor + biały)? Jeśli nie ma: identyfikator ZHP + nazwa tekstem
- [ ] 1–2 zdania „kim jesteśmy i gdzie działamy”, obszar działania
- [ ] kontakt: e-mail funkcyjny, telefon, adres, dyżury, link do mapy, adres do faktur, IOD
- [ ] dane formalne: NIP, REGON, KRS, konta
- [ ] 1,5%: cel szczegółowy (KRS ZHP sprawdź w aktualnych materiałach kampanii)
- [ ] media społecznościowe
- [ ] komenda i zespoły: funkcje, stopnie, imiona i nazwiska (za zgodą), kadencja, e-maile funkcyjne
- [ ] drużyny i gromady: nazwa, grupa, szczep, miejscowość, zbiórki (gdzie, kiedy), kadra, kontakt, social
- [ ] dla rodziców: kroki zapisu, składka i jej rozbicie, koszty wyjazdów, mundur, bezpieczeństwo
- [ ] najbliższe wydarzenia, ostatnie aktualności (do przeniesienia ze starej strony)
- [ ] liczby (członkowie, jednostki, instruktorzy) z datą stanu
- [ ] zdjęcia: które, kto jest autorem, czy są zgody
- [ ] dofinansowanie NIW: czy dotyczy, oficjalny plik paska
