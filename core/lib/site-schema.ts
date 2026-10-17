// Schemat danych jednostki (site.config.ts). Build zgłasza błąd, gdy dane są niepełne lub błędne.
import { z } from 'astro/zod';
import { emailZhp, odnosnik, odnosnikMenu, sciezkaPublic, urlHttps } from './schematy.ts';

const kontakt = z.object({
  email: emailZhp.optional(),
  telefon: z.string().optional(),
  /** Adres siedziby, np. "ul. Harcerska 1, 00-001 Przykładowo". */
  adres: z.string().optional(),
  /** Gdy faktury/korespondencja idą na inny adres niż siedziba. */
  adresKorespondencyjny: z.string().optional(),
  /** Np. "wtorki 18:00–20:00, po wcześniejszym umówieniu". */
  dyzury: z.string().optional(),
  /** Link do mapy (np. OpenStreetMap lub Google Maps) z lokalizacją siedziby. */
  mapa: urlHttps.optional(),
  /** Inspektor ochrony danych. */
  iod: z.object({ email: emailZhp.optional(), telefon: z.string().optional() }).optional(),
});

const daneFormalne = z.object({
  nip: z.string().optional(),
  regon: z.string().optional(),
  krs: z.string().optional(),
  konta: z.array(z.object({ nazwa: z.string().min(1), numer: z.string().min(1) })).default([]),
});

const spolecznosci = z.object({
  facebook: urlHttps.optional(),
  instagram: urlHttps.optional(),
  youtube: urlHttps.optional(),
  tiktok: urlHttps.optional(),
});

export const siteSchema = z.object({
  /** Pełna nazwa z oficjalną pisownią, np. "Hufiec ZHP Gdańsk-Śródmieście". */
  nazwa: z.string().min(1),
  typ: z.enum(['hufiec', 'chorągiew', 'szczep', 'drużyna', 'gromada', 'inna']),
  /** Patron/bohater, np. "im. Szarych Szeregów". */
  patron: z.string().optional(),
  /** 1–2 zdania: kim jesteśmy, gdzie działamy. Trafia do meta description. */
  opis: z.string().min(1),
  /** Adres produkcyjny, np. "https://hufiec-x.zhp.pl" (adresy kanoniczne, mapa strony). */
  adres: urlHttps.optional(),

  /**
   * Gotowy identyfikator jednostki z repozytorium e-zhp (DESIGN.md §4). Pliki w public/.
   * Bez niego nagłówek pokazuje identyfikator ZHP i nazwę jednostki obok, zwykłym tekstem.
   */
  identyfikator: z.object({ kolor: sciezkaPublic, bialy: sciezkaPublic }).optional(),

  /** Jednostka nadrzędna, np. chorągiew dla hufca. */
  nadrzedna: z.object({ nazwa: z.string().min(1), url: urlHttps }).optional(),

  /** Menu główne. Kolejność = kolejność w nagłówku. */
  nawigacja: z.array(odnosnikMenu).default([]),
  /** Jeden główny przycisk w nagłówku (DESIGN.md: jedno CTA), np. „Dołącz do nas”. */
  cta: odnosnikMenu.optional(),

  kontakt: kontakt.default({}),
  daneFormalne: daneFormalne.optional(),
  spolecznosci: spolecznosci.default({}),

  /** Kampania 1,5%: KRS ZHP i cel szczegółowy jednostki (sprawdź w aktualnych materiałach kampanii). */
  jedenProcent: z.object({ krs: z.string().min(1), cel: z.string().min(1) }).optional(),

  /** Liczby „w skrócie”. Zawsze z datą stanu, żeby nie udawały aktualnych. */
  liczby: z
    .object({
      stanNa: z.coerce.date(),
      pozycje: z.array(z.object({ wartosc: z.string().min(1), etykieta: z.string().min(1) })).min(1),
    })
    .optional(),

  /**
   * Pasek logotypów dofinansowania NIW-CRSO / ROHiS (DESIGN.md §12): oficjalny plik z e-zhp w public/.
   * Tekst formułki jest stały i generuje go szablon.
   */
  dofinansowanie: z
    .object({
      pasek: sciezkaPublic,
      alt: z.string().min(1),
      rodzaj: z.enum(['wspolfinansowano', 'sfinansowano']).default('wspolfinansowano'),
    })
    .optional(),

  /** Dodatkowe linki w stopce (np. BIP, sklep harcerski, strona bazy). */
  linki: z.array(odnosnikMenu).default([]),

  /** Linki prawne w stopce. Domyślne strony są w src/pages/. */
  linkiPrawne: z.array(odnosnikMenu).default([
    { etykieta: 'Polityka prywatności', href: '/polityka-prywatnosci' },
    { etykieta: 'Deklaracja dostępności', href: '/deklaracja-dostepnosci' },
  ]),

  /** Gdzie prowadzi „Zapisz dziecko” / „Dołącz” w sekcjach rekrutacyjnych. */
  zapisy: odnosnik.optional(),
});

export type SiteConfigInput = z.input<typeof siteSchema>;
export type SiteConfig = z.output<typeof siteSchema>;
