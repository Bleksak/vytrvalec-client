import { createFaculty } from '$actions/Faculty';
import { form, getRequestEvent } from '$app/server';
import { FacultyCreateType, type FacultyDTO } from '$lib/DTO/FacultyDTO';
import { error, redirect, type RemoteForm } from '@sveltejs/kit';
import { ArkErrors } from 'arktype';
import qs from 'qs';

export const createFacultyAction: RemoteForm<FacultyDTO> = form<FacultyDTO>(async (formData) => {
	const value = qs.parse(new URLSearchParams(formData as any).toString());
	const data = FacultyCreateType(value);

	const api = getRequestEvent().locals.axios;

	if (data instanceof ArkErrors) {
		const errors = Object.fromEntries(data.map((err) => [err.path.toString(), err.message]));

		error(422, { errors });
	}

	const result = await createFaculty(api, data);

	if (result.type === 'error') {
		error(422, {
			errors: Object.fromEntries(
				Object.entries(result.errors).map(([key, value]) => [key, String(value)])
			)
		});
	}

	redirect(307, '/administration/faculty');
});

export const updateActivityAction: RemoteForm<FacultyDTO> = form<FacultyDTO>(async (formData) => {
	const value = qs.parse(new URLSearchParams(formData as any).toString());
	const data = FacultyUpdateType(value);

	if (data instanceof ArkErrors) {
		const errors = Object.fromEntries(data.map((err) => [err.path.toString(), err.message]));

		error(422, { errors });
	}

	const api = getRequestEvent().locals.axios;
	const result = await updateActivity(api, data.id, data);

	if (result.type === 'error') {
		error(422, {
			errors: Object.fromEntries(
				Object.entries(result.errors).map(([key, value]) => [key, String(value)])
			)
		});
	}

	return redirect(307, '/administration/activity');
});
