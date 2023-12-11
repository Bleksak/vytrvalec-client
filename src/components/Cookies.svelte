<script lang="ts">
  import LL from "../translations/i18n-svelte";
  import Button from "./Button.svelte";
  import { browser } from '$app/environment';

  let cookiesAccepted = $state(browser ? window.localStorage.getItem('cookiesAccepted') : true);

  const acceptCookies = () => {
    window.localStorage.setItem('cookiesAccepted', true);
	cookiesAccepted = true;
  }

</script>

<div class="container" class:hidden={cookiesAccepted} >
	<div class="cookies">
		<h6>{$LL.cookies.title()}</h6>
		<p>{$LL.cookies.description()}</p>
	</div>
	<Button on:click={acceptCookies}>{$LL.cookies.accept()}</Button>
</div>

<style>
    .container {
        position: sticky;
        bottom: 2em;
        background-color: #FFF;
        padding: 2rem;
        display: flex;
        align-items: center;
        max-width: 50em;
	    margin: 0 auto;
        box-shadow: 5px 5px 10px #757575;
    }
    .cookies {
	    text-align: justify;
	    margin-right: 2em;
    }
    h6 {
	    color: #000;
    }
    .hidden {
		display: none;
    }

    span {
        margin-right: 2rem;
    }
</style>