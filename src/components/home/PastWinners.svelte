<script lang="ts">
	import { fetchActivities } from '$actions/Activity';
	import { fetchFaculties } from '$actions/Faculty';
	import { fetchPastSeasons, fetchSeasonResult } from '$actions/Season';
	import Select from '$components/FormComponent/Select.svelte';
	import type { FullSeasonDTO } from '$lib/DTO/SeasonDTO';
	import { SeasonResult } from '$lib/DTO/SeasonResultDTO';
	import LL from '$translations/i18n-svelte';

	let seasonResults = $state.raw<Map<number, SeasonResult>>(new Map());

	const seasonsPromise = fetchPastSeasons();
	const activitiesPromise = fetchActivities();
	const facultiesPromise = fetchFaculties();

	let currentSelection = $state<number>();
	let currentSeason = $state<FullSeasonDTO>();

	$effect(() => {
		if (!currentSelection) {
			return;
		}

		Promise.all([seasonsPromise, activitiesPromise, facultiesPromise]).then(
			([seasons, activities, faculties]) => {
				currentSeason = seasons.find((season) => season?.id === currentSelection)!;

				if (seasonResults.has(currentSelection!)) {
					return;
				}

				fetchSeasonResult(currentSeason).then((result) => {
					seasonResults.set(currentSelection!, new SeasonResult(result, [], activities, faculties));
					seasonResults = new Map(seasonResults);
				});
			}
		);
	});
</script>

{#await seasonsPromise then seasons}
	{#if seasons.length > 0}
		<div class="past-winners-wrapper">
			<div class="past-winners">
				<h1>{$LL.homepage.past_seasons()}</h1>
				<div class="selection-wrapper">
					<label class="season-select-label" for="season-select"
						>{$LL.homepage.current_year()}:
					</label>
					<Select
						id="season-select"
						keys={seasons.map((season) =>
							season.start.toLocaleDateString('cs', { year: 'numeric', month: 'short' })
						)}
						values={seasons.map((season) => season.id)}
						bind:currentValue={currentSelection}
						inverted
					/>
				</div>
				<div class="item">
					{#key currentSelection}
						<article class="charity">
							<header>
								<h2>{$LL.homepage.charity()}</h2>
								<h3>{currentSeason?.charity?.name}</h3>
							</header>
							<section class="content">
								<p>
									{currentSeason?.charity?.description}
								</p>
							</section>
						</article>
						{#if seasonResults.has(currentSelection!)}
							{@const     seasonResult = seasonResults.get(currentSelection!)}
							{@const winners = seasonResult?.getTotalWinners().slice(0, 3) ?? []}
							{#await facultiesPromise then faculties}
								<div class="winners-wrapper">
									<div class="winners">
										{#if winners.length >= 2}
											{@const    faculty = faculties.find((faculty) => faculty.id === winners[1].faculty)!}
											<div class="winner">
												<span>
													{$LL.faculties[faculty.shortcut as keyof typeof $LL.faculties]()}
												</span>
												<div class="bar bar-medium"></div>
											</div>
										{/if}

										{#if winners.length >= 1}
											{@const    faculty = faculties.find((faculty) => faculty.id === winners[0].faculty)!}
											<div class="winner">
												<span>
													{$LL.faculties[faculty.shortcut as keyof typeof $LL.faculties]()}
												</span>
												<div class="bar bar-large"></div>
											</div>
										{/if}

										{#if winners.length >= 3}
											{@const    faculty = faculties.find((faculty) => faculty.id === winners[2].faculty)!}
											<div class="winner">
												<span>
													{$LL.faculties[faculty.shortcut as keyof typeof $LL.faculties]()}
												</span>
												<div class="bar bar-small"></div>
											</div>
										{/if}
									</div>
								</div>
							{/await}
						{/if}
					{/key}
				</div>
			</div>
		</div>
	{/if}
{/await}

<style>
	.season-select-label {
		font-size: 1.5rem;
		color: white;
	}

	.selection-wrapper {
		display: flex;
		flex-direction: row;
		flex: 1;
		align-items: center;

		align-self: flex-start;
		max-width: 250px;
		width: 100%;
		gap: 10px;
	}

	.past-winners-wrapper {
		background-color: #005cab;
		width: 100%;
	}

	.past-winners {
		display: flex;
		flex-direction: column;
		align-items: center;

		background-color: #005cab;
		/* padding: 20px 100px; */
		max-width: 1600px;
		margin: 0 auto;
		width: 100%;
	}

	.past-winners h1,
	.past-winners h2,
	.past-winners h3 {
		color: white;
		font-weight: bold;
	}

	.past-winners p {
		color: white;
	}

	.item {
		margin-top: 30px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	}

	.charity {
		max-width: 600px;
		width: 100%;
	}

	.winners-wrapper {
		display: flex;
		justify-content: flex-start;
	}

	.winners {
		display: flex;
		align-items: flex-end;
	}

	.winners .bar {
		width: 80px;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		background-color: white;
	}
	.winners .bar::after {
		display: flex;
		justify-content: center;
		margin-top: 25px;
		font-weight: 500;
		color: #005cab;
		font-size: 1.5rem;
	}
	.winners .bar-medium {
		height: 130px;
	}
	.winners .bar-medium::after {
		content: '2';
	}
	.winners .bar-small {
		height: 90px;
	}
	.winners .bar-small::after {
		content: '3';
	}
	.winners .bar-large {
		height: 210px;
	}
	.winners .bar-large::after {
		content: '1';
	}
	.winners .winner {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 150px;
		gap: 10px;
	}
	.winners .winner span {
		text-align: center;
		color: white;
		font-weight: 500;
		font-size: 1.2rem;
	}

	@media (max-width: 1200px) {
		.item {
			margin-top: 50px;
			flex-direction: column;
			align-items: center;
			gap: 100px;
		}

		.winner span {
			text-align: center;
			white-space: wrap;
		}

		.past-winners {
			padding-inline: 30px;
		}
	}
</style>
