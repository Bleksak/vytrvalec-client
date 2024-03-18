<script lang="ts">
	import { SubmissionStateColorMap } from '$utils/colors';
	import LL from '$translations/i18n-svelte';
	import type { ProfileSubmissionResponseDTO } from '$lib/DTO/SubmissionDTO';

	let { submission } : { submission: ProfileSubmissionResponseDTO } = $props();

	const state = submission.reviewed ? (submission.accepted ? 'accepted' : 'rejected') : 'pending';
</script>

<div
	class="submission-state"
	style:background-color={SubmissionStateColorMap[state] || SubmissionStateColorMap.default}
>
	<span class="state-text">
		{$LL.submission.state[state.toString() as keyof typeof $LL.submission.state]()}
	</span>
</div>

<style>
	.submission-state {
		padding: 3px 15px;
		width: fit-content;
	}

	.state-text {
		font-weight: bolder;
		font-size: 18px;
		color: #fff;
	}
</style>
