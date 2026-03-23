<script lang="ts">
    import UserEditor from '$components/administration/user/UserEditor.svelte';
    import { getAllContexts, getContext } from 'svelte';
    import type { UserStore } from '$lib/stores/UserStore.svelte';
    import type { DialogStore } from '$lib/stores/DialogStore.svelte';
    import Store from '$lib/enums/Stores';
    import { UserRole } from '$lib/DTO/UserRole';
    import { ChevronLeft, ChevronRight, Pencil } from '@lucide/svelte';
    import Heading from '$components/Heading.svelte';

    const userStore = getContext<UserStore>(Store.USER_STORE);
    const dialogStore = getContext<DialogStore>(Store.DIALOG_STORE);

    const context = getAllContexts();

    let searchText = $state('');
    let searchTimeout: ReturnType<typeof setTimeout>;

    const onSearchInput = () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            userStore.loadPage(1, searchText);
        }, 300);
    };

    const prevPage = () => {
        if (userStore.currentPage() > 1) {
            userStore.loadPage(userStore.currentPage() - 1, userStore.currentSearch());
        }
    };

    const nextPage = () => {
        if (userStore.currentPage() < userStore.totalPages()) {
            userStore.loadPage(userStore.currentPage() + 1, userStore.currentSearch());
        }
    };
</script>

<article>
    <Heading>
        <h1>Správa uživatelů</h1>
    </Heading>

    <main>
        <input
            placeholder="Vyhledat uživatele (dle jména, e-mailu, či fakulty)"
            type="text"
            bind:value={searchText}
            oninput={onSearchInput}
        />

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th scope="col">Jméno</th>
                        <th scope="col">Příjmení</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Fakulta</th>
                        <th scope="col">Zablokován</th>
                        <th scope="col">Administrátor</th>
                        <th scope="col">Akce</th>
                    </tr>
                </thead>

                <tbody>
                    {#if userStore.isLoading()}
                        <tr>
                            <td colspan="7">Načítání...</td>
                        </tr>
                    {:else}
                        {#each userStore.all() as user}
                            <tr>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.faculty.shortcut}</td>
                                <td>
                                    <input type="checkbox" checked={user.banned} disabled />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={user.roles.includes(UserRole.Staff)}
                                        disabled
                                    />
                                </td>
                                <td>
                                    <button
                                        class="edit-btn"
                                        onclick={() =>
                                            dialogStore.open(UserEditor, { user: user }, context)}
                                    >
                                        <Pencil size={16} />
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    {/if}
                </tbody>
            </table>
        </div>

        <div class="pagination">
            <button
                onclick={prevPage}
                disabled={userStore.currentPage() <= 1 || userStore.isLoading()}
                aria-label="Předchozí strana"
            >
                <ChevronLeft size={18} />
            </button>

            <span>
                Strana <strong>{userStore.currentPage()}</strong> z
                <strong>{userStore.totalPages()}</strong>
                <span class="pagination-total"> - {userStore.total()} uživatelů</span>
            </span>

            <button
                onclick={nextPage}
                disabled={userStore.currentPage() >= userStore.totalPages() || userStore.isLoading()}
                aria-label="Následující strana"
            >
                <ChevronRight size={18} />
            </button>
        </div>
    </main>
</article>

<style>
    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.25rem;
        padding: 0.75rem 1.5rem;
        margin-top: 1rem;
    }

    .pagination-total {
        font-weight: 400;
        color: var(--pico-muted-color);
    }
</style>
