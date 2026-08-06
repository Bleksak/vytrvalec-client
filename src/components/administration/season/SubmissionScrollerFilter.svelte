<script lang="ts">
    import Store from '$lib/enums/Stores';
    import type { ActivityStore } from '$lib/stores/ActivityStore.svelte';
    import type { FacultyStore } from '$lib/stores/FacultyStore.svelte';
    import { getContext, onMount, untrack } from 'svelte';
    import { LL } from '$translations/i18n-svelte';
    import DateInput from '$components/FormComponent/DateInput.svelte';
    import type { SubmissionState } from '$lib/enums/SubmissionState';
    import Select from '$components/FormComponent/Select.svelte';
    import { page } from '$app/state';
    import { invalidateAll } from '$app/navigation';
    import { getLocale } from '$paraglide/runtime';

    const locale = $derived(getLocale());

    const facultyStore = getContext<FacultyStore>(Store.FACULTY_STORE);
    const activityStore = getContext<ActivityStore>(Store.ACTIVITY_STORE);

    const states: Array<SubmissionState> = ['accepted', 'rejected', 'pending'];
    const weeks = [0, 1, 2, 3];

    let selectFaculty = $state<Select>();
    let selectWeek = $state<Select>();

    let filter = $derived(page.data.filter);

    let email = $state<string>();
    let date = $state<Date>();
    let _state = $state<string>();
    let activityValue = $state<number | string>();

    onMount(() => {
        email = filter.user;
        date = filter.date ? new Date(filter.date) : undefined;
        _state = filter.state;
        activityValue = Number(filter.activity);
    });

    $effect(() => {
        selectFaculty;
        selectWeek;

        untrack(() => {
            selectFaculty?.selectValue(Number(filter.faculty));
            selectWeek?.selectValue(Number(filter.week));
        });
    });
</script>

<form action={page.url.toString()} method="GET" onsubmit={invalidateAll}>
    <div class="col">
        <label for="email">Uživatel (e-mail):</label>
        <div class="field">
            <input
                class="w-100 m-0"
                name="user"
                type="text"
                id="email"
                autocomplete="off"
                bind:value={email}
            />
            <button type="button" onclick={() => (email = undefined)}>
                <img class="icon" src="/images/icons/x.svg" alt="Odstranit filtr" />
            </button>
        </div>
    </div>

    <div class="col">
        <label for="date">Datum:</label>
        <div class="field">
            <DateInput style="flex:1;" class="f-1" id="date" name="date" bind:date />
            <button type="button" onclick={() => (date = undefined)}>
                <img class="icon" src="/images/icons/x.svg" alt="Odstranit filtr" />
            </button>
        </div>
    </div>

    <div class="col">
        <label for="state">Stav:</label>
        <div class="field">
            <div class="radio-group">
                {#each states as state}
                    <div>
                        <input
                            type="radio"
                            name="state"
                            value={state}
                            class="radio"
                            id={`state${state}`}
                            bind:group={_state}
                        />
                        <label for={`state${state}`}>
                            {$LL.submission.state[state as keyof typeof $LL.submission.state]()}
                        </label>
                    </div>
                {/each}
            </div>
            <button type="button" onclick={() => (_state = undefined)}>
                <img class="icon" src="/images/icons/x.svg" alt="Odstranit filtr" />
            </button>
        </div>
    </div>

    {#await activityStore.promise() then activities}
        <div class="col">
            <label for="activity">Aktivita:</label>
            <div class="field">
                <div class="radio-group">
                    {#each activities as activity}
                        <div>
                            <input
                                name="activity"
                                class="radio"
                                type="radio"
                                value={activity.id}
                                id={`activity${activity.id}`}
                                bind:group={activityValue}
                            />
                            <label for={`activity${activity.id}`}>{activity.name[locale]}</label>
                        </div>
                    {/each}
                </div>
                <button type="button" onclick={() => (activityValue = undefined)}>
                    <img class="icon" src="/images/icons/x.svg" alt="Odstranit filtr" />
                </button>
            </div>
        </div>
    {/await}

    {#await facultyStore.promise() then faculties}
        <div class="col">
            <label for="faculty">Fakulta:</label>
            <div class="field">
                <Select
                    bind:this={selectFaculty}
                    keys={[undefined, ...faculties].map((f) =>
                        f ? $LL.faculties[f.shortcut as keyof typeof $LL.faculties]() : 'Nevybráno',
                    )}
                    values={[undefined, ...faculties].map((f) => (f ? f.id : undefined))}
                    id="faculty"
                    name="faculty"
                />
                <button type="button" onclick={() => selectFaculty?.select(0)}>
                    <img class="icon" src="/images/icons/x.svg" alt="Odstranit filtr" />
                </button>
            </div>
        </div>
    {/await}

    <div class="col">
        <!-- <label for="week">Týden:</label>
        <div class="field">
            <Select
                bind:this={selectWeek}
                keys={[undefined, ...weeks].map((week) =>
                    week ? `${week + 1}. týden` : 'Nevybráno',
                )}
                values={[undefined, ...weeks]}
                id="week"
                name="week"
            />
            <button type="button" onclick={() => selectWeek?.select(0)}>
                <img class="icon" src="/images/icons/x.svg" alt="Odstranit filtr" />
            </button>
        </div> -->
    </div>

    <button type="submit">Vyhledat</button>
</form>

<style>
    .radio {
        width: 20px;
        aspect-ratio: 1;
        appearance: auto;
    }

    .radio-group {
        display: flex;
        flex-direction: column;
    }

    .field {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 32px;
        column-gap: 10px;
    }
    .field button {
        width: 48px;
        height: 48px;
        padding: 0;
        border: none;
        background-color: #d32f2f;
    }

    button {
        cursor: pointer;
        min-width: 25px;
    }
    .icon {
        width: 32px;
        height: 32px;
    }

    form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        row-gap: 15px;
        column-gap: 50px;
    }

    input {
        flex: 1;
    }

    .col {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>
