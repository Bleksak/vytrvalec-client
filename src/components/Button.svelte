<script lang="ts">
	import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	// Asi by to chtělo někam přesunout, ale nějak nevim kam to zařadit, možná že to tu tolik nepřekáží
	type BtnProps = { name?: string } & HTMLButtonAttributes;
	type DivProps = { styleOnly: true } & HTMLAttributes<HTMLDivElement>;

	let { children, id, ...props }: (BtnProps | DivProps) & { children: Snippet } = $props();
</script>

{#if 'styleOnly' in props}
	{@const {styleOnly, ...rest} = props}
	<div {id} {...rest}>{@render children()}</div>
{:else}
	<button {id} {...props}>{@render children()}</button>
{/if}

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
