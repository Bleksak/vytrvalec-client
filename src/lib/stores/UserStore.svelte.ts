import { fetchUsersPaginated } from '$actions/administration/Users';
import type { UserResponse } from '$lib/DTO/UserResponse';
import type { AxiosInstance } from 'axios';

const PAGE_SIZE = 25;

export type UserStore = {
    get: (id: number) => UserResponse | null;
    all: () => Array<UserResponse>;
    update: (user: UserResponse) => void;
    loadPage: (page: number, newSearch?: string) => Promise<void>;
    currentPage: () => number;
    totalPages: () => number;
    total: () => number;
    currentSearch: () => string;
    isLoading: () => boolean;
};

export const createUserStore = (api: AxiosInstance): UserStore => {
    let users = $state<Array<UserResponse>>([]);
    let page = $state(1);
    let total = $state(0);
    let search = $state('');
    let loading = $state(true);

    async function loadPage(newPage: number, newSearch: string = search): Promise<void> {
        loading = true;
        try {
            const result = await fetchUsersPaginated(api, newPage, PAGE_SIZE, newSearch);
            users = result.data ?? [];
            page = result.page ?? newPage;
            total = result.total ?? 0;
            search = newSearch;
        } finally {
            loading = false;
        }
    }

    loadPage(1, '');

    return {
        get: (id) => (Number.isNaN(id) ? null : (users.find((u) => u.id === id) ?? null)),
        all: () => users,
        update: (user) => {
            const index = users.findIndex((u) => u.id === user.id);
            if (index !== -1) users[index] = user;
        },
        loadPage,
        currentPage: () => page,
        totalPages: () => Math.ceil(total / PAGE_SIZE),
        total: () => total,
        currentSearch: () => search,
        isLoading: () => loading,
    };
};

export default createUserStore;
