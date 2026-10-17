# ZHP — DESIGN.md

Design rules for websites and digital materials of **Związek Harcerstwa Polskiego (ZHP)** — the Polish Scouting and Guiding Association: the largest scouting organisation in Poland (115 000+ members), a member of WOSM and WAGGGS. This file is written for AI agents and developers.

> **Language rule.** This document is in English; everything you produce for ZHP audiences — page copy, headings, buttons, alt texts, meta descriptions, error messages — is in **Polish**. Quoted Polish examples are canonical: reuse them, do not translate them back and forth. Scouting terms (drużyna, hufiec, chorągiew, zbiórka, sprawność, stopień, mundur…) are never translated or replaced with English loanwords.

**Authority.** Katalog Identyfikacji Wizualnej ZHP (KIW, 5th edition, September 2024) wins over everything else; Model marki ZHP (2020) defines voice and audiences; zhp.pl (2026) shows the current web patterns. Anything marked *Intentional addition* is not in KIW and exists only because websites need it. Doubts about the identity: Wydział Komunikacji i Promocji GK ZHP, promocja@zhp.pl.

---

## 1. Brand essence

- **Mission (quote verbatim):** „Misją ZHP jest wychowywanie młodego człowieka, czyli wspieranie go we wszechstronnym rozwoju i kształtowaniu charakteru przez stawianie wyzwań.”
- **Brand promise / tagline:** „Sprawności na całe życie” — an adventure among friends that leaves practical skills, not just memories. Hero line on zhp.pl: „ZHP – sprawności na całe życie”.
- **Values** (Prawo i Przyrzeczenie Harcerskie, Prawo i Obietnica Zucha): braterstwo, patriotyzm, przyjaźń, służba, wiara, praca, sprawiedliwość, wolność, pokój.
- **What ZHP is, in five words** (use as content pillars): **służba** (realnie zmieniamy świat), **braterstwo** (otwartość na drugiego człowieka), **przygoda** (odkrywanie świata w bezpiecznym środowisku), **wyzwanie** (nowe zadania, nowe szlaki), **wychowanie** (sprawności na całe życie).
- **Archetypes:** Opiekun (cares, supports parents), Mędrzec (credible, makes people think, never pushy), Odkrywca (open spaces, forest, mountains, freedom).
- **How ZHP wants to be seen:** „Największa pozarządowa organizacja wychowawcza, działająca w oparciu o ponadczasowe wartości, kształtująca młodych, odpowiedzialnych i zaangażowanych obywateli, będących w swoim otoczeniu liderami opinii i tworzących pozytywne zmiany w lokalnych społecznościach.” A modern, volunteer-based, safe organisation — not a relic.

## 2. Voice and tone

ZHP sounds: **kierowany do młodzieży, pozytywny, szczery, inspirujący, stanowczy, angażujący, rzucający wyzwanie, przyjazny.** Visual and multimedia material is **młodzieżowy, bliski natury, wesoły, różnorodny, w akcji.**

| Trait | Write like this | Not like this |
|---|---|---|
| Positive, inviting | „Harcerstwo to nie tylko niesamowita przygoda, ale także możliwość zdobycia sprawności na całe życie.” | „Nie siedź w domu przed komputerem!” |
| Challenging | „Postaw sobie wyzwanie: zdobądź pierwszą sprawność jeszcze tej jesieni.” | „Może kiedyś spróbujesz?” |
| Firm, credible (Mędrzec) | „Kadra ZHP to przeszkoleni instruktorzy-wolontariusze.” | „Mamy najlepszych instruktorów na świecie!!!” |
| Caring (Opiekun) | „Wspieramy rodziców w wychowaniu – Twoje dziecko jest u nas bezpieczne.” | „Oddaj nam dziecko, a my się nim zajmiemy.” |
| Direct, friendly | „Twoje wsparcie, nasza siła!” · „Zaangażuj się!” | „Uprzejmie informujemy, iż istnieje możliwość…” |

**Address.** Speak to one reader with „Ty” (2nd person singular, capitalised „Twoje”, „Ci” in direct appeals), to groups with „Wy”. Use „Państwo” only in official letters, press releases and partner offers. ZHP speaks as „my”.

**Audiences — what each must take away** (Model marki):

