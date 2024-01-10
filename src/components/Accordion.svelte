<script lang="ts">
	import type { Snippet } from 'svelte';

	let { opened, children } = $props<{ opened: boolean; children: Snippet }>();

	let accordion = $state<HTMLElement>();
	let offsetHeight = $state<number>(0);
	let maxOffsetHeight = $state<number>(0);

	$effect(() => {
		if (offsetHeight > 0 && maxOffsetHeight === 0) {
			maxOffsetHeight = offsetHeight;
		}
	});

	$effect(() => {
		if (maxOffsetHeight > 0) {
			accordion!.style.maxHeight = opened ? maxOffsetHeight + 'px' : '0';
		}
	});
</script>

<ul bind:this={accordion} bind:offsetHeight class:opened>
	{@render children()}
</ul>

<style>
	ul {
		height: auto;
		overflow: hidden;
		scrollbar-width: none;
		transition: 200ms all linear;
	}

	.opened {
		overflow: auto;
	}
</style>
