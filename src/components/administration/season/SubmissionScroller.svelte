<script lang="ts">
	import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
	import createSubmissionStore from '$lib/stores/SubmissionStore.svelte';
	const { season } = $props<{ season: SeasonDTO }>();

	const submissionStore = createSubmissionStore(season);
</script>

{#await submissionStore.promise}
	Načítání...
{:then submissions}
	{#each submissions as submission}
		<div class="submission">
			<div class="submission-data">
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

<style>
	.submission {
		display: flex;
		justify-content: flex-start;

		gap: 100px;
	}
</style>
