<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	let { children, name, id, ...props } = $props<
		HTMLButtonAttributes & { name?: string; id?: string; children: Snippet }
	>();
</script>

<button {name} {id} {...props} on:click>{@render children()}</button>

<style>
	button {
		cursor: pointer;
        display: inline-flex;
        justify-content: center;
		text-align: center;
		min-width: 150px;
		height: 50px;
		background-color: #005cab;
		color: white;
		font-size: 1.3rem;
		transition: all 0.3s ease-out;
		padding: 0.5rem;
		border: 2px solid transparent;
	}

	.middle {
		margin: 0 auto;
	}

	.left {
		margin: 0 auto 0 0;
	}

	.right {
		margin: 0 0 0 auto;
	}

	.secondary {
		background-color: white;
		color: #005cab;
		border: 2px solid #005cab;
	}

	.full-width {
		width: 100%;
	}

	.rounded {
		border-radius: 10px;
	}

	.small {
		height: 35px;
		font-size: 0.8rem;
	}

	button:hover {
		background-color: white;
		color: #005cab;
		border: 2px solid #005cab;
	}

	button.secondary:hover {
		background-color: #005cab;
		border: 2px solid transparent;
		color: white;
	}
</style>
