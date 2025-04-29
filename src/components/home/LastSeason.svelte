<script lang="ts">
	import { SeasonResult } from '$lib/DTO/SeasonResultDTO';
	import SeasonDetail from './SeasonDetail.svelte';
	import { getContext } from 'svelte';
	import Store from '$lib/enums/Stores';
	import type { SeasonStore } from '$lib/stores/SeasonStore.svelte';
	import type { ActivityStore } from '$lib/stores/ActivityStore.svelte';
	import type { CharityStore } from '$lib/stores/CharityStore.svelte';

	const seasonStore: SeasonStore = getContext(Store.SEASON_STORE);
	const charityStore: CharityStore = getContext(Store.CHARITY_STORE);
	const activityStore: ActivityStore = getContext(Store.ACTIVITY_STORE);

	const season = $derived(seasonStore.currentOrLast());

	let seasonResult = $state<SeasonResult | null>(null);

	const charity = $derived.by(() => {
		if (season === null) {
			return null;
		}

		return charityStore.get(season.charity);
	});

	$effect(() => {
		if (season === null) {
			return;
		}

		seasonStore.getSeasonResult(season).then((result) => {
			seasonResult = new SeasonResult(result, activityStore.all());
		});
	});
</script>

{#if season !== null && charity !== null && seasonResult !== null}
	<SeasonDetail {season} result={seasonResult} {charity} />
{/if}

