<script lang="ts">
    import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
    import type { SeasonStore } from '$lib/stores/SeasonStore.svelte';
    import { SeasonResult, type SeasonResultData } from '$lib/DTO/SeasonResultDTO';
    import { getContext } from 'svelte';
    import { createSeasonCache, fetchSeasonResult, getIsSeasonCached } from '$actions/Season';
    import LL from '$translations/i18n-svelte';
    import Heading from '$components/Heading.svelte';
    import SubmissionScroller from './SubmissionScroller.svelte';
    import { fetchActivities } from '$actions/Activity';
    import { goto } from '$app/navigation';
    import type { ToastStore } from '$lib/stores/ToastStore.svelte';
    import Store from '$lib/enums/Stores';
    import type { FacultyStore } from '$lib/stores/FacultyStore.svelte';
    import { createRecordFromEntityArray } from '$lib/Helper';
    import { SvelteMap } from 'svelte/reactivity';
    import type { ActivityDTO } from '$lib/DTO/ActivityDTO';
    import type { AxiosInstance } from 'axios';

    const { season, api }: { season: SeasonDTO; api: AxiosInstance } = $props();

    let activities = $state<SvelteMap<number, ActivityDTO>>(new SvelteMap());
    let isSeasonCached = $state<boolean>();

    const seasonResultCalculator = $derived(new SeasonResult(activities));
    const isSeasonRunning = $derived(season.is_running);

    const seasonStore = getContext<SeasonStore>(Store.SEASON_STORE);
    const toastStore = getContext<ToastStore>(Store.TOAST_STORE);
    const facultyStore = getContext<FacultyStore>(Store.FACULTY_STORE);
    const charity = $derived(season.charity);

    let seasonCacheResult = $state<boolean>();
    let seasonRemoveResult = $state<boolean>();

    let seasonResult = $state<SeasonResultData | null>(null);
    const seasonResultRank = $derived(
        seasonResult === null
            ? null
            : seasonResultCalculator?.calculateSeasonResultRank(season, seasonResult, null, null),
    );

    const top3Users = $derived.by(() => {
        const extras = seasonResultRank?.extras ?? [];
        const totals: Record<number, { user: number; faculty: number; points: number }> = {};
        for (const e of extras) {
            if (!totals[e.user]) totals[e.user] = { user: e.user, faculty: e.faculty, points: 0 };
            totals[e.user].points += e.points;
        }
        return Object.values(totals)
            .sort((a, b) => b.points - a.points)
            .slice(0, 3);
    });

    const endSeason = () => {
        createSeasonCache(api, season).then((result: boolean) => {
            seasonCacheResult = result;
            isSeasonCached = result !== undefined && result;
        });
    };

    const removeSeason = () => {
        if (confirm('Opravdu chcete odstranit tuto sezónu? Akce je nevratná!')) {
            seasonStore.remove(season).then((result) => {
                if (result) {
                    toastStore.add({
                        type: 'success',
                        message: 'Sezóna odstraněna',
                    });
                    goto('/administration/season');
                } else {
                    toastStore.add({
                        type: 'error',
                        message: 'Nastala chyba při odstranění sezóny',
                    });
                    seasonRemoveResult = false;
                }
            });
        }
    };

    $effect(() => {
        Promise.all([
            fetchSeasonResult(api, season),
            fetchActivities(api),
            getIsSeasonCached(api, season),
        ]).then(([result, new_activities, isCached]) => {
            activities = createRecordFromEntityArray(new_activities);
            seasonResult = result;
            isSeasonCached = isCached;
        });
    });
</script>

