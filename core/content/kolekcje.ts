// Kolekcje treści jednostki. Pliki treści leżą w content/<kolekcja>/ (własność jednostki),
// schematy są tutaj (szablon). src/content.config.ts tylko je re-eksportuje.
//
// Pola są po polsku, płaskie i bez zagnieżdżonych referencji, żeby dało się je później
// wprost odwzorować w konfiguracji git-based CMS (np. Sveltia).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { emailZhp, grupa, osoba, urlHttps, zdjecie } from '../lib/schematy.ts';

/** Aktualności: content/aktualnosci/RRRR-MM-DD-krotki-tytul.md */
export const aktualnosci = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/aktualnosci' }),
  schema: z.object({
    /** Polskie zdanie, nie Title Case (DESIGN.md §3). */
    tytul: z.string().min(1).max(120),
    data: z.coerce.date(),
    /** Zajawka na kartę i do meta description: max ok. 160 znaków. */
    zajawka: z.string().min(1).max(200, 'Zajawka ma być krótka: najwyżej ok. 160 znaków.'),
    zdjecie: zdjecie.optional(),
    /** Dla których grup jest wpis (opcjonalne kodowanie kolorem i znakiem). */
    grupy: z.array(grupa).default([]),
    /** Nadtytuł karty, np. „Z życia hufca”, „Obozy”, „Kształcenie”. */
    kategoria: z.string().optional(),
    autor: z.string().optional(),
    /** Szkic nie jest publikowany. */
    szkic: z.boolean().default(false),
  }),
});

export const TYPY_WYDARZEN = ['zbiórka', 'biwak', 'rajd', 'obóz', 'zimowisko', 'uroczystość', 'szkolenie', 'akcja', 'inne'] as const;

/** Wydarzenia (kalendarz): content/wydarzenia/RRRR-MM-DD-nazwa.md */
export const wydarzenia = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/wydarzenia' }),
  schema: z
    .object({
      tytul: z.string().min(1).max(120),
      od: z.coerce.date(),
      /** Ostatni dzień, dla wydarzeń wielodniowych. */
      do: z.coerce.date().optional(),
      typ: z.enum(TYPY_WYDARZEN).default('inne'),
      miejsce: z.string().optional(),
      grupy: z.array(grupa).default([]),
      zajawka: z.string().max(200).optional(),
      /** Link do zapisów (formularz, strona wydarzenia). */
      zapisy: urlHttps.optional(),
      zdjecie: zdjecie.optional(),
      szkic: z.boolean().default(false),
    })
    .refine((w) => !w.do || w.do >= w.od, { message: 'Data "do" nie może być wcześniejsza niż "od".', path: ['do'] }),
});

export const RODZAJE_JEDNOSTEK = [
  'gromada',
  'druzyna-harcerska',
  'druzyna-starszoharcerska',
  'druzyna-wedrownicza',
  'druzyna-wielopoziomowa',
  'druzyna-ns',
  'krag',
  'klub',
  'szczep',
  'inna',
] as const;

/** Drużyny, gromady, szczepy, kręgi: content/jednostki/<nazwa>.md (treść = krótki opis). */
export const jednostki = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/jednostki' }),
  schema: z.object({
    /** Oficjalna nazwa, np. „8 Drużyna Harcerska »Leśni« im. Tadeusza Zawadzkiego”. */
    nazwa: z.string().min(1),
    rodzaj: z.enum(RODZAJE_JEDNOSTEK),
    /** Grupy metodyczne, z którymi pracuje jednostka (wielopoziomowa: kilka). */
    grupy: z.array(grupa).min(1),
    /** Nazwa szczepu, do którego należy (grupowanie na liście). */
    szczep: z.string().optional(),
    miejscowosc: z.string().optional(),
    /** Drużynowy/a, przyboczny/a… Publikuj tylko za zgodą (imię i nazwisko + funkcja to standard). */
    kadra: z.array(osoba).default([]),
    /** Najważniejsze dla rodziców: gdzie i kiedy. */
    zbiorki: z.object({ miejsce: z.string().min(1), termin: z.string().min(1) }).optional(),
    email: emailZhp.optional(),
    telefon: z.string().optional(),
    facebook: urlHttps.optional(),
    instagram: urlHttps.optional(),
    www: urlHttps.optional(),
    zdjecie: zdjecie.optional(),
    /** Ręczna kolejność na liście (mniejsza = wyżej); domyślnie alfabetycznie. */
    kolejnosc: z.number().optional(),
  }),
});

/** Komenda, komisja rewizyjna, zespoły, KSI: content/zespoly/<nazwa>.yaml */
export const zespoly = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml,json}', base: './content/zespoly' }),
  schema: z.object({
    nazwa: z.string().min(1),
    opis: z.string().optional(),
    email: emailZhp.optional(),
    /** Np. „2023–2027”. */
    kadencja: z.string().optional(),
    czlonkowie: z.array(osoba).default([]),
    kolejnosc: z.number().default(100),
  }),
});

export const collections = { aktualnosci, wydarzenia, jednostki, zespoly };
