---
name: zhp-dodaj-wydarzenie
description: Dodaje wydarzenie do kalendarza strony jednostki ZHP (biwak, rajd, obóz, zimowisko, uroczystość, szkolenie, akcja). Tworzy plik w content/wydarzenia/ i sprawdza build. Użyj, gdy użytkownik chce dodać lub zmienić termin w kalendarzu.
argument-hint: Co, kiedy (od–do), gdzie, dla kogo, link do zapisów
---

# Dodaj wydarzenie do kalendarza

Materiał od użytkownika: $ARGUMENTS

## 1. Ustal fakty

Obowiązkowe: **nazwa** i **data rozpoczęcia**. Zalecane: data zakończenia, miejsce, dla których grup,
krótki opis (program, koszt, co zabrać, kontakt), link do zapisów (`https://`). Brakujące rzeczy zbierz
**jednym** pytaniem. Nie wymyślaj dat, kwot ani miejsc.

## 2. Zapisz plik

`content/wydarzenia/RRRR-MM-DD-krotki-slug.md` (data rozpoczęcia):

```markdown
---
tytul: Rajd Niepodległości
od: 2026-11-11
do: 2026-11-12             # opcjonalnie, dla wydarzeń wielodniowych
typ: rajd                  # zbiórka, biwak, rajd, obóz, zimowisko, uroczystość, szkolenie, akcja, inne
miejsce: Przykładowo, start przy harcówce
grupy: [harcerze, harcerze-starsi]
zajawka: Trasa z zadaniami historycznymi dla patroli z całego hufca.
zapisy: https://…          # opcjonalnie
---

Opis: program, koszt, co zabrać, kontakt do organizatora (e-mail w domenie ZHP).
```

Tytuł i opis piszesz w tonie ZHP (DESIGN.md §2–3): konkretnie, zachęcająco, po polsku, bez emoji.
Pełny schemat: `core/content/kolekcje.ts`.

Kalendarz sam dzieli wydarzenia na nadchodzące i minione **w chwili builda**. Minione wydarzenia nie
wymagają usuwania, a strona odświeża się przy każdym deployu.

## 3. Sprawdź i pokaż

1. `npm run verify` i popraw ewentualne błędy schematu.
2. Pokaż użytkownikowi, jak wpis będzie wyglądał (data, tytuł, miejsce, grupy, opis).
3. Zaproponuj `/zhp-generuj-podglad`, a dla większych wydarzeń także zapowiedź w Aktualnościach
   (`/zhp-napisz-aktualnosc`).
