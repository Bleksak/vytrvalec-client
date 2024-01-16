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
	import SubmissionScroller from './SubmissionScroller.svelte';
	import { fetchActivities } from '$actions/Activity';

	const { season } = $props<{ season: SeasonDTO }>();

	let seasonResult = $state<SeasonResult>();

	const seasonStore = getContext<SeasonStore>('seasonStore');
	const charityStore = getContext<CharityStore>('charityStore');
	const userStore = getContext<UserStore>('userStore');
	const charity = $derived(charityStore.get(season.charity));

	$effect(() => {
		Promise.all([fetchSeasonResult(season), userStore.promise(), fetchActivities()]).then(
			([result, users, activities]) => {
				seasonResult = new SeasonResult(result, users, activities);
			}
		);
	});
</script>

<h4>
	Přehled sezóny: {season.start.toLocaleDateString('cs', { year: 'numeric', month: 'long' })}
</h4>

<div class="wrapper">
	<div class="season-wrapper">
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
						<p>
							<strong>{extraPoint.user.firstName} {extraPoint.user.lastName}</strong>
							({extraPoint.user.faculty.shortcut}): {$LL.extraPoints[extraPoint.name as keyof typeof $LL.extraPoints]()}
						</p>
						<p>Počet získaných bodů: {extraPoint.points}</p>
						<p>V aktivitě: {extraPoint.activity.name}</p>
						{#if extraPoint.name === 'weekly_distance'}
							<p>Za: {extraPoint.value / 1000} km</p>
						{:else if extraPoint.name === 'daily_distance'}
							<p>Za: {extraPoint.value / 1000} km</p>
						{:else if extraPoint.name === 'weekly_elevation'}
							<p>Za: {extraPoint.value} m</p>
						{/if}
					{:else}
						Zatím nejsou žádné
					{/each}
				</section>
			</Widget>
		</div>
	</div>

	<div class="submissions">
		<Widget title="Aktivity">
			<section class="submissions-content">
				<SubmissionScroller {season} />
			</section>
		</Widget>
	</div>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: 2fr 3fr;
		gap: 20px;
	}

	.charity {
		display: flex;
		flex-direction: column;
	}

	.charity h5 {
		color: black;
	}

	.season-wrapper {
		flex: 1;
	}

	.season-data {
		position: sticky;
		top: 0;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.submissions {
		flex: 1;
	}

	.submissions-content {
		display: flex;
		flex-direction: column;

		gap: 30px;
	}
</style>
