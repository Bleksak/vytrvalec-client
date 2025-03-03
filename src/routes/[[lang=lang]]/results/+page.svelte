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
	import { fetchSeasonUsersStatistics } from '$actions/Statistics';

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

	$effect(() => {
        if(!currentSeason) {
            return;
        }

		Promise.all([activitiesPromise, facultiesPromise, fetchSeasonResult(currentSeason)])
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
		<div class="season-wrapper">
			{#each currentSeasonResultsArray as result}
				{@const activity = activities.find((activity) => activity.id === result.activity)}
				{@const total = result.row.reduce(
					(accumulator, current) => {
						accumulator.distance += current.distance;
						accumulator.points += current.points;
						return accumulator;
					},
					{ distance: 0, points: 0 }
				)}
				<div class="title">
					<h2>
						{result.activity === -1 ? $LL.results.total() : $LL.activities[activity?.name as keyof typeof $LL.activities]().toUpperCase()}
					</h2>
				</div>
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
									<span>{faculty?.shortcut}</span>
									<span class="right">{(row.distance / 1000).toFixed(1)}</span>
									<span class="right">{row.points}</span>
								</div>
							{/each}

							<div class="row">
								<strong>{$LL.results.total()}</strong>
								<strong class="right">{(total.distance / 1000).toFixed(1)}</strong>
								<strong class="right">{total.points}</strong>
							</div>
						</div>
					</section>

					<section class="graph">
						<ResultsChart {faculties} results={result.row} />
					</section>
				</div>
			{:else}
				<div class="title">
					<h3>{$LL.results.no_results()}</h3>
				</div>
			{/each}
		</div>
	{/await}
	{#if currentSeason && currentWeek === 0}
		{#await fetchSeasonUsersStatistics(currentSeason?.id)}
		<!-- Nechci znova nápis loading -->
		{:then stat} 
			<div class="wrapper">
				<section class="table">
				<!-- TOP 3 -->
				</section>
				<section class="table">
					<div class="title">
						<h2>{$LL.results.by_faculty()}</h2>
					</div>
					<div class="results-table">
						<header class="row">
							<span>{$LL.results.faculty()}</span>
							<span class="right">{$LL.results.count()}</span>
						</header>
						{#each stat as row}
							{@const faculty = faculties.find((faculty) => faculty.id === row.faculty)}
							<div class="row">
								<span>{faculty?.shortcut}</span>
								<span class="right">{row.count}</span>
							</div>
						{/each}

						<div class="row">
							<strong>{$LL.results.total()}</strong>
							<strong class="right">{stat.reduce((sum, userStat) => sum + userStat.count, 0)}</strong>
						</div>
					</div>
				</section>
			</div>
		{/await}
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin: 0 auto;
		max-width: 1600px;
		width: 100%;
		min-height: calc(100vh - 100px - 60px - 1.6 * 1.5rem);
	}

	.pickers {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 50px;
	}

	.season-wrapper {
		margin-block: 20px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.title {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
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

	@media (max-width: 1200px) {
		h1,
		h2 {
			text-align: center;
		}
		main {
			padding: 0 30px;
		}
	}
</style>
