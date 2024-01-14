import { fetchUsers } from '$actions/administration/Users';
import type { UserResponse } from '$lib/DTO/UserResponse';

export type UserStore = {
	get: (id: number) => UserResponse | null;
	promise: () => Promise<Array<UserResponse>>;
	all: () => Array<UserResponse>;
	update: (season: UserResponse) => void;
};

export const createUserStore = (): UserStore => {
	let users = $state<Array<UserResponse>>([]);
	const usersPromise = fetchUsers();

	usersPromise.then((result) => {
		users = result;
	});

	const get = (id: number): UserResponse | null => {
		if (Number.isNaN(id)) {
			return null;
		}

		return users.find((user) => user.id === id) ?? null;
	};

	const all = (): Array<UserResponse> => {
		return users;
	};

	const update = (user: UserResponse) => {
		let item = users.find((c) => c.id === user.id);

		if (item !== undefined) {
			item = { ...user };
		}
	};

	const promise = () => usersPromise;

	return {
		get: get,
		promise: promise,
		all: all,
		update: update
	};
};

export default createUserStore;
