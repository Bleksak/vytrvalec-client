<script lang="ts">
	import { page } from '$app/stores';
	import SeasonCreate from '$components/administration/season/SeasonCreate.svelte';
	import SeasonOverview from '$components/administration/season/SeasonOverview.svelte';
	import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
	import type { SeasonStore } from '$lib/stores/SeasonStore.svelte';
	import { getContext } from 'svelte';

	let season = $state<SeasonDTO>();

	const seasonStore = getContext<SeasonStore>('seasonStore');

	$effect(() => {
		season = seasonStore.get(Number($page.params.id)) ?? undefined;
	});
</script>

{#if season}
	<SeasonOverview {season} />
{:else}
	<SeasonCreate />
{/if}
