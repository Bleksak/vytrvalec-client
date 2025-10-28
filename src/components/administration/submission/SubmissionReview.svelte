<script lang="ts">
	import type { ActivityDTO } from '$lib/DTO/ActivityDTO';
	import type UnreviewedSubmissionStore from '$lib/stores/UnreviewedSubmissionStore.svelte';
	import { Activity, Calendar, Ruler, TrendingUp, User } from '@lucide/svelte';

	const {
		submissionStore,
		activities
	}: {
		submissionStore: UnreviewedSubmissionStore;
		activities: Map<number, ActivityDTO>;
	} = $props();

	const currentSubmission = $derived(submissionStore.currentData?.submission!);
	const currentUser = $derived(submissionStore.currentData?.user!);

	let message = $state<string>('');

	function localOnAccept() {
		submissionStore.accept(message);
		message = '';
	}

	function localOnReject() {
		submissionStore.reject(message);
		message = '';
	}

	$effect(() => {
		message = currentSubmission.message ?? '';
	});

	const activity = $derived(activities.get(currentSubmission.activity_id)!);
</script>

<div class="card">
	<div class="card-layout">
		<div class="image-container">
			<a href={currentSubmission.image} target="_blank">
				<img
					src={currentSubmission.image}
					alt="{activity.name
						.cs} zaslaná uživatelem {currentUser.first_name} {currentUser.last_name}"
				/>
			</a>
		</div>

		<div class="content-container">
			<div class="card-header">
				<div class="user-info">
					<div class="user">
						<User class="submission-review-icon" />
						<span class="name">
							{currentUser.first_name}
							{currentUser.last_name}
						</span>
					</div>
					<div class="date">
						<Calendar class="submission-review-icon" />
						<span class="date-text">
							{new Date(currentSubmission.updated_at).toLocaleString('cs', {
								year: 'numeric',
								month: '2-digit',
								day: '2-digit',
								hour: '2-digit',
								minute: '2-digit'
							})}
						</span>
					</div>
				</div>
			</div>

			<!-- Details -->
			<div class="card-details">
				<div class="stats-grid">
					<div class="stat-card">
						<div class="stat-label">Aktivita</div>
						<div class="stat-value">
							<Activity class="submission-review-icon" />
							<span class="badge">{activity.name.cs}</span>
						</div>
					</div>

					<div class="stat-card">
						<div class="stat-label">Vzdálenost</div>
						<div class="stat-value">
							<Ruler class="submission-review-icon" />
							<span class="metric">{(currentSubmission.distance / 1000).toFixed(2)}</span> km
						</div>
					</div>

					<div class="stat-card">
						<div class="stat-label">Převýšení</div>
						<div class="stat-value">
							<TrendingUp class="submission-review-icon" />
							<span class="metric">{currentSubmission.elevation ?? 0}</span> m
						</div>
					</div>
				</div>

				<div class="separator"></div>

				<div class="message-container">
					<label for="message" class="message-label">
						<span>Zpráva k rozhodnutí</span>
					</label>
					<textarea id="message" placeholder="" bind:value={message} class="message-input"
					></textarea>
				</div>
			</div>

			<div class="card-footer">
				<button class="secondary" onclick={localOnReject} disabled={false}>Zamítnout</button>
				<button onclick={localOnAccept} disabled={false}>Schválit</button>
			</div>
		</div>
	</div>
</div>

<style>
	.card-layout {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	@media (min-width: 768px) {
		.card-layout {
			flex-direction: row;
		}
	}

	/* Image styling */
	.image-container {
		position: relative;
		height: 300px;
	}

	@media (min-width: 768px) {
		.image-container {
			width: 40%;
			height: auto;
			max-height: 768px;
		}
	}

	.image-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	/* Content container */
	.content-container {
		display: flex;
		flex-direction: column;
	}

	@media (min-width: 768px) {
		.content-container {
			width: 60%;
		}
	}

	/* Header styling */
	.card-header {
		padding: 1rem;
		background-color: rgba(0, 92, 171, 0.05);
	}

	.user-info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	@media (min-width: 640px) {
		.user-info {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}
	}

	.user,
	.date {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.name {
		font-weight: 500;
	}

	.date-text {
		font-size: 0.875rem;
		color: #1b2230;
		font-weight: bold;
	}

	/* Details styling */
	.card-details {
		padding-block: 1rem;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
	}

	@media (min-width: 640px) {
		.stats-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.stat-card {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.75rem;
		border-radius: 0.5rem;
		background-color: rgba(0, 92, 171, 0.05);
	}

	.stat-label {
		font-size: 0.875rem;
		color: #6b7280;
	}

	.stat-value {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 500;
	}

	.badge {
		background-color: #005cab;
		color: white;
		padding: 0.25rem 0.5rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 500;
	}

	.metric {
		color: #005cab;
		font-weight: 700;
	}

	.separator {
		height: 1px;
		width: 100%;
		background-color: #e5e7eb;
		margin: 0.5rem 0;
	}

	/* Message input styling */
	.message-container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.message-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: #005cab;
	}

	.message-input {
		min-height: 100px;
		width: 100%;
		padding: 0.75rem;
		border: 1px solid rgba(0, 92, 171, 0.2);
		border-radius: 0.375rem;
		resize: vertical;
	}

	.message-input:focus {
		outline: none;
		border-color: #005cab;
		box-shadow: 0 0 0 2px rgba(0, 92, 171, 0.2);
	}

	/* Footer styling */
	.card-footer {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		padding: 1rem;
		background-color: rgba(0, 92, 171, 0.05);
		margin-top: auto;
	}

	:global(.submission-review-icon) {
		width: 1rem;
		height: 1rem;
		color: #005cab;
	}
</style>
