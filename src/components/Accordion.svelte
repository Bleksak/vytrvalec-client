<script lang="ts">
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	let {
		opened,
		className = '',
		children
	} = $props<{ opened: boolean; className?: string; children: Snippet }>();
</script>

{#if opened}
	<ul class={className} transition:slide>
		{@render children()}
	</ul>
{/if}
