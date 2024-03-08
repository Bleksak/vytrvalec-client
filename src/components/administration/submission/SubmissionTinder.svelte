<script lang="ts">
	import Button from '$components/Button.svelte';
	import type { SubmissionResponseDTO } from '$lib/DTO/SubmissionDTO';
	import type { SubmissionStateError } from '$lib/DTO/SubmissionStateDTO';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import createUnreviewedSubmissionStore from '$lib/stores/UnreviewedSubmissionStore.svelte';
	import { getContext } from 'svelte';
	import { LL } from '$translations/i18n-svelte';

	const toastStore = getContext<ToastStore>('toastStore');
	const submissionStore = createUnreviewedSubmissionStore();

	let currentSubmission = $state<SubmissionResponseDTO | null>(null);
	let errors = $state<SubmissionStateError>();

	$effect(() => {
		if (currentSubmission === null && submissionStore.all().length > 0) {
			currentSubmission = submissionStore.pop();
		}
	});

	let message = $state<string>('');
	let imageError = $state<(Event & {currentTarget: EventTarget & Element}) | null>(null);


	const popNext = () => {
		currentSubmission = submissionStore.pop();
	};


	//Nevim debilnější řešení mi nenapadlo
	const acceptCurrent = () => {
		submissionStore.accept(currentSubmission!).then((result) => {
			if(result.type === 'success') {
				toastStore.add({
					type: 'success',
					message: 'Aktivita byla schválena'
				});
				errors = undefined;
				popNext();
			} else if(result.type === 'error') {
				errors = result.errors as SubmissionStateError;
				toastStore.add({
					type: 'error',
					message: 'Nastala chyba při schvalování aktivity. Aktualizujte stránku a opakujte akci znova.'
				});
			}
		});
	};

	const rejectCurrent = () => {
		submissionStore.reject(currentSubmission!, message!).then((result) => {
			if(result.type === 'success') {
				toastStore.add({
					type: 'success',
					message: 'Aktivita byla zamítnuta'
				});
				popNext();
				errors = undefined;
			} else if(result.type === 'error'){
				errors = result.errors as SubmissionStateError;
				toastStore.add({
					type: 'error',
					message: 'Nastala chyba při zamítnutí aktivity. Aktualizujte stránku a opakujte akci znova.'
				});
			}
		});
	};
</script>

{#if currentSubmission === null}
	<h1>Nejsou žádné nové příspěvky.</h1>
{:else}
	<div class="tinder-card">
		<div class="wrapper">
			<!-- FIXME typrscript err - later teď se mi nechce -->
			{#each errors as error} 
				<span class="error">{$LL.submission.errors[error as keyof typeof $LL.submission.errors]()}</span>
			{/each}
			{#each errors?.server?? [] as error}
				<span class="error">
					{error}
				</span>
			{/each}
			{#if imageError}
				<strong class='image-error'>Obrázek se nepodařilo načíst</strong>
			{:else }
				<a href={currentSubmission?.image} target="_blank">
					<img src={currentSubmission?.image} alt="Aktivita" on:error={(err) => {imageError = err}}/>
				</a>
			{/if}
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
					onclick={() => {
						rejectCurrent();
						message = '';
					}}
				>
					Zamítnout
				</Button>
				<Button
					class="rounded"
					type="button"
					onclick={() => {
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
	.image-error {
		color: red;
		align-self: center;
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
