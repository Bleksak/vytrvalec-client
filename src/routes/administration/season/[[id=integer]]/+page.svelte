<script lang="ts">
	import { page } from '$app/stores';
	import SeasonCreate from '$components/administration/season/SeasonCreate.svelte';
	import SeasonOverview from '$components/administration/season/SeasonOverview.svelte';
	import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
	import Store from '$lib/enums/Stores';
	import type { SeasonStore } from '$lib/stores/SeasonStore.svelte';
	import { getContext } from 'svelte';

	const seasonStore = getContext<SeasonStore>(Store.SEASON_STORE);

	let season = $derived(seasonStore.get(Number($page.params.id)) ?? undefined);
</script>

<div>
	{#if season}
		<SeasonOverview {season} />
	{:else}
		<SeasonCreate />
	{/if}
</div>

