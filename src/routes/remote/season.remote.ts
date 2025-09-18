import { createSeason } from '$actions/Season';
import { form, getRequestEvent } from '$app/server';
import { SeasonConfigType, type SeasonConfigDTO } from '$lib/DTO/SeasonDTO';
import { error, redirect, type RemoteForm } from '@sveltejs/kit';
import { ArkErrors } from 'arktype';
import qs from 'qs';

export const seasonCreateAction: RemoteForm<SeasonConfigDTO> = form<SeasonConfigDTO>(async (formData) => {
	const value = qs.parse(new URLSearchParams(formData as any).toString());
	const data = SeasonConfigType(value);

	const api = getRequestEvent().locals.axios;

	if(data instanceof ArkErrors) {
		const errors = Object.fromEntries(data.map((err) => [err.path.toString(), err.message]));
		error(422, { errors });
	}

	const result = await createSeason(api, data);

	if (result.type === 'error') {
		error(422, {
			errors: Object.fromEntries(
				Object.entries(result.errors).map(([key, value]) => [key, String(value)])
			)
		});
	}

	redirect(307, '/administration/season');
});
