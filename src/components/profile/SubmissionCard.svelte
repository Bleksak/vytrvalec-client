<script lang="ts">
	import { deleteSubmission } from '$actions/Submission';
	import SubmissionStateTag from '$components/profile/SubmissionStateTag.svelte';
	import LL from '../../translations/i18n-svelte';
	import { SubmissionStateEnum } from '$lib/enums/SubmissionStateEnum.js';
	import { getContext } from 'svelte';
	import SubmissionForm from '../forms/SubmissionForm.svelte';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import profileDataStore, {
		type TransformedSubmission
	} from '$lib/stores/ProfileDataStore.svelte';
	import { StoreKey } from '$lib/stores/StoreKey';

	let { submission } = $props<{
		submission: TransformedSubmission;
	}>();
	let isEditMode = $state<boolean>(false);
	const toggleEditMode = () => (isEditMode = true);

	const getSubmissionState = (submission: TransformedSubmission) => {
		if (!submission.reviewed) {
			return SubmissionStateEnum.PENDING;
		}
		return submission.accepted ? SubmissionStateEnum.ACCEPTED : SubmissionStateEnum.REJECTED;
	};

	const isEditSubmissionEnabled = () => {
		return getSubmissionState(submission) !== SubmissionStateEnum.ACCEPTED;
	};

	const toastStore = getContext<ToastStore>(StoreKey.TOAST_STORE);

	const handleSubmissionDelete = async () => {
		if (confirm($LL.submission.form.deleteConfirm())) {
			const result = await deleteSubmission(submission.s_id).catch((e) => {
				console.error(e);
				toastStore.add({
					type: 'error',
					message: $LL.submission.form.deleteErrorToast()
				});
			});
			if (result) {
				toastStore.add({
					type: 'success',
					message: $LL.submission.form.deleteSuccessToast()
				});
				profileDataStore.refetch();
			}
		}
	};

	//TODO redo
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

<div class="container">
	<div class="image-container">
		<img loading="lazy" src={submission.image} alt="Preview" title="Preview" />
	</div>
	<div class="content row">
		<div class="row">
			<SubmissionStateTag state={getSubmissionState(submission)} />
			{#if submission.message}
				<img src="/images/icons/comment.svg" alt="Comment" />
			{/if}
		</div>
		<img src={`/images/icons/${getIconName()}.svg`} alt={getIconName()} />
	</div>
	<div class="bottom-stats">
		<div class="row">
			<img src="/images/icons/distance.svg" alt="Distance" />
			<span>{Number(submission.distance / 1000).toFixed(1)} km</span>
		</div>
		<div class="row">
			<img src="/images/icons/elevation.svg" alt="Elevation" />
			<span>{submission.elevation} m</span>
		</div>
		<div class="row">
			<img src="/images/icons/calendar.svg" alt="Date" />
			<span>{new Date(submission.date).toLocaleDateString()}</span>
		</div>
	</div>
	{#if isEditSubmissionEnabled()}
		<div class="hover">
			<button on:click={toggleEditMode}>{$LL.submission.form.edit()}</button>
			<button on:click={handleSubmissionDelete} class="delete"
				>{$LL.submission.form.delete()}</button
			>
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
	span {
		color: #fff;
		font-weight: 500;
	}
</style>
