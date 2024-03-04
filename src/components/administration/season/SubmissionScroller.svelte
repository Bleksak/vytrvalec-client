<script lang="ts">
	import Checkbox from '$components/FormComponent/Checkbox.svelte';
	import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
	import type { DialogStore } from '$lib/stores/DialogStore.svelte';
	import createSubmissionStore from '$lib/stores/SubmissionStore.svelte';
	import { getAllContexts, getContext } from 'svelte';
	import SubmissionDetail from './SubmissionDetail.svelte';
	const { season } = $props<{ season: SeasonDTO }>();

	const submissionStore = createSubmissionStore(season);
	const context = getAllContexts();
	const dialogStore = getContext<DialogStore>('dialogStore');
</script>

{#await submissionStore.promise()}
	Načítání...
{:then}
	{#each submissionStore.all() as submission, i}
		<div
			class="submission"
			on:click={() => {
				dialogStore.open(SubmissionDetail, { currentSubmission: submission }, context);
			}}
			on:keypress={() => {
				dialogStore.open(SubmissionDetail, { currentSubmission: submission }, context);
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
				<p><strong>Kategorie:&nbsp;</strong>{submission.activity.name}</p>
				<p><strong>Vzdálenost:&nbsp;</strong>{submission.distance / 1000} km</p>
				{#if submission.elevation}
					<p><strong>Převýšení:&nbsp;</strong>{submission.elevation} m</p>
				{/if}
			</div>
		</div>
	{/each}
{/await}

<style>
	.submission {
		border: 1px solid lightgray;
		padding: 15px;
		display: flex;
		justify-content: flex-start;

		gap: 100px;
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
