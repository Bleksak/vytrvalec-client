import type { UserResponse } from "./UserResponse";
import type {AxiosError} from "axios";


export type LoggedUserResponse = {
    type: 'success'
    response: UserResponse
} | {
    type: 'error',
    errors: AxiosError //TODO
};
