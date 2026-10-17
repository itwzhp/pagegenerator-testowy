---
name: zhp-zbuduj-strone
description: Inicjalizuje stronę jednostki ZHP z szablonu. Zbiera dane (adres obecnej strony, kontakt, skład zespołów, drużyny), proponuje strukturę serwisu na bazie modelowej, dopytuje o braki, wypełnia site.config.ts, treści i podstrony, buduje stronę lokalnie. Użyj, gdy użytkownik chce zbudować lub przebudować stronę swojej jednostki.
argument-hint: Podaj tu wszystkie szczegóły, które mają być opublikowane na stronie. Możesz też podać adres istniejącej strony
---

# Zbuduj stronę jednostki

Prowadzisz instruktora ZHP (zwykle osobę nietechniczną) od szablonu do działającej strony.
Mów po polsku, prosto, bez żargonu. Pytaj o dane i nie wymyślaj ich.

Materiały pomocnicze (przeczytaj przed krokiem 3):
- [struktura.md](struktura.md): modelowa struktura serwisu, lista danych do zebrania i błędy do uniknięcia,
- `core/DESIGN.md`: marka, ton, typografia, logo, zdjęcia,
- `core/KOMPONENTY.md`: gotowe layouty, komponenty, kolekcje treści.

## 0. Sprawdź stan repo

- `git status`. Jeśli są niezapisane zmiany, zapytaj, czy je zachować, zanim zaczniesz.
- `npm ci`, jeśli nie ma `node_modules/`.
- Jeśli `site.config.ts` zawiera dane innej jednostki niż „Hufiec ZHP Przykładowo”, to jest przebudowa:
  zapytaj, co zachować.

## 1. Zbierz materiały

Użytkownik zwykle wkleja w wywołaniu wszystko, co ma (argumenty: $ARGUMENTS). Typowo: adres obecnej strony,
dane kontaktowe, nazwy drużyn, skład zespołów.

Jeśli podał adres obecnej strony, pobierz jej treść: stronę główną i najważniejsze podstrony (kontakt, o nas,
komenda, drużyny/jednostki, dla rodziców, aktualności, 1,5%, bazy). Wyciągnij z niej fakty. Pamiętaj, że stare
strony bywają nieaktualne: przy danych z datą (skład komendy, kadencja, liczby, koszty) zapytaj, czy są aktualne.
Treści-zaślepki („Lorem ipsum”, „Szczep 1”) pomijaj.

Zdjęcia przenoś tylko te, które użytkownik wskaże i do których potwierdzi zgody i autora. Zapisuj je do
`public/zdjecia/` po zmniejszeniu (max 2560 px, WebP, bez metadanych EXIF, bo zawierają m.in. GPS).

## 2. Zaproponuj strukturę i dopytaj o braki

Na podstawie [struktura.md](struktura.md) i zebranych materiałów przedstaw **jedną zwięzłą propozycję**:
- listę podstron (rdzeń + te moduły opcjonalne, na które jednostka ma materiał) z jednym zdaniem o zawartości,
- menu (max 7 pozycji) i główny przycisk (CTA),
- czego jeszcze brakuje, jako **jedno zbiorcze pytanie** (nie po jednym), według listy kontrolnej ze struktura.md.

Użytkownik może pominąć, dodać lub przemianować dowolne elementy. Modelowa struktura to punkt wyjścia.
Zapisz ustalenia (wybrane podstrony, czego nie publikujemy, preferowany ton) w `JEDNOSTKA.md`.

Zasady danych:
- Dane osobowe publikuj tylko za wyraźną zgodą (imię i nazwisko + funkcja to standard; prywatne telefony
  i adresy tylko po potwierdzeniu, a lepiej skrzynki funkcyjne).
- Wszystkie adresy mailowe muszą być w domenie zhp.pl, zhp.net.pl lub ich subdomenach (build to sprawdza).
  Jeśli użytkownik podał inny adres (np. na gmail), poproś o adres w domenie ZHP.
- Brakujące fakty zostaw jako widoczny placeholder „[…]” i wypisz je w podsumowaniu.

## 3. Zbuduj stronę

Szablon zawiera przykładową stronę fikcyjnego „Hufca ZHP Przykładowo”. Zamień ją na stronę jednostki:

1. **`site.config.ts`**: nazwa, typ, patron, opis, `nadrzedna`, `nawigacja`, `cta`, `zapisy`, `kontakt`,
   `daneFormalne`, `spolecznosci`, `jedenProcent`, `liczby`, ewentualnie `identyfikator` i `dofinansowanie`.
   Schemat z opisem pól: `core/lib/site-schema.ts`.
2. **Treści w `content/`**: usuń przykładowe pliki i dodaj własne:
   `jednostki/*.md`, `zespoly/*.yaml`, `aktualnosci/*.md` (przeniesione ze starej strony, jeśli użytkownik chce),
   `wydarzenia/*.md`. Pola: `core/KOMPONENTY.md` → „Kolekcje treści”.
3. **Podstrony w `src/pages/`**: dostosuj istniejące podstrony modelowe, usuń niewybrane (razem z pozycją
   w menu), dodaj nowe. Podstrony tekstowe buduj na `Podstrona.astro`. Teksty pisz od nowa w tonie ZHP
   (DESIGN.md §2–3), a nie kopiuj 1:1 ze starej strony. Usuń wszystkie placeholdery, które da się uzupełnić.
4. **Polityka prywatności i deklaracja dostępności**: uzupełnij propsy (daty, administrator danych,
   dostępność siedziby). Jeśli jednostka osadza mapę lub filmy, dopisz je w `uslugiZewnetrzne`.

Zasady podziału plików są w CLAUDE.md. **Nie edytuj** `core/` ani innych plików szablonu (blokuje to hook).
Własne sekcje buduj w `src/components/` z komponentów `core/` i tokenów `--zhp-*`.

## 4. Sprawdź

Uruchom `npm run verify` (astro check + testy + build). Jeśli coś się nie udało, przeczytaj błąd, popraw
i powtórz, zanim pokażesz wynik użytkownikowi. Błędy walidacji danych (np. e-mail spoza domeny ZHP,
zdjęcie bez autora) wyjaśnij użytkownikowi prostymi słowami.

Przejdź checklistę z DESIGN.md §13. Wypisz pozostałe placeholdery: `grep -rn "\[" src content site.config.ts`.

Następnie pokaż stronę lokalnie (`npm run dev`, domyślnie http://localhost:4321). Jeśli pracujesz w chmurze
i nie da się pokazać localhosta, przejdź od razu do podglądu online.

## 5. Zakończ

Podsumuj w kilku punktach, co powstało (podstrony, liczba drużyn, zespołów i wpisów) i jakich danych
nadal brakuje. Zaproponuj:
- poprawki w rozmowie (pętla feedback → poprawki),
- `/zhp-generuj-podglad`, żeby zobaczyć stronę online na adresie testowym,
- `/zhp-napisz-aktualnosc` i `/zhp-dodaj-wydarzenie` do bieżącego prowadzenia strony.

Nie wypuszczaj na produkcję w ramach tego skilla. Służy do tego `/zhp-wgraj-zmiany`.
