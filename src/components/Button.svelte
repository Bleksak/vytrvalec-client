<script lang="ts">
	import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type BtnProps = { name?: string; danger?: boolean } & HTMLButtonAttributes;

	let { children, id, ...props }: BtnProps & { children: Snippet } = $props();
</script>

<button {id} {...props}>{@render children()}</button>

<style>
	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 1rem;
		font-weight: 500;
		border-radius: 0.375rem;
		cursor: pointer;
		transition: all 0.2s;

		background-color: #005cab;
		color: white;
		border: 1px solid transparent;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.left {
		margin: 0 auto 0 0;
	}

	.right {
		margin: 0 0 0 auto;
	}

	.secondary {
		background-color: transparent;
		border: 1px solid #005cab;
		color: #005cab;
	}

	.secondary:hover:not(:disabled) {
		background-color: rgba(0, 92, 171, 0.1);
	}

	.danger {
		background-color: red;
	}

	.secondary {
		background-color: transparent;
		border: 1px solid #005cab;
		color: #005cab;
	}
</style>
