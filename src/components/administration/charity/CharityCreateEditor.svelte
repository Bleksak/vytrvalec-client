<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import type { CharityCreateData, CharityDTO } from '$lib/DTO/CharityDTO';
	import type { CharityStore } from '$lib/stores/CharityStore.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getContext } from 'svelte';

	const charityStore = getContext<CharityStore>('charityStore');

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
			}

			update();
		};
	};
</script>

<form action="/administration/charity/?/create" method="post" use:enhance={enhancer}>
	<label for="name">Název charity:</label>
	<input type="text" name="name" id="name" bind:value={charity.name} autocomplete="off" />

	<label for="description">Popisek:</label>
	<textarea
		name="description"
		id="description"
		bind:value={charity.description}
		autocomplete="off"
	/>

	<Button type="submit" class="left">Vytvořit</Button>
</form>
