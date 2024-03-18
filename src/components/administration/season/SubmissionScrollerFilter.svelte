<script lang="ts">
	import Store from '$lib/enums/Stores';
	import type { ActivityStore } from '$lib/stores/ActivityStore.svelte';
	import type { FacultyStore } from '$lib/stores/FacultyStore.svelte';
	import { getContext, onMount, untrack } from 'svelte';
	import { LL } from '$translations/i18n-svelte';
	import DateInput from '$components/FormComponent/DateInput.svelte';
	import Button from '$components/Button.svelte';
	import type { SubmissionState } from '$lib/enums/SubmissionState';
	import Select from '$components/FormComponent/Select.svelte';
	import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
	import type { SubmissionDTO } from '$lib/DTO/SubmissionDTO';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';

	let { season, submissions } = $props<{ season: SeasonDTO; submissions: Array<SubmissionDTO> }>();

	const facultyStore = getContext<FacultyStore>(Store.FACULTY_STORE);
	const activityStore = getContext<ActivityStore>(Store.ACTIVITY_STORE);

	const states: Array<SubmissionState> = ['accepted', 'rejected', 'pending'];
	const weeks = [1, 2, 3, 4];

	let selectFaculty = $state<Select>();
	let selectWeek = $state<Select>();

    let filter = $derived($page.data.filter);

	let email = $state<string>();
	let date = $state<Date>();
	let _state = $state<string>();
	let activityValue = $state<number|string>();

    onMount(() => {
        email = filter.user;
        date = filter.date ? new Date(filter.date) : undefined;
        _state = filter.accepted === '1' ? 'accepted' : (filter.accepted === '0' ? 'rejected' : (filter.reviewed === undefined ? undefined : 'pending'));
        activityValue = Number(filter.activity);
    });

    $effect(() => {
        selectFaculty;
        selectWeek;

        untrack(() => {
            selectFaculty?.selectValue(Number(filter.faculty));
            selectWeek?.selectValue(Number(filter.week));
        })
    })

</script>

<form action={$page.url.toString()} method="GET" onsubmit={invalidateAll}>
	<div class="col">
		<label for="email">Uživatel (e-mail):</label>
		<div class="field">
			<input class="w-100 m-0" name="user" type="text" id="email" autocomplete="off" bind:value={email} />
			<button type="button" onclick={() => (email = undefined)}>
				<img class="icon" src="/images/icons/x.svg" alt="Odstranit filtr" />
			</button>
		</div>
	</div>

	<div class="col">
		<label for="date">Datum:</label>
		<div class="field">
			<DateInput style="flex:1;" class="f-1" id="date" name="date" bind:date={date} />
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
						<input type="radio" name="state" value={state} class="radio" id={`state${state}`} bind:group={_state} />
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
							<input name="activity" class="radio" type="radio" value={activity.id} id={`activity${activity.id}`} bind:group={activityValue} />
							<label for={`activity${activity.id}`}>{activity.name}</label>
						</div>
					{/each}
				</div>
				<button type="button" onclick={() => (activityValue = undefined)}>
					<img class="icon" src="/images/icons/x.svg" alt="Odstranit filtr" />
				</button>
			</div>
		</div>
	{/await}

	<div class="col">
		<label for="week">Týden:</label>
		<div class="field">
			<Select
				bind:this={selectWeek}
				keys={[undefined, ...weeks].map((week) => (week ? `${week}. týden` : 'Nevybráno'))}
				values={[undefined, ...weeks]}
				id="week"
				name="week"
			/>
			<button type="button" onclick={() => selectWeek?.select(0)}>
				<img class="icon" src="/images/icons/x.svg" alt="Odstranit filtr" />
			</button>
		</div>
	</div>

	{#await facultyStore.promise() then faculties}
		<div class="col">
			<label for="faculty">Fakulta:</label>
			<div class="field">
				<Select
					bind:this={selectFaculty}
					keys={[undefined, ...faculties].map((f) => f ?$LL.faculties[f.shortcut as keyof typeof $LL.faculties]() : "Nevybráno")}
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

	<Button type="submit" class="middle">Vyhledat</Button>
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
		grid-template-columns: auto 25px;
		column-gap: 10px;
	}

	button {
		cursor: pointer;
		min-width: 25px;
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
