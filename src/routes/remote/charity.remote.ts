import { createCharity, updateCharity } from '$actions/Charity';
import { form, getRequestEvent } from '$app/server';
import { CharityCreateType, CharityUpdateType, type CharityDTO } from '$lib/DTO/CharityDTO';
import { error, redirect, type RemoteForm } from '@sveltejs/kit';
import { ArkErrors } from 'arktype';
import qs from 'qs';

export const createCharityAction: RemoteForm<CharityDTO> = form<CharityDTO>(async (formData) => {
	const value = qs.parse(new URLSearchParams(formData as any).toString());
	const data = CharityCreateType(value);

	const api = getRequestEvent().locals.axios;

	if (data instanceof ArkErrors) {
		const errors = Object.fromEntries(data.map((err) => [err.path.toString(), err.message]));

		error(422, { errors });
	}

	console.log(data);

	const result = await createCharity(api, data);

	if (result.type === 'error') {
		error(422, {
			errors: Object.fromEntries(
				Object.entries(result.errors).map(([key, value]) => [key, String(value)])
			)
		});
	}

	redirect(307, '/administration/charity');
});

export const charityUpdateAction: RemoteForm<CharityDTO> = form<CharityDTO>(async (formData) => {
	const value = qs.parse(new URLSearchParams(formData as any).toString());
	const data = CharityUpdateType(value);

	const api = getRequestEvent().locals.axios;

	if (data instanceof ArkErrors) {
		const errors = Object.fromEntries(data.map((err) => [err.path.toString(), err.message]));

		error(422, { errors });
	}

	console.log(data);

	const result = await updateCharity(api, data.id, data);

	if (result.type === 'error') {
		error(422, {
			errors: Object.fromEntries(
				Object.entries(result.errors).map(([key, value]) => [key, String(value)])
			)
		});
	}

	redirect(307, '/administration/charity');
});
