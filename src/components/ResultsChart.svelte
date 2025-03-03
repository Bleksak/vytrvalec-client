<script lang="ts">
	import type { FacultyDTO } from '$lib/DTO/FacultyDTO';
	import type { ResultRow } from '$lib/DTO/SeasonResultDTO';
	import LL from '$translations/i18n-svelte';
	import { FacultyColorMap } from '$utils/colors';
	import type { ChartOptions, ChartData } from 'chart.js';
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let { faculties, results }: { faculties: FacultyDTO[]; results: ResultRow[] } =
		$props();

	const resultFaculties = $derived(results.map((result) =>
		faculties.find((faculty) => faculty.id === result.faculty)
	));
	const labels = $derived(resultFaculties.map((result) => result?.shortcut));
	const dataset = $derived(results.map((result) => Number((result.distance / 1000).toFixed(1))));
	const colors = $derived(resultFaculties.map(
		(faculty) =>
			FacultyColorMap[faculty!.shortcut as keyof typeof FacultyColorMap] ?? FacultyColorMap.DEFAULT
	));

	let chartCanvas = $state<HTMLCanvasElement>();
    let chart = $state<Chart>();

	let data: ChartData<'bar'> = $derived({
		labels: labels,
		datasets: [
			{
				label: $LL.results.distance(),
				data: dataset,
				backgroundColor: colors
			}
		]
	});

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
        if(chart) {
            chart.data = data;
            chart.update();
        }
    });


	onMount(() => {
		chart = new Chart(chartCanvas!, {
			type: 'bar',
			data: data,
			options: options
		});
	});
</script>

<canvas bind:this={chartCanvas}></canvas>
