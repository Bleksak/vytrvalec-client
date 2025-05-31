<script lang="ts">
	import SubmissionReview from '$components/administration/submission/SubmissionReview.svelte';
	import UnreviewedSubmissionStore from '$lib/stores/UnreviewedSubmissionStore.svelte';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import { browser } from '$app/environment';

	let { data }: PageProps = $props();

	let submissionStore = $state<UnreviewedSubmissionStore>();

	onMount(() => {
		if (browser) {
			submissionStore = new UnreviewedSubmissionStore(data.ws, data.jwt!);
		}
	});

	$effect(() => {
		console.log(submissionStore?.currentData?.user?.first_name);
	});
</script>

{#if submissionStore?.currentData && !submissionStore.noSubmissionsMarked}
	<SubmissionReview {submissionStore} activities={data.activities} />
{:else}
	<h1>Nejsou žádné nové příspěvky.</h1>
{/if}
