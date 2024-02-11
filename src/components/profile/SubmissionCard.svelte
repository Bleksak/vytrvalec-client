<script lang="ts">
	import { deleteSubmission } from '$actions/Submission';
	import SubmissionStateTag from '$components/profile/SubmissionStateTag.svelte';
	import type { UnknownSubmissionResponse } from '$lib/DTO/SubmissionDTO';
	import { SubmissionStateEnum } from '$lib/enums/SubmissionStateEnum.js';
	import { getContext } from 'svelte';
	import SubmissionForm from '../forms/SubmissionForm.svelte';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import userSubmissionsStore from '$lib/stores/UserSubmissionsStore.svelte';

	let { submission } = $props<{
		submission: UnknownSubmissionResponse;
	}>();
	let isEditMode = $state<boolean>(false);
	const toggleEditMode = () => (isEditMode = true);

	const getSubmissionState = (submission: UnknownSubmissionResponse) => {
		if (!submission.reviewed) {
			return SubmissionStateEnum.PENDING;
		}
		return submission.accepted ? SubmissionStateEnum.ACCEPTED : SubmissionStateEnum.REJECTED;
	};

	const isEditSubmissionEnabled = () => {
		return getSubmissionState(submission) !== SubmissionStateEnum.ACCEPTED;
	};

	const toastStore = getContext<ToastStore>('toastStore');

	const handleSubmissionDelete = async () => {
		if (confirm('Opravdu chcete aktivitu smazat?')) {
			const result = await deleteSubmission(submission.s_id).catch((e) => {
				console.error(e);
				toastStore.add({
					type: 'error',
					message: 'Smazání aktivity se nezdařilo'
				});
			});
			if (result) {
				toastStore.add({
					type: 'success',
					message: 'Smazání aktivity proběhlo úspěšně'
				});
				userSubmissionsStore.refetch();
			}
		}
	};
</script>

<div class="container">
	<div class="image-container">
		<img loading="lazy" src={submission.image} alt="Preview" title="Preview" />
	</div>
	<div class="content row">
		<SubmissionStateTag state={getSubmissionState(submission)} />
		<img src="/images/icons/person-walking-white.svg" alt="Runner" />
	</div>
	<div class="bottom-stats">
		<div class="row">
			<img src="/images/icons/distance.svg" alt="Distance" />
			<h6>{submission.distance} km</h6>
		</div>
		<div class="row">
			<img src="/images/icons/elevation.svg" alt="Elevation" />
			<h6>{submission.elevation} m</h6>
		</div>
		<div class="row">
			<img src="/images/icons/calendar.svg" alt="Date" />
			<h6>{new Date(submission.date).toLocaleDateString()}</h6>
		</div>
	</div>
	{#if isEditSubmissionEnabled()}
		<div class="hover">
			<button on:click={toggleEditMode}>Upravit</button>
			<button on:click={handleSubmissionDelete} class="delete">Smazat</button>
		</div>
	{/if}
</div>

{#if isEditMode}
	<SubmissionForm on:close={() => (isEditMode = false)} {submission} />
{/if}

<style>
	.row,
	.bottom-stats > div {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 5px;
	}
	.row > img {
		height: 20px;
		width: auto;
	}
	.container {
		width: 300px;
		height: 300px;
		position: relative;
	}
	.content.row > img {
		display: block;
		width: auto;
		height: 30px;
		margin-right: 5px;
	}
	.content.row {
		justify-content: space-between;
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
		width: 300px;
	}
	.content > img {
		width: 50px;
		aspect-ratio: 1/1;
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
