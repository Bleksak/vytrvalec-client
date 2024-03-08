<script lang="ts">
	import { fetchTotalStatistics } from '$actions/Statistics';
	import LL from '$translations/i18n-svelte';
	import getActivityImage from '$utils/ActivityUtils';

	const statistics = fetchTotalStatistics();
</script>

{#await statistics then stats}
	{#if stats.activities.length > 0}
		<article>
			<header>
				<h2>{$LL.homepage.statistics.title().toUpperCase()}</h2>
			</header>

			<section>
				<div class="card">
					<img src="/images/icons/people-fill.svg" alt="People icon" />
					<h2>{stats.users}</h2>
					<h5>{$LL.homepage.statistics.users()}</h5>
				</div>
				{#each stats.activities as activity}
					<div class="card">
						<img src={getActivityImage(activity.activity)} alt="Statistics icon" />
						<h3>{(activity.distance / 1000).toFixed(0)}&nbsp;km</h3>
						<h5>
							{$LL.activities[activity.activity as keyof typeof $LL.activities]().toUpperCase()}
						</h5>
					</div>
				{/each}
			</section>
		</article>
	{/if}
{/await}

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
		max-width: 150px;
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
