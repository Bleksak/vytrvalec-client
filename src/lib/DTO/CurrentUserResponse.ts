import type { ResponseError } from "$lib/ResponseErrors";
import type { UserResponse } from "./UserResponse";

export type CurrentUserError = ResponseError;

export type CurrentUserResponse = {
    type: 'success'
    response: UserResponse
} | {
    type: 'error',
    errors: Array<CurrentUserError>
};
