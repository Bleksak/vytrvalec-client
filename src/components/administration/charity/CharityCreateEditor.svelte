<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import ImageForm from '$components/forms/ImageForm.svelte';
	import type { CharityCreateDTO, CharityDTO, CharityError } from '$lib/DTO/CharityDTO';
	import Store from '$lib/enums/Stores';
	import type { CharityStore } from '$lib/stores/CharityStore.svelte';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getContext } from 'svelte';

	const charityStore = getContext<CharityStore>(Store.CHARITY_STORE);
	const toastStore = getContext<ToastStore>(Store.TOAST_STORE);
	let errors = $state<CharityError>();

	let imageUuid = $state<string>();

	let charity = $state<CharityCreateDTO>({
		name: {
			cs: '',
			en: ''
		},
		description: {
			cs: '',
			en: ''
		},
		image_uuid: '',
		website: ''
	});

	const enhancer: SubmitFunction<CharityDTO> = ({ submitter, formData }) => {
		submitter?.setAttribute('disabled', 'disabled');
		formData.set('image_uuid', imageUuid ?? '');

		return async ({ result, update }) => {
			if (result.type === 'success') {
				charityStore.updateOrCreate(result.data!);
				toastStore.add({
					type: 'success',
					message: 'Charita vytvořena'
				});
				errors = undefined;
			} else if (result.type === 'failure') {
				errors = result?.data?.charity as CharityError;
				toastStore.add({
					type: 'error',
					message: 'Nastala chyba při vytváření charity'
				});
			}

			submitter?.removeAttribute('disabled');
			update();
		};
	};
</script>

<div class="card">
	<div class="card-layout">
		<ImageForm bind:imageUuid />

		<form
			action="/administration/charity?/create"
			method="post"
			use:enhance={enhancer}
			class="content-container"
		>
			<div class="card-header">
				<div class="user-info">
					<div class="user">
						<span class="name">Nová charita</span>
					</div>
				</div>
			</div>

			<div class="card-details">
				<div class="input-group">
					<label for="name" class="input-label">
						<span>Název charity</span>
					</label>
					<input type="text" name="name" id="name" bind:value={charity.name} class="form-control" />
					{#if errors?.name}
						<span class="error">Název charity nesmí být prázdný</span>
					{/if}
				</div>

				<div class="input-group">
					<label for="website" class="input-label">
						<span>Webová stránka charity</span>
					</label>
					<input
						type="text"
						name="website"
						id="website"
						bind:value={charity.website}
						class="form-control"
					/>
					{#if errors?.website}
						<span class="error">Název charity nesmí být prázdný</span>
					{/if}
				</div>

				<div class="input-group">
					<label for="description" class="input-label">
						<span>Popisek</span>
					</label>
					<textarea
						name="description"
						id="description"
						placeholder=""
						class="form-control"
						bind:value={charity.description}
					></textarea>
					{#if errors?.description}
						<span class="error"> Popis charity nesmí být prázdný </span>
					{/if}
				</div>
			</div>

			<div class="card-footer">
				<Button type="submit">Vytvořit</Button>
			</div>
		</form>
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

	.user {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.name {
		font-weight: 500;
	}

	/* Details styling */
	.card-details {
		padding-block: 1rem;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	/* Message input styling */
	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.input-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: #005cab;
	}

	.form-control {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid rgba(0, 92, 171, 0.2);
		border-radius: 0.375rem;
		resize: vertical;
	}

	.form-control:focus {
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
