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
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 2px 8px;
		border-radius: 6px; 
		font-size: 0.75rem;
		font-weight: 500;
		line-height: 1.2;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
	}
	.state-text {
		color: #fff;
		white-space: nowrap;
		letter-spacing: 0.25px;
	}
</style>