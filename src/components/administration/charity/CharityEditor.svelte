<script lang="ts">
	import type { CharityStore } from '$lib/stores/CharityStore.svelte';
	import type { CharityDTO } from '$lib/DTO/CharityDTO';
	import { page } from '$app/state';
	import { getContext } from 'svelte';
	import CharityCreateEditor from './CharityCreateEditor.svelte';
	import CharityUpdateEditor from './CharityUpdateEditor.svelte';
	import Store from '$lib/enums/Stores';

	const charityStore = getContext<CharityStore>(Store.CHARITY_STORE);

	const charity = $derived<CharityDTO | null>(charityStore.get(Number(page.params.id)));
</script>

{#if charity}
	<CharityUpdateEditor {charity} />
{:else}
	<CharityCreateEditor />
{/if}
