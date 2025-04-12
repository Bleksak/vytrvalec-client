<script lang="ts">
	import { page } from '$app/state';
	import Store from '$lib/enums/Stores';
	import { getContext } from 'svelte';
	import type { FacultyStore } from '$lib/stores/FacultyStore.svelte';
	import FacultyEditor from '$components/administration/faculty/FacultyEditor.svelte';

	const facultyStore = getContext<FacultyStore>(Store.FACULTY_STORE);
	let faculty = $derived(facultyStore.get(Number(page.params.id)) ?? undefined);
</script>

<div>
	<FacultyEditor {faculty} />
</div>
