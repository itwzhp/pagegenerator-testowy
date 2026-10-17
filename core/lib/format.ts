// Formatowanie zgodne z polską typografią (DESIGN.md §3). Czyste funkcje, testowane w format.test.ts.

const STREFA = 'Europe/Warsaw';

const dataDluga = new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: STREFA });
const dataKrotka = new Intl.DateTimeFormat('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: STREFA });

/** „16 października 2026” */
export function formatujDate(data: Date): string {
  return dataDluga.format(data);
}

/** „16.10.2026” */
export function formatujDateKrotko(data: Date): string {
  return dataKrotka.format(data);
}

/** Data w formacie atrybutu datetime: „2026-10-16”. */
export function dataIso(data: Date): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: STREFA }).format(data);
}

function czesci(data: Date) {
  const [rok, miesiac, dzien] = dataIso(data).split('-');
  return { rok, miesiac, dzien };
}

/**
 * Zakres dat bez powtórzeń: „16–18 października 2026”, „30 października – 2 listopada 2026”,
 * „28 grudnia 2026 – 3 stycznia 2027”. Jeden dzień: „16 października 2026”.
 */
export function formatujZakres(od: Date, doDnia?: Date): string {
  if (!doDnia || dataIso(od) === dataIso(doDnia)) return formatujDate(od);
  const a = czesci(od);
  const b = czesci(doDnia);
  const pelnaDo = formatujDate(doDnia);
  if (a.rok !== b.rok) return `${formatujDate(od)} – ${pelnaDo}`;
  if (a.miesiac !== b.miesiac) {
    const odBezRoku = new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', timeZone: STREFA }).format(od);
    return `${odBezRoku} – ${pelnaDo}`;
  }
  return `${Number(a.dzien)}–${pelnaDo}`;
}

/** Numer do linku tel:, np. „+48 600 100 200” → „+48600100200”. */
export function hrefTelefonu(telefon: string): string {
  return `tel:${telefon.replace(/[^\d+]/g, '')}`;
}

/** Twarda spacja po jednoliterowych spójnikach i przyimkach (a, i, o, u, w, z), żeby nie zostawały na końcu linii. */
export function bezSierotek(tekst: string): string {
  return tekst.replace(/(^|[\s(„])([aiouwzAIOUWZ])\s+/g, '$1$2 ');
}

/** Stopień + imię i nazwisko: „hm. Anna Nowak”. */
export function osobaZeStopniem(osoba: { stopien?: string; imie: string }): string {
  return osoba.stopien ? `${osoba.stopien} ${osoba.imie}` : osoba.imie;
}
