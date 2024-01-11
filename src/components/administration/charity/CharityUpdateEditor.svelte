<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import type { CharityDTO } from '$lib/DTO/CharityDTO';
	import type { CharityStore } from '$lib/stores/CharityStore.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getContext } from 'svelte';

	const { charity } = $props<{ charity: CharityDTO }>();
	const charityStore = getContext<CharityStore>('charityStore');

	let currentCharity = $state<CharityDTO>({ ...charity });

	const enhancer: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type === 'success') {
				charityStore.updateOrCreate(currentCharity);
			}
		};
	};

	$effect(() => {
		currentCharity = { ...charity };
	});
</script>

<form action="/administration/charity/{charity.id}/?/update" method="post" use:enhance={enhancer}>
	<label for="name">Název charity:</label>
	<input type="text" name="name" id="name" bind:value={currentCharity.name} />

	<label for="description">Popisek:</label>
	<textarea name="description" id="description" bind:value={currentCharity.description} />

	<Button class="left" type="submit">Upravit</Button>
</form>
