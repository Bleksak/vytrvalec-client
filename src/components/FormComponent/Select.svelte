<script lang="ts">
	import { clickOutside } from '$utils/ClickOutside';
	import { slide } from 'svelte/transition';

	let {
		keys,
		values,
		id,
		name,
		currentValue,
		inverted = false
	} : {
		keys: string[];
		values: any[];
		currentValue?: any;
		id?: string;
		name?: string;
		inverted?: boolean;
	} = $props();

	let open = $state<boolean>(false);

	let currentKey = $state<string>(keys[0]);

	let selectElement = $state();
	let optionsElement = $state();

    export const selectValue = (value: any) => {
        const index = values.indexOf(value);

        if (index === -1) {
            select(0);
        } else {
            select(index);
        }
    };

	export const select = (idx: number) => {
		open = false;
		currentValue = values[idx];
		currentKey = keys[idx];
	};

	if (currentValue === undefined && values.length > 0) {
		select(0);
	} else if (currentValue !== undefined && values.length > 0) {
		select(values.indexOf(currentValue));
	}

	const closeOnOutsideClick = () => (open = false);
</script>

<input type="hidden" {id} {name} bind:value={currentValue} />
<div
	use:clickOutside
	on:outsideclick|stopPropagation={closeOnOutsideClick}
	class="select"
	class:open
	bind:this={selectElement}
	onclick={() => (open = !open)}
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
					<button
						type="button"
						class="select-option"
						class:inverted
						onclick={(e) => {
							e.stopPropagation();
							select(i);
						}}
					>
						{key}
					</button>
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
		border: 5px solid #005cab;
		padding-block: 10px;
		min-width: fit-content;

		flex: 1;
	}

	.select-selected {
		margin-inline: 25px;
	}

	.select::after {
		position: absolute;
		content: '';
		top: 18px;
		right: 6px;
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

	.select-options {
		text-align: center;
		position: absolute;
		display: flex;
		flex-direction: column;

		min-width: fit-content;
		width: calc(100% + 10px);
		top: calc(100% + 5px);

		transform: translateX(-5px);

		background-color: white;

		z-index: 1;
		user-select: none;
		max-height: 160px;
		overflow-y: auto;
		border-inline: 5px solid #005cab;
	}

	.select-option {
		padding-block: 10px;
		border-bottom: 3px solid #005cab;
		width: 100%;
	}

	.select-options:first-child {
		border-top: 3px solid #005cab;
	}

	.select-option:hover {
		background-color: #005cab;
		color: white;
	}

	.select-option.inverted:hover {
		background-color: #eee;
		color: black;
	}
</style>
