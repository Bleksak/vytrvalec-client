import type { ParamMatcher } from '@sveltejs/kit';
import { isLocale } from '$translations/i18n-util';

export const match: ParamMatcher = (param) => {
    return isLocale(param);
};
