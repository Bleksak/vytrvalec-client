<script lang="ts">
	import FacultyUpdateForm from '$components/administration/faculty/FacultyUpdateForm.svelte';

	const { data } = $props();
</script>

<FacultyUpdateForm faculty={data.faculty} faculties={data.faculties} />
