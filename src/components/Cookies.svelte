<script lang="ts">
	import LL from '../translations/i18n-svelte';
	import Button from './Button.svelte';
	import { browser } from '$app/environment';

    // taken from: https://www.w3schools.com/js/js_cookies.asp
	const setCookie = (cname: string, cvalue: any, exdays: number): void => {
		const d = new Date();
		d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
		let expires = 'expires=' + d.toUTCString();
		document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
	}

	const getCookie = (cname: string): string => {
		let name = cname + '=';
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return '';
	}

    let cookiesAccepted = $state(browser ? getCookie('cookiesAccepted') === 'true' : true);

    const acceptCookies = () => {
        setCookie('cookiesAccepted', 'true', 365);
        cookiesAccepted = true;
    };
</script>

<div class="container" class:hidden={cookiesAccepted}>
	<h4>{$LL.cookies.title()}</h4>
	<p>{$LL.cookies.description()}</p>
	<Button onclick={acceptCookies} class="rounded">{$LL.cookies.accept()}</Button>
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
