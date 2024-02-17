<script lang="ts">
	import { FacultyColorMap } from '$utils/colors';

	let { facultyShortcut } = $props<{ facultyShortcut: string }>();
</script>

<div
	style:background-color={FacultyColorMap[facultyShortcut as keyof typeof FacultyColorMap] || FacultyColorMap['DEFAULT']}
    class="faculty-tag"
>
	<span>{facultyShortcut}</span>
</div>

<style>
	.faculty-tag {
		padding: 3px 15px;
		width: fit-content;
	}
	span {
		font-weight: bolder;
		font-size: 1.1rem;
		color: white;
	}
</style>
