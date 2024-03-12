<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '$components/Button.svelte';
	import type { CharityDTO, CharityError } from '$lib/DTO/CharityDTO';
	import Store from '$lib/enums/Stores';
	import type { CharityStore } from '$lib/stores/CharityStore.svelte';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getContext } from 'svelte';

	const { charity } = $props<{ charity: CharityDTO }>();
	const charityStore = getContext<CharityStore>(Store.CHARITY_STORE);
	const toastStore = getContext<ToastStore>(Store.TOAST_STORE);

	let currentCharity = $state<CharityDTO>({ ...charity });

	let deleteStatus = $state<boolean>();

	let errors = $state<CharityError>();


	const deleteCharity = () => {
		charityStore.remove(charity).then((status) => {
			deleteStatus = status;

			if (deleteStatus) {
				toastStore.add({
					type: 'success',
					message: 'Charita odstraněna'
				});
				goto('/administration/charity');
			} else {
				toastStore.add({
					type: 'error',
					message: 'Nastala chyba při odstranění charity'
				})
			}
		});
	};

	const enhancer: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type === 'success') {
				charityStore.updateOrCreate(currentCharity);
				toastStore.add({
					type: 'success',
					message: 'Charita byla úspěšne upravena'
				});
				errors = undefined;
			} else if(result.type === 'failure'){
				errors = result?.data?.charity as CharityError;
				toastStore.add({
					type: 'error',
					message: 'Nastala chyba při úpravě charity'
				});
			}
		};
	};

	$effect(() => {
		currentCharity = { ...charity };
	});
</script>

<form action="/administration/charity/{charity?.id}?/update" method="post" use:enhance={enhancer}>
	<label for="name">Název charity:</label>
	<input type="text" name="name" id="name" bind:value={currentCharity.name} />
	{#if errors?.name}
		<span class="error">
			Název charity nesmí být prázdný
		</span>
	{/if}

	<label for="description">Popisek:</label>
	<textarea name="description" id="description" bind:value={currentCharity.description} />
	{#if errors?.description}
		<span class="error">
			Popis charity nesmí být prázdný
		</span>
	{/if}

	<div class="buttons">
		<Button type="submit">Upravit</Button>
		<Button type="button" onclick={deleteCharity}>Odstranit</Button>
	</div>

	{#if deleteStatus === false}
		<span class="note">Charitu nelze odstranit, jelikož je k ní navázaná sezóna.</span>
	{/if}
</form>

<style>
	.buttons {
		display: flex;
		justify-content: flex-start;
		gap: 20px;
	}
</style>
