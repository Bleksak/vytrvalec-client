<script lang="ts">
    import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
    import type { DialogStore } from '$lib/stores/DialogStore.svelte';
    import { getAllContexts, getContext } from 'svelte';
    import SubmissionDetail from './SubmissionDetail.svelte';
    import Store from '$lib/enums/Stores';
    import type { ActivityStore } from '$lib/stores/ActivityStore.svelte';
    import { page } from '$app/state';
    import SubmissionScrollerFilter from '$components/administration/season/SubmissionScrollerFilter.svelte';
    import { fetchSubmissionsForSeason } from '$actions/Submission';
    import { getLocale } from '$paraglide/runtime';
    import type { AxiosInstance } from 'axios';
    import { loadNext } from '$utils/loadNext';

    const { season, api }: { season: SeasonDTO; api: AxiosInstance } = $props();

    const context = getAllContexts();
    const dialogStore = getContext<DialogStore>(Store.DIALOG_STORE);
    const activityStoreHandler = getContext<() => ActivityStore>(Store.ACTIVITY_STORE);

    const locale = $state(getLocale());

    let filter = $state(page.data.filter);
    let submissions = $state(page.data.submissions);
    let isLoading = $state(false);
    let canLoadNext = $state(true);

    $effect(() => {
        filter = page.data.filter;
        submissions = page.data.submissions;
        isLoading = false;
        canLoadNext = true;
    });

    const loadNextPage = async () => {
        if (isLoading || !canLoadNext) return;

        isLoading = true;

        const nextPage = (filter.page ?? 1) + 1;
        const newSubmissions = await fetchSubmissionsForSeason(api, season, {
            ...filter,
            page: nextPage,
        });

        submissions = [...submissions, ...newSubmissions];

        if (newSubmissions.length === 0) {
            canLoadNext = false;
        }

        isLoading = false;
    };
</script>

<SubmissionScrollerFilter />

{#await Promise.all([activityStoreHandler().promise()])}
    Načítání...
{:then}
    {#each submissions as submission, i}
        <div
            class="submission"
            onclick={() => {
                dialogStore.open(SubmissionDetail, { currentSubmission: submission }, context);
            }}
            onkeypress={() => {
                dialogStore.open(SubmissionDetail, { currentSubmission: submission }, context);
            }}
            role="button"
            tabindex={i}
        >
            <div>
                <p>
                    <strong>{submission.user.first_name} {submission.user.last_name}&nbsp;</strong>
                    ({submission.user.faculty.shortcut})
                </p>
                {#if submission.message}
                    <p>
                        <strong>Komentář:&nbsp;</strong>{submission.message}
                    </p>
                {/if}
                <p><strong>Nahráno:&nbsp;</strong>{submission.date.toLocaleDateString('cs')}</p>
                <p>
                    <label for="accepted-view">
                        <input
                            type="checkbox"
                            id="accepted-view"
                            name="accepted-view"
                            disabled
                            checked={submission.state === 'accepted'}
                        />
                        <strong>Schválená</strong>
                    </label>
                </p>
                <p>
                    <label for="reviewed-view">
                        <input
                            type="checkbox"
                            id="reviewed-view"
                            name="reviewed-view"
                            disabled
                            checked={submission.state !== 'pending'}
                        />
                        <strong>Zkontrolovaná</strong>
                    </label>
                </p>
            </div>
            <div>
                <p style="user-select: none;">&nbsp;</p>
                <p>
                    <strong>Kategorie:&nbsp;</strong>{activityStoreHandler().get(
                        submission.activity_id,
                    )?.name[locale]}
                </p>
                <p><strong>Vzdálenost:&nbsp;</strong>{submission.distance / 1000} km</p>
                {#if submission.elevation}
                    <p><strong>Převýšení:&nbsp;</strong>{submission.elevation} m</p>
                {/if}
            </div>
        </div>
    {/each}
    <div {@attach loadNext(loadNextPage)}></div>
{/await}

<style>
    .submission {
        display: grid;
        grid-template-columns: 1fr 1fr;
        border: 1px solid lightgray;
        padding: 15px;
        margin: 10px 0;
    }

    .submission:hover {
        background-color: rgb(245, 245, 245);
    }
</style>
