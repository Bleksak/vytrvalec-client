<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button.svelte';
	import PastWinners from '$components/home/PastWinners.svelte';
	import Stats from '$components/home/Stats.svelte';
	import LL from '$translations/i18n-svelte'
</script>

<header>
	<img src="/images/cyclist2.png" alt="Cyclist" />
	<article>
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
	</article>
</header>

<main>
	<div class="about">
		<div class="left">
			<img src="/images/runner.png" alt="Runner" />
		</div>
		<article>
			<h2>{$LL.homepage.about.title().toUpperCase()}</h2>
			<section class="content">
				<p>
					{$LL.homepage.about.content()}
				</p>
			</section>
		</article>
	</div>

	<Stats />
	<PastWinners />
</main>

<style>
	header {
		position: relative;
	}

	header > article {
		display: flex;
		flex-direction: column;
		position: absolute;
		bottom: 100px;
		left: 100px;
		width: 800px;
	}

	header > article > section.header {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 15px 50px;
		align-self: self-start;
		background-color: #005cab;
	}

	header > article > section.header > h1 {
		text-align: center;
		padding: 0 30px;
		color: white;
	}

	article > section.content {
		max-width: 800px;
		width: 100%;
		padding: 15px 30px;
		background-color: white;
	}

	header > article > section.buttons {
		align-self: flex-end;
		display: flex;
	}

	.about {
		display: flex;
	}

	main > .about > .left {
		flex: 10;
	}

	main > .about > .left > img {
		height: 100%;
	}

	main > .about > article {
		flex: 9;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 10px;
		gap: 10px;
	}

	main > .stats {
		padding: 50px 0;
	}

	@media (max-width: 1000px) {
		header {
			position: static;
		}

		header img {
			display: none;
		}

		header article {
			width: 100%;
			position: static;
		}

		header article section.header {
			width: 100%;
			padding: 0;
		}

		header article section.content {
			align-self: center;
		}

		header article section.buttons {
			display: none;
		}

		.about .left {
			display: none;
		}
	}
</style>
