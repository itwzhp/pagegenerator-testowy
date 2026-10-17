// Dane jednostki. Plik należy do jednostki: wypełnia go /zhp-zbuduj-strone.
// Schemat: core/lib/site-schema.ts (build zgłosi błąd przy brakach lub złym formacie).
// Hufiec testowy: część danych (dane formalne, liczby, dyżury) jest wymyślona na potrzeby testów, patrz JEDNOSTKA.md.
import type { SiteConfigInput } from './core/lib/site-schema';

const config: SiteConfigInput = {
  nazwa: 'Hufiec Testowy ZHP Chorągiew Gdańska',
  typ: 'hufiec',
  patron: 'im. Szarych Szeregów',
  opis: 'Harcerki i harcerze z Kartuz i okolic: gromada zuchowa, drużyny harcerskie, starszoharcerska i wędrownicza. Hufiec przykładowy, na użytek testów.',

  nadrzedna: { nazwa: 'Chorągiew Gdańska ZHP', url: 'https://gdansk.zhp.pl' },

  nawigacja: [
    { etykieta: 'Aktualności', href: '/aktualnosci' },
    { etykieta: 'Kalendarz', href: '/wydarzenia' },
    { etykieta: 'O nas', href: '/o-nas' },
    { etykieta: 'Drużyny', href: '/jednostki' },
    { etykieta: 'Władze', href: '/komenda' },
    { etykieta: 'Dla rodziców', href: '/dla-rodzicow' },
    { etykieta: 'Kontakt', href: '/kontakt' },
  ],
  cta: { etykieta: 'Zapisz dziecko', href: '/dla-rodzicow#zapisy' },
  zapisy: '/dla-rodzicow#zapisy',

  kontakt: {
    email: 'test@zhp.pl',
    telefon: '+48 333 333 333',
    adres: 'ul. Dworcowa 13A/9, 83-300 Kartuzy',
    dyzury: 'czwartki 17:00–19:00, po wcześniejszym umówieniu',
  },

  daneFormalne: {
    nip: '000-000-00-00',
    regon: '000000000',
    konta: [
      { nazwa: 'Konto hufca', numer: '00 0000 0000 0000 0000 0000 0000' },
      { nazwa: 'Konto składkowe', numer: '11 1111 1111 1111 1111 1111 1111' },
    ],
  },

  spolecznosci: {
    facebook: 'https://www.facebook.com/',
  },

  jedenProcent: { krs: '0000094699', cel: 'Hufiec Testowy' },

  liczby: {
    stanNa: '2026-09-30',
    pozycje: [
      { wartosc: '124', etykieta: 'członków hufca' },
      { wartosc: '5', etykieta: 'drużyn i gromad' },
      { wartosc: '18', etykieta: 'instruktorów' },
    ],
  },

  linki: [
    { etykieta: 'Związek Harcerstwa Polskiego', href: 'https://zhp.pl' },
    { etykieta: 'Chorągiew Gdańska ZHP', href: 'https://gdansk.zhp.pl' },
  ],
};

export default config;
