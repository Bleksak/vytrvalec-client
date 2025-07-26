<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import ImageForm from '$components/forms/ImageForm.svelte';
	import Store from '$lib/enums/Stores';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import { redirect, type SubmitFunction } from '@sveltejs/kit';
	import { getContext } from 'svelte';

	const toastStore = getContext<ToastStore>(Store.TOAST_STORE);

	let imageUuid = $state(null);
	let iconUrl = $state(null);

	let name = $state('');
	let minElevation = $state(0);

	const enhancer: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type === 'failure') {
				// errors = result.data as AccountChangeErrors;
				toastStore.add({
					type: 'error',
					message: 'Nepodarilo se pridat aktivitu'
				});
				return;
			}

			toastStore.add({
				type: 'success',
				message: 'Uspesne pridano'
			});

			redirect(303, '/administration/activity');
		};
	};
</script>

<form method="post" action="/administration/activity?/create" use:enhance={enhancer}>
	<label for="name">Název aktivity</label>
	<input bind:value={name} type="text" id="name" />
	<label for="image">Ikonka aktivity</label>
	<ImageForm bind:imageUuid id="image" bind:imageUrl={iconUrl} />
	<label for="min-elevation">Minimální převýšení pro udělení extra bodů (metry)</label>
	<input bind:value={minElevation} type="number" id="min-elevation" />

	<Button type="submit">Vytvořit</Button>
</form>
