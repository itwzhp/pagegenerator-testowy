import { z } from 'astro/zod';

/**
 * Schemat danych jednostki z `site.config.ts`.
 * Build przerywa się z czytelnym błędem, gdy dane są niekompletne lub mają zły format —
 * dzięki temu agent dostaje informację zwrotną bez oglądania strony.
 */
export const siteSchema = z.object({
  nazwa: z.string().min(1),
  typ: z.enum(['hufiec', 'chorągiew', 'szczep', 'drużyna', 'inna']),
  opis: z.string().min(1),
  kontakt: z
    .object({
      email: z.email().optional(),
      telefon: z.string().optional(),
      adres: z.string().optional(),
    })
    .default({}),
  linki: z
    .array(
      z.object({
        etykieta: z.string().min(1),
        url: z.url(),
      }),
    )
    .default([]),
});

export type SiteConfigInput = z.input<typeof siteSchema>;
export type SiteConfig = z.output<typeof siteSchema>;
