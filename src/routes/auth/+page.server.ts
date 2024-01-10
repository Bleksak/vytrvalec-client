import { login } from '$actions/Auth';
import { formDataToUserLoginDTO } from '$lib/DTO/UserLoginDTO';
import { fail, redirect, type Action } from '@sveltejs/kit';
import axios from 'axios';
import { register } from '$actions/Auth';
import { formDataToUserRegisterDTO } from '$lib/DTO/UserRegisterDTO';
import { type Actions } from '@sveltejs/kit';

const loginAction: Action = async ({ cookies, request }) => {
	const loginDTO = formDataToUserLoginDTO(await request.formData());

	if (loginDTO.type === 'error') {
		return fail(400, { login: loginDTO.value });
	}

	const result = await login(loginDTO.value);

	if (result.type === 'error') {
		return fail(400, { login: result.errors });
	}

	const token = result.response.token;
	cookies.set('jwt', token, { path: '/' });

	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const logoutAction: Action = ({ cookies }) => {
	cookies.delete('jwt', { path: '/' });
	axios.defaults.headers.common.Authorization = null;

	redirect(307, '/');
};

const registerAction: Action = async ({ request }) => {
	const registerDTO = formDataToUserRegisterDTO(await request.formData());

	if (registerDTO.type === 'error') {
		return fail(400, { register: registerDTO.value });
	}

	const result = await register(registerDTO.value);

	if (result.type === 'error') {
		return fail(400, { register: result.errors });
	}
};

export const actions: Actions = {
	login: loginAction,
	logout: logoutAction,
	register: registerAction
};
