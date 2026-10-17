import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bezSierotek, formatujDate, formatujDateKrotko, formatujZakres, hrefTelefonu, osobaZeStopniem } from './format.ts';

const d = (iso) => new Date(`${iso}T12:00:00+02:00`);

test('given a date, when formatted, then it is written out in Polish with the genitive month', () => {
  assert.equal(formatujDate(d('2026-10-16')), '16 października 2026');
  assert.equal(formatujDateKrotko(d('2026-10-16')), '16.10.2026');
});

test('given a date at midnight UTC, when formatted, then the Warsaw calendar day is used', () => {
  assert.equal(formatujDate(new Date('2026-07-01T23:30:00Z')), '2 lipca 2026');
});

test('given a single-day or missing end date, when a range is formatted, then one full date is shown', () => {
  assert.equal(formatujZakres(d('2026-10-16')), '16 października 2026');
  assert.equal(formatujZakres(d('2026-10-16'), d('2026-10-16')), '16 października 2026');
});

test('given a range within one month, when formatted, then month and year appear once with an unspaced en dash', () => {
  assert.equal(formatujZakres(d('2026-10-16'), d('2026-10-18')), '16–18 października 2026');
});

test('given a range across months or years, when formatted, then a spaced en dash joins the parts', () => {
  assert.equal(formatujZakres(d('2026-10-30'), d('2026-11-02')), '30 października – 2 listopada 2026');
  assert.equal(formatujZakres(d('2026-12-28'), d('2027-01-03')), '28 grudnia 2026 – 3 stycznia 2027');
});

test('given a phone number with spaces and dashes, when turned into a link, then only digits and plus remain', () => {
  assert.equal(hrefTelefonu('+48 600-100 200'), 'tel:+48600100200');
});

test('given one-letter words, when orphans are removed, then they are bound to the next word with a non-breaking space', () => {
  assert.equal(bezSierotek('Biwak w lesie i ognisko z gitarą'), 'Biwak w lesie i ognisko z gitarą');
  assert.equal(bezSierotek('W drodze'), 'W drodze');
});

test('given a person with and without a rank, when displayed, then the lowercase rank precedes the name', () => {
  assert.equal(osobaZeStopniem({ stopien: 'hm.', imie: 'Anna Nowak' }), 'hm. Anna Nowak');
  assert.equal(osobaZeStopniem({ imie: 'Anna Nowak' }), 'Anna Nowak');
});
