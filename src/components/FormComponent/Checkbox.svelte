<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		id,
		name,
		checked = false,
		disabled = undefined,
		children
	} : {
		id: string;
		name: string;
		checked?: boolean;
		disabled?: boolean;
		children?: Snippet;
	} = $props();
</script>

<label for={id}>
	{#if children}
		{@render children()}
	{:else}
		&nbsp;
	{/if}
	<input type="checkbox" {id} {name} bind:checked {disabled} value="1" />
	<input type="hidden" {name} value="0" />
	<span></span>
</label>

<style>
	label {
		display: flex;
		position: relative;
		padding-left: 35px;
		/* margin-bottom: 12px; */
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	label input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	span {
		position: absolute;
		top: 0px;
		left: 0;
		height: 25px;
		width: 25px;
		background-color: #ccc;
	}

	label:hover input ~ span {
		background-color: #ccc;
	}

	label input:checked ~ span {
		background-color: #2196f3;
	}

	span:after {
		content: '';
		position: absolute;
		display: none;
	}

	label input:checked ~ span:after {
		display: block;
	}

	label input:disabled ~ span {
		background-color: #ccc;
	}

	label span:after {
		left: 11px;
		top: 7px;
		width: 5px;
		height: 10px;
		border: solid white;
		border-width: 0 3px 3px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
</style>
