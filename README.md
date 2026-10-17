# Szablon strony jednostki ZHP

Szablon statycznej strony dla hufców, szczepów i innych jednostek ZHP. Stronę buduje i utrzymuje agent AI
(Claude Code) na podstawie rozmowy z instruktorem. Hosting: statyczne assety na Cloudflare Workers.

**Stos:** Astro (output statyczny) · GitHub Actions · Cloudflare Workers (static assets) · Claude Code skills.

## Jak to działa

1. Jednostka dostaje własne repo założone z tego szablonu.
2. Uruchamia w nim Claude Code, lokalnie albo w chmurze.
3. `/zhp-zbuduj-strone` + wklejone materiały (adres obecnej strony, kontakty) → agent dopytuje o braki
   i buduje stronę.
4. `/zhp-generuj-podglad` → adres testowy na Cloudflare.
5. Poprawki w rozmowie albo ręcznie → kolejne podglądy.
6. `/zhp-wgraj-zmiany` → merge do `main` i publikacja.

Później: `/zhp-aktualizuj-szablon` zaciąga nową wersję szablonu (wygląd, komponenty, skille).

## Zakładanie repo jednostki

Repo jednostki musi mieć **wspólną historię** z szablonem, żeby aktualizacje szły przez `git merge`:

```bash
git clone https://github.com/itwzhp/pagegenerator-template.git hufiec-x
cd hufiec-x
git remote rename origin upstream
git remote add origin https://github.com/itwzhp/pagegenerator-hufiec-x.git
git push -u origin main
```

Fork przez GitHub też działa, ale pozwala na jeden fork na organizację. Przycisk „Use this template”
tworzy repo bez wspólnej historii, więc pierwsza aktualizacja wymaga `--allow-unrelated-histories`
(skill sobie z tym radzi, ale konfliktów będzie więcej).

### Cloudflare: Worker i token tylko dla tej jednostki

Repo jednostki dostaje token, który pozwala wdrażać **wyłącznie jej własnego Workera**. Nie może
tworzyć ani usuwać Workerów, nie ma dostępu do stron innych jednostek ani do domen i routingu.
Dlatego Workera zakłada Wydział IT, a nie pierwszy deploy z CI.

Nazwa Workera = nazwa repo (np. `pagegenerator-hufiec-x`). Kroki IT przy zakładaniu jednostki:

1. **Worker**: utwórz Workera o nazwie repo, np. wgrywając szablon z uprawnieniami administratora:
   `npm run build && npx wrangler deploy --name pagegenerator-hufiec-x`.
2. **Token**: Manage Account → Account API Tokens → Create. Scope: **Specified Workers** →
   `pagegenerator-hufiec-x`, rola **Editor**. Ustaw datę wygaśnięcia i zapisz ją do rotacji.
3. **GitHub**: w repo jednostki Settings → Secrets and variables → Actions:

   | Nazwa | Rodzaj | Poziom | Wartość |
   |---|---|---|---|
   | `CLOUDFLARE_API_TOKEN` | secret | **repozytorium** | token z kroku 2 |
   | `CLOUDFLARE_ACCOUNT_ID` | variable | organizacja (wspólna) | ID konta Cloudflare (to nie sekret) |

4. Własna domena (np. `hufiec-x.zhp.pl`): podpina IT w Cloudflare. Token jednostki celowo nie ma
   uprawnienia *Workers Routes*.

Bez tokenu workflow tylko buduje i sprawdza stronę (tak działa samo repo szablonu).

## Struktura

```
core/                 szablon: layouty, komponenty, tokeny, schematy (nie edytować w jednostce)
src/pages/            podstrony jednostki
src/components/       własne komponenty jednostki
content/              treści (Markdown/JSON)
public/               pliki statyczne
site.config.ts        dane jednostki
JEDNOSTKA.md          notatki jednostki dla agenta
.claude/skills/       skille zhp-*
.claude/hooks/        hook blokujący edycję plików szablonu
.github/workflows/    build i deploy
```

Pełne zasady własności plików: [CLAUDE.md](CLAUDE.md).

## Rozwój szablonu

Hook `.claude/hooks/chron-szablon.mjs` blokuje agentowi edycję plików szablonu, także w tym repo.
Opiekunowie szablonu wyłączają go lokalnie:

```bash
touch .zhp-tryb-szablonu
```

Plik jest w `.gitignore`, więc nie trafia do forków. Alternatywnie: `"env": { "ZHP_TRYB_SZABLONU": "1" }`
w `.claude/settings.local.json` (wymaga restartu sesji).

Przy zmianach podbij `version` w `zhp-template.json`. Skill aktualizacji pokazuje jednostce wersję
przed i po.

```bash
npm ci
npm run dev       # http://localhost:4321
npm run verify    # astro check + testy hooka + build
```
