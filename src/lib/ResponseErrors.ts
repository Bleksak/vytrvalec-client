export type ResponseError =
    | 'blank'
    | 'invalid'
    | 'weak'
    | 'not_unique'
    | 'logged_in'
    | 'too_large'
    | 'negative'
    | 'server_down'
    | 'different'
    | 'user_not_found'
    | 'mismatch_updated_at'
    | 'password_mismatch';

export type ResponseErrorMap<T> = {
    [K in keyof T]?: Array<ResponseError>;
};
