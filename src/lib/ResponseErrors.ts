export type ResponseError =
	| 'blank'
	| 'invalid'
	| 'weak'
	| 'not_unique'
	| 'logged_in'
	| 'too_large'
	| 'negative'
	| 'server_down';

export type ResponseErrorMap<T> = {
	[K in keyof T]?: Array<ResponseError>;
};
