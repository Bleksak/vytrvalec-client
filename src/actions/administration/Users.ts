import type { UserEditDTO } from '$lib/DTO/UserEditDTO';
import type { UserResponse, UserUpdateResponse } from '$lib/DTO/UserResponse';
import type { AxiosInstance, AxiosResponse } from 'axios';

export const fetchUser = async (api: AxiosInstance, user: number): Promise<AxiosResponse<UserResponse>> => {
	return await api.get(`/user/${user}`);
};

export const fetchUsers = async (api: AxiosInstance): Promise<Array<UserResponse>> => {
	return (await api.get('/user'))?.data ?? [];
};

export const updateUser = async (api: AxiosInstance, user: number, data: UserEditDTO): Promise<UserUpdateResponse> => {
	const response = await api.patch(`/user/${user}`, data)
		.catch((error) => {
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

	return { type: 'success' };
};
