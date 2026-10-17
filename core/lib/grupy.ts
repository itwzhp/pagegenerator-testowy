// Grupy metodyczne i członkowskie ZHP (DESIGN.md §3, §5). Oficjalne znaki: core/components/ZnakGrupy.astro.

export const KLUCZE_GRUP = [
  'zuchy',
  'harcerze',
  'harcerze-starsi',
  'wedrownicy',
  'nieprzetarty-szlak',
  'akademicy',
  'starszyzna',
  'instruktorzy',
] as const;

export type KluczGrupy = (typeof KLUCZE_GRUP)[number];

export interface Grupa {
  nazwa: string;
  wiek?: string;
  /** Token koloru grupy z tokens.css; tylko do kodowania treści tej grupy. */
  kolor: string;
}

export const GRUPY: Record<KluczGrupy, Grupa> = {
  zuchy: { nazwa: 'Zuchy', wiek: '6–10 lat', kolor: 'var(--zhp-group-zuchy)' },
  harcerze: { nazwa: 'Harcerze', wiek: '10–13 lat', kolor: 'var(--zhp-group-harcerze)' },
  'harcerze-starsi': { nazwa: 'Harcerze starsi', wiek: '13–16 lat', kolor: 'var(--zhp-group-harcerze-starsi)' },
  wedrownicy: { nazwa: 'Wędrownicy', wiek: '16–21 lat', kolor: 'var(--zhp-group-wedrownicy)' },
  'nieprzetarty-szlak': { nazwa: 'Nieprzetarty Szlak', kolor: 'var(--zhp-group-nieprzetarty-szlak)' },
  akademicy: { nazwa: 'Akademicy', kolor: 'var(--zhp-group-akademicy)' },
  starszyzna: { nazwa: 'Starszyzna i seniorzy', kolor: 'var(--zhp-group-starszyzna)' },
  instruktorzy: { nazwa: 'Instruktorzy', kolor: 'var(--zhp-group-instruktorzy)' },
};

/** Kolejność wyświetlania: od najmłodszych. */
export function sortujGrupy(klucze: readonly KluczGrupy[]): KluczGrupy[] {
  return [...klucze].sort((a, b) => KLUCZE_GRUP.indexOf(a) - KLUCZE_GRUP.indexOf(b));
}
