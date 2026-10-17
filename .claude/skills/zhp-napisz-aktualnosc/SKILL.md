---
name: zhp-napisz-aktualnosc
description: Pisze nowy wpis w Aktualnościach strony jednostki ZHP w tonie i stylu marki ZHP: z relacji, notatek, maila lub zdjęć od użytkownika. Tworzy plik w content/aktualnosci/, dodaje zdjęcia, sprawdza build. Użyj, gdy użytkownik chce dodać aktualność, relację, zapowiedź lub komunikat.
argument-hint: Wklej notatki, relację albo opis wydarzenia (kto, co, kiedy, gdzie) i wskaż zdjęcia, jeśli są
---

# Napisz aktualność

Zamieniasz materiał od użytkownika (notatki, relację, post z Facebooka, maila) na wpis w Aktualnościach.
Materiał: $ARGUMENTS

## 1. Ustal fakty

Potrzebujesz: **co** się wydarzyło lub wydarzy, **kiedy**, **gdzie**, **kto** brał udział (które drużyny,
grupy), ewentualnie co dalej (zapisy, kolejna edycja). Czego brakuje, o to zapytaj **jednym** pytaniem.
Nie dopisuj faktów, liczb, cytatów ani nazwisk, których nie ma w materiale.

## 2. Napisz tekst

Zasady z `core/DESIGN.md` §2–3 (przeczytaj je przy pierwszym wpisie w sesji). W skrócie:

- **Ton**: pozytywny, konkretny, angażujący; do czytelnika na „Ty”, o jednostce „my”. Bez infantylizmu,
  militaryzmu, straszenia i wykrzykników w treści (najwyżej jeden na sekcję).
- **Tytuł** (`tytul`): polskie zdanie, nie Title Case, do ~70 znaków, konkretny: „Gromady zuchowe
  na pierwszym biwaku”, nie „Biwak!!!” ani „Relacja”. Bez kropki na końcu.
- **Zajawka** (`zajawka`): 1–2 zdania, max ~160 znaków, odpowiada na „co i dlaczego warto przeczytać”.
  Trafia na kartę i do opisu w wyszukiwarce.
- **Treść**: 3–6 krótkich akapitów. Pierwszy akapit = najważniejsze fakty. Śródtytuły `##` tylko przy
  dłuższych wpisach. Listy dla programu, wyników, rzeczy do zabrania. Na końcu, jeśli ma sens, co dalej
  i link (np. do kalendarza, zapisów, `/dla-rodzicow`).
- **Język**: nazwy jednostek z oficjalną pisownią („8 Drużyna Harcerska”, w zdaniu „nasza drużyna”),
  stopnie małą literą przed nazwiskiem („phm. Anna Nowak”), „harcerki i harcerze”, nazw harcerskich nie tłumacz.
- **Typografia**: „…” jako cudzysłów, półpauza „ – ”, „6–10 lat”, daty „16 października 2026”, bez emoji
  i hashtagów.
- **Dla mediów lub partnerów** (komunikat, podziękowanie dla sponsora): prościej, bez harcerskiego żargonu.

## 3. Zapisz wpis

Plik `content/aktualnosci/RRRR-MM-DD-krotki-slug.md` (data wydarzenia lub publikacji, slug małymi
literami bez polskich znaków). Adres wpisu na stronie to nazwa pliku bez `.md`.

```markdown
---
tytul: Gromady zuchowe na pierwszym biwaku
data: 2026-10-05
zajawka: Trzy gromady spędziły weekend w harcówce. Były sprawności, ognisko i mnóstwo śmiechu.
kategoria: Zuchy            # opcjonalnie: nadtytuł karty, np. Z życia hufca, Obozy, Kształcenie
grupy: [zuchy]              # opcjonalnie: zuchy, harcerze, harcerze-starsi, wedrownicy, nieprzetarty-szlak…
autor: Zespół promocji      # opcjonalnie
zdjecie:                    # opcjonalnie, zdjęcie główne
  src: /zdjecia/2026-10-05-biwak-zuchow.webp
  alt: Zuchy przy ognisku rozpalają ogień pod okiem drużynowej
  autor: Jan Kowalski / ZHP
---

Treść w Markdown…
```

Pełny schemat: `core/content/kolekcje.ts`. `szkic: true` ukrywa wpis (do akceptacji przez komendę).

**Zdjęcia**: tylko te wskazane przez użytkownika, z potwierdzonym autorem i zgodą osób na zdjęciu
(DESIGN.md §8: bez zdjęć z listy „nigdy nie publikuj”, bez AI i stocków). Zmniejsz do max 2560 px, WebP,
bez EXIF, < 1 MB i zapisz w `public/zdjecia/`. Opis `alt` mówi, co jest na zdjęciu, a nie „zdjęcie z biwaku”.
Dodatkowe zdjęcia w treści wstawiaj jako `![opis](/zdjecia/plik.webp)` z podpisem „fot. …” w akapicie pod spodem.

## 4. Sprawdź i pokaż

1. `npm run verify`: błędy schematu (za długa zajawka, brak autora zdjęcia, e-mail spoza ZHP) popraw
   lub wyjaśnij użytkownikowi.
2. Pokaż użytkownikowi tytuł, zajawkę i treść do akceptacji. Wprowadź poprawki.
3. Zaproponuj `/zhp-generuj-podglad`, a po akceptacji `/zhp-wgraj-zmiany`.

Jeśli wpis zapowiada wydarzenie z datą, zaproponuj też dodanie go do kalendarza (`/zhp-dodaj-wydarzenie`).
