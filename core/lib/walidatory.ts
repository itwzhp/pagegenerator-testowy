// Reguły walidacji niezależne od Zod, żeby dało się je testować bez Astro.

const DOMENA_ZHP = /@([a-z0-9-]+\.)*zhp\.(pl|net\.pl)$/i;

/** E-mail w domenie zhp.pl, zhp.net.pl lub ich subdomenach. */
export function czyEmailZhp(email: string): boolean {
  return DOMENA_ZHP.test(email.trim());
}

export const KOMUNIKAT_EMAIL_ZHP =
  'Adres e-mail musi być w domenie zhp.pl lub zhp.net.pl (albo ich subdomenach). Poproś o adres funkcyjny ZHP.';

/** Ścieżka do pliku w public/, np. "/zdjecia/obóz.webp". Nie przyjmuje adresów zewnętrznych. */
export function czySciezkaPublic(sciezka: string): boolean {
  return sciezka.startsWith('/') && !sciezka.startsWith('//') && !sciezka.includes('..');
}

export const KOMUNIKAT_SCIEZKA_PUBLIC =
  'Podaj ścieżkę do pliku w public/ zaczynającą się od "/", np. "/zdjecia/oboz-2026.webp". Adresy zewnętrzne nie są dozwolone.';

/** Odnośnik w menu: ścieżka wewnętrzna ("/kontakt") albo pełny adres https. */
export function czyOdnosnik(href: string): boolean {
  return /^\/(?!\/)/.test(href) || /^https:\/\/[^\s]+$/.test(href) || /^mailto:[^\s]+$/.test(href);
}

export const KOMUNIKAT_ODNOSNIK = 'Odnośnik musi być ścieżką na stronie ("/kontakt"), adresem https:// albo mailto:.';
