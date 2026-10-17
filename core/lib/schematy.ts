// Wspólne klocki schematów Zod: site.config.ts i kolekcje treści.
import { z } from 'astro/zod';
import {
  czyEmailZhp,
  czyOdnosnik,
  czySciezkaPublic,
  KOMUNIKAT_EMAIL_ZHP,
  KOMUNIKAT_ODNOSNIK,
  KOMUNIKAT_SCIEZKA_PUBLIC,
} from './walidatory.ts';
import { KLUCZE_GRUP } from './grupy.ts';

export const emailZhp = z.email().refine(czyEmailZhp, KOMUNIKAT_EMAIL_ZHP);

export const sciezkaPublic = z.string().refine(czySciezkaPublic, KOMUNIKAT_SCIEZKA_PUBLIC);

export const odnosnik = z.string().refine(czyOdnosnik, KOMUNIKAT_ODNOSNIK);

export const urlHttps = z.url({ protocol: /^https$/, error: 'Podaj pełny adres zaczynający się od https://' });

/** Zdjęcie z public/ z obowiązkowym opisem i autorem (DESIGN.md §8: „fot. Imię Nazwisko / ZHP”). */
export const zdjecie = z.object({
  src: sciezkaPublic,
  alt: z.string().min(3, 'Opisz, co jest na zdjęciu (tekst alternatywny po polsku).'),
  autor: z.string().min(1, 'Podaj autora zdjęcia, np. "Jan Kowalski / ZHP".'),
});

/** Osoba publikowana na stronie: stopień instruktorski (pwd./phm./hm.), imię i nazwisko, funkcja. */
export const osoba = z.object({
  stopien: z.string().optional(),
  imie: z.string().min(1),
  funkcja: z.string().min(1),
  email: emailZhp.optional(),
  telefon: z.string().optional(),
});

export const grupa = z.enum(KLUCZE_GRUP);

export const odnosnikMenu = z.object({
  etykieta: z.string().min(1),
  href: odnosnik,
});

export type Zdjecie = z.output<typeof zdjecie>;
export type Osoba = z.output<typeof osoba>;
export type OdnosnikMenu = z.output<typeof odnosnikMenu>;
