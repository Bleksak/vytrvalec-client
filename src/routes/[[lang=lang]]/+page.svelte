<script lang="ts">
	import { page } from '$app/state';
	import Button from '$components/Button.svelte';
	import LastSeason from '$components/home/LastSeason.svelte';
	import Stats from '$components/home/Stats.svelte';
	import { onMount } from 'svelte';
	import { LL } from '$translations/i18n-svelte';

	const googlePlayLink = 'https://play.google.com/store/apps/details?id=cz.magnetka.mv'; // To neni citlivý, nebudu dávat do envu
	const appleStoreLink = 'https://apps.apple.com/us/app/6743554661';

	let isMobileDevice = $state(false);

	onMount(() => {
		if (/Android/i.test(navigator.userAgent) || /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
			isMobileDevice = true;
		}
	});
</script>

{#if isMobileDevice}
	<section>
		<h1>{$LL.homepage.mobile_app.title()}</h1>
		<span>{$LL.homepage.mobile_app.download()}</span>
		<div class="grid">
			<a href={googlePlayLink} target="_blank" rel="noopener noreferrer">
				<img src="/images/google-play.png" alt="Google Play" />
			</a>
			<a href={appleStoreLink} target="_blank" rel="noopener noreferrer">
				<img src="/images/apple-store.png" alt="App Store" />
			</a>
		</div>
	</section>
{/if}

<section>
	<div class="grid">
		<article>
			<h1>Měsíční Vytrvalec</h1>
			<p>
				{$LL.homepage.intro()}
			</p>
			<a href="/{page.data.lang}/rules"
				><Button class="secondary">{$LL.rules.title().toUpperCase()}</Button></a
			>
			<a href="/{page.data.lang}/results"
				><Button>{$LL.results.results().toLocaleUpperCase()}</Button></a
			>
		</article>
		<article>
			<h1>{$LL.homepage.about.title()}</h1>
			<p>
				{$LL.homepage.about.content()}
			</p>
		</article>
	</div>
</section>

<section>
	<article>
		<h1>Sponzoři akce</h1>
		<div class="sponsors">
			<a href="https://www.decathlon.cz/?utm_source=vytrvalec">
				<img src="/images/decathlon-logo.png" title="Decathlon" alt="Decathlon" />
			</a>
		</div>
	</article>
</section>

<Stats />
<LastSeason />

<style lang="scss">
	.sponsors {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;

		> * {
			flex: 1 1 calc(33.333% - 1rem); // subtract the gap
			max-width: calc(33.333% - 1rem);
		}
	}
</style>
