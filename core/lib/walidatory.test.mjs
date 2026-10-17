import { test } from 'node:test';
import assert from 'node:assert/strict';
import { czyEmailZhp, czyOdnosnik, czySciezkaPublic } from './walidatory.ts';

test('given an address in zhp.pl or zhp.net.pl or their subdomains, when validated, then it is accepted', () => {
  for (const email of ['hufiec@zhp.pl', 'komenda@tarnowskiegory.zhp.pl', 'jan.kowalski@zhp.net.pl', 'X@Gdansk.ZHP.PL']) {
    assert.equal(czyEmailZhp(email), true, email);
  }
});

test('given an address outside the ZHP domains, when validated, then it is rejected', () => {
  for (const email of ['druzyna@gmail.com', 'hufiec@zhp.pl.evil.com', 'kontakt@notzhp.pl', 'a@zhp.com']) {
    assert.equal(czyEmailZhp(email), false, email);
  }
});

test('given a root-relative path, when checked as a public file, then it is accepted', () => {
  assert.equal(czySciezkaPublic('/zdjecia/oboz-2026.webp'), true);
});

test('given an external, protocol-relative or traversing path, when checked as a public file, then it is rejected', () => {
  for (const sciezka of ['https://example.org/a.webp', '//cdn.example.org/a.webp', 'zdjecia/a.webp', '/../a.webp']) {
    assert.equal(czySciezkaPublic(sciezka), false, sciezka);
  }
});

test('given internal paths, https and mailto links, when checked as menu links, then they are accepted and others rejected', () => {
  assert.equal(czyOdnosnik('/kontakt'), true);
  assert.equal(czyOdnosnik('https://zhp.pl'), true);
  assert.equal(czyOdnosnik('mailto:hufiec@zhp.pl'), true);
  assert.equal(czyOdnosnik('http://zhp.pl'), false);
  assert.equal(czyOdnosnik('kontakt'), false);
  assert.equal(czyOdnosnik('javascript:alert(1)'), false);
});
