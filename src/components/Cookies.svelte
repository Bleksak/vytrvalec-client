<script lang="ts">
    import LL from '../translations/i18n-svelte';
    import { browser } from '$app/environment';
    import { getCookie, setCookie } from '$utils/cookies';

    let cookiesAccepted = $state(browser ? getCookie('cookiesAccepted') === 'true' : true);

    const acceptCookies = () => {
        setCookie('cookiesAccepted', 'true', 365);
        cookiesAccepted = true;
    };
</script>

{#if !cookiesAccepted}
    <div class="container">
        <h4>{$LL.cookies.title()}</h4>
        <p>{$LL.cookies.description()}</p>
        <button onclick={acceptCookies}>{$LL.cookies.accept()}</button>
    </div>
{/if}

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
</style>
