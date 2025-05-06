<script lang="ts">
	import { page } from '$app/state';
	import Button from '$components/Button.svelte';
	import LastSeason from '$components/home/LastSeason.svelte';
	import Stats from '$components/home/Stats.svelte';
	import { onMount } from 'svelte';
	import { LL } from '$translations/i18n-svelte';

	const googlePlayLink = "https://play.google.com/store/apps/details?id=cz.magnetka.mv" // To neni citlivý, nebudu dávat do envu
	const appleStoreLink = "https://apps.apple.com/us/app/6743554661";

	let isMobile = $state(false);

	onMount(() => {
		if (/Android/i.test(navigator.userAgent) || /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      		isMobile = true;
    	}
	});
</script>

<main>
	{#if isMobile}
		<div class="advert">
			<h4>{$LL.homepage.mobile_app.title()}</h4>
			<span>{$LL.homepage.mobile_app.download()}</span>
			<div class="store-links">
				<a href={googlePlayLink} target="_blank" rel="noopener noreferrer">
					<img src="/images/google-play.png" alt="Google Play" class="store-image" />
				</a>
				<a href={appleStoreLink} target="_blank" rel="noopener noreferrer">
					<img src="/images/apple-store.png" alt="App Store" class="store-image" />
				</a>
			</div>
		</div>
	{/if}

	<div class="sponzor">
		<a href="https://www.decathlon.cz/">
			<img src="/images/decathlon-logo.png" title="Decathlon" alt="Decathlon" width="500"/>
		</a>
		<h3>Sponzor akce</h3>
	</div>
	<div class="main">
		<div class="container">
			<section class="header">
				<h1>Měsíční Vytrvalec</h1>
			</section>
			<section class="content">
				<p>
					{$LL.homepage.intro()}
				</p>
			</section>
			<section class="buttons">
				<a href="/{page.data.lang}/rules"><Button class="secondary">{$LL.rules.title().toUpperCase()}</Button></a>
				<a href="/{page.data.lang}/results"><Button>{$LL.results.results().toLocaleUpperCase()}</Button></a>
			</section>
		</div>

		<div class="container">
			<h1>{$LL.homepage.about.title().toUpperCase()}</h1>
			<section class="content">
				<p>
					{$LL.homepage.about.content()}
				</p>
			</section>
		</div>
	</div>

	<Stats />
	<LastSeason />
</main>

<style>
	main {
		display: block;
	}

	.container {
		background-color: white;
		padding: 50px;
	}

	.advert {
		background-color: white;
		padding: 30px;
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
			padding: 30px;
		}

		h1 {
			font-size: 2rem;
		}
	}

	.store-links {
		display: flex;
		justify-content: center;
		gap: 20px;
		margin-top: 20px;
	}
</style>
