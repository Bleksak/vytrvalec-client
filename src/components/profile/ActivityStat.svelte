<script lang="ts">
	import type { ProfileStatistics } from '$lib/stores/ProfileDataStore.svelte';
	import LL from '../../translations/i18n-svelte';

	let { activity, distance, elevation } = $props<ProfileStatistics>();
</script>

<main>
	<h5>{$LL.activities[activity.name as keyof typeof $LL.activities]()}</h5>
	<div>
		<img src="/images/icons/distance-blue.svg" alt="Distance" />
		<p>{Number(distance / 1000).toFixed(1)} km</p>
	</div>

	<div>
		<img src="/images/icons/elevation-blue.svg" alt="Elevation" />
		<p>{elevation} m</p>
	</div>
</main>

<style>
	main > div {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 5px;
	}
	img {
		width: 25px;
		aspect-ratio: 1/1;
	}
	p {
		color: #005cab;
	}
</style>
