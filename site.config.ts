// Dane jednostki. Plik należy do jednostki — wypełnia go /zhp-zbuduj-strone.
// Schemat: core/lib/site-schema.ts (build zgłosi błąd przy brakach).
import type { SiteConfigInput } from './core/lib/site-schema';

const config: SiteConfigInput = {
  nazwa: 'Hufiec Testowy ZHP Chorągiew Gdańska',
  typ: 'hufiec',
  opis: 'Hufiec Testowy, powstał tylko jako przykładowy na użytek testów.',
  kontakt: {
    email: 'test@zhp.pl',
    telefon: '+48 333 333 333',
    adres: 'ul. Dworcowa 13A/9, 83-300 Kartuzy',
  },
  linki: [
    { etykieta: 'Związek Harcerstwa Polskiego', url: 'https://zhp.pl' },
    { etykieta: 'Chorągiew Gdańska ZHP', url: 'https://gdansk.zhp.pl' },
  ],
};

export default config;
