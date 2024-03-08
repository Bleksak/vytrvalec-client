import type { UserEditDTO } from '$lib/DTO/UserEditDTO';
import type { UserResponse, UserUpdateResponse } from '$lib/DTO/UserResponse';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

export const fetchUser = async (user: number): Promise<AxiosResponse<UserResponse>> => {
	return await axios.get(`/user/${user}`);
};

export const fetchUsers = async (): Promise<Array<UserResponse>> => {
	return (await axios.get('/user'))?.data ?? [];
};

export const updateCurrentUser = async (data: UserEditDTO) => {
	return await axios.patch(`/user`, data);
};

export const updateUser = async (user: number, data: UserEditDTO): Promise<UserUpdateResponse> => {
	const response = await axios.patch(`/user/${user}`, data)
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
