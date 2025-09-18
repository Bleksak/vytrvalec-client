<script lang="ts">
	import ResultsChart from '$components/ResultsChart.svelte';
	import LL from '$translations/i18n-svelte';
	import { fetchSeasonResult } from '$actions/Season';
	import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
	import { SeasonResult } from '$lib/DTO/SeasonResultDTO';
	import { fetchSeasonUsersStatistics } from '$actions/Statistics';
	import type { PageProps } from './$types';
	import ResultsOutliers from '$components/results/ResultsOutliers.svelte';
	import SeasonDetail from '$components/home/SeasonDetail.svelte';

	const { data }: PageProps = $props();

	const seasons = data.seasons;
	const activities = data.activities;
	const faculties = data.faculties;

	let currentWeek = $state<number>(0);
	let currentSeason = $state<SeasonDTO>(seasons.values().next().value!);

	const currentSeasonResults = $derived(
		new SeasonResult(await fetchSeasonResult(data.api, currentSeason), activities)
	);

	const currentSeasonResultsArray = $derived(
		currentSeasonResults?.getResultsForWeek(currentWeek) ?? []
	);

	const currentSeasonOutliers = $derived(currentSeasonResults?.data.outliers ?? []);
	const isBefore2022 = $derived(currentSeason.end.getTime() < new Date(2022, 0, 1).getTime());
</script>

{#snippet heading_select()}
	<div class="flex-gap">
		<select bind:value={currentWeek}>
			<option value={0}>{$LL.results.week_picker[0]()}</option>
			<option value={1}>{$LL.results.week_picker[1]()}</option>
			<option value={2}>{$LL.results.week_picker[2]()}</option>
			<option value={3}>{$LL.results.week_picker[3]()}</option>
			<option value={4}>{$LL.results.week_picker[4]()}</option>
		</select>
		<select bind:value={currentSeason}>
			{#each seasons.values() as season}
				<option value={season}>
					{season.start.toLocaleDateString('cs', { year: 'numeric', month: 'long' })}
				</option>
			{/each}
		</select>
	</div>
{/snippet}

<main>
	<SeasonDetail
		title={$LL.results.title()}
		{faculties}
		result={currentSeasonResults}
		season={currentSeason}
		heading={heading_select}
	/>
	<article>
		<section>
			{#if currentSeasonResultsArray.length === 0}
				<h2>{$LL.results.no_results()}</h2>
			{:else}
				{#each currentSeasonResultsArray as result}
					{@const activity = activities.get(result.activity)}
					{@const total = result.row.reduce(
						(accumulator, current) => {
							accumulator.distance += current.distance;
							accumulator.points += current.points;
							return accumulator;
						},
						{ distance: 0, points: 0 }
					)}
					<h2>
						{result.activity === -1 ? $LL.results.total() : activity?.name.cs}
					</h2>
					<div class="grid">
						<div class="wrapper-y overflow-auto">
							<table class="striped">
								<thead>
									<tr>
										<th scope="col">{$LL.results.faculty()}</th>
										<th class="text-right" scope="col">{$LL.results.distance()}</th>
										<th class="text-right" scope="col">{$LL.results.points()}</th>
									</tr>
								</thead>
								<tbody>
									{#each result.row as row}
										{@const faculty = faculties.get(row.faculty)!}
										<tr>
											<td>{faculty?.shortcut}</td>
											<td class="text-right">{(row.distance / 1000).toFixed(1)}</td>
											<td class="text-right">{row.points}</td>
										</tr>
									{/each}
								</tbody>
								<tfoot>
									<tr>
										<td>{$LL.results.total()}</td>
										<td class="text-right">{(total.distance / 1000).toFixed(1)}</td>
										<td class="text-right">{total.points}</td>
									</tr>
								</tfoot>
							</table>
						</div>
						<section class="overflow-auto">
							<ResultsChart {faculties} results={result.row} />
						</section>
					</div>
				{/each}

				{#if !isBefore2022 && currentWeek > 2}
					<section>
						<h2>{$LL.results.extras.title()}</h2>
						<table class="striped">
							<thead>
								<tr>
									<th>{$LL.results.extras.name()}</th>
									<th>{$LL.results.extras.faculty()}</th>
									<th>{$LL.results.extras.category()}</th>
									<th>{$LL.results.extras.activity()}</th>
									<th class="text-right">{$LL.results.extras.value()}</th>
									<th class="text-right">{$LL.results.extras.points()}</th>
								</tr>
							</thead>
							<tbody>
								{#each currentSeasonResultsArray as result}
									{#each result.extra as extraPoint}
										{@const activity = activities.get(result.activity)!}
										<tr>
											<td>{extraPoint.user.first_name} {extraPoint.user.last_name}</td>
											<td>
												{faculties.get(extraPoint.faculty)?.shortcut}
											</td>
											<td>
												{$LL.extraPoints[extraPoint.name as keyof typeof $LL.extraPoints]()}
											</td>
											<td>
												{activity.name.cs}
											</td>
											{#if extraPoint.name === 'weekly_distance'}
												<td class="text-right">{extraPoint.value / 1000} km</td>
											{:else if extraPoint.name === 'daily_distance'}
												<td class="text-right">{extraPoint.value / 1000} km</td>
											{:else if extraPoint.name === 'weekly_elevation'}
												<td class="text-right">{extraPoint.value} m</td>
											{/if}
											<td class="text-right">{extraPoint.points}</td>
										</tr>
									{/each}
								{/each}
							</tbody>
						</table>
					</section>
				{/if}

				{#if !isBefore2022 && currentWeek === 0}
					<div class="grid">
						<section>
							<h2>{$LL.results.top3()}</h2>
							{#each currentSeasonOutliers as outlierActivity}
								{@const activity = activities.get(outlierActivity.activity_id)!}
								<ResultsOutliers outliersInActivity={outlierActivity} {activity} {faculties} />
							{/each}
						</section>
						<section>
							<h2>{$LL.results.by_faculty()}</h2>
							{#await fetchSeasonUsersStatistics(currentSeason.id) then stat}
								<table class="striped">
									<thead>
										<tr>
											<th>{$LL.results.faculty()}</th>
											<th class="text-right">{$LL.results.count()}</th>
										</tr>
									</thead>
									<tbody>
										{#each stat as row}
											{@const faculty = faculties.get(row.faculty)!}
											<tr>
												<td>{faculty?.shortcut}</td>
												<td class="text-right">{row.count}</td>
											</tr>
										{/each}
									</tbody>
									<tfoot>
										<tr>
											<td>{$LL.results.total()}</td>
											<td class="text-right">
												{stat.reduce((sum, userStat) => sum + userStat.count, 0)}
											</td>
										</tr>
									</tfoot>
								</table>
							{/await}
						</section>
					</div>
				{/if}
			{/if}
		</section>
	</article>
</main>

<style>
	.wrapper-y {
		max-height: 24rem;
	}

	.flex-gap {
		display: flex;
		gap: 1rem;
	}
</style>
