<script lang="ts">
	import { deleteSubmission } from '$actions/Submission';
	import SubmissionStateTag from '$components/profile/SubmissionStateTag.svelte';
	import LL from '$translations/i18n-svelte';
	import { getAllContexts, getContext } from 'svelte';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import type { DialogStore } from '$lib/stores/DialogStore.svelte';
	import SubmissionEditForm from '$components/forms/SubmissionEditForm.svelte';
	import Store from '$lib/enums/Stores';
	import { invalidateAll } from '$app/navigation';
	import type { SubmissionResponseDTO } from '$lib/DTO/SubmissionDTO';
	import type { SvelteMap } from 'svelte/reactivity';
	import type { ActivityDTO } from '$lib/DTO/ActivityDTO';
	import { Pencil, Trash } from '@lucide/svelte';

	let {
		submission,
		activities
	}: {
		submission: SubmissionResponseDTO;
		activities: SvelteMap<number, ActivityDTO>;
	} = $props();

	let activity = $derived(activities.get(submission.activity_id)!);

	const contexts = getAllContexts();

	const dialogStore = getContext<DialogStore>(Store.DIALOG_STORE);
	const toastStore = getContext<ToastStore>(Store.TOAST_STORE);

	const isEditable = $derived(!submission.reviewed || !submission.accepted);

	let error = $state<(Event & { currentTarget: EventTarget & Element }) | null>(null);

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

			invalidateAll();
		}
	};
</script>

<div class="submission-card">
	<div class="image-wrapper">
		{#if error}
			<img
				class="submission-preview"
				loading="lazy"
				src="/images/image-not-found.png"
				alt="Náhled"
				title="Náhled"
				onerror={(err) => (error = err)}
			/>
		{:else}
			<img
				class="submission-preview"
				loading="lazy"
				src={submission.image}
				alt="Náhled"
				title="Náhled"
				onerror={(err) => (error = err)}
			/>
		{/if}

		<div class="overlay top">
			<div class="submission-card-row">
				<div class="stack">
					<SubmissionStateTag {submission} />
					{#if submission.message}
						<img class="icon" src="/images/icons/comment.svg" alt="Komentář" title="Komentář" />
					{/if}
				</div>
				<div class="meta-item">
					<img
						class="icon"
						src="/images/icons/calendar.svg"
						alt="Datum nahrání"
						title="Datum nahrání"
					/>
					<span>{submission.date.toLocaleDateString()}</span>
				</div>
				<img class="icon filter-white" src={activity.icon} alt={activity.name.cs} />
			</div>
		</div>

		<div class="overlay bottom">
			<div class="submission-card-row meta">
				<div class="meta-item">
					<img class="icon" src="/images/icons/distance.svg" alt="Vzdálenost" title="Vzdálenost" />
					<span>{Number(submission.distance / 1000).toFixed(1)} km</span>
				</div>
				<div class="meta-item">
					<img class="icon" src="/images/icons/elevation.svg" alt="Převýšení" title="Převýšení" />
					<span>{submission.elevation} m</span>
				</div>
			</div>
		</div>

		<div class="buttons">
			{#if isEditable}
				<button onclick={() => dialogStore.open(SubmissionEditForm, { submission }, contexts)}>
					<Pencil />
				</button>
				<button onclick={handleSubmissionDelete} class="delete">
					<Trash />
				</button>
			{:else}
				<button
					onclick={() =>
						dialogStore.open(
							SubmissionEditForm,
							{ submission: submission, disabled: true },
							contexts
						)}
				>
					{$LL.submission.form.preview()}
				</button>
			{/if}
		</div>
	</div>
</div>

<style>
	.submission-card {
		width: 300px;
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
		background: #111;
		position: relative;
		transition:
			transform 0.25s ease,
			box-shadow 0.25s ease;
	}

	.image-wrapper {
		position: relative;
	}

	.submission-preview {
		width: 100%;
		aspect-ratio: 1/1;
		object-fit: cover;
		display: block;
		transition: filter 0.3s ease;
	}

	.overlay {
		position: absolute;
		left: 0;
		right: 0;
		padding: 10px 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: white;
	}

	.overlay.top {
		top: 0;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.55), transparent);
	}

	.overlay.bottom {
		bottom: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent);
	}

	.submission-card-row {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.stack {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.meta {
		justify-content: space-around;
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 0.9rem;
		font-weight: 500;
		color: #f5f5f5;
	}

	.icon {
		width: 18px;
		height: 18px;
		filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.7));
	}

	.buttons {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(0.9);
		display: flex;
		gap: 10px;
		opacity: 0;
		transition:
			opacity 0.25s ease,
			transform 0.25s ease;
	}

	.submission-card:hover .buttons {
		opacity: 1;
		transform: translate(-50%, -50%) scale(1);
	}

	.buttons > button {
		padding: 8px 16px;
		font-size: 0.9rem;
		font-weight: 600;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		background: #005cab;
		color: white;
		transition:
			background 0.2s ease,
			transform 0.2s ease;
	}

	.buttons > button:hover {
		background: #0072d4;
		transform: translateY(-2px);
	}

	.buttons > .delete {
		background: #d32f2f;
	}

	.buttons > .delete:hover {
		background: #f44336;
	}
</style>
