import axios, { AxiosError, type AxiosInstance } from 'axios';
import type { UserRegisterDTO } from '$lib/DTO/UserRegisterDTO';
import type { UserRegisterResponse } from '$lib/DTO/UserRegisterResponse';
import type { UserLoginDTO } from '$lib/DTO/UserLoginDTO';
import type { UserLoginResponse } from '$lib/DTO/UserLoginResponse';
import type { CurrentUserResponse } from '$lib/DTO/CurrentUserResponse';
import type { AccountChangeDTO, AccountChangeResponse } from '$lib/DTO/AccountChangeDTO';
import type {
    ForgottenPasswordDTO,
    ForgottenPasswordResponse,
} from '$lib/DTO/ForgottenPasswordDTO';
import type { ResetPasswordDTO, ResetPasswordResponse } from '$lib/DTO/ResetPasswordDTO';
import type { ConsentChangeDTO } from '$lib/DTO/ConsentChangeDTO';

export const login = async (
    api: AxiosInstance,
    loginDTO: UserLoginDTO,
): Promise<UserLoginResponse> => {
    const response = await api.post(`/user/login`, loginDTO).catch((error) => {
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

    return {
        type: 'success',
        response: response.data,
    };
};

export const register = async (
    api: AxiosInstance,
    registerDTO: UserRegisterDTO,
): Promise<UserRegisterResponse> => {
    const response = await api.post(`/user`, registerDTO).catch((error) => {
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

    if (response.status !== 201) {
        return {
            type: 'error',
            errors: response?.data ?? {},
        };
    }

    return { type: 'success' };
};

export const getCurrentUser = async (api: AxiosInstance): Promise<CurrentUserResponse> => {
    const response = await api.get(`/user/current`).catch((error: AxiosError) => {
        if (error.response) {
            return error.response;
        }

        return null;
    });

    if (response === null) {
        return {
            type: 'error',
            errors: ['server_down'],
        };
    }

    if (response.status !== 200) {
        return {
            type: 'error',
            errors: response?.data ?? {},
        };
    }

    return {
        type: 'success',
        data: response.data,
    };
};

export const accountChange = async (
    api: AxiosInstance,
    dto: AccountChangeDTO,
): Promise<AccountChangeResponse> => {
    const response = await api.patch(`/user/change`, dto).catch((error) => {
        if (error.response) {
            return error.response;
        }

        return null;
    });

    if (response === null) {
        return {
            type: 'error',
            errors: {
                auth: ['server_down'],
            },
        };
    }

    if (response.status !== 200) {
        return {
            type: 'error',
            errors: response.data,
        };
    }

    return { type: 'success' };
};

export const requestResetPassword = async (
    forgottenPasswordDTO: ForgottenPasswordDTO,
    lang: string,
    api: AxiosInstance,
): Promise<ForgottenPasswordResponse> => {
    const response = await api
        .post(`/user/password/${lang}`, forgottenPasswordDTO)
        .catch((error) => {
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

export const resetPassword = async (
    resetPasswordDTO: ResetPasswordDTO,
    api: AxiosInstance,
): Promise<ResetPasswordResponse> => {
    const response = await api.post(`/user/reset-password`, resetPasswordDTO).catch((error) => {
        if (error.response) {
            return error.response;
        }

        return null;
    });

    if (response === null) {
        return {
            type: 'error',
            errors: { server: ['server_down'] },
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

export const anonymizationChange = async (
    api: AxiosInstance,
    consentDTO: ConsentChangeDTO,
): Promise<ResetPasswordResponse> => {
    const response = await api.post(`/user/anonymize`, consentDTO).catch((error) => {
        if (error.response) {
            return error.response;
        }

        return null;
    });

    if (response === null) {
        return {
            type: 'error',
            errors: { server: ['server_down'] },
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

export const localeChange = async (
    locale: string,
    api: AxiosInstance,
): Promise<ResetPasswordResponse> => {
    const response = await api.patch(`/user/locale/${locale}`, { locale: locale }).catch((error) => {
        if (error.response) {
            return error.response;
        }

        return null;
    });

    if (response === null) {
        return {
            type: 'error',
            errors: { server: ['server_down'] },
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

export const emailSubscribeChange = async (value: boolean, api: AxiosInstance) => {
    const response = await api.patch(`/emailing`, { mailing: value }).catch((error) => {
        if (error.response) {
            return error.response;
        }

        return null;
    });

    if (response === null) {
        return {
            type: 'error',
            errors: { server: ['server_down'] },
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

export const accountDelete = async (api: AxiosInstance) => {
    const response = await api.delete(`/user`).catch((error) => {
        if (error.response) {
            return error.response;
        }

        return null;
    });

    if (response === null) {
        return {
            type: 'error',
            errors: { server: ['server_down'] },
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
