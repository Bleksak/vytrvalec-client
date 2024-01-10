<script lang="ts">
	import { fetchTotalStatistics } from '$actions/Statistics';
	import LL from '$translations/i18n-svelte';

	let statistics = fetchTotalStatistics();
</script>

<section>
	<div class="row">
		<h2>Statistiky</h2>
	</div>
	<div class="row">
		{#await statistics then stats}
			<div class="card">
				<img src="/images/icons/people-fill.svg" alt="People icon" />
				<h2>{stats.data.users}</h2>
				<h5>{$LL.homepage.statistics.users()}</h5>
			</div>
			{#each stats.data.activities as activity}
				<div class="card">
					<img src="/images/icons/bicycle.svg" alt="Bicycle icon" />
					<h2>{activity.distance}km</h2>
					<!-- TODO: Jak tohle prelozit? -->
					<h5>{activity.activity}</h5>
				</div>
			{/each}
		{/await}
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
