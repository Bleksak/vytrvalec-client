<script lang="ts">
	import { fetchTotalStatistics } from '$actions/Statistics';
	import LL from '$translations/i18n-svelte';

	let statistics = fetchTotalStatistics();
</script>

<article>
	<header>
		<h2>Statistiky</h2>
	</header>

	<section>
		{#await statistics then stats}
			<div class="card">
				<img src="/images/icons/people-fill.svg" alt="People icon" />
				<h2>{stats.data.users}</h2>
				<h5>{$LL.homepage.statistics.users()}</h5>
			</div>
			{#each stats.data.activities as activity}
				<div class="card">
					<img src="/images/icons/bicycle.svg" alt="Bicycle icon" />
					<h2>{activity.distance / 1000}&nbsp;km</h2>
					<!-- TODO: Jak tohle prelozit? -->
					<h5>{activity.activity}</h5>
				</div>
			{/each}
		{/await}
	</section>
</article>

<style>
	article {
		padding: 50px 0;
	}

	article > header {
		display: flex;
		justify-content: center;
	}

	article > section {
		display: flex;
		justify-content: space-around;
	}

	.card {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.card img {
		width: 100%;
		max-width: 200px;
	}

	@media (max-width: 1000px) {
		article > section {
			flex-direction: column;
			gap: 40px;
		}

		.card img {
			max-width: 50px;
		}
	}
</style>
