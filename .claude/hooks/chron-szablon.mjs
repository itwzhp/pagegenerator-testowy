// Hook PreToolUse: blokuje edycję plików należących do szablonu (upstream) w repo jednostki.
// Zmiany w tych plikach przychodzą wyłącznie przez /zhp-aktualizuj-szablon (git merge).
//
// Opiekunowie szablonu wyłączają blokadę na jeden z dwóch sposobów:
// - pusty plik .zhp-tryb-szablonu w katalogu głównym repo (jest w .gitignore, działa od razu),
// - zmienna ZHP_TRYB_SZABLONU=1, np. w .claude/settings.local.json: { "env": { "ZHP_TRYB_SZABLONU": "1" } }.
//
// Ograniczenie: hook pilnuje narzędzi edycji (Edit/Write/...), nie poleceń powłoki.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CHRONIONE_KATALOGI = ['core/', '.claude/', '.github/'];
const CHRONIONE_PLIKI = ['CLAUDE.md', 'astro.config.mjs', 'wrangler.jsonc', 'tsconfig.json', 'zhp-template.json', 'src/content.config.ts'];
const WYJATKI = ['.claude/settings.local.json'];

/**
 * @returns {string | null} komunikat blokady albo null, gdy edycja jest dozwolona
 */
export function ocenEdycje({ filePath, projectDir, env, trybSzablonu = false }) {
  if (!filePath || trybSzablonu || env.ZHP_TRYB_SZABLONU === '1') return null;

  const wzgledna = path.relative(projectDir, path.resolve(projectDir, filePath)).split(path.sep).join('/');
  if (wzgledna.startsWith('../') || path.isAbsolute(wzgledna)) return null;
  if (WYJATKI.includes(wzgledna)) return null;

  const chroniony =
    CHRONIONE_PLIKI.includes(wzgledna) || CHRONIONE_KATALOGI.some((katalog) => wzgledna.startsWith(katalog));
  if (!chroniony) return null;

  return (
    `"${wzgledna}" należy do szablonu ZHP i nie jest edytowany w repo jednostki. ` +
    'Zbuduj rozwiązanie w src/, content/, public/ lub site.config.ts (np. własny komponent w src/components/ ' +
    'korzystający z tokenów z core/styles/tokens.css). Zmiany szablonu przychodzą przez /zhp-aktualizuj-szablon.'
  );
}

async function main() {
  let dane = '';
  for await (const kawalek of process.stdin) dane += kawalek;
  const wejscie = JSON.parse(dane || '{}');

  const projectDir = process.env.CLAUDE_PROJECT_DIR ?? wejscie.cwd ?? process.cwd();
  const komunikat = ocenEdycje({
    filePath: wejscie.tool_input?.file_path ?? wejscie.tool_input?.notebook_path,
    projectDir,
    env: process.env,
    trybSzablonu: fs.existsSync(path.join(projectDir, '.zhp-tryb-szablonu')),
  });

  if (komunikat) {
    process.stderr.write(komunikat);
    process.exit(2);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
