<script>
  import LL from '../translations/i18n-svelte';
  import Button from './Button.svelte';

  //TODO
</script>

<div class="cookies">
	<span>{$LL.cookies()}</span>
	<Button on:click={() => {}} class="primary">OK</Button>
</div>

<style>
    .cookies {
        position: sticky;
        bottom: 0;
        background-color: #F5F5F5;
        text-align: center;
        padding: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    span {
	    margin-right: 2rem;
    }
</style>