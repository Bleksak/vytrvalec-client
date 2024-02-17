<script lang="ts">
	import type { UserStatisticsDTO } from '$lib/DTO/StatisticsDTO';
	import LL from '$translations/i18n-svelte';

	const { userStats } = $props<{ userStats: UserStatisticsDTO }>();
</script>

<div class="stat">
	<h5>{$LL.activities[userStats.activity.name as keyof typeof $LL.activities]()}</h5>
	<div class="stat-distance">
		<img class="icon" src="/images/icons/distance-blue.svg" alt="Distance" />
		<span>{Number(userStats.distance / 1000).toFixed(1)} km</span>
	</div>

	<div class="stat-elevation">
		<img class="icon" src="/images/icons/elevation-blue.svg" alt="Elevation" />
		<span>{userStats.elevation} m</span>
	</div>
</div>

<style>
	.stat-distance,
    .stat-elevation {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	span {
		color: #005cab;
        font-size: 1.4rem;
        font-weight: 100;
	}
</style>
