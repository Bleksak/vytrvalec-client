import { locales } from '$translations/i18n-util';

type Locales = (typeof locales)[number];

export type TranslationObject = Record<Locales, string>;
