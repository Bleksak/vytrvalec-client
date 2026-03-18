<script lang="ts">
    import { deleteSeason } from '$actions/Season.js';
    import Heading from '$components/Heading.svelte';
    import type { SeasonDTO } from '$lib/DTO/SeasonDTO.js';
    import Store from '$lib/enums/Stores.js';
    import { type ToastStore } from '$lib/stores/ToastStore.svelte.js';
    import { Delete, Eye, SquarePen } from '@lucide/svelte';
    import { getContext } from 'svelte';

    const { data } = $props();

    const toastStore = getContext<ToastStore>(Store.TOAST_STORE);

    function deleteButtonClick(season: SeasonDTO): void {
        deleteSeason(season, data.api).then(() => {
            data.seasons.delete(season.id);

            toastStore.add({
                message: 'Sezóna byla úspěšně odstraněna',
                type: 'success',
            });
        });
    }
</script>

<article>
    <Heading>
        <h1>Seznam sezón</h1>
        <a role="button" href="/administration/season/create">Nová sezóna</a>
    </Heading>

    <main>
        <table class="striped">
            <thead>
                <tr>
                    <th scope="col">Začátek</th>
                    <th scope="col">Konec</th>
                    <th scope="col">Charita</th>
                    <th scope="col">Akce</th>
                </tr>
            </thead>
            <tbody>
                {#each data.seasons.values() as season}
                    <tr>
                        <td>{season.start.toLocaleDateString('cs')}</td>
                        <td>{season.end.toLocaleDateString('cs')}</td>
                        <td>
                            <a href="/administration/charity/{season.charity.id}">
                                {season.charity.name.cs}
                            </a>
                        </td>
                        <td>
                            <a title="Detail" href="/administration/season/{season.id}"><Eye /></a>
                            <a title="Upravit" href="/administration/season/{season.id}/edit">
                                <SquarePen />
                            </a>
                            <button
                                class="btn-no-style"
                                disabled={!season.can_delete}
                                onclick={() => deleteButtonClick(season)}
                            >
                                <Delete class="selection-color" />
                            </button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </main>
</article>
