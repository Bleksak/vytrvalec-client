import { type } from 'arktype';
import { UserResponseDto } from '$lib/DTO/UserResponse';
import type { UserResponse, UserUpdateResponse } from '$lib/DTO/UserResponse';
import type { UserEditDTO } from '$lib/DTO/UserEditDTO';
import type { AxiosInstance, AxiosResponse } from 'axios';

export const UserPaginatedResponseType = type({
    data: UserResponseDto.array(),
    total: 'number',
    page: 'number',
    limit: 'number',
});

export type UserPaginatedResponse = typeof UserPaginatedResponseType.infer;

export const fetchUser = async (
    api: AxiosInstance,
    user: number,
): Promise<AxiosResponse<UserResponse>> => {
    return await api.get(`/user/${user}`);
};

export const fetchUsersPaginated = async (
    api: AxiosInstance,
    page: number = 1,
    limit: number = 25,
    search: string = '',
): Promise<UserPaginatedResponse> => {
    return (
        (await api.get('/user', { params: { page, limit, search } }))?.data ?? {
            data: [],
            total: 0,
            page: 1,
            limit,
        }
    );
};

export const updateUser = async (
    api: AxiosInstance,
    user: number,
    data: UserEditDTO,
): Promise<UserUpdateResponse> => {
    const response = await api.patch(`/user/${user}`, data).catch((error) => {
        if (error.response) {
            return error.response;
        }

        return null;
    });

    if (response === null) {
        return {
            type: 'error',
            errors: { auth: ['server_down'] },
        };
    }

    if (response.status !== 200) {
        return {
            type: 'error',
            errors: response?.data ?? {},
        };
    }

    return { type: 'success' };
};
