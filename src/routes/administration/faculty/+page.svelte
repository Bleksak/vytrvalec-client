<script lang="ts">
    import Heading from '$components/Heading.svelte';
    import { Edit } from '@lucide/svelte';

    const { data } = $props();
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
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </main>
</article>
