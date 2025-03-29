<script lang="ts">
	import Checkbox from '$components/FormComponent/Checkbox.svelte';
	import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
	import type { DialogStore } from '$lib/stores/DialogStore.svelte';
	import { getAllContexts, getContext } from 'svelte';
	import SubmissionDetail from './SubmissionDetail.svelte';
	import Store from '$lib/enums/Stores';
	import type { ActivityStore } from '$lib/stores/ActivityStore.svelte';
	import type { FacultyStore } from '$lib/stores/FacultyStore.svelte';
	import { page } from '$app/state';
	import SubmissionScrollerFilter from '$components/administration/season/SubmissionScrollerFilter.svelte';
	import { fetchSubmissionsForSeason } from '$actions/Submission';

	const { season }: { season: SeasonDTO } = $props();

	let filter = page.data.filter;

	const context = getAllContexts();
	const dialogStore = getContext<DialogStore>(Store.DIALOG_STORE);
	const activityStore = getContext<ActivityStore>(Store.ACTIVITY_STORE);
	const facultyStore = getContext<FacultyStore>(Store.FACULTY_STORE);

	let submissions = $state(page.data.submissions);

	$effect(() => {
		filter = page.data.filter;
		submissions = page.data.submissions;
	});

	let canLoadNext = true;

	const loadNext = (element: Element) => {
		const observer = new IntersectionObserver((entries) => {
			if (canLoadNext) {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						if (!filter.page) {
							filter.page = 1;
						}

						filter.page += 1;

						fetchSubmissionsForSeason(season, filter).then((newSubmissions) => {
							submissions.push(...newSubmissions);

							if (newSubmissions.length === 0) {
								canLoadNext = false;
							}
						});
					}
				});
			}
		});
		observer.observe(element);

		return {
			destroy: () => observer.disconnect()
		};
	};
</script>

<SubmissionScrollerFilter />

{#await Promise.all([facultyStore.promise(), activityStore.promise()])}
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
					({facultyStore.get(submission.user.faculty)?.shortcut})
				</p>
				{#if submission.message}
					<p>
						<strong>Komentář:&nbsp;</strong>{submission.message}
					</p>
				{/if}
				<p><strong>Nahráno:&nbsp;</strong>{submission.date.toLocaleDateString('cs')}</p>
				<p>
					<Checkbox id="accepted-view" name="accepted-view" disabled checked={submission.accepted}>
						<strong>Schválená</strong>
					</Checkbox>
				</p>
				<p>
					<Checkbox id="reviewed-view" name="reviewed-view" disabled checked={submission.reviewed}>
						<strong>Zkontrolovaná</strong>
					</Checkbox>
				</p>
			</div>
			<div>
				<p style="user-select: none;">&nbsp;</p>
				<p><strong>Kategorie:&nbsp;</strong>{activityStore.get(submission.activity)?.name}</p>
				<p><strong>Vzdálenost:&nbsp;</strong>{submission.distance / 1000} km</p>
				{#if submission.elevation}
					<p><strong>Převýšení:&nbsp;</strong>{submission.elevation} m</p>
				{/if}
			</div>
		</div>
	{/each}
	<div use:loadNext />
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

	.buttons {
		display: flex;
	}

	img {
		max-height: 450px;
		height: 100%;
	}
</style>
