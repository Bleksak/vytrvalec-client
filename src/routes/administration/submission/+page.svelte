<script lang="ts">
	import SubmissionReview from '$components/administration/submission/SubmissionReview.svelte';
	import type { TinderSubmissionResponseDTO } from '$lib/DTO/SubmissionDTO';
	import Store from '$lib/enums/Stores';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import createUnreviewedSubmissionStore from '$lib/stores/UnreviewedSubmissionStore.svelte';
	import { getContext } from 'svelte';

	const toastStore = getContext<ToastStore>(Store.TOAST_STORE);
	const submissionStore = createUnreviewedSubmissionStore();

	let currentSubmission = $state<TinderSubmissionResponseDTO | null>(null);

	$effect(() => {
		if (currentSubmission === null && submissionStore.all().length > 0) {
			currentSubmission = submissionStore.pop();
		}
	});

	const onAccept = (submission: TinderSubmissionResponseDTO, message: string) => {
		submissionStore.accept(submission, message).then((result) => {
			if (result.type === 'success') {
				toastStore.add({
					type: 'success',
					message: 'Aktivita byla schválena'
				});
				currentSubmission = submissionStore.pop();
			} else if (result.type === 'error') {
				toastStore.add({
					type: 'error',
					message:
						'Nastala chyba při schvalování aktivity. Aktualizujte stránku a opakujte akci znova.'
				});
			}
		});
	};

	const onReject = (submission: TinderSubmissionResponseDTO, message: string) => {
		submissionStore.reject(submission, message).then((result) => {
			if (result.type === 'success') {
				toastStore.add({
					type: 'success',
					message: 'Aktivita byla zamítnuta'
				});
				currentSubmission = submissionStore.pop();
			} else if (result.type === 'error') {
				toastStore.add({
					type: 'error',
					message:
						'Nastala chyba při zamítnutí aktivity. Aktualizujte stránku a opakujte akci znova.'
				});
			}
		});
	};
</script>

{#if currentSubmission !== null}
	<SubmissionReview {currentSubmission} {onAccept} {onReject} />
{:else}
	<h1>Nejsou žádné nové příspěvky.</h1>
{/if}
