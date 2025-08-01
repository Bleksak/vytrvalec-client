import { locales } from '$translations/i18n-util';
import { type } from 'arktype';

type Locales = (typeof locales)[number];

export const TranslationObjectType = type
	.Record('string', 'string > 0')
	.narrow((data): data is Record<Locales, string> => {
		const keys = Object.keys(data);
		return (
			keys.every((key) => locales.includes(key as Locales)) &&
			locales.every((locale) => keys.includes(locale))
		);
	});

export const TranslationObjectPartialType = type('Record<string, string>')
	.narrow((data): data is Partial<Record<Locales, string>> => {
		return Object.keys(data).every((key) => locales.includes(key as Locales));
	})
	.pipe((data) => {
		return Object.fromEntries(Object.entries(data).filter(([_, v]) => v.length > 0));
	});

export type TranslationObject = typeof TranslationObjectType.infer;
export type TranslationObjectPartial = typeof TranslationObjectPartialType.infer;