| Audience | Key message | Example line |
|---|---|---|
| Rodzice potencjalnych członków | safety, values, qualified volunteers, practical skills, friendships | „Chcesz zapisać dziecko do harcerstwa? Sprawdź, gdzie działa najbliższa drużyna.” |
| Potencjalni członkowie (6–21) | open, modern, attractive; adventure with friends; no stereotypes | „Biwaki, rajdy, obozy – i ludzie, z którymi chce się działać.” |
| Harcerze, wędrownicy | pride, belonging, skills peers get only as adults | „Prowadzisz projekt, zarządzasz zespołem, bierzesz odpowiedzialność – to też sprawności.” |
| Instruktorzy | volunteering as development; one voice of ZHP | „Twoje doświadczenie instruktorskie to kompetencje, które warto wpisać do CV.” |
| Partnerzy, sponsorzy | reliable partner, mutual benefit, not free labour | „Szukamy partnerów, z którymi zbudujemy długofalową współpracę.” |
| Media | expert on upbringing, youth, volunteering; plain language, **no harcerski żargon** | „ZHP zrzesza ponad 115 000 osób w całej Polsce.” |

**Never:** stereotypes of scouting, infantilism, militarism, sadness or boredom, mocking anyone, fear-based appeals, inventing numbers. Facts (membership, dates, KRS, bank accounts) come from zhp.pl or the client — if you do not have them, leave a clearly marked placeholder, e.g. „[liczba członków hufca]”.

## 3. Writing conventions (Polish)

- **Name:** first mention „Związek Harcerstwa Polskiego”, then „ZHP” (no dots, never „Z.H.P.”; inflect around it: „w ZHP”, „do ZHP”). English only for international contacts: „The Polish Scouting and Guiding Association”.
- **Units** keep their official capitalisation: „Główna Kwatera ZHP”, „Chorągiew Mazowiecka ZHP”, „Hufiec ZHP Gdańsk-Śródmieście”, „8 Drużyna Harcerska”, „Szczep Tęcza im. Jana Bytnara”. The generic word stays lowercase in a sentence: „w naszej drużynie”, „komenda hufca”.
- **Instructor ranks** are lowercase abbreviations before the name: „pwd.”, „phm.”, „hm.” → „hm. Martyna Kowacka, Naczelniczka ZHP”.
- **Groups and ages:** zuchy (6–10 lat), harcerze (10–13), harcerze starsi (13–16), wędrownicy (16–21); member groups: akademicy, starszyzna i seniorzy, Nieprzetarty Szlak, instruktorzy. Name both genders where it matters: „harcerki i harcerze”, „drużynowa lub drużynowy”.
- **Headlines:** Polish sentence case („Jak reagować, gdy ktoś przekracza granice?”), never English Title Case. Section and page titles are displayed in WERSALIKI via CSS `text-transform: uppercase` — type them normally.
- **Typography:** Polish quotes „…” (inner ‚…’); en dash with spaces „ – ” for pauses and ranges without spaces „6–10 lat”; non-breaking space after one-letter words (a, i, o, u, w, z) and between a number and its unit („115 000 osób”, „1,5%”); thousands separated by a (non-breaking) space, decimals by a comma; dates „16 października 2026”, short form „16.10.2026”.
- **CTAs:** verb first, imperative, max 3–4 words. Canonical: „Zaangażuj się!”, „Zapisz dziecko”, „Zobacz więcej”, „Więcej aktualności”, „Dowiedz się więcej”, „Przejdź do strony”, „No to zaczynamy”, „Otrzymaj patronat!”. An exclamation mark is fine in a CTA or slogan, never in body copy more than once per section.
- **No emoji** in page copy and UI. No hashtags in headings.
- **Photo credit** under every ZHP photo: „fot. Imię Nazwisko / ZHP”.

## 4. Logo and identyfikator

ZHP has two marks. Use only the official master files listed below (§14 says where they come from); never redraw, trace, screenshot or extract a mark from a PDF. Each file is single-ink — pick the file by background, an `<img>` cannot recolour it:

