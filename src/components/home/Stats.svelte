<script lang="ts">
	import { fetchTotalStatistics } from '$actions/Statistics';
	import LL from '$translations/i18n-svelte';
	import getActivityImage from '$utils/ActivityUtils';

	const statistics = fetchTotalStatistics();
</script>

{#await statistics then stats}
	{#if stats.activities.length > 0}
		<section>
			<article>
				<h1>{$LL.homepage.statistics.title()}</h1>
				<div class="grid">
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
				</div>
			</article>
		</section>
	{/if}
{/await}

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

	@media (max-width: 1000px) {
		.card img {
			max-width: 50px;
		}
	}
</style>
