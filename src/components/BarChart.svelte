<script lang="ts">
	import type { ChartOptions, ChartData } from 'chart.js';
	import Chart from 'chart.js/auto';

    let chart = $state<HTMLCanvasElement>();

    const data: ChartData<'bar'> = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
            }
        ],
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
    };

    $effect(() => {
        new Chart(chart!, {
            type: 'bar',
            data: data,
            options: options,
        });
    });
</script>

<canvas bind:this={chart}></canvas>
