<script lang="ts">
	import ResultsChart from '$components/ResultsChart.svelte';
	import Select from '$components/FormComponent/Select.svelte';
	import LL from '$translations/i18n-svelte';
	import { fetchSeasonResult, fetchSeasons } from '$actions/Season';
	import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
	import type { ActivityDTO } from '$lib/DTO/ActivityDTO';
	import { SeasonResult } from '$lib/DTO/SeasonResultDTO';
	import { fetchActivities } from '$actions/Activity';
	import { fetchFaculties } from '$actions/Faculty';
	import { fetchSeasonUsersStatistics } from '$actions/Statistics';
	import type { FacultyDTO } from '$lib/DTO/FacultyDTO';
	import Store from '$lib/enums/Stores';
	import { getContext } from 'svelte';
	import type { FacultyStore } from '$lib/stores/FacultyStore.svelte';
	import type { ActivityStore } from '$lib/stores/ActivityStore.svelte';
	import { fetchCharities } from '$actions/Charity';

	const facultyStore = getContext<FacultyStore>(Store.FACULTY_STORE);
	const activityStore = getContext<ActivityStore>(Store.ACTIVITY_STORE);

	let currentSeason = $state<SeasonDTO>();
	let activitiesPromise = fetchActivities();
	let facultiesPromise = fetchFaculties();

	let activities = $state<Array<ActivityDTO>>([]);
	let faculties = $state<Array<FacultyDTO>>([]);

	let currentWeek = $state<number>(0);
	let currentSeasonResults = $state<SeasonResult>();
	let currentSeasonResultsArray = $derived(
		currentSeasonResults?.getResultsForWeek(currentWeek) ?? []
	);
	let currentSeasonOutliers = $derived(currentSeasonResults?.data.outliers ?? []);
	const isBefore2022 = $derived(
		currentSeason && currentSeason.end.getTime() < new Date(2022, 0, 1).getTime()
	);

	$effect(() => {
		if (!currentSeason) {
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
			{#if currentSeasonResultsArray.length === 0}
				<div class="title">
					<h3>{$LL.results.no_results()}</h3>
				</div>
			{:else}
				{#await fetchCharities()}
				 	<span>{$LL.profile.loading.statistics()}</span>
				{:then charities}
					{@const charity = charities.find(ch => ch.id === currentSeason?.charity!)!}
					{@const totalGained = currentSeasonResultsArray[2].row.reduce(
						(accumulator, current) => {
							accumulator.distance += current.distance;
							accumulator.points += current.points;
							return accumulator;
						},
						{ distance: 0, points: 0 }
					)}
					<div class="container">
						<h3 class="white">{charity.name}</h3>
						<h4 class="white">{$LL.results.total_gained()}: {(totalGained.distance / 1000).toFixed(0)} Kč</h4>
					</div>
				{/await}
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
							{result.activity === -1
								? $LL.results.total()
								: $LL.activities[activity?.name as keyof typeof $LL.activities]().toUpperCase()}
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
				{/each}

				{#if currentWeek > 2}
					<section class="table">
						<div class="title">
							<h2>{$LL.results.extras.title()}</h2>
						</div>
						<div class="results-table">
							<header class="row">
								<span>{$LL.results.extras.name()}</span>
								<span>{$LL.results.extras.faculty()}</span>
								<span>{$LL.results.extras.category()}</span>
								<span>{$LL.results.extras.activity()}</span>
								<span>{$LL.results.extras.value()}</span>
								<span>{$LL.results.extras.points()}</span>
							</header>
							{#each currentSeasonResultsArray as result}
								{#each result.extra as extraPoint}
									{@const activity = activityStore.get(result.activity)!}
									<div class="row">
										<span>{extraPoint.user.first_name} {extraPoint.user.last_name}</span>
										<span>{facultyStore.get(extraPoint.faculty)?.shortcut}</span>
										<span>
											{$LL.extraPoints[extraPoint.name as keyof typeof $LL.extraPoints]()}
										</span>
										<span>{$LL.activities[activity.name as keyof typeof $LL.activities]()}</span>
										{#if extraPoint.name === 'weekly_distance'}
											<span>{extraPoint.value / 1000} km</span>
										{:else if extraPoint.name === 'daily_distance'}
											<span>{extraPoint.value / 1000} km</span>
										{:else if extraPoint.name === 'weekly_elevation'}
											<span>{extraPoint.value} m</span>
										{/if}
										<span>{extraPoint.points}</span>
									</div>
								{/each}
							{/each}
						</div>
					</section>
				{/if}

				{#if currentSeason && !isBefore2022 && currentWeek === 0}
					{#await fetchSeasonUsersStatistics(currentSeason?.id) then stat}
						<div class="wrapper">
							<section>
								<div class="title">
									<h2>{$LL.results.top3()}</h2>
								</div>
								{#each currentSeasonOutliers as outlierActivity}
									{@const activity = activities.find((a) => a.id === outlierActivity.activityId)!}
									<section class="table">
										<div class="title">
											<h5>{$LL.activities[activity.name as keyof typeof $LL.activities]()}</h5>
										</div>
										<div class="results-table">
											<header class="row">
												<span>{$LL.registration.first_name()}</span>
												<span>{$LL.results.faculty()}</span>
												<span class="right">{$LL.results.count()}</span>
											</header>
											{#each outlierActivity.results as outlier}
												{@const faculty = faculties.find(
													(faculty) => faculty.id === outlier.facultyId
												)}
												<div class="row">
													<span>{outlier.user.first_name} {outlier.user.last_name}</span>
													<span>{faculty?.shortcut}</span>
													<span class="right">{outlier.value / 1000} km</span>
												</div>
											{/each}
										</div>
									</section>
								{/each}
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
										<strong class="right">
											{stat.reduce((sum, userStat) => sum + userStat.count, 0)}
										</strong>
									</div>
								</div>
							</section>
						</div>
					{/await}
				{/if}
			{/if}
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
		min-height: calc(100vh - 100px - 60px - 1.6 * 1.5rem);
	}

	.table {
		margin-bottom: 10px;
	}

	.pickers {
		width: 100%;
		display: flex;
		/* flex-direction: row; */
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

	.results-table > .row > .right {
		text-align: right;
	}

	.results-table > header {
		font-weight: bolder;
		font-size: 1.5rem;
		border-block: 4px solid #005cab;
	}

	.container {
		background-color: #005cab;
		display: flex;
		flex-direction: column;
		padding: 30px;
		align-items: center;
	}

	.white {
		color: #fff
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
