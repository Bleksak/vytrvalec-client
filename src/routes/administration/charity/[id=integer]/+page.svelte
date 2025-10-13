<script lang="ts">
	import CharityUpdateForm from '$components/administration/charity/CharityUpdateForm.svelte';

	const { data } = $props();
</script>

{#if data.charity !== null}
	<CharityUpdateForm charity={data.charity} />
{:else}
	<article>
		<header>Nebylo možné najít požadovanou charitu</header>
	</article>
{/if}
