import config from '../../site.config';
import { siteSchema } from './site-schema';

/** Zwalidowane dane jednostki. Komponenty importują je stąd, nigdy bezpośrednio z `site.config.ts`. */
export const site = siteSchema.parse(config);
