<script lang="ts">
	import Widget from '$components/Widget.svelte';
	import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
	import type { CharityStore } from '$lib/stores/CharityStore.svelte';
	import type { SeasonStore } from '$lib/stores/SeasonStore.svelte';
	import { SeasonResult } from '$lib/DTO/SeasonResultDTO';
	import { getContext } from 'svelte';
	import { fetchSeasonResult } from '$actions/Season';
	import LL from '$translations/i18n-svelte';
	import type { UserStore } from '$lib/stores/UserStore.svelte';

	const { season } = $props<{ season: SeasonDTO }>();

	let seasonResult = $state<SeasonResult>();

	const seasonStore = getContext<SeasonStore>('seasonStore');
	const charityStore = getContext<CharityStore>('charityStore');
	const userStore = getContext<UserStore>('userStore');
	const charity = $derived(charityStore.get(season.charity));

	$effect(() => {
		Promise.all([fetchSeasonResult(season), userStore.promise()]).then(([result, users]) => {
			console.log('users');
			console.log(users);
			seasonResult = new SeasonResult(result, users);
		});
	});
</script>

<h4>
	Přehled sezóny: {season.start.toLocaleDateString('cs', { year: 'numeric', month: 'long' })}
</h4>

<div class="wrapper">
	<div class="season-data">
		<Widget title="Charita">
			<section class="charity">
				<h5>{charity?.name}</h5>
				<div class="charity-description">
					<p>{charity?.description}</p>
				</div>
			</section>
		</Widget>

		<Widget title="Sezóna">
			<section class="season-data">
				<p><strong>Začátek:&nbsp;</strong>{season.start.toLocaleDateString('cs')}</p>
				<p><strong>Konec:&nbsp;</strong>{season.end.toLocaleDateString('cs')}</p>
				<p><strong>Celková vzdálenost:&nbsp;</strong>{seasonResult?.getTotalDistance()} km</p>
				<!-- <p><strong>Celkové převýšení:&nbsp;</strong>{seasonResult.getTotalElevation()}</p> -->
			</section>
		</Widget>

		<Widget title="Extra body">
			<section class="extra-points">
				{#each seasonResult?.getExtraPoints() ?? [] as extraPoint}
					<p>{$LL.extraPoints[extraPoint.name as keyof typeof $LL.extraPoints]}</p>
				{:else}
					Zatím nejsou žádné
				{/each}
			</section>
		</Widget>
	</div>

	<div class="submissions"></div>
</div>

<style>
	.charity {
		display: flex;
		flex-direction: column;
	}

	.charity h5 {
		color: black;
	}

	.wrapper {
		display: flex;
		flex-direction: row;
		gap: 20px;
	}

	.season-data {
		flex: 1;
	}

	.submissions {
		flex: 1;
	}

	.season-data {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
</style>
