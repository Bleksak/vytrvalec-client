<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let { ...props }: HTMLButtonAttributes = $props();
</script>

<button {...props} on:click><slot /></button>

<style>
	button {
		cursor: pointer;
		display: block;
		text-align: center;
		min-width: 150px;
		height: 50px;
		background-color: #005cab;
		color: white;
		font-size: 1.3rem;
		transition: all 0.3s ease-out;
		padding: 0.5rem;
	}

	.secondary {
		background-color: white;
		color: #005cab;
		outline: 2px solid #005cab;
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
		outline: 2px solid #005cab;
		/* transition: all 0.3s ease-in; */
	}

	button.secondary:hover {
		background-color: #005cab;
		outline: none;
		color: white;
	}
</style>
