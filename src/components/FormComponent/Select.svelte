<script lang="ts">
	import { slide } from 'svelte/transition';

	let { keys, values, id, name, currentValue, ...props } = $props<{
		keys: string[];
		values: any[];
		currentValue?: any;
		id?: string;
		name?: string;
	}>();

	let open = $state<boolean>(false);

	let currentKey = $state<string>(keys[0]);

	$effect(() => {
		if (currentValue === undefined) {
			currentValue = values[0];
		}
	});

	let selectElement = $state();
	let optionsElement = $state();

	const select = (idx: number) => {
		open = false;
		currentValue = values[idx];
		currentKey = keys[idx];
	};

	const closeOnOutsideClick = (e: MouseEvent) => {
		e.stopPropagation();

		if (
			e.composedPath().includes(selectElement as EventTarget) ||
			e.composedPath().includes(optionsElement as EventTarget)
		) {
			return;
		}

		open = false;
	};
</script>

<svelte:document on:click={closeOnOutsideClick} />

<input type="hidden" {id} {name} bind:value={currentValue} />
<div
	class="select"
	class:open
	bind:this={selectElement}
	on:click={() => (open = !open)}
	role="button"
	tabindex="0"
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			open = !open;
		}
	}}
>
	<span class="select-selected">{currentKey}</span>
	{#if open}
		<div class="select-options" transition:slide bind:this={optionsElement}>
			{#each keys as key, i}
				{#if key !== currentKey}
					<button type="button" class="select-option" on:click|stopPropagation={() => select(i)}
						>{key}</button
					>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	.select {
		white-space: nowrap;
		cursor: pointer;

		text-align: center;
		position: relative;
		display: flex;
		flex-direction: column;

		background-color: white;
		border: 3px solid #005cab;
		padding-block: 10px;
		width: 100%;
	}

	.select::after {
		position: absolute;
		content: '';
		top: 18px;
		right: 12px;
		width: 0;
		height: 0;
		border: 8px solid black;
		border-color: #005cab transparent transparent transparent;
		border-radius: 3px;
	}

	.open::after {
		top: 10px;
		border-color: transparent transparent #005cab transparent;
	}

	.selected {
		background-color: #bbb;
	}

	.select-options {
		text-align: center;
		position: absolute;
		display: flex;
		flex-direction: column;

		width: calc(100% + 6px);

		top: calc(100% + 3px);
		left: 50%;

		transform: translateX(-50%);

		background-color: white;

		z-index: 1;
		user-select: none;
		max-height: 160px;
		overflow: scroll;
		border-inline: 3px solid #005cab;
	}

	.select-option {
		padding-block: 10px;
		border-bottom: 3px solid #005cab;
	}

	.select-options:first-child {
		border-top: 3px solid #005cab;
	}

	.select-option:last-child {
		border-bottom: none;
	}

	.select-option:hover {
		background-color: #005cab;
	}
</style>
