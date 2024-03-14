<script lang="ts">
	import Collapsible from '$components/Collapsible.svelte';
	import Store from '$lib/enums/Stores';
	import type { ActivityStore } from '$lib/stores/ActivityStore.svelte';
	import type { FacultyStore } from '$lib/stores/FacultyStore.svelte';
	import { getContext } from 'svelte';
	import { LL } from '$translations/i18n-svelte';
	import DateInput from '$components/FormComponent/DateInput.svelte';
	import Button from '$components/Button.svelte';
	import type { SubmissionFilter, SubmissionStore } from '$lib/stores/SubmissionStore.svelte';
	import { SubmissionStateEnum } from '$lib/enums/SubmissionStateEnum';
	import { FilterEnum } from '$lib/enums/FilterEnum';
	import type { SelectedFilter } from '$lib/DTO/SelectedFilter';

	const { submissionStore } = $props<{ submissionStore: SubmissionStore }>();

	const facultyStore = getContext<FacultyStore>(Store.FACULTY_STORE);
	const activityStore = getContext<ActivityStore>(Store.ACTIVITY_STORE);

	const states = ['accepted', 'rejected', 'pending'];
	const weeks = [1, 2, 3, 4];

	let selectedFilter = $state<SelectedFilter>({
		user: undefined,
		date: undefined,
		faculty: undefined,
		state: undefined,
		week: undefined,
		activity: undefined
	});


	const handleFilter = () => {
		let filter: SubmissionFilter = {};
		Object.keys(selectedFilter).forEach((key: string) => {
			if (selectedFilter[key as keyof typeof selectedFilter]) {
				if (key === FilterEnum.STATE) {
					switch (selectedFilter[key as keyof typeof selectedFilter]) {
						case SubmissionStateEnum.ACCEPTED:
							filter.accepted = 1;
							break;
						case SubmissionStateEnum.REJECTED:
							filter.accepted = 0;
							break;
						case SubmissionStateEnum.PENDING:
							filter.reviewed = 0;
							break;
					}
				} else {
					filter[key as keyof typeof filter] = selectedFilter[
						key as keyof typeof selectedFilter
					] as any;
				}
			}
		});

		submissionStore.filter(filter);
	};

	const deselect = (filter: FilterEnum) => {
		selectedFilter = {
			...selectedFilter,
			[filter]: undefined
		};
	};
</script>
<!-- TODO: jsem designerska lopata sorry -->
<Collapsible title="Uživatel">
	<input type="text" id="email" bind:value={selectedFilter.user} autocomplete="off" />
	<Button onclick={() => deselect(FilterEnum.USER)}>X</Button>
</Collapsible>

<Collapsible title="Datum">
	<!-- FIXME: ts-error -->
	<DateInput bind:date={selectedFilter.date} id="date" />
	<Button onclick={() => deselect(FilterEnum.DATE)}>X</Button>
</Collapsible>

<Collapsible title="Stav">
	{#each states as state}
		<input type="radio" value={state} bind:group={selectedFilter.state} class="radio" />
		<label for={`state${state}`}>
			{$LL.submission.state[state as keyof typeof $LL.submission.state]()}
		</label>
	{/each}
	<Button onclick={() => deselect(FilterEnum.STATE)}>X</Button>
</Collapsible>

<Collapsible title="Týden">
	{#each weeks as week}
		<input type="radio" value={week} bind:group={selectedFilter.week} class="radio" />
		<label for={`week${week}`}>{week}. Týden</label>
	{/each}
	<Button onclick={() => deselect(FilterEnum.WEEK)}>X</Button>
</Collapsible>

{#await facultyStore.all() then faculties}
	<Collapsible title="Fakulta">
		{#each faculties as faculty}
			<input type="radio" value={faculty.id} bind:group={selectedFilter.faculty} class="radio" />
			<label for={`faculty${faculty.id}`}>{faculty.shortcut}</label>
		{/each}
		<Button onclick={() => deselect(FilterEnum.FACULTY)}>X</Button>
	</Collapsible>
{/await}

{#await activityStore.all() then activities}
	<Collapsible title="Aktivita">
		{#each activities as activity}
			<input type="radio" value={activity.id} bind:group={selectedFilter.activity} class="radio" />
			<label for={`activity${activity.id}`}>{activity.name}</label>
		{/each}
		<Button onclick={() => deselect(FilterEnum.ACTIVITY)}>X</Button>
	</Collapsible>
{/await}
<Button onclick={handleFilter} class="middle">Vyhledat</Button>

<style>
	.radio {
		width: 20px;
		aspect-ratio: 1;
		appearance: auto;
	}
</style>
