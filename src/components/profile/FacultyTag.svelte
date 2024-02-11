<script lang="ts">
	import { FacultyColorMap } from '../../utils/colors';

	let { facultyShortcut } = $props<{ facultyShortcut: string }>();
</script>

<div
	style:background-color={FacultyColorMap[facultyShortcut as keyof typeof FacultyColorMap] || FacultyColorMap['DEFAULT']}
>
	<span>{facultyShortcut}</span>
</div>

<style>
	div {
		padding: 3px 15px;
		width: fit-content;
	}
	span {
		font-weight: bolder;
		font-size: 18px;
		color: #fff;
	}
</style>
