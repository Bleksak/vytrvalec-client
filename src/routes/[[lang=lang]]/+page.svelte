<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button.svelte';
	import PastWinners from '$components/home/PastWinners.svelte';
	import Stats from '$components/home/Stats.svelte';
	import LL from '$translations/i18n-svelte'
</script>

<main>
	<div class="main">
		<div class="container">
			<section class="header">
				<h1>Měsíční vytrvalec</h1>
			</section>
			<section class="content">
				<p>
					{$LL.homepage.intro()}
				</p>
			</section>
			<section class="buttons">
				<a href="/{$page.data.lang}/rules"><Button styleOnly class="secondary">{$LL.rules.title().toUpperCase()}</Button></a>
				<a href="/{$page.data.lang}/results"><Button styleOnly>{$LL.results.results().toLocaleUpperCase()}</Button></a>
			</section>
		</div>

		<div class="container">
			<h2>{$LL.homepage.about.title().toUpperCase()}</h2>
			<section class="content">
				<p>
					{$LL.homepage.about.content()}
				</p>
			</section>
		</div>
	</div>

	<Stats />
	<PastWinners />
</main>

<style>
	main {
		display: block;
	}

	.container {
		background-color: white;
		padding: 50px;
	}

	.main {
		background-color: #005cab;
		display: flex;
		gap: 50px;
		flex-direction: row;
		padding: 50px;
	}


	@media (max-width: 1000px) {
		.main {
			flex-direction: column;
		}
	}
</style>
