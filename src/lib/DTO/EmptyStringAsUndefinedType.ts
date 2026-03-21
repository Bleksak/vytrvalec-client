import { type } from 'arktype';

export const EmptyStringAsUndefinedType = type('""').pipe(() => {
    return undefined;
});

export const EmptyStringAsNullType = type('""').pipe(() => {
    return null;
});
