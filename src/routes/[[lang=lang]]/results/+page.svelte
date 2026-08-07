<script lang="ts">
    import ResultsChart from '$components/ResultsChart.svelte';
    import LL from '$translations/i18n-svelte';
    import { fetchSeasonResult } from '$actions/Season';
    import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
    import {
        SeasonResult,
        getWeekCount,
        type SeasonResultData,
        type SeasonResultRank,
    } from '$lib/DTO/SeasonResultDTO';
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

    let currentSeason = $state<SeasonDTO | null>(
        untrack(() => seasons.values().next().value ?? null),
    );

    const seasonResultCalculator = $derived(new SeasonResult(activities));

    let currentActivity = $state<null | ActivityDTO>(null);

    const seasonResultData = $derived(await fetchSeasonResult(data.api, currentSeason));

    const emptySeasonResult = (): SeasonResultRank => ({
        total_distance: 0,
        total_points: 0,
        rows: [],
        extras: [],
    });

    const currentSeasonCompleteResults = $derived(
        currentSeason === null || seasonResultData === null
            ? emptySeasonResult()
            : seasonResultCalculator.calculateSeasonResultRank(
                  currentSeason,
                  seasonResultData,
                  null,
                  null,
              ),
    );

    const currentSeasonResults = $derived(
        currentSeason === null ||
            seasonResultData === null ||
            (currentWeek === null && currentActivity === null)
            ? currentSeasonCompleteResults
            : seasonResultCalculator.calculateSeasonResultRank(
                  currentSeason,
                  seasonResultData,
                  currentWeek,
                  currentActivity?.id,
              ),
    );

    const currentSeasonOutliers = $derived(seasonResultData?.outliers);

    const currentWeekNumber = $derived.by((): number => {
        if (currentSeason === null) {
            return -1;
        }

        const now = new Date();

        if (now < currentSeason.start) {
            return -1;
        }

        if (now >= currentSeason.end) {
            return getWeekCount(currentSeason);
        }

        const days = Math.floor(
            (now.getTime() - currentSeason.start.getTime()) / (1000 * 60 * 60 * 24),
        );

        return days > 0 ? Math.floor((days - 1) / 7) : 0;
    });

    const availableWeeks = $derived.by((): number[] => {
        if (seasonResultData === undefined || seasonResultData === null) {
            return [];
        }

        const weeks = Object.keys(seasonResultData.results).map(Number);

        return weeks.filter((week) => week >= 0 && week <= currentWeekNumber).sort((a, b) => a - b);
    });

    $effect(() => {
        if (currentWeek !== null && !availableWeeks.includes(currentWeek)) {
            currentWeek = null;
        }
    });
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
            {#each availableWeeks as week (week)}
                <option value={week}>
                    {$LL.results.week_picker[
                        (week + 1) as unknown as keyof typeof $LL.results.week_picker
                    ]()}
                </option>
            {/each}
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
    {#if currentSeason === null}
        <h2>{$LL.results.no_results()}</h2>
    {:else}
        <SeasonDetail
            title={$LL.results.title()}
            {faculties}
            result={currentSeasonCompleteResults}
            season={currentSeason}
            heading={heading_select}
        />
        <article>
            <section>
                <Tabs tabs={activityTabs} />
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

                    <h2>
                        {currentActivity === null ? $LL.results.total() : currentActivity.name.cs}
                    </h2>
                    <div class="grid">
                        <div class="wrapper-y overflow-auto">
                            <table class="striped">
                                <thead>
                                    <tr>
                                        <th scope="col">{$LL.results.faculty()}</th>
                                        <th class="text-right" scope="col"
                                            >{$LL.results.distance()}</th
                                        >
                                        <th class="text-right" scope="col"
                                            >{$LL.results.points()}</th
                                        >
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
                                        <td class="text-right"
                                            >{(total.distance / 1000).toFixed(1)}</td
                                        >
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
                                        {@const activity = activities.get(result.activity)}
                                        {@const user = seasonResultData?.users[result.user]}

                                        <tr>
                                            <td>{user?.first_name} {user?.last_name ?? ''}</td>
                                            <td>
                                                {faculties.get(result.faculty)?.shortcut}
                                            </td>
                                            <td>
                                                {$LL.extra_points[
                                                    result.name as keyof typeof $LL.extra_points
                                                ]()}
                                            </td>
                                            <td>
                                                {activity?.name.cs}
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
                                    {@const activity = activities.get(outlierActivity.activity_id)}
                                    {#if activity}
                                        <ResultsOutliers
                                            outliersInActivity={outlierActivity}
                                            {activity}
                                            {faculties}
                                            users={seasonResultData?.users ?? {}}
                                        />
                                    {/if}
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
    {/if}
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
