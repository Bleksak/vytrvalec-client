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
        <Select id="week_picker" keys={weekPickerKeys} values={weekPickerValues} />
        <Select id="year_picker" keys={weekPickerKeys} values={weekPickerValues} />
	</section>

	<div class="title-wrapper">
		<h2>Běh a chůze</h2>
		<div class="wrapper">
			<section class="table">
				<div class="results-table">
					<header class="row">
						<span>Fakulta</span>
						<span class="right">Celkem km</span>
						<span class="right">Body</span>
					</header>
					<div class="row">
						<span>FZS</span>
						<span class="right">7100</span>
						<span class="right">102</span>
					</div>
					<div class="row">
						<span>FZS</span>
						<span class="right">7100</span>
						<span class="right">102</span>
					</div>
					<div class="row">
						<span>FZS</span>
						<span class="right">7100</span>
						<span class="right">102</span>
					</div>
					<div class="row">
						<span>FZS</span>
						<span class="right">7100</span>
						<span class="right">102</span>
					</div>
					<div class="row">
						<span>FZS</span>
						<span class="right">7100</span>
						<span class="right">102</span>
					</div>
					<div class="row">
						<span>FZS</span>
						<span class="right">7100</span>
						<span class="right">102</span>
					</div>
					<div class="row">
						<span>FZS</span>
						<span class="right">7100</span>
						<span class="right">102</span>
					</div>
					<div class="row">
						<span>FZS</span>
						<span class="right">7100</span>
						<span class="right">102</span>
					</div>
					<div class="row">
						<span>FZS</span>
						<span class="right">7100</span>
						<span class="right">102</span>
					</div>
					<div class="row">
						<span>FZS</span>
						<span class="right">7100</span>
						<span class="right">102</span>
					</div>
					<div class="row">
						<span>FZS</span>
						<span class="right">7100</span>
						<span class="right">102</span>
					</div>
					<div class="row">
						<span>FZS</span>
						<span class="right">7100</span>
						<span class="right">102</span>
					</div>
					<div class="row">
						<span>FZS</span>
						<span class="right">7100</span>
						<span class="right">102</span>
					</div>
					<div class="row">
						<span>FZS</span>
						<span class="right">7100</span>
						<span class="right">102</span>
					</div>
				</div>
			</section>

			<section class="graph">
				<div style="width: 100%; background-color: green;">a</div>
			</section>
		</div>
	</div>
</main>

<style>
	main {
        display: flex;
        flex-direction: column;
		gap: 10px;
        max-width: 1640px;
        margin: 0 auto;
        width: 100%;
        padding: 20px;
	}

	.pickers {
        width: 100%;
		display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 50px;
	}

	.title-wrapper {
		margin-block: 20px;
        display: flex;
        flex-direction: column;
	}

	.wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 20px;
	}

	.results-table {
		width: 100%;
		font-size: 1.3rem;
		color: #005cab;
		line-height: 1.7;

        padding-right: 15px;

        overflow: auto;
		max-height: 450px;
	}

	.results-table > .row {
		display: flex;
		justify-content: space-between;
		align-items: center;

		border-bottom: 3px solid #005cab;
	}

	.results-table > .row > * {
		width: 100%;
	}

	.results-table > .row > .left {
		text-align: left;
	}

	.results-table > .row > .center {
		text-align: center;
	}

	.results-table > .row > .right {
		text-align: right;
	}

	.results-table > header {
		font-weight: bolder;
		font-size: 1.5rem;
		border-block: 4px solid #005cab;
	}

	.results-table > .row:last-child {
		border-bottom: none;
	}
</style>
