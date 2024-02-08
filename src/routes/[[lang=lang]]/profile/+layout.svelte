<script lang="ts">
	import createUserSubmissionStore from "$lib/stores/UserSubmissionsStore.svelte";
	import { setContext } from "svelte";

	const userSubmissionsStore = createUserSubmissionStore();
	setContext('userSubmissionsStore', userSubmissionsStore);
</script>

<slot/>
