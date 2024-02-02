<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import Dialog from '$components/Dialog.svelte';
	import Checkbox from '$components/FormComponent/Checkbox.svelte';
	import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
	import type { SubmissionResponseDTO } from '$lib/DTO/SubmissionDTO';
	import createSubmissionStore from '$lib/stores/SubmissionStore.svelte';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getContext } from 'svelte';
	const { season } = $props<{ season: SeasonDTO }>();

	const submissionStore = createSubmissionStore(season);

	let currentSubmission = $state<SubmissionResponseDTO>();

	const openSubmission = (submission: SubmissionResponseDTO) => {
		currentSubmission = submission;
	};

	let dialog = $state<Dialog>();

	const toastStore = getContext<ToastStore>('toastStore');

	const enhancer: SubmitFunction<{ updated_at: string }> = ({ formData }) => {
		dialog?.close();

		return async ({ update, result }) => {
			if (result.type === 'success') {
				currentSubmission!.reviewed! = true;
				currentSubmission!.accepted! = formData.get('state')?.toString() === '1';
				currentSubmission!.updatedAt! = result!.data!.updated_at!;

				submissionStore.update(currentSubmission!);

				toastStore.add({
					type: 'success',
					message: 'Akce proběhla úspěšně'
				});
			} else if (result.type === 'failure') {
				toastStore.add({
					type: 'error',
					message: 'Akci nebylo možné dokončit, zkuste to prosím znovu'
				});
			}

			currentSubmission = undefined;
			update();
		};
	};
</script>

{#await submissionStore.promise()}
	Načítání...
{:then}
	{#each submissionStore.all() as submission, i}
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

{#if currentSubmission}
	<Dialog bind:this={dialog} header="Detail aktivity">
		<form action="/submission?/state" method="POST" use:enhance={enhancer}>
			<img src={currentSubmission.image} alt="Aktivita" />
			<input type="hidden" name="id" value={currentSubmission.id} />
			<input type="hidden" name="updated_at" value={currentSubmission.updatedAt} />

			<p><strong>Aktivita:&nbsp;</strong>{currentSubmission.activity.name}</p>
			<p><strong>Vzdálenost:&nbsp;</strong>{currentSubmission.distance / 1000} km</p>
			{#if currentSubmission.elevation}
				<p><strong>Převýšení:&nbsp;</strong>{currentSubmission.elevation} m</p>
			{/if}

			{#if currentSubmission.reviewed}
				<span class="note">
					<strong>Poznámka:&nbsp;</strong>
					aktivita již byla dříve zkontrolována
				</span>

				{#if currentSubmission.accepted}
					<label for="message">Zpráva pro zamítnutí:</label>
					<textarea name="message" id="message"></textarea>
					<Button name="state" value="0" type="submit">Zamítnout</Button>
				{:else}
					<Button name="state" value="1" type="submit">Schválit</Button>
				{/if}
			{:else}
				<label for="message">Zpráva pro zamítnutí:</label>
				<textarea name="message" id="message"></textarea>
				<div class="buttons">
					<Button class="left" name="state" value="0" type="submit">Zamítnout</Button>
					<Button class="right" name="state" value="1" type="submit">Schválit</Button>
				</div>
			{/if}
		</form>
	</Dialog>
{/if}

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
