<script lang="ts">
	import { deleteSubmission } from '$actions/Submission';
	import SubmissionStateTag from '$components/profile/SubmissionStateTag.svelte';
	import type { UnknownSubmissionResponse } from '$lib/DTO/SubmissionDTO';
	import { SubmissionStateEnum } from '$lib/enums/SubmissionStateEnum.js';
	import { getContext } from 'svelte';
	import SubmissionForm from '../forms/SubmissionForm.svelte';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';

	let { submission, fetchSubmissions } = $props<{
		submission: UnknownSubmissionResponse;
		fetchSubmissions: () => void;
	}>();
	let isEditMode = $state<boolean>(false);

	const toggleEditMode = () => (isEditMode = !isEditMode);

	const getSubmissionState = (submission: UnknownSubmissionResponse) => {
		if (!submission.reviewed) {
			return SubmissionStateEnum.PENDING;
		}
		return submission.accepted ? SubmissionStateEnum.ACCEPTED : SubmissionStateEnum.REJECTED;
	};

	const submissionState = getSubmissionState(submission);
	const isEditSubmissionEnabled = submissionState !== SubmissionStateEnum.ACCEPTED;
	const toastStore = getContext<ToastStore>('toastStore');

	const handleSubmissionDelete = () => {
		if (confirm('Opravdu chcete aktivitu smazat?')) {
			deleteSubmission(submission.s_id)
				.catch((e) => {
					toastStore.add({
						type: 'error',
						message: 'Smazání aktivity se nezdařilo'
					});
				})
				.then(() => {
					toastStore.add({
						type: 'success',
						message: 'Smazání aktivity proběhlo úspěšně'
					});
					fetchSubmissions();
				});
		}
	};
</script>

<div class="container">
	<div class="image-container">
		<img src={submission.image} alt="Preview" />
	</div>
	<div class="content">
		<SubmissionStateTag state={getSubmissionState(submission)} />
	</div>
	<div class="bottom-stats">
		<h6>{submission.distance} km</h6>
		<h6>{submission.elevation} m</h6>
		<h6>{new Date().toLocaleDateString()}</h6>
	</div>
	{#if isEditSubmissionEnabled}
		<div class="hover">
			<button on:click={toggleEditMode}>Upravit</button>
			<button on:click={handleSubmissionDelete} class="delete">Smazat</button>
		</div>
	{/if}
</div>

{#if isEditMode}
	<SubmissionForm {submission} />
{/if}

<style>
	.container {
		width: 300px;
		height: 300px;
		position: relative;
	}
	.hover > button {
		visibility: hidden;
		background-color: #005cab;
		padding: 10px 20px;
		color: white;
		font-size: 1.5rem;
		font-weight: 400;
		position: absolute;
		top: 50%;
		left: 30%;
		transform: translate(-50%, -50%);
		opacity: 0;
		transition:
			visibility 0s,
			opacity 0.15s linear;
		cursor: pointer;
	}
	.hover > .delete {
		visibility: hidden;
		background-color: red;
		padding: 10px 20px;
		color: white;
		font-size: 1.5rem;
		font-weight: 400;
		position: absolute;
		top: 50%;
		left: 70%;
		transform: translate(-50%, -50%);
		opacity: 0;
		transition:
			visibility 0s,
			opacity 0.15s linear;
		cursor: pointer;
	}

	.container:hover .hover {
		background-color: rgba(0, 0, 0, 0.3);
		transition: background-color 0.2s ease;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
	.container:hover button {
		visibility: visible;
		opacity: 1;
	}
	img {
		display: block;
		width: 100%;
		aspect-ratio: 1/1;
		object-fit: cover;
	}
	.content {
		position: absolute;
		top: 0;
		text-align: center;
	}
	.bottom-stats {
		position: absolute;
		bottom: 5px;
		display: flex;
		justify-content: space-around;
		width: 300px;
	}
	.image-container::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.2);
		pointer-events: none;
	}
	h6 {
		font-size: 1.2rem;
	}
</style>
