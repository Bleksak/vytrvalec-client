<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		id,
		name,
		checked = $bindable(false),
		defaultChecked = false,
		disabled = undefined,
		role = 'checkbox',
		children
	}: {
		id: string;
		name: string;
		checked?: boolean;
		disabled?: boolean;
		defaultChecked?: boolean;
		role?: 'checkbox' | 'switch';
		children?: Snippet;
	} = $props();
</script>

<label for={id}>
	{#if children}
		{@render children()}
	{:else}
		&nbsp;
	{/if}

	{#if !checked}
		<input type="hidden" {name} value={false} />
	{/if}
	<input type="checkbox" {id} {name} bind:checked {disabled} value={true} {defaultChecked} {role} />
</label>
