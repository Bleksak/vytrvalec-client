<script lang="ts">
	import Dialog from '$components/Dialog.svelte';
	import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
	import type { SubmissionResponseDTO } from '$lib/DTO/SubmissionDTO';
	import createSubmissionStore from '$lib/stores/SubmissionStore.svelte';
	const { season } = $props<{ season: SeasonDTO }>();

	const submissionStore = createSubmissionStore(season);

	let currentSubmission = $state<SubmissionResponseDTO>();

	const openSubmission = (submission: SubmissionResponseDTO) => {
		currentSubmission = submission;
	};
</script>

{#await submissionStore.promise}
	Načítání...
{:then submissions}
	{#each submissions as submission, i}
		<div
			class="submission"
			on:click={() => {
				openSubmission(submission);
			}}
			on:keypress={() => {
				openSubmission(submission);
			}}
			role="button"
			tabindex={i}
		>
			<div>
				<p>
					<strong>{submission.user.firstName} {submission.user.lastName}&nbsp;</strong>
					({submission.user.faculty.shortcut})
				</p>
				<p><strong>Nahráno:&nbsp;</strong>{submission.date.toLocaleDateString('cs')}</p>
				<p>
					<strong>Schválená:&nbsp;</strong>
					<input type="checkbox" disabled checked={submission.accepted} />
				</p>
				<p>
					<strong>Zkontrolovaná:&nbsp;</strong>
					<input type="checkbox" disabled checked={submission.reviewed} />
				</p>
			</div>
			<div>
				<p style="user-select: none;">&nbsp;</p>
				<p><strong>Kategorie:&nbsp;</strong>{submission.activity.name}</p>
				<p><strong>Vzdálenost:&nbsp;</strong>{submission.distance / 1000} km</p>
				{#if submission.elevation}
					<p><strong>Převýšení:&nbsp;</strong>{submission.elevation} m</p>
				{/if}
			</div>
		</div>
	{/each}
{/await}

{#if currentSubmission}
	<Dialog header="Detail aktivity" on:close={() => (currentSubmission = undefined)}>
		<img src={currentSubmission.image} alt="Aktivita" />
		<form action=""></form>
	</Dialog>
{/if}

<style>
	.submission {
		display: flex;
		justify-content: flex-start;

		gap: 100px;
	}

	.submission:hover {
		background-color: rgb(245, 245, 245);
	}
</style>
