import type { Locale } from '$paraglide/runtime';

export const LOCALE_COOKIE_NAME = 'locale';

export type LocaleDTO = {
    name: string;
    code: Locale;
    flag: string;
};

export const LOCALES: Record<Locale, LocaleDTO> = {
    cs: {
        name: 'Čeština',
        code: 'cs',
        flag: '🇨🇿',
    },
    en: {
        name: 'English',
        code: 'en',
        flag: '🇺🇸',
    },
};
