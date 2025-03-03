<script lang="ts">
	import { page } from '$app/state';
	import Store from '$lib/enums/Stores';
	import { getContext } from 'svelte';
	import type { FacultyStore } from '$lib/stores/FacultyStore.svelte';
	import FacultyEditor from '$components/administration/faculty/FacultyEditor.svelte';
	import type { FacultyDTO } from '$lib/DTO/FacultyDTO';

	let faculty = $state<FacultyDTO>();

	const facultyStore = getContext<FacultyStore>(Store.FACULTY_STORE);

	$effect(() => {
		faculty = facultyStore.get(Number(page.params.id)) ?? undefined;
	});
</script>

<FacultyEditor bind:faculty />
