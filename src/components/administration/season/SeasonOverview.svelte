<script lang="ts">
	import Widget from '$components/Widget.svelte';
	import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
	import type { CharityStore } from '$lib/stores/CharityStore.svelte';
	import type { SeasonStore } from '$lib/stores/SeasonStore.svelte';
	import { SeasonResult } from '$lib/DTO/SeasonResultDTO';
	import { getContext } from 'svelte';
	import { createSeasonCache, fetchSeasonResult } from '$actions/Season';
	import LL from '$translations/i18n-svelte';
	import type { UserStore } from '$lib/stores/UserStore.svelte';
	import SubmissionScroller from './SubmissionScroller.svelte';
	import { fetchActivities } from '$actions/Activity';
	import Button from '$components/Button.svelte';
	import { goto } from '$app/navigation';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import Store from '$lib/enums/Stores';

	const { season } = $props<{ season: SeasonDTO }>();

	let seasonResult = $state<SeasonResult>();

	const seasonStore = getContext<SeasonStore>(Store.SEASON_STORE);
	const charityStore = getContext<CharityStore>(Store.CHARITY_STORE);
	const userStore = getContext<UserStore>(Store.USER_STORE);
	const toastStore = getContext<ToastStore>(Store.TOAST_STORE);
	const charity = $derived(charityStore.get(season.charity));

	let seasonCacheResult = $state<boolean>();
	let seasonRemoveResult = $state<boolean>();

	const endSeason = () => {
		createSeasonCache(season).then((result: boolean) => {
			seasonCacheResult = result;
		});
	};

	const removeSeason = () => {
		if (confirm('Opravdu chcete odstranit tuto sezónu? Akce je nevratná!')) {
			seasonStore.remove(season).then((result) => {
				if (result) {
					toastStore.add({
						type: 'success',
						message: 'Sezóna odstraněna'
					});
					goto('/administration/season');
				} else {
					toastStore.add({
						type: 'error',
						message: 'Nastala chyba při odstranění sezóny'
					});
					seasonRemoveResult = false;
				}
			});
		}
	};

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
					{#if season.end <= new Date()}
						<Button onclick={endSeason}>Uzavřít sezónu</Button>
						{#if seasonCacheResult !== undefined}
							{#if seasonCacheResult}
								<span class="note">Sezóna byla uzavřena</span>
							{:else}
								<span class="note">Chyba při uzavírání sezóny</span>
							{/if}
						{/if}
					{/if}
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

			{#if seasonResult?.getTotalDistance() === 0}
				<Widget title="Odstranit sezónu">
					<section class="season-delete">
						<Button type="button" onclick={removeSeason}>Odstranit sezónu</Button>
						{#if seasonRemoveResult === false}
							<span class="note">Sezónu nelze odstranit, jelikož již obsahuje aktivity</span>
						{/if}
					</section>
				</Widget>
			{/if}
		</div>
	</div>

	{#key season.id}
		<div class="submissions">
			<Widget title="Aktivity">
				<section class="submissions-content">
					<SubmissionScroller {season} />
				</section>
			</Widget>
		</div>
	{/key}
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
