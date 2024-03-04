<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import Dialog from '$components/Dialog.svelte';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
    import type {SubmissionResponseDTO} from '$lib/DTO/SubmissionDTO';
    import type {SubmitFunction} from '@sveltejs/kit';
	import { getContext } from 'svelte';
	import type { SubmissionStore } from '$lib/stores/SubmissionStore.svelte';

	const { currentSubmission } = $props<{ currentSubmission: SubmissionResponseDTO }>();

	const toastStore = getContext<ToastStore>('toastStore');

    let dialog = $state<Dialog>();

    const submissionStore = getContext<SubmissionStore>('submissionStore');

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

			update();
		};
	};
</script>

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
