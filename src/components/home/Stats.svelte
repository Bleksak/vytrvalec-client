<script lang="ts">
	import { fetchTotalStatistics } from '$actions/Statistics';
	import type { TotalStatisticsDTO } from '$lib/DTO/StatisticsDTO';
	import LL from '$translations/i18n-svelte';

	let statistics: TotalStatisticsDTO | any = $state(null);

	$effect(async () => {
		statistics = await fetchTotalStatistics();
	});
</script>

<section>
	<div class="row">
		<h2>Statistiky</h2>
	</div>
	<div class="row">
		<div class="card">
			<img src="/images/icons/people-fill.svg" alt="People icon" />
			<h2>{statistics?.users}</h2>
			<h5>{$LL.homepage.statistics.users()}</h5>
		</div>
		{#each statistics?.activities ?? [] as activity}
			<div class="card">
				<img src="/images/icons/bicycle.svg" alt="Bicycle icon" />
				<h2>{activity.distance}km</h2>
				<!-- TODO: Jak tohle prelozit? -->
				<h5>{activity.activity}</h5>
			</div>
		{/each}
	</div>
</section>

<style>
	section {
		padding: 50px 0;
	}

	section .card {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	section .card > img {
		width: 20%;
		max-width: 200px;
	}
</style>