| File | Mark | Use on |
|---|---|---|
| `assets/Logos/zhp-identyfikator-green.svg` — in system | **Identyfikator** (logo in a tilted square + „Związek Harcerstwa Polskiego”) — primary | white / light uniform backgrounds — **default for websites** |
| `assets/Logos/zhp-identyfikator-white.svg` — in system | Identyfikator, white | any colour field, photo, `surface-brand`, `surface-inverse` |
| `assets/Logos/zhp-identyfikator-black.svg` — in system | Identyfikator, black | monochrome only |
| `assets/Logos/zhp-identyfikator-en-green.svg` / `-en-white.svg` — to supply | English identyfikator | English pages / international contacts only |
| `assets/Logos/zhp-logo-green.svg` / `-white.svg` / `-black.svg` — to supply | **Logo ZHP** (stylised lilijka built from „ZHP”, with ®) | symbolic use: favicon, avatar, diplomas, merch |

Files marked *to supply* are not in the system yet: use a marked placeholder („[logo ZHP]”), never a drawn mark.

The identyfikator files are the official masters as supplied: the SVG canvas (346×157) includes a built-in margin — the visible mark is ~80% of the file height. Size the `<img>` so the **visible** mark is ≥60px (img height ≥76px; header uses `header-logo-height` 80px). Do not crop or edit the files. Note: the master's green is #86A20B, slightly different from KIW's #87A428 — leave the file as is; use `green` for everything you build.

Rules (KIW p. 6–18):

