<script lang="ts">
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	let { opened, children } = $props<{ opened: boolean; children: Snippet }>();
</script>

{#if opened}
	<ul transition:slide>
		{@render children()}
	</ul>
{/if}
