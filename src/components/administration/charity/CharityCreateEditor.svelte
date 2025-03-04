<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import type { CharityCreateData, CharityDTO, CharityError } from '$lib/DTO/CharityDTO';
	import Store from '$lib/enums/Stores';
	import type { CharityStore } from '$lib/stores/CharityStore.svelte';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getContext } from 'svelte';

	const charityStore = getContext<CharityStore>(Store.CHARITY_STORE);
	const toastStore = getContext<ToastStore>(Store.TOAST_STORE);
	let errors = $state<CharityError>();


	let charity = $state<CharityDTO>({
		id: 0,
		name: '',
		description: ''
	});

	const enhancer: SubmitFunction<CharityCreateData> = () => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				charity.id = result.data?.id!;
				charityStore.updateOrCreate(charity);
				toastStore.add({
					type: 'success',
					message: 'Charita vytvořena'
				});
				errors = undefined;
			} else if(result.type === 'failure') {
				errors = result?.data?.charity as CharityError;
				toastStore.add({
					type: 'error',
					message: 'Nastala chyba při vytváření charity'
				});
			}

			update();
		};
	};
</script>

<form action="/administration/charity?/create" method="post" use:enhance={enhancer}>
	<label for="name">Název charity:</label>
	<input type="text" name="name" id="name" bind:value={charity.name} autocomplete="off" />
	{#if errors?.name}
		<span class="error">
			Název charity nesmí být prázdný
		</span>
	{/if}

	<label for="description">Popisek:</label>
	<textarea
		name="description"
		id="description"
		bind:value={charity.description}
		autocomplete="off"
	/>
	{#if errors?.description}
		<span class="error">
			Popis charity nesmí být prázdný
		</span>
	{/if}

	<Button type="submit" class="left">Vytvořit</Button>
</form>

<style>
	form {
		width: 50%;
		justify-self: center;
	}
</style>