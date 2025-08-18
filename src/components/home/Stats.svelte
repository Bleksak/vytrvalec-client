<script lang="ts">
	import Heading from '$components/Heading.svelte';
	import type { TotalStatisticsDTO } from '$lib/DTO/StatisticsDTO';
	import LL from '$translations/i18n-svelte';
	import { PersonStanding } from '@lucide/svelte';

	const { totalStatistics }: { totalStatistics: TotalStatisticsDTO } = $props();
</script>

{#if totalStatistics.activities.length > 0}
	<section>
		<article>
			<Heading>
				<h1>{$LL.homepage.statistics.title()}</h1>
			</Heading>
			<div class="grid">
				<div class="card">
					<PersonStanding class="card-img" />
					<h2>{totalStatistics.users}</h2>
					<h5>{$LL.homepage.statistics.users()}</h5>
				</div>
				{#each totalStatistics.activities as activityStatistic}
					<div class="card">
						<img src={activityStatistic.activity.icon} alt="Statistics icon" />
						<h3>{(activityStatistic.distance / 1000).toFixed(0)}&nbsp;km</h3>
						<h4>
							{activityStatistic.activity.name.cs?.toUpperCase()}
						</h4>
					</div>
				{/each}
			</div>
		</article>
	</section>
{/if}

<style>
	.card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.card img {
		width: 100%;
		max-width: 150px;
	}

	:global(.card-img) {
		width: 150px;
		height: 150px;
		color: white;
	}

	@media (max-width: 768px) {
		.card img {
			max-width: 50px;
		}
		:global(.card-img) {
			width: 50px;
			height: 50px;
		}

	}
</style>
