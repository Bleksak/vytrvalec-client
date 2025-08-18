import { type } from 'arktype';

export const BooleanType = type.or(
	'true',
	'false',
	type('string').pipe((val, ctx) => {
		if (val === 'true') {
			return true;
		}

		if (val === 'false') {
			return false;
		}

		return ctx.error({
			message: 'boolean'
		});
	})
);
