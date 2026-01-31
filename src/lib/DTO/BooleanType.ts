import { type } from 'arktype';

export const BooleanType = type.or(
	'true',
	'false',
	type('string').pipe((val, ctx) => {
		if (val === 'true' || val === 'on' || val === '1') {
			return true;
		}

		if (val === 'false' || val === 'off' || val === '0') {
			return false;
		}

        console.log(val);

		return ctx.error({
			message: 'boolean'
		});
	})
);
