---
name: zhp-zbuduj-strone
description: Inicjalizuje stronę jednostki ZHP z szablonu — zbiera dane (adres obecnej strony, kontakt, skład zespołów), dopytuje o braki, wypełnia site.config.ts i treści, buduje stronę lokalnie. Użyj, gdy użytkownik chce zbudować lub przebudować stronę swojej jednostki.
argument-hint: Podaj tu wszystkie szczegóły, które mają być opublikowane na stronie. Możesz też podać adres istniejącej strony
---

# Zbuduj stronę jednostki

Prowadzisz instruktora ZHP (zwykle osobę nietechniczną) od pustego szablonu do działającej strony.
Mów po polsku, prosto, bez żargonu. Pytaj o dane — nie wymyślaj ich.

## 0. Sprawdź stan repo

- `git status` — jeśli są niezapisane zmiany, zapytaj, czy je zachować, zanim zaczniesz.
- `npm ci`, jeśli nie ma `node_modules/`.
- Jeśli `site.config.ts` zawiera już dane innej jednostki niż „Hufiec ZHP Przykładowo”, to jest przebudowa —
  zapytaj, co zachować.

## 1. Zbierz materiały

Użytkownik zwykle wkleja w wywołaniu wszystko, co ma (argumenty: $ARGUMENTS). Typowo:
adres obecnej strony, dane kontaktowe, nazwy drużyn, skład zespołów.

Jeśli podał adres obecnej strony — pobierz jej treść (strona główna + najważniejsze podstrony: kontakt,
o nas, drużyny, zespoły) i wyciągnij z niej fakty. Zdjęcia przenoś tylko te, które użytkownik wskaże;
zapisuj je do `public/` po zmniejszeniu (max 2560 px, WebP, bez metadanych EXIF — zawierają m.in. GPS).

## 2. Dopytaj o braki

Zestaw listę brakujących lub niepewnych informacji i zapytaj o nie **jednym zbiorczym pytaniem**
(nie po jednym). Typowo dla hufca:
- pełna nazwa i typ jednostki, krótki opis (1–2 zdania),
- kontakt: e-mail, telefon, adres siedziby,
- komendant/ka i skład komendy, KSI i inne zespoły,
- lista drużyn/gromad/szczepów,
- linki (Facebook, Instagram, strona chorągwi).

Dane osobowe: publikuj tylko to, na co użytkownik wyraźnie się zgodził (imię i nazwisko + funkcja to
standard; prywatne telefony i adresy — tylko po potwierdzeniu).

Wszystkie adresy mailowe powinny być w domenie zhp.pl, zhp.net.pl lub ich subdomenach.
Jeśli użytkownik podał inny adres (np. na gmail) poproś o adres w domenie ZHP.

## 3. Zbuduj stronę

Zasady podziału plików są w CLAUDE.md — w skrócie:
- dane jednostki → `site.config.ts` (schemat: `core/lib/site-schema.ts`),
- podstrony → `src/pages/`, własne sekcje → `src/components/`, treści → `content/`, pliki statyczne → `public/`,
- **nie edytuj** `core/` ani innych plików szablonu (blokuje to hook). Używaj komponentów i layoutów z `core/`,
  a własne sekcje buduj na tokenach z `core/styles/tokens.css` (żadnych własnych kolorów i fontów).

## 4. Sprawdź

Uruchom `npm run verify` (astro check + testy + build). Jeśli coś się nie udało — przeczytaj błąd,
popraw i powtórz, zanim pokażesz wynik użytkownikowi.

Następnie pokaż stronę lokalnie (`npm run dev`, domyślnie http://localhost:4321). Jeśli pracujesz w chmurze
i nie da się pokazać localhosta — przejdź od razu do podglądu online.

## 5. Zakończ

Podsumuj w kilku punktach, co powstało i jakich danych nadal brakuje. Zaproponuj:
- poprawki w rozmowie (pętla feedback → poprawki),
- `/zhp-generuj-podglad`, żeby zobaczyć stronę online na adresie testowym.

Nie wypuszczaj na produkcję w ramach tego skilla — służy do tego `/zhp-wgraj-zmiany`.
