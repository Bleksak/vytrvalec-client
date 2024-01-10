<script lang="ts">
	import type { CharityStore } from '$lib/stores/CharityStore.svelte';
	import type { CharityDTO } from '$lib/DTO/CharityDTO';
	import { page } from '$app/stores';
	import { getContext } from 'svelte';
	import CharityCreateEditor from './CharityCreateEditor.svelte';
	import CharityUpdateEditor from './CharityUpdateEditor.svelte';

	const charityStore = getContext<CharityStore>('charityStore');

	let charity = $state<CharityDTO>();

	$effect(() => {
		charity = charityStore.get(Number($page.params.id)) ?? undefined;
	});
</script>

{#if charity}
	<CharityUpdateEditor bind:charity />
{:else}
	<CharityCreateEditor />
{/if}
