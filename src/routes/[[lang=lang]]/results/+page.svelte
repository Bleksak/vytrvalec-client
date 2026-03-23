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
    import type { ActivityDTO } from '$lib/DTO/ActivityDTO';
    import Tabs from '$components/Tabs.svelte';
    import { untrack } from 'svelte';

    const { data }: PageProps = $props();

    const seasons = $derived(data.seasons);
    const activities = $derived(data.activities);
    const faculties = $derived(data.faculties);

    let currentWeek = $state<number | null>(null);

    let currentSeason = $state<SeasonDTO>(untrack(() => seasons.values().next().value!));

    const seasonResultCalculator = $derived(new SeasonResult(activities));

    let currentActivity = $state<null | ActivityDTO>(null);

    const seasonResultData = $derived(await fetchSeasonResult(data.api, currentSeason));

    const currentSeasonCompleteResults = $derived(
        seasonResultCalculator.calculateSeasonResultRank(
            currentSeason,
            seasonResultData,
            null,
            null,
        ),
    );

    const currentSeasonResults = $derived(
        currentWeek === null && currentActivity === null
            ? currentSeasonCompleteResults
            : seasonResultCalculator.calculateSeasonResultRank(
                  currentSeason,
                  seasonResultData,
                  currentWeek,
                  currentActivity?.id,
              ),
    );

    const currentSeasonOutliers = $derived(seasonResultData.outliers);
    let activityTabs = $derived.by(() => {
        let tabs = [
            {
                title: $LL.results.total() as string,
                action: () => {
                    currentActivity = null;
                },
                selected: currentActivity === null,
            },
        ];

        for (const activity of activities.values()) {
            tabs.push({
                title: activity.name.cs,
                action: () => {
                    currentActivity = activity;
                },
                selected: currentActivity?.id === activity.id,
            });
        }

        return tabs;
    });
</script>

{#snippet heading_select()}
    <div class="flex-gap">
        <select bind:value={currentWeek}>
            <option value={null}>{$LL.results.week_picker[0]()}</option>
            <option value={0}>{$LL.results.week_picker[1]()}</option>
            <option value={1}>{$LL.results.week_picker[2]()}</option>
            <option value={2}>{$LL.results.week_picker[3]()}</option>
            <option value={3}>{$LL.results.week_picker[4]()}</option>
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
        result={currentSeasonCompleteResults}
        season={currentSeason}
        heading={heading_select}
    />
    <article>
        <section>
            {#if currentSeasonResults.rows.length === 0}
                <h2>{$LL.results.no_results()}</h2>
            {:else}
                {@const total = currentSeasonResults.rows.reduce(
                    (accumulator, current) => {
                        accumulator.distance += current.distance;
                        accumulator.points += current.points;
                        return accumulator;
                    },
                    { distance: 0, points: 0 },
                )}

                <Tabs tabs={activityTabs} />

                <h2>
                    {currentActivity === null ? $LL.results.total() : currentActivity.name.cs}
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
                                {#each currentSeasonResults.rows as row}
                                    {@const faculty = faculties.get(row.faculty)!}
                                    <tr>
                                        <td>{faculty?.shortcut}</td>
                                        <td class="text-right"
                                            >{(row.distance / 1000).toFixed(1)}</td
                                        >
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
                        <ResultsChart {faculties} results={currentSeasonResults.rows} />
                    </section>
                </div>

                {#if currentSeasonResults.extras.length > 0}
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
                                {#each currentSeasonResults.extras as result}
                                    {@const activity = activities.get(result.activity)!}
                                    {@const user = seasonResultData.users[result.user]}

                                    <tr>
                                        <td>{user.first_name} {user.last_name ?? ''}</td>
                                        <td>
                                            {faculties.get(result.faculty)?.shortcut}
                                        </td>
                                        <td>
                                            {$LL.extraPoints[
                                                result.name as keyof typeof $LL.extraPoints
                                            ]()}
                                        </td>
                                        <td>
                                            {activity.name.cs}
                                        </td>
                                        {#if result.name === 'weekly_distance'}
                                            <td class="text-right">{result.value / 1000} km</td>
                                        {:else if result.name === 'daily_distance'}
                                            <td class="text-right">{result.value / 1000} km</td>
                                        {:else if result.name === 'weekly_elevation'}
                                            <td class="text-right">{result.value} m</td>
                                        {/if}
                                        <td class="text-right">{result.points}</td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </section>
                {/if}

                {#if currentSeasonOutliers}
                    <div class="grid">
                        <section>
                            <h2>{$LL.results.top3()}</h2>
                            {#each Object.values(currentSeasonOutliers) as outlierActivity}
                                {@const activity = activities.get(outlierActivity.activity_id)!}
                                <ResultsOutliers
                                    outliersInActivity={outlierActivity}
                                    {activity}
                                    {faculties}
                                    users={seasonResultData.users}
                                />
                            {/each}
                        </section>
                    </div>
                {/if}
                <section>
                    <h2>{$LL.results.by_faculty()}</h2>
                    {#await fetchSeasonUsersStatistics(data.api, currentSeason) then stat}
                        <table class="striped">
                            <thead>
                                <tr>
                                    <th>{$LL.results.faculty()}</th>
                                    <th class="text-right">{$LL.results.count()}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each stat.users as row}
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
                                        {stat.total}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    {/await}
                </section>
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
