<script lang="ts">
	import FacultyCreateForm from '$components/administration/faculty/FacultyCreateForm.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<FacultyCreateForm faculties={data.faculties} />
