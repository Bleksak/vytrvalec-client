<script lang="ts">
	import LL from '../translations/i18n-svelte';
	import Button from './Button.svelte';
	import { browser } from '$app/environment';

	let cookiesAccepted = $state(browser ? window.localStorage.getItem('cookiesAccepted') : true);

	const acceptCookies = () => {
		window.localStorage.setItem('cookiesAccepted', 'true');
		cookiesAccepted = true;
	};
</script>

<div class="container" class:hidden={cookiesAccepted}>
	<h4>{$LL.cookies.title()}</h4>
	<p>{$LL.cookies.description()}</p>
	<Button on:click={acceptCookies} class="rounded">{$LL.cookies.accept()}</Button>
</div>

<style>
	.container {
		position: fixed;
		bottom: 5vh;
		background-color: #fff;
		padding: 25px;
		display: flex;
		box-shadow: 5px 5px 10px #757575;
		border-radius: 10px;

		left: 50%;
		transform: translateX(-50%);

        width: 100%;
		max-width: 850px;

		flex-direction: column;
		justify-content: center;

		align-items: center;
		gap: 20px;
	}

	h4 {
		color: #000;
	}

	.hidden {
		display: none;
	}
</style>
