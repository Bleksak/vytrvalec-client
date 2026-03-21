<script lang="ts">
    import { page } from '$app/state';
    import SeasonOverview from '$components/administration/season/SeasonOverview.svelte';
    import Store from '$lib/enums/Stores';
    import type { SeasonStore } from '$lib/stores/SeasonStore.svelte';
    import { getContext } from 'svelte';

    const { data } = $props();

    const seasonStore = getContext<SeasonStore>(Store.SEASON_STORE);

    let season = $derived(seasonStore.get(Number(page.params.id)) ?? undefined);
</script>

<div>
    {#if season}
        <SeasonOverview {season} api={data.api} />
    {/if}
</div>
