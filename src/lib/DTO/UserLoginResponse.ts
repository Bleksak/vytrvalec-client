import type { ResponseErrorMap } from "$lib/ResponseErrors";
import type { UserLoginDTO } from "./UserLoginDTO";
import type { UserResponse } from "./UserResponse";

export type LoginResponseSuccess = {
    token: string;
    user: UserResponse
};

export type LoginErrorMap = ResponseErrorMap<UserLoginDTO>;

export type UserLoginResponse = {
    type: 'success'
    response: LoginResponseSuccess
} | {
    type: 'error',
    errors: LoginErrorMap
};
