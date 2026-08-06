<script lang="ts">
    import { deleteActivity } from '$actions/Activity';
    import Heading from '$components/Heading.svelte';
    import type { ActivityDTO } from '$lib/DTO/ActivityDTO';
    import Store from '$lib/enums/Stores';
    import type { ToastStore } from '$lib/stores/ToastStore.svelte';
    import { Delete, Pencil } from '@lucide/svelte';
    import { getContext } from 'svelte';

    const { data } = $props();

    const toastStore = getContext<ToastStore>(Store.TOAST_STORE);

    async function deleteButtonClick(activity: ActivityDTO): Promise<void> {
        if (!confirm('Opravdu chcete aktivitu smazat?')) {
            return;
        }

        const result = await deleteActivity(activity.id, data.api);

        if (!result) {
            toastStore.add({
                type: 'error',
                message: 'Aktivitu se nepodařilo odstranit',
            });

            return;
        }

        data.activities.delete(activity.id);

        toastStore.add({
            type: 'success',
            message: 'Aktivita byla úspěšně odstraněna',
        });
    }
</script>

<article>
    <Heading>
        <h1>Seznam aktivit</h1>
        <a role="button" href="/administration/activity/create">Nová aktivita</a>
    </Heading>

    <main>
        <table class="striped">
            <thead>
                <tr>
                    <th scope="col">Název</th>
                    <th scope="col">Ikonka</th>
                    <th scope="col">Min. převýšení (m)</th>
                    <th scope="col">Akce</th>
                </tr>
            </thead>
            <tbody>
                {#each data.activities.values() as activity}
                    <tr>
                        <td>{activity.name.cs}</td>
                        <td><img class="icon" src={activity.icon} alt="Ikonka" title="Ikonka" /></td
                        >
                        <td>{activity.min_elevation}</td>
                        <td>
                            <a href="/administration/activity/{activity.id}"><Pencil /></a>
                            <button
                                class="btn-no-style"
                                data-tooltip="Aktivitu s příspěvky nelze odstranit"
                                onclick={() => deleteButtonClick(activity)}
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
