<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		children,
		title = '',
		...props
	} : HTMLAttributes<any> & { children: Snippet; title: string } = $props();
</script>

<aside {...props}>
	{#if title !== ''}
		<header>
			<h4>{title}</h4>
		</header>
	{/if}
	{@render children()}
</aside>

<style>
	header {
		margin-top: calc(-2rem - 15px);
		background: white;
		width: fit-content;
	}

	aside {
		margin-top: 30px;
		border: 2px solid #dee2e6;
		padding: 20px;
		border-radius: 10px;
	}
</style>
