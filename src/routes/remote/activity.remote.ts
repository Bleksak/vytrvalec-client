import qs from 'qs';
import { form } from '$app/server';
import { CreateActivityType, type CreateActivityResponseDTO } from '$lib/DTO/ActivityDTO';
import { error, type RemoteForm } from '@sveltejs/kit';
import { type } from 'arktype';

export const createActivityAction: RemoteForm<CreateActivityResponseDTO> =
	form<CreateActivityResponseDTO>(async (formData) => {
		const value = qs.parse(new URLSearchParams(formData as any).toString());
		const data = CreateActivityType(value);

		if (data instanceof type.errors) {
			console.log(Object.fromEntries(data.entries()));
			const errors = Object.fromEntries(data.map((err) => [err.path.toString(), err.message]));

			error(422, { errors });
		}

		return {
			id: 1,
			min_elevation: 0,
			name: 'asdf',
			visible: false
		};
	});
