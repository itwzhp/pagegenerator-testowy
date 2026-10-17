import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { ocenEdycje } from './chron-szablon.mjs';

const projectDir = path.resolve('/repo-jednostki');
const ocen = (filePath, env = {}) => ocenEdycje({ filePath, projectDir, env });

test('given a file in core/, when editing, then the edit is blocked', () => {
  assert.match(ocen(path.join(projectDir, 'core', 'components', 'Naglowek.astro')), /należy do szablonu/);
});

test('given a template root file, when editing, then the edit is blocked', () => {
  assert.notEqual(ocen(path.join(projectDir, 'wrangler.jsonc')), null);
});

test('given a skill file in .claude/, when editing, then the edit is blocked', () => {
  assert.notEqual(ocen(path.join(projectDir, '.claude', 'skills', 'zhp-wgraj-zmiany', 'SKILL.md')), null);
});

test('given the content config re-export in src/, when editing, then the edit is blocked', () => {
  assert.notEqual(ocen(path.join(projectDir, 'src', 'content.config.ts')), null);
});

test('given a unit-owned file in src/, when editing, then the edit is allowed', () => {
  assert.equal(ocen(path.join(projectDir, 'src', 'pages', 'index.astro')), null);
});

test('given the unit config file, when editing, then the edit is allowed', () => {
  assert.equal(ocen(path.join(projectDir, 'site.config.ts')), null);
});

test('given local Claude settings, when editing, then the edit is allowed', () => {
  assert.equal(ocen(path.join(projectDir, '.claude', 'settings.local.json')), null);
});

test('given a relative path to core/, when editing, then the edit is blocked', () => {
  assert.notEqual(ocen('core/styles/tokens.css'), null);
});

test('given a file outside the project, when editing, then the edit is allowed', () => {
  assert.equal(ocen(path.resolve('/inny-projekt/core/plik.ts')), null);
});

test('given a directory merely prefixed like core, when editing, then the edit is allowed', () => {
  assert.equal(ocen(path.join(projectDir, 'core-moje', 'plik.ts')), null);
});

test('given template maintainer env variable, when editing core/, then the edit is allowed', () => {
  assert.equal(ocen(path.join(projectDir, 'core', 'lib', 'site.ts'), { ZHP_TRYB_SZABLONU: '1' }), null);
});

test('given template maintainer marker file, when editing core/, then the edit is allowed', () => {
  const filePath = path.join(projectDir, 'core', 'lib', 'site.ts');
  assert.equal(ocenEdycje({ filePath, projectDir, env: {}, trybSzablonu: true }), null);
});
