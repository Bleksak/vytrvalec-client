<script lang="ts">
	import ResultsChart from '$components/ResultsChart.svelte';
	import Select from '$components/FormComponent/Select.svelte';
	import LL from '$translations/i18n-svelte';
	import { fetchSeasonResult, fetchSeasons } from '$actions/Season';
	import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
	import type { Faculty } from '$lib/DTO/Faculty';
	import type { ActivityDTO } from '$lib/DTO/ActivityDTO';
	import { SeasonResult } from '$lib/DTO/SeasonResultDTO';
	import { fetchActivities } from '$actions/Activity';
	import { fetchFaculties } from '$actions/Faculty';

	let currentSeason = $state<SeasonDTO>();
	let activitiesPromise = fetchActivities();
	let facultiesPromise = fetchFaculties();

	let activities = $state<Array<ActivityDTO>>([]);
	let faculties = $state<Array<Faculty>>([]);

	let currentWeek = $state<number>(0);
	let currentSeasonResults = $state<SeasonResult>();
	let currentSeasonResultsArray = $derived(
		currentSeasonResults?.getResultsForWeek(currentWeek) ?? []
	);

	let currentSeasonResultsPromise = $derived(
		currentSeason
			? Promise.all([activitiesPromise, facultiesPromise, fetchSeasonResult(currentSeason)])
			: undefined
	);

	$effect(() => {
		if (currentSeasonResultsPromise) {
			currentSeasonResultsPromise
				.then(([fetchedActivities, fetchedFaculties, results]) => {
					activities = fetchedActivities;
					faculties = fetchedFaculties;
					currentSeasonResults = new SeasonResult(
						results!,
						undefined,
						fetchedActivities,
						fetchedFaculties
					);
				})
				.catch(() => (currentSeasonResults = undefined));
		}
	});

	const weekPickerKeys = [
		$LL.results.week_picker[0](),
		$LL.results.week_picker[1](),
		$LL.results.week_picker[2](),
		$LL.results.week_picker[3](),
		$LL.results.week_picker[4]()
	];

	const weekPickerValues = [0, 1, 2, 3, 4];
</script>

<main>
	<header>
		<h1>{$LL.results.title()}</h1>
	</header>

	{#await fetchSeasons()}
		Načítání...
	{:then seasons}
		{@const seasonKeys = seasons.map((season) =>
			season.start.toLocaleDateString('cs', { year: 'numeric', month: 'long' })
		)}

		<section class="pickers">
			<Select
				id="week_picker"
				keys={weekPickerKeys}
				values={weekPickerValues}
				bind:currentValue={currentWeek}
			/>
			<Select
				id="year_picker"
				keys={seasonKeys}
				values={seasons}
				bind:currentValue={currentSeason}
			/>
		</section>
		<div class="title-wrapper">
			{#each currentSeasonResultsArray as result}
				{@const activity = activities.find((activity) => activity.id === result.activity)}
				<h2>{activity?.name}</h2>
				<div class="wrapper">
					<section class="table">
						<div class="results-table">
							<header class="row">
								<span>{$LL.results.faculty()}</span>
								<span class="right">{$LL.results.distance()} (km)</span>
								<span class="right">{$LL.results.points()}</span>
							</header>
							{#each result.row as row}
								{@const faculty = faculties.find((faculty) => faculty.id === row.faculty)}
								<div class="row">
									<span>{faculty?.name}</span>
									<span class="right">{(row.distance / 1000).toFixed(1)}</span>
									<span class="right">{row.points}</span>
								</div>
							{/each}
						</div>
					</section>

					<section class="graph">
						{#key (currentSeason?.id ?? 0) * seasons.length + currentWeek}
							<ResultsChart {faculties} results={result.row} />
						{/key}
					</section>
				</div>
			{:else}
				<h3>{$LL.results.no_results()}</h3>
			{/each}
		</div>
	{/await}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin: 0 auto;
        max-width: 1600px;
        width: 100%;
	}

	.pickers {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 50px;
	}

	.title-wrapper {
		margin-block: 20px;
		display: flex;
		flex-direction: column;
	}

	.wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 20px;
		justify-content: center;
	}

	.results-table {
		width: 100%;
		font-size: 1.3rem;
		color: #005cab;
		line-height: 1.7;

		padding-right: 15px;

		overflow: auto;
		max-height: 450px;
	}

    .row {
        padding-inline: 10px;
    }

	.results-table > .row {
		display: flex;
		justify-content: space-between;
		align-items: center;

		border-bottom: 3px solid #005cab;
	}

	.results-table > .row > * {
		width: 100%;
	}

	.results-table > .row > .left {
		text-align: left;
	}

	.results-table > .row > .center {
		text-align: center;
	}

	.results-table > .row > .right {
		text-align: right;
	}

	.results-table > header {
		font-weight: bolder;
		font-size: 1.5rem;
		border-block: 4px solid #005cab;
	}

	.results-table > .row:last-child {
		border-bottom: none;
	}
</style>
