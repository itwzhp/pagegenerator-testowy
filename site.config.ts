// Dane jednostki. Plik należy do jednostki — wypełnia go /zhp-zbuduj-strone.
// Schemat: core/lib/site-schema.ts (build zgłosi błąd przy brakach).
import type { SiteConfigInput } from './core/lib/site-schema';

const config: SiteConfigInput = {
  nazwa: 'Hufiec ZHP Przykładowo',
  typ: 'hufiec',
  opis: 'Strona jednostki Związku Harcerstwa Polskiego.',
  kontakt: {
    email: 'hufiec@example.org',
  },
  linki: [],
};

export default config;
