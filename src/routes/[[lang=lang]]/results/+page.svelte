<script lang="ts">
	import Select from '$components/FormComponent/Select.svelte';
	import LL from '$translations/i18n-svelte';

	const weekPickerKeys = [
		$LL.results.week_picker[0](),
		$LL.results.week_picker[1](),
		$LL.results.week_picker[2](),
		$LL.results.week_picker[3]()
	];
	const weekPickerValues = [-1, 0, 1, 2, 3];
</script>

<main>
	<header>
		<h1>{$LL.results.title()}</h1>
	</header>

	<section class="pickers">
		<div class="picker-wrapper">
			<Select id="week_picker" keys={weekPickerKeys} values={weekPickerValues} />
		</div>

		<div class="picker-wrapper">
			<Select id="year_picker" keys={weekPickerKeys} values={weekPickerValues} />
		</div>
	</section>
</main>

<style>
	main {
		padding-inline: 100px;
	}

	.pickers {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.picker-wrapper {
		width: 20%;
	}
</style>
