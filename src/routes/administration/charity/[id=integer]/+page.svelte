<script lang="ts">
	import CharityUpdateForm from '$components/administration/charity/CharityUpdateForm.svelte';

	const { data } = $props();
</script>

<CharityUpdateForm charity={data.charity} />
