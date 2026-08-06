<script lang="ts">
    import { deleteFaculty } from '$actions/Faculty';
    import Heading from '$components/Heading.svelte';
    import type { FacultyDTO } from '$lib/DTO/FacultyDTO';
    import Store from '$lib/enums/Stores';
    import type { ToastStore } from '$lib/stores/ToastStore.svelte';
    import { Delete, Edit } from '@lucide/svelte';
    import { getContext } from 'svelte';

    const { data } = $props();

    const toastStore = getContext<ToastStore>(Store.TOAST_STORE);

    async function deleteButtonClick(faculty: FacultyDTO): Promise<void> {
        if (!confirm('Opravdu chcete pracoviště smazat?')) {
            return;
        }

        const result = await deleteFaculty(data.api, faculty.id);

        if (!result) {
            toastStore.add({
                type: 'error',
                message: 'Pracoviště se nepodařilo odstranit',
            });

            return;
        }

        data.faculties.delete(faculty.id);

        toastStore.add({
            type: 'success',
            message: 'Pracoviště bylo úspěšně odstraněno',
        });
    }
</script>

<article>
    <Heading>
        <h1>Seznam pracovišť</h1>
        <a role="button" href="/administration/faculty/create">Nové pracoviště</a>
    </Heading>

    <main>
        <table class="striped">
            <thead>
                <tr>
                    <th scope="col">Název</th>
                    <th scope="col">Zkratka</th>
                    <th scope="col">Barva</th>
                    <th scope="col">Akce</th>
                </tr>
            </thead>
            <tbody>
                {#each data.faculties.values() as faculty}
                    <tr>
                        <td>{faculty.name?.cs ?? ''}</td>
                        <td>{faculty.shortcut}</td>
                        <td>
                            <span
                                style="display:block; width: 25px; height: 25px;"
                                style:background-color={faculty.color}
                            >
                            </span>
                        </td>
                        <td>
                            <a href="/administration/faculty/{faculty.id}"><Edit /></a>
                            <button
                                class="btn-no-style"
                                data-tooltip="Pracoviště s uživateli nelze odstranit"
                                onclick={() => deleteButtonClick(faculty)}
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
