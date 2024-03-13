<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import Dialog from '$components/Dialog.svelte';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
    import type {SubmissionResponseAdminDTO} from '$lib/DTO/SubmissionDTO';
    import type {SubmitFunction} from '@sveltejs/kit';
	import { getContext } from 'svelte';
	import type { SubmissionStore } from '$lib/stores/SubmissionStore.svelte';
	import type { SubmissionStateError } from '$lib/DTO/SubmissionStateDTO';
	import { LL } from '$translations/i18n-svelte';
	import Store from '$lib/enums/Stores';
	import type { ActivityStore } from '$lib/stores/ActivityStore.svelte';

	const { currentSubmission } = $props<{ currentSubmission: SubmissionResponseAdminDTO }>();

	const toastStore = getContext<ToastStore>(Store.TOAST_STORE);
	const activityStore = getContext<ActivityStore>(Store.ACTIVITY_STORE);

    let dialog = $state<Dialog>();

    const submissionStore = getContext<SubmissionStore>(Store.SUBMISSION_STORE);
	let errors = $state<SubmissionStateError>();

	const enhancer: SubmitFunction<{ updated_at: string }> = ({ formData }) => {
		return async ({ update, result }) => {
			if (result.type === 'success') {
				currentSubmission!.reviewed! = true;
				currentSubmission!.accepted! = formData.get('state')?.toString() === '1';
				currentSubmission!.updatedAt! = result!.data!.updated_at!;

				submissionStore?.update(currentSubmission!);

				dialog?.close();
				toastStore.add({
					type: 'success',
					message: 'Akce proběhla úspěšně'
				});
				errors = undefined;
			} else if (result.type === 'failure') {
				errors = result?.data as SubmissionStateError;
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
		
		{#each errors?.submissionState ?? [] as error}
			<span class="error">
				<span class="error">{$LL.submission.errors[error as keyof typeof $LL.submission.errors]()}</span>
			</span>
		{/each}

		{#await activityStore.promise() then}
			<p><strong>Aktivita:&nbsp;</strong>{activityStore.get(currentSubmission.activity)?.name}</p>
		{/await}
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
