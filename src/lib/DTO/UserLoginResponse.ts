import type { ResponseErrorMap } from "$lib/ResponseErrors";
import type { UserLoginDTO } from "./UserLoginDTO";
import type { UserResponse } from "./UserResponse";

export type LoginResponseSuccess = UserResponse & {
    token: string;
};

export type LoginErrorMap = ResponseErrorMap<UserLoginDTO>;

export type UserLoginResponse = {
    type: 'success'
    response: LoginResponseSuccess
} | {
    type: 'error',
    errors: LoginErrorMap
};
