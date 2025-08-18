import qs from 'qs';
import { form, getRequestEvent } from '$app/server';
import { ActivityUpdateType, CreateActivityType, UpdateActivityType, type ActivityDTO } from '$lib/DTO/ActivityDTO';
import { error, redirect, type RemoteForm } from '@sveltejs/kit';
import { createActivity, updateActivity } from '$actions/Activity';
import axios from 'axios';
import { ArkErrors } from 'arktype';
import { FacultyUpdateType } from '$lib/DTO/FacultyDTO';

export const createActivityAction: RemoteForm<ActivityDTO> = form<ActivityDTO>(async (formData) => {
	const value = qs.parse(new URLSearchParams(formData as any).toString());
	const data = CreateActivityType(value);

	if (data instanceof ArkErrors) {
		const errors = Object.fromEntries(data.map((err) => [err.path.toString(), err.message]));

		error(422, { errors });
	}

	const api = getRequestEvent().locals.axios;
	const result = await createActivity(api, data);

	if (result.type === 'error') {
		error(422, {
			errors: Object.fromEntries(
				Object.entries(result.errors).map(([key, value]) => [key, String(value)])
			)
		});
	}

	redirect(307, '/administration/activity');
});

export const updateActivityAction: RemoteForm<ActivityDTO> = form<ActivityDTO>(async (formData) => {
	const value = qs.parse(new URLSearchParams(formData as any).toString());
	const data = ActivityUpdateType(value);

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

