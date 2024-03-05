<script lang="ts">
	import type { Faculty } from '$lib/DTO/Faculty';
	import type { ResultRow } from '$lib/DTO/SeasonResultDTO';
	import LL from '$translations/i18n-svelte';
	import { FacultyColorMap } from '$utils/colors';
	import type { ChartOptions, ChartData } from 'chart.js';
	import Chart from 'chart.js/auto';

	let { faculties, results } = $props<{ faculties: Faculty[]; results: ResultRow[] }>();

	const resultFaculties = results.map((result) =>
		faculties.find((faculty) => faculty.id === result.faculty)
	);
	const labels = resultFaculties.map((result) => result?.shortcut);
	const dataset = results.map((result) => Number((result.distance / 1000).toFixed(1)));
	const colors = resultFaculties.map(
		(faculty) =>
			FacultyColorMap[faculty!.shortcut as keyof typeof FacultyColorMap] ?? FacultyColorMap.DEFAULT
	);

	let chart = $state<HTMLCanvasElement>();

	const data: ChartData<'bar'> = {
		labels: labels,
		datasets: [
			{
				label: $LL.results.distance(),
				data: dataset,
				backgroundColor: colors
			}
		]
	};

	const options: ChartOptions<'bar'> = {
		responsive: true,
		plugins: {
			tooltip: {
				callbacks: {
					label: (item) => item.dataset.label + ': ' + item.formattedValue + ' km'
				}
			},
			legend: {
				display: false
			}
		},
		scales: {
			y: {
				beginAtZero: true
			}
		}
	};

	$effect(() => {
		new Chart(chart!, {
			type: 'bar',
			data: data,
			options: options
		});
	});
</script>

<canvas bind:this={chart}></canvas>