<article>
    <Heading>
        <h1>
            {season.start.toLocaleDateString('cs', { year: 'numeric', month: 'long' })}
            {#if season.is_test}<small>(testovací)</small>{/if}
        </h1>
    </Heading>

    <div class="layout">
        <aside class="info">
            <div class="card">
                <h3>Sezóna</h3>
                <dl>
                    <dt>Začátek</dt>
                    <dd>{season.start.toLocaleDateString('cs')}</dd>
                    <dt>Konec</dt>
                    <dd>{season.end.toLocaleDateString('cs')}</dd>
                    <dt>Celková vzdálenost</dt>
                    <dd>{seasonResultRank?.total_distance ?? '…'} km</dd>
                </dl>
                {#if !isSeasonCached && !isSeasonRunning}
                    <button onclick={endSeason}>Uzavřít sezónu</button>
                {/if}
                {#if seasonCacheResult !== undefined}
                    <p class="feedback">
                        {seasonCacheResult
                            ? 'Sezóna byla uzavřena.'
                            : 'Chyba při uzavírání sezóny.'}
                    </p>
                {/if}
            </div>

            <div class="card">
                <h3>Charita</h3>
                <p><strong>{charity?.name.cs}</strong></p>
                <p>{charity?.description.cs}</p>
            </div>

            <div class="card">
                <h3>Top 3 účastníci</h3>
                {#if top3Users.length > 0}
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Jméno</th>
                                <th>Fakulta</th>
                                <th>Body</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each top3Users as row, i}
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>
                                        {seasonResult?.users[row.user]?.first_name ?? '—'}
                                        {seasonResult?.users[row.user]?.last_name ?? ''}
                                    </td>
                                    <td>{facultyStore.get(row.faculty)?.shortcut ?? '—'}</td>
                                    <td>{row.points}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                {:else}
                    <p>Zatím nejsou žádné výsledky.</p>
                {/if}
            </div>

            <div class="card">
                <h3>Extra body</h3>
                {#if (seasonResultRank?.extras.length ?? 0) > 0}
                    <ul>
                        {#each seasonResultRank?.extras ?? [] as extraPoint}
                            <li>
                                <strong>
                                    {seasonResult?.users[extraPoint.user].first_name}
                                    {seasonResult?.users[extraPoint.user].last_name}
                                </strong>
                                ({facultyStore.get(extraPoint.faculty)?.shortcut}) —
                                {$LL.extra_points[
                                    extraPoint.name as keyof typeof $LL.extra_points
                                ]()},
                                {extraPoint.points}
                                {extraPoint.points === 1 ? 'bod' : 'body'},
                                {activities.get(extraPoint.activity)?.name.cs}
                                {#if extraPoint.name === 'weekly_elevation'}
                                    ({extraPoint.value} m)
                                {:else}
                                    ({extraPoint.value / 1000} km)
                                {/if}
                            </li>
                        {/each}
                    </ul>
                {:else}
                    <p>Zatím nejsou žádné.</p>
                {/if}
            </div>

            {#if season.can_delete || season.is_test}
                <div class="card card--danger">
                    <h3>Odstranit sezónu</h3>
                    <p>Sezóna neobsahuje žádné aktivity nebo je testovací — lze ji odstranit.</p>
                    <button type="button" onclick={removeSeason}>Odstranit sezónu</button>
                    {#if seasonRemoveResult === false}
                        <p class="feedback error">Sezónu nelze odstranit.</p>
                    {/if}
                </div>
            {/if}
        </aside>

        {#key season.id}
            <section class="submissions">
                <h2>Aktivity</h2>
                <SubmissionScroller {season} {api} />
            </section>
        {/key}
    </div>
</article>

<style>
    .layout {
        display: grid;
        gap: 1rem;
        align-items: start;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .info h3 {
        margin: 0 0 0.5rem;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--pico-primary);
    }

    .card {
        background: var(--pico-card-sectioning-background-color);
        border-radius: var(--pico-border-radius);
        padding: 0.75rem 1rem;
    }

    .card--danger {
        background: color-mix(in srgb, var(--pico-del-color) 8%, transparent);
    }

    dl {
        display: grid;
        grid-template-columns: auto 1fr;
        column-gap: 1rem;
        row-gap: 0.25rem;
        margin: 0 0 0.75rem;
    }

    dt {
        font-weight: bold;
    }

    dd {
        margin: 0;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 0.5rem;
    }

    th,
    td {
        text-align: left;
        padding: 0.25rem 0.5rem;
        border-bottom: 1px solid var(--pico-table-border-color);
    }

    th {
        font-size: 0.8rem;
        font-weight: bold;
        color: var(--pico-muted-color);
    }

    ul {
        padding-left: 1.25rem;
        margin: 0;
    }

    li {
        margin-bottom: 0.25rem;
    }

    .feedback {
        margin: 0.5rem 0 0;
    }

    .feedback.error {
        color: var(--pico-del-color);
    }

    .submissions h2 {
        margin: 0 0 0.75rem;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--pico-primary);
    }
</style>
