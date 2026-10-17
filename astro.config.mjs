// Plik szablonu (upstream). Nie edytuj w repo jednostki — zmiany przychodzą przez /zhp-aktualizuj-szablon.
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
