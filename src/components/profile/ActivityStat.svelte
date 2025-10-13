<script lang="ts">
	import type { ActivityDTO } from '$lib/DTO/ActivityDTO';
	import type { UserStatisticsDTO } from '$lib/DTO/StatisticsDTO';
	import type { SvelteMap } from 'svelte/reactivity';

	const {
		userStats,
		activities
	}: { userStats: UserStatisticsDTO; activities: SvelteMap<number, ActivityDTO> } = $props();

	const activity = $derived(activities.get(userStats.activity)!);
</script>

<div class="stat">
	<h5>{activity.name.cs}</h5>
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
		font-size: 1.4rem;
		font-weight: normal;
	}
</style>
