export type ResponseError = 'blank' | 'invalid' | 'weak' | 'not_unique' | 'logged_in';

export type ResponseErrorMap<T> = {
    [K in keyof T]?: Array<ResponseError>;
};

