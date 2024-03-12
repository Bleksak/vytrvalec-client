<script lang="ts">
	import { page } from '$app/stores';
	import CharityEditor from '$components/administration/charity/CharityEditor.svelte';
	import Store from '$lib/enums/Stores';
	import type { CharityStore } from '$lib/stores/CharityStore.svelte';
	import { getContext } from 'svelte';

	const charityStore = getContext<CharityStore>(Store.CHARITY_STORE);

	let id = Number($page.params.id?.toString());
	if (Number.isNaN(id)) {
		id = -1;
	}

	let charity = charityStore.get(id);
</script>

<CharityEditor {charity} />
