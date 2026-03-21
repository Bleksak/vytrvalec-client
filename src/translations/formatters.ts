import type { FormattersInitializer } from 'typesafe-i18n';
import type { Locales, Formatters } from './i18n-types';
import { date } from 'typesafe-i18n/formatters';

export const initFormatters: FormattersInitializer<Locales, Formatters> = (locale: Locales) => {
    const formatters: Formatters = {
        long_date: date(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }),
        currency: (value: number) =>
            value.toLocaleString('cs-CZ', {
                style: 'currency',
                currency: 'CZK',
                maximumFractionDigits: 0,
            }),
    };

    return formatters;
};
