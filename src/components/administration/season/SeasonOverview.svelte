<script lang="ts">
    import Widget from '$components/Widget.svelte';
    import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
    import type { SeasonStore } from '$lib/stores/SeasonStore.svelte';
    import { SeasonResult, type SeasonResultData } from '$lib/DTO/SeasonResultDTO';
    import { getContext } from 'svelte';
    import { createSeasonCache, fetchSeasonResult, getIsSeasonCached } from '$actions/Season';
    import LL from '$translations/i18n-svelte';
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
            fetchSeasonResult(undefined, season),
            fetchActivities(),
            getIsSeasonCached(season),
        ]).then(([result, new_activities, isCached]) => {
            activities = createRecordFromEntityArray(new_activities);
            seasonResult = result;
            isSeasonCached = isCached;
        });
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
                    <h5>{charity?.name.cs}</h5>
                    <div class="charity-description">
                        <p>{charity?.description.cs}</p>
                    </div>
                </section>
            </Widget>

            <Widget title="Sezóna">
                <section class="season-data">
                    <p><strong>Začátek:&nbsp;</strong>{season.start.toLocaleDateString('cs')}</p>
                    <p><strong>Konec:&nbsp;</strong>{season.end.toLocaleDateString('cs')}</p>
                    <p>
                        <strong>Celková vzdálenost:&nbsp;</strong>{seasonResultRank?.total_distance} km
                    </p>
                    {#if !isSeasonCached && !isSeasonRunning}
                        <button onclick={endSeason}>Uzavřít sezónu</button>
                    {/if}
                    {#if seasonCacheResult !== undefined}
                        {#if seasonCacheResult}
                            <span class="note">Sezóna byla uzavřena</span>
                        {:else}
                            <span class="note">Chyba při uzavírání sezóny</span>
                        {/if}
                    {/if}
                </section>
            </Widget>

            <Widget title="Extra body">
                <section class="extra-points">
                    {#each seasonResultRank?.extras ?? [] as extraPoint}
                        <p>
                            <strong>
                                {seasonResult?.users[extraPoint.user].first_name}
                                {seasonResult?.users[extraPoint.user].last_name}
                            </strong>
                            ({facultyStore.get(extraPoint.faculty)?.shortcut}):
                        </p>
                        <p>
                            {$LL.extraPoints[extraPoint.name as keyof typeof $LL.extraPoints]()}
                        </p>
                        <p>Počet získaných bodů: {extraPoint.points}</p>
                        <p>V aktivitě: {activities.get(extraPoint.activity)?.name.cs}</p>
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

            {#if seasonResultRank?.total_distance === 0 || season.is_test}
                <Widget title="Odstranit sezónu">
                    <section class="season-delete">
                        <p>Pokud sezóna neobsahuje žádné aktivity, je možné ji odstranit.</p>
                        <button type="button" onclick={removeSeason}>Odstranit sezónu</button>
                        {#if seasonRemoveResult === false}
                            <span class="note">
                                Sezónu nelze odstranit, jelikož již obsahuje aktivity, nebo není testovací
                            </span>
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
        /* gap: 30px; */
    }
</style>
