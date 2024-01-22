import axios, { AxiosError } from 'axios';
import type { UserRegisterDTO } from '$lib/DTO/UserRegisterDTO';
import type { UserRegisterResponse } from '$lib/DTO/UserRegisterResponse';
import type { UserLoginDTO } from '$lib/DTO/UserLoginDTO';
import type { UserLoginResponse } from '$lib/DTO/UserLoginResponse';
import type { CurrentUserResponse } from '$lib/DTO/CurrentUserResponse';
import type { AccountChangeDTO, AccountChangeResponse } from '$lib/DTO/AccountChangeDTO';

export const login = async (loginDTO: UserLoginDTO): Promise<UserLoginResponse> => {
	const response = await axios.post(`/user/login`, loginDTO).catch((error) => {
		if (error.response) {
			return error.response;
		}

		return null;
	});

	if (response === null) {
		return {
			type: 'error',
			errors: { auth: ['server_down'] }
		};
	}

	if (response.status !== 200) {
		return {
			type: 'error',
			errors: response?.data ?? {}
		};
	}

	return {
		type: 'success',
		response: response.data
	};
};

export const register = async (registerDTO: UserRegisterDTO): Promise<UserRegisterResponse> => {
	const response = await axios.post(`/user`, registerDTO).catch((error) => {
		if (error.response) {
			return error.response;
		}

		return null;
	});

	if (response === null) {
		return {
			type: 'error',
			errors: { auth: ['server_down'] }
		};
	}

	if (response.status !== 201) {
		return {
			type: 'error',
			errors: response?.data ?? {}
		};
	}

	return { type: 'success' };
};

export const getCurrentUser = async (): Promise<CurrentUserResponse> => {
	const response = await axios.get(`/user/current`).catch((error: AxiosError) => {
		if (error.response) {
			return error.response;
		}

		return null;
	});

	if (response === null) {
		return {
			type: 'error',
			errors: ['server_down']
		};
	}

	if (response.status !== 200) {
		return {
			type: 'error',
			errors: response?.data ?? {}
		};
	}

	return {
		type: 'success',
		data: response.data
	};
};

export const accountChange = async (dto: AccountChangeDTO): Promise<AccountChangeResponse> => {
	const response = await axios.patch(`/user/change`, dto).catch((error) => {
		if (error.response) {
			return error.response;
		}

		return null;
	});

	if (response === null) {
		return {
			type: 'error',
			errors: {
				auth: ['server_down']
			}
		};
	}

	if (response.status !== 200) {
		return {
			type: 'error',
			errors: response.data
		};
	}

	return { type: 'success' };
};