- **Websites and social media use the identyfikator.** The bare logo appears on the web only where it plays a symbolic, not an informational role (favicon, app icon, small seal). **Never place the logo and the identyfikator side by side** in one layout.
- **Colours: only green (`green` #87A428), white, black.** Green is the primary version on white. On any coloured or photographic background use the **white** version. Black only in monochrome work. Never the old dark green, never a gradient, outline, recolour of parts or any other colour.
- **Minimum height:** 60 px of visible mark on screen (`logo-min-height`), 1 cm in print. Below 3 cm print size the ® may be dropped.
- **Clear space:** identyfikator — the height of its letter „H” on every side; logo — the height of the lower part of the lilijka. No text, image or edge of the screen inside it.
- **Busy or light-patchy photos:** white mark plus a very soft shadow (offset 1–6%, blur 5–15% of the mark's height, opacity 20–30% on light / 60–80% on dark) or a blurred field behind it (130–150% of the mark's height, radius 10–15%, opacity 20–40%). No other effects.
- **Forbidden:** stretching, squashing, rotating (the 6° tilt is built in — do not add more), perspective, cropping, outlines, shadows other than the above, patterns made of the mark, using it inside another logo or as a map pin, adding text to it, placing a green mark on a non-uniform or low-contrast background, a black mark on colourful designs.
- **Unit identifiers** (drużyna, szczep, hufiec, chorągiew) are finished files made from the official templates (e-zhp → Repozytorium materiałów graficznych → Szablony identyfikatorów; help: promocja@zhp.pl). **Never compose one yourself**, never replace „Związek Harcerstwa Polskiego” with a unit name, never set a unit name next to the mark in another font. If the unit file is missing, use the ZHP identyfikator and write the unit name as normal page text outside the clear space, then flag the missing file.
- **Krzyż Harcerski** may appear on ZHP units' websites and official documents, never in promotional material or merchandise; keep its proportions, 5 mm margin, min. 35 mm in print. Use only the repository file.

## 5. Colour

White and green are the core identity; the scout colours (yellow, scout violet, navy, red) are the secondary palette; the extended palette is for infographics, illustration and group coding. Default page: white ground, black text, `green` as the brand field and rules, `green-dark` for anything interactive.

**Core and scout palette (KIW p. 32–33)** — light / base / dark:

| Family | Light | Base | Dark |
|---|---|---|---|
| Zielony | `green-light` #AFCA0B | **`green` #87A428** (Pantone 2301 C) | `green-dark` #587D18 |
| Żółty | `yellow-light` #FBCD44 | `yellow` #F8C409 | `yellow-dark` #F6A11A |
| Fioletowy skautowy | `scout-light` #80539B | `scout` #5D2F88 | `scout-dark` #3F1457 |
| Granatowy | `navy-light` #194093 | `navy` #252E78 | `navy-dark` #232740 |
| Czerwony | `red-light` #E94F2D | `red` #E30613 | `red-dark` #9B1006 |
| — | `white` #FFFFFF | | `black` #000000 |

**Extended palette (KIW p. 34):** orange #F39200 / #EF7D00 / #E15C11, purple #AC467D / #8A0E68 / #660D51, grey #CFD3D7 / #A6ADB3 / #717D85, brown #C7833F / #A3521F / #603519, blue #94D3F1 / #26B4E6 / #0083AC, pink #F4A5B5 / #E58795 / #D36A83 (tokens `orange-light`, `orange`, `orange-dark`, …).

**Semantic tokens — use these in code, not raw hexes:**

| Token | Value | Rule |
|---|---|---|
| `surface` | white | page ground |
| `surface-tint` | #F7F9F0 | *intentional addition*: alternate sections |
| `surface-brand` | `green` | title bands, hero fields; text on it `ink`, or white **only** at display size 32px+ / the logo |
| `surface-brand-strong` | `green-dark` | green strip with body-size white text |
| `surface-inverse` | `navy-dark` | footer, dark sections |
| `ink` / `ink-muted` / `ink-inverse` | black / #5E6970 / white | text |
| `ink-brand`, `link` | `green-dark` | green text, links (always underlined) |
| `border` / `border-strong` | grey-light / grey-dark | hairlines / form controls |
| `focus-ring` / `focus-ring-inverse` | black / white | 2px outline, 2px offset |

**Contrast (WCAG 2.1 AA is the floor for every ZHP site):**
- `green` #87A428 with white is **2.85:1** — KIW's signature pair, kept for the logo and huge headings only. Body text, buttons, links, captions on green: use `ink` (7.37:1) or switch the fill to `green-dark` (white 4.81:1).
- Never use `green`, `green-light`, `yellow*`, `orange*`, `grey`, `blue`, `pink*` as text colour on white.
- Group colours carry text as noted per `group-*` token (yellow, green-light, orange: black text; navy-light, red, scout: white text).

**Methodological / member group colours:** zuchy `yellow`+`yellow-dark`, harcerze `green-light`+`green`, harcerze starsi `navy-light`+`blue`, wędrownicy `red`+`red-dark`, akademicy `orange-light`+`orange-dark`, starszyzna i seniorzy `scout`+`scout-light`, Nieprzetarty Szlak `yellow-dark`+`yellow-light`, instruktorzy `grey-dark`+`grey`. Use them only to code content for that group.

**Partner colours:** WOSM logo is white on `scout`; WAGGGS logo is `wagggs-navy` #28275D (or `wagggs-yellow` #FFDA00) — never use these to restyle ZHP elements.

## 6. Typography

KIW: the Museo and Museo Sans families for all texts, headings and titles; Trebuchet MS as the auxiliary (internal) face. Only the **free** weights are used: **Museo Sans 500** (+ 500 Italic) and **Museo 300 / 500 / 700**. Files in `fonts/` (woff2):

```css
@font-face { font-family: "Museo Sans"; src: url("fonts/MuseoSans-500.woff2") format("woff2"); font-weight: 500; font-display: swap; }
@font-face { font-family: "Museo"; src: url("fonts/Museo-300.woff2") format("woff2"); font-weight: 300; font-display: swap; }
@font-face { font-family: "Museo"; src: url("fonts/Museo-500.woff2") format("woff2"); font-weight: 500; font-display: swap; }
@font-face { font-family: "Museo"; src: url("fonts/Museo-700.woff2") format("woff2"); font-weight: 700; font-display: swap; }
html { font-synthesis: none; }   /* never fake bold/italic */
--font-sans: "Museo Sans", "Trebuchet MS", system-ui, sans-serif;
--font-display: "Museo", "Museo Sans", "Trebuchet MS", system-ui, sans-serif;
```

| Style | Face | Size / line | Use |
|---|---|---|---|
| `display` | Museo 700 | 56/60 | hero title, WERSALIKI, once per page |
| `h1` | Museo 300 | 40/46 | page title, `SectionBand`, WERSALIKI |
| `h2` | Museo 700 | 34/40 | section title with green dash, WERSALIKI |
| `h3` | Museo 700 | 20/26 | card / article headline, sentence case |
| `h4` | Museo 700 | 18/24 | sub-blocks, FAQ, footer columns |
| `lead` | Museo 300 | 20/30 | intro paragraph |
| `body` | Museo Sans 500 | 16/24 | running text, max 70ch |
| `body-sm` | Museo Sans 500 | 14/20 | excerpts, footer |
| `button` | Museo Sans 500 | 16/20 | buttons, sentence case |
| `nav` | Museo Sans 500 | 17/24 | main navigation |
| `eyebrow` | Museo Sans 500 | 14/18 | kicker, WERSALIKI, `ink-brand` |
| `meta` / `caption` | Museo Sans 500 | 14/20 · 13/18 | dates, credits, `ink-muted` |
| `quote` | Museo Sans 500 Italic | 20/30 | quotations only |

**Relation to zhp.pl.** The national site sets everything in Museo Sans, using weights ZHP licenses (400, 500, 700, 900): body 16px/400, nav 17px/500, card titles 17–20px/600–700, section titles 34–48px/600–900, buttons 16px/500. Sites built from this system use the free weights only, mapped as: 400 → Museo Sans 500; 600–900 → Museo 700 (the face of the identyfikator lettering). Sizes above follow zhp.pl. zhp.pl paints its green as #86A315 and some link text in `green-light` #AFCA0B — follow KIW instead (`green` #87A428; `link` = `green-dark` on light grounds).

On mobile (<640px) step `display` to 40/44, `h1` to 32/40, `h2` to 26/32; body stays 16px.

Rules (KIW p. 35): never condense, stretch or re-kern letters; **no letter-spacing** for emphasis (no „rozstrzelenie”); italics only inside running text such as quotes; emphasis in text = Museo 700 (`<strong>`), titles = WERSALIKI; when contrasting weights in a headline, pair the lightest with the heaviest available (Museo 300 + Museo 700). Never use Inter, Roboto, Montserrat, Poppins or other substitutes; Trebuchet MS is only the fallback.

## 7. Layout and graphic language

KIW pages are flat, square and airy: white ground, solid colour blocks, green rules, generous margins. Materials must feel **lekkie, estetyczne, nowoczesne i dynamiczne**.

- **Grid:** content max `content-max` 1200px, 12 columns, gutters 16px mobile / 32px desktop (`space-4` / `space-8`), section padding `space-16`–`space-24`. Running text max `text-max` 70ch.
- **Spacing:** 4px scale `space-1`…`space-24` (*intentional addition*).
- **Corners:** square (`radius-0`) for sections, bands, photos, cards; `radius-sm` 4px only for buttons, inputs, tags.
- **No** shadows, gradients, glassmorphism, rounded cards, blobs, bluish-purple gradients or decorative emoji.
- **Signature elements** (use these to make a page read as ZHP):
  1. **Title band** (`SectionBand`): green field flush with the left edge of the screen, white WERSALIKI title, long titles stacked as staggered bands.
  2. **Green dash** before section headings (`SubHeading`).
  3. **Thick green rules** (6px) above and below a key statement (`Highlight`).
  4. **Green bar** carrying a short notice (`InfoBar`), the web version of KIW's repository footer bar.
  5. ✓ / × / → lists for dos and don'ts (`Checklist`).
  6. Optional: a thin vertical green bar (4px) beside a column of explanatory text — sparingly, never as a card decoration.
- **Proportions:** white dominates; green is the one strong colour on a page; secondary colours appear as group coding, infographics or a single accent block, never as random decoration. One colour field per viewport at most besides the header/footer.

## 8. Photography and video

Photos must show clearly who we are and what we do; the message is bright and positive. Ask: will a viewer see ZHP as a positive, educational, **safe** organisation?

**Show:** aktywność, ruch · uśmiech, radość · przyjaźń, braterstwo · naukę, najlepiej przez zabawę · profesjonalizm · służbę, postawę obywatelską, radosny patriotyzm · młodość, spontaniczność · różnorodność (różna płeć, różny wiek) · wsparcie w wychowaniu.

**Avoid:** statyczność, nuda · smutek · only adults · militaryzm · sztuczność, pozowanie · incomplete, untidy or non-regulation uniforms · situations or children not recognisable as scouting.

**Never publish:** unaesthetic or degrading images; mess, dirt, lack of hygiene or unhealthy habits; violence or non-scout behaviour; breaches of intimacy (swimwear, underwear, nudity) or missing safety gear (no life jacket on water, no belay); out-of-context situations; stereotypes, infantilism, age-inappropriate behaviour.

- Source: stock.zhp.pl (credit „fot. Imię Nazwisko / ZHP”, no commercial use) or the unit's own photos. **Consent** of every recognisable person (parents for minors) before publishing.
- No watermarks; no AI-generated or stock-agency images posing as ZHP scouts; no faked uniforms. If no suitable photo exists, use a palette colour block.
- Crop 3:2 (cards, articles) or 16:9 (hero); faces never cut by text; overlay text only on a calm area, white, with the logo rules above.
- **Video:** clear, positive; 60–120 s for social; simple cuts, no fancy transitions; subtitles burned-in or platform captions; identyfikator (not the logo) at the start or end; min. 1920×1080, 25 fps, 8 Mbps; licensed music only; no watermark.

## 9. Iconography

- **Group signs** (`assets/Znaki/`, official files): `znak-zuchy`, `znak-harcerze`, `znak-harcerze-starsi`, `znak-wedrownicy` and the combined `znak-metodyczne` (all four). Each comes as colour `.png` (568×568, transparent), `-white.svg` and `-black.svg`. Colour version first (PNG until the colour SVGs are supplied — fine up to ~280px display size); white on dark/colour fields, black only in monochrome. Member-group signs (akademicy, starszyzna i seniorzy, Nieprzetarty Szlak, instruktorzy) are not supplied yet — use the group name in text. Never recolour, crop or use a sign inside another logo.
- **UI icons:** KIW defines none (*intentional addition*): use one open-source outline set (e.g. Lucide), 2px stroke, 20–24px, coloured `ink` or `green-dark`, always with a text label or `aria-label`. No emoji as icons.
- Museo has no ✓ × → glyphs — draw markers with CSS/SVG (see `Checklist`).

## 10. Components

Plain CSS in `components/bundle.css` (prefix `zhp-`, needs `tokens.css`); framework-free, copy the markup. Each has a README with do/don'ts.

| Component | Class | Use |
|---|---|---|
| Button | `zhp-btn`, `--secondary`, `--inverse` | CTAs |
| SectionBand | `zhp-band`, `--sm`, `--strong` | page / main section titles |
| SubHeading | `zhp-subheading`, `--sm` | section headings |
| Highlight | `zhp-highlight` | one key statement |
| Checklist | `zhp-checklist`, `--no`, `--maybe` | dos / don'ts, requirements |
| Figure | `zhp-figure` | photo + credit |
| NewsCard | `zhp-card` | news, events, featured |
| GroupBadge | `zhp-group` | content for a given group |
| InfoBar | `zhp-infobar` | short notice + action |
| SiteHeader | `zhp-header`, `zhp-nav` | header |
| SiteFooter | `zhp-footer` | footer |

## 11. Page patterns

**National site (zhp.pl):** header (identyfikator, Aktualności, Wydarzenia, Odkryj ZHP, Intranet ZHP, Kontakt, Dla mediów, CTA „Zaangażuj się!”) → hero („ZHP – sprawności na całe życie”, search, question-style links „Gdzie się zapisać?”, „Jak wesprzeć ZHP?”) → POLECAMY → AKTUALNOŚCI → POZNAJ ZHP → block for parents („Chcesz zapisać dziecko…?”) → PRZEDSIĘWZIĘCIA I WYDARZENIA (date, type, target groups) → partners → WSPÓLNIE DLA HARCERSKIEJ MISJI („Twoje wsparcie, nasza siła!”) → CZY WIESZ, ŻE… → footer.

**Unit site (drużyna, szczep, hufiec, chorągiew)** — recommended order: header with the unit identyfikator → hero (who we are, where, for which age; CTA „Dołącz do nas” / „Zapisz dziecko”) → „O nas” → „Dla rodziców” (zbiórki: kiedy i gdzie, koszty, bezpieczeństwo, kontakt do drużynowego) → Aktualności → Kalendarz (biwaki, obozy) → 1,5% (`InfoBar`) → Kontakt (address, e-mail, map) → footer with link to zhp.pl, WOSM/WAGGGS, required funding logos.

## 12. Obligations on pages

- **Funding (NIW-CRSO / ROHiS):** pages about activities funded by Komitet do Spraw Pożytku Publicznego, NIW-CRSO and Rządowy Program Wsparcia Rozwoju Organizacji Harcerskich i Skautowych must show the official logo bar together (horizontal, colour version first; white only if colour impossible; black only if neither) with the unchanged line „Współfinansowano ze środków Narodowego Instytutu Wolności – Centrum Rozwoju Społeczeństwa Obywatelskiego w ramach Rządowego Programu Wsparcia Rozwoju Organizacji Harcerskich i Skautowych na lata 2018–2030” (or „Sfinansowano…” when fully funded). Not on merchandise (T-shirts, mugs, pens). Files: e-zhp repository; never re-type or alter the text.
- **WOSM / WAGGGS:** where possible show both beside the ZHP identyfikator (official files from the repository; brand.scout.org, wagggs.org).
- **Accessibility:** `lang="pl"`, WCAG 2.1 AA, visible focus, Polish `alt` texts, underlined links, a „Deklaracja dostępności” page; privacy policy and cookie consent.

## 13. Agent checklist before you ship

- [ ] All copy in Polish, tone positive and direct, ZHP terms untranslated, no invented facts.
- [ ] Identyfikator in the header (green on white, white on colour), ≥60px, clear space kept; no logo + identyfikator together.
- [ ] Only palette colours via tokens; no white text on `green` below 32px; contrast AA everywhere.
- [ ] Museo / Museo Sans free weights only, `font-synthesis: none`, titles uppercase via CSS, no letter-spacing.
- [ ] At least one signature element (band, dash, thick rules); square corners, no shadows or gradients.
- [ ] Real ZHP photos with „fot. … / ZHP” and consent; nothing from the „never publish” list.
- [ ] Funding bar and WOSM/WAGGGS where required; accessibility and legal pages linked.

## 14. Logo files — status, where and how to add them

Marks are never generated, traced or extracted from PDFs: only official master files (e-zhp → Repozytorium materiałów graficznych → Loga / Elementy graficzne) go into `assets/`. While a file is missing, agents leave a clearly marked placeholder („[logo ZHP]”, „[znak: Akademicy]”).

**In the system now:** identyfikator ZHP green / white / black (SVG); group signs zuchy, harcerze, harcerze starsi, wędrownicy, metodyczne (colour PNG, white and black SVG).

**Still to supply** (exact names, lowercase):

| Folder | File | Content |
|---|---|---|
| `assets/Logos/` | `zhp-logo-green.svg`, `zhp-logo-white.svg`, `zhp-logo-black.svg` | logo (lilijka) with ® |
| `assets/Logos/` | `zhp-identyfikator-en-green.svg`, `zhp-identyfikator-en-white.svg` | English identyfikator |
| `assets/Logos/` | `favicon.svg` / `favicon-512.png` (optional) | browser tab / app icon |
| `assets/Znaki/` | `znak-zuchy.svg`, `znak-harcerze.svg`, `znak-harcerze-starsi.svg`, `znak-wedrownicy.svg`, `znak-metodyczne.svg` | colour SVGs (replace the PNGs) |
| `assets/Znaki/` | `znak-akademicy`, `znak-starszyzna-i-seniorzy`, `znak-nieprzetarty-szlak`, `znak-instruktorzy` (`.svg` colour + `-white.svg` + `-black.svg`) | member-group signs |
| `assets/Logos/` | `jednostka-<nazwa>-<kolor>.svg`, e.g. `jednostka-hufiec-tczew-green.svg` | a unit's own identifier, used instead of the ZHP identyfikator on that unit's site |

**Format:** SVG (one ink per file, no embedded raster); otherwise PNG with transparent background, min. 1000 px on the longer side. Keep the master files unchanged.

**How to add them:**
- **To this design system:** attach the files (a ZIP is fine) in a Claude conversation about this design system and ask to add them — they are uploaded to the Logos / Znaki groups under the names above and the previews are switched to them. Note: some e-mail and antivirus gateways strip SVG files and leave a short text file with the original name (e.g. „Ten załącznik został usunięty…”) — check the file size before sending.
- **To a website project:** copy the files to `assets/Logos/` and `assets/Znaki/` (or the project's static folder) with the same names; the markup in this document and in `components/` refers to those names.
