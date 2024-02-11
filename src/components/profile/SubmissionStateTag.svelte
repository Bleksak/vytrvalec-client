<script lang="ts">
	import { SubmissionStateColorMap } from '../../utils/colors';
	import LL from '../../translations/i18n-svelte';
	import { SubmissionStateEnum } from '$lib/enums/SubmissionStateEnum';

	let { state } = $props<{ state: string }>();
</script>

<div
	style:background-color={SubmissionStateColorMap[state] ||
		SubmissionStateColorMap[SubmissionStateEnum.DEFAULT]}
>
	<span>{$LL.submission.state[state.toString() as keyof typeof $LL.submission.state]()}</span>
</div>

<style>
	div {
		padding: 3px 15px;
		width: fit-content;
		margin: 5px;
	}
	span {
		font-weight: bolder;
		font-size: 18px;
		color: #fff;
	}
</style>
