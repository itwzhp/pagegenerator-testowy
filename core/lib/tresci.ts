// Pobieranie treści z kolekcji: bez szkiców, w ustalonej kolejności. Używaj zamiast getCollection.
import { getCollection, type CollectionEntry } from 'astro:content';
import { dataIso } from './format.ts';

export type Aktualnosc = CollectionEntry<'aktualnosci'>;
export type Wydarzenie = CollectionEntry<'wydarzenia'>;
export type Jednostka = CollectionEntry<'jednostki'>;
export type Zespol = CollectionEntry<'zespoly'>;

/** Aktualności od najnowszej. */
export async function pobierzAktualnosci(limit?: number): Promise<Aktualnosc[]> {
  const wpisy = (await getCollection('aktualnosci', ({ data }) => !data.szkic)).sort(
    (a, b) => b.data.data.getTime() - a.data.data.getTime(),
  );
  return limit ? wpisy.slice(0, limit) : wpisy;
}

/** getStaticPaths dla src/pages/aktualnosci/[...slug].astro. */
export async function sciezkiAktualnosci() {
  return (await pobierzAktualnosci()).map((wpis) => ({ params: { slug: wpis.id }, props: { wpis } }));
}

/** Wydarzenie trwa lub jest przed nami (liczone po dniu kalendarzowym w Polsce, w chwili builda). */
export function czyNadchodzace(w: Wydarzenie, dzis = new Date()): boolean {
  return dataIso(w.data.do ?? w.data.od) >= dataIso(dzis);
}

/**
 * Wydarzenia posortowane po dacie. `nadchodzace`: od najbliższego; `minione`: od najświeższego.
 * Strona jest statyczna: podział liczy się przy buildzie, więc kalendarz odświeża się z każdym deployem.
 */
export async function pobierzWydarzenia(
  zakres: 'nadchodzace' | 'minione' | 'wszystkie' = 'nadchodzace',
  limit?: number,
): Promise<Wydarzenie[]> {
  const wszystkie = await getCollection('wydarzenia', ({ data }) => !data.szkic);
  const wynik =
    zakres === 'wszystkie'
      ? wszystkie.sort((a, b) => a.data.od.getTime() - b.data.od.getTime())
      : zakres === 'nadchodzace'
        ? wszystkie.filter((w) => czyNadchodzace(w)).sort((a, b) => a.data.od.getTime() - b.data.od.getTime())
        : wszystkie.filter((w) => !czyNadchodzace(w)).sort((a, b) => b.data.od.getTime() - a.data.od.getTime());
  return limit ? wynik.slice(0, limit) : wynik;
}

/** Jednostki: najpierw `kolejnosc`, potem nazwa. */
export async function pobierzJednostki(): Promise<Jednostka[]> {
  const lista = await getCollection('jednostki');
  return lista.sort(
    (a, b) =>
      (a.data.kolejnosc ?? Infinity) - (b.data.kolejnosc ?? Infinity) || a.data.nazwa.localeCompare(b.data.nazwa, 'pl'),
  );
}

/** Zespoły według `kolejnosc` (komenda zwykle 1). */
export async function pobierzZespoly(): Promise<Zespol[]> {
  return (await getCollection('zespoly')).sort((a, b) => a.data.kolejnosc - b.data.kolejnosc);
}
