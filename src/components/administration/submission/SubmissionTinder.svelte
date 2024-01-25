<script lang="ts">
	import Button from '$components/Button.svelte';
	import type { SubmissionResponseDTO } from '$lib/DTO/SubmissionDTO';
	import createUnreviewedSubmissionStore from '$lib/stores/UnreviewedSubmissionStore.svelte';

	const submissionStore = createUnreviewedSubmissionStore();

	let currentSubmission = $state<SubmissionResponseDTO | null>(null);

	$effect(() => {
		if (currentSubmission === null && submissionStore.all().length > 0) {
			currentSubmission = submissionStore.pop();
		}
	});

	let message = $state<string>('');

	const popNext = () => {
		currentSubmission = submissionStore.pop();
	};

	const acceptCurrent = () => {
		submissionStore.accept(currentSubmission!).then(() => {
			popNext();
		});
	};

	const rejectCurrent = () => {
		submissionStore.reject(currentSubmission!, message!).then(() => {
			popNext();
		});
	};
</script>

{#if currentSubmission === null}
	<h1>Nejsou žádné nové příspěvky.</h1>
{:else}
	<div class="tinder-card">
		<div class="wrapper">
			<a href={currentSubmission?.image} target="_blank">
				<img src={currentSubmission?.image} alt="Aktivita" />
			</a>
			<div class="info">
				<div class="info-column">
					<p>
						<strong>Uživatel:&nbsp;</strong>
						{currentSubmission?.user.firstName}
						{currentSubmission?.user.lastName}
					</p>
					<p><strong>Aktivita:&nbsp;</strong>{currentSubmission?.activity.name}</p>
				</div>
				<div class="info-column">
					<p><strong>Vzdálenost:&nbsp;</strong>{(currentSubmission?.distance ?? 0) / 1000} km</p>
					{#if currentSubmission?.elevation}
						<p><strong>Převýšení:&nbsp;</strong>{currentSubmission?.elevation} m</p>
					{/if}
				</div>
			</div>

			<div class="message">
				<label for="message">Zpráva k zamítnutí:</label>
				<textarea id="message" bind:value={message}></textarea>
			</div>

			<div class="buttons">
				<Button
					class="rounded"
					type="button"
					on:click={() => {
						rejectCurrent();
						message = '';
					}}
				>
					Zamítnout
				</Button>
				<Button
					class="rounded"
					type="button"
					on:click={() => {
						acceptCurrent();
					}}
				>
					Schválit
				</Button>
			</div>
		</div>
	</div>
{/if}

<style>
	.tinder-card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
	}

	.wrapper {
		border-radius: 20px;
		background-color: #dee2e6;
		padding: 20px 20px 20px 20px;

		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 20px;
	}

	.message {
		display: flex;
		flex-direction: column;
	}

	textarea {
		background-color: white;
	}

	.info {
		display: flex;
		flex-direction: row;
		gap: 10px;
		justify-content: space-between;
	}

	.info-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}

	.buttons {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 50px;
	}

	img {
		max-width: 510px;
		border-radius: 20px 20px 0 0;
		max-height: 600px;
	}
</style>
