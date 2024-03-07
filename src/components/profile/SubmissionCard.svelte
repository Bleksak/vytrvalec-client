<script lang="ts">
	import { deleteSubmission } from '$actions/Submission';
	import SubmissionStateTag from '$components/profile/SubmissionStateTag.svelte';
	import LL from '$translations/i18n-svelte';
	import { getAllContexts, getContext } from 'svelte';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import type { DialogStore } from '$lib/stores/DialogStore.svelte';
	import type { ProfileSubmissionResponseDTO } from '$lib/DTO/SubmissionDTO';
	import SubmissionEditForm from '$components/forms/SubmissionEditForm.svelte';

	let { submission, submissions } = $props<{
		submissions: Array<ProfileSubmissionResponseDTO>;
		submission: ProfileSubmissionResponseDTO;
	}>();

	const contexts = getAllContexts();

	const dialogStore = getContext<DialogStore>('dialogStore');
	const toastStore = getContext<ToastStore>('toastStore');

	const isEditable = !submission.reviewed || !submission.accepted;

	let error = $state<(Event & {currentTarget: EventTarget & Element}) | null>(null);

	const handleSubmissionDelete = async () => {
		if (!confirm($LL.submission.form.deleteConfirm())) {
			return;
		}

		const result = await deleteSubmission(submission.id);

		if (!result) {
			toastStore.add({
				type: 'error',
				message: $LL.submission.form.deleteErrorToast()
			});
		} else {
			toastStore.add({
				type: 'success',
				message: $LL.submission.form.deleteSuccessToast()
			});

			submissions = submissions.filter((sub) => submission.id !== sub.id);
		}
	};

	const getIconName = () => {
		switch (submission.activity.name) {
			case 'Běh/Chůze':
				return 'person-walking-white';
			case 'Kolo/Koloběžka':
				return 'bicycle-white';
			default:
				return 'unknown';
		}
	};
</script>

<div class="submission-card">
	{#if error}
	<img
		class="submission-preview"
		loading="lazy"
		src='/images/image-not-found.png'
		alt="Náhled"
		title="Náhled"
		onerror={(err) => error = err}
	/>
	{:else}
	<img
		class="submission-preview"
		loading="lazy"
		src={submission.image}
		alt="Náhled"
		title="Náhled"
		on:error={(err) => error = err}
	/>
	{/if}
	<div class="status-bar">
		<div class="submission-card-row">
			<div class="stack">
				<SubmissionStateTag {submission} />
				{#if submission.message}
					<img class="icon" src="/images/icons/comment.svg" alt="Komentář" title="Komentář" />
				{/if}
			</div>
			<img class="icon" src={`/images/icons/${getIconName()}.svg`} alt={getIconName()} />
		</div>
	</div>
	<div class="bottom-bar">
		<div class="submission-card-row">
			<img class="icon" src="/images/icons/distance.svg" alt="Vzdálenost" title="Vzdálenost" />
			<span>{Number(submission.distance / 1000).toFixed(1)} km</span>

			<img class="icon" src="/images/icons/elevation.svg" alt="Převýšení" title="Převýšení" />
			<span>{submission.elevation} m</span>

			<img
				class="icon"
				src="/images/icons/calendar.svg"
				alt="Datum nahrání"
				title="Datum nahrání"
			/>
			<span>{submission.date.toLocaleDateString()}</span>
		</div>
	</div>
	{#if isEditable}
		<div class="buttons">
			<button onclick={() => dialogStore.open(SubmissionEditForm, { submission }, contexts)}>
				{$LL.submission.form.edit()}
			</button>

			<button onclick={handleSubmissionDelete} class="delete">
				{$LL.submission.form.delete()}
			</button>
		</div>
	{/if}
</div>

<style>
	.submission-card {
		position: relative;
	}

	.submission-preview {
		width: 100%;
		aspect-ratio: 1/1;
		object-fit: cover;
		filter: brightness(60%);
	}

	.status-bar {
		position: absolute;
		top: 0;
		width: 100%;
	}

	.submission-card-row {
		display: flex;
		justify-content: space-between;
		margin: 10px;
	}

	.stack {
		display: flex;
		gap: 10px;
	}

	.bottom-bar {
		position: absolute;
		bottom: 0;
		width: 100%;
	}

	.buttons {
		display: none;
		position: absolute;
		top: 50%;
		left: 50%;

		transform: translate(-50%, -50%);

		gap: 10px;

		color: white;

		font-size: 1.5rem;
		font-weight: bolder;
	}

	.buttons > button {
		background-color: #005cab;
		padding: 10px 20px;
		cursor: pointer;
	}

	.buttons > .delete {
		background-color: red;
	}

	.submission-card:hover .submission-preview {
		filter: brightness(50%);
		transition: filter 0.3s ease;
	}

	.submission-card:hover .buttons {
		display: flex;
	}

	span {
		color: white;
		font-weight: bolder;
	}
</style>
