<script lang="ts">
	const {
		tabs
	}: {
		tabs: Array<{
			title: string;
			action: () => void;
		}>;
	} = $props();
</script>

<div class="tabs">
	<input
		data-model="currentActivityIndex"
		type="radio"
		id="tab-activity-total"
		name="activity-tabs"
		value="0"
		checked
	/>

	{#each tabs as tab, index}
		<input
			data-model="currentActivityIndex"
			type="radio"
			id="tab-{index}"
			name="activity-tabs"
			onclick={tab.action}
		/>
		<label for="tab-{index}">
			{tab.title}
		</label>
	{/each}
</div>

<style lang="scss">
	@use '@picocss/pico/scss/settings' as pico;
	@use 'sass:map';

	.tabs {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 2rem;
		border-bottom: 2px solid var(--pico-muted-border-color);
		padding-bottom: 0;
		flex-wrap: wrap;

		input[type='radio'] {
			position: absolute;
			opacity: 0;
			pointer-events: none;
		}

		label {
			color: var(--pico-muted-color);
			padding: 0.75rem 1.5rem;
			cursor: pointer;
			font-size: clamp(0.875rem, 2vw, 1rem);
			font-weight: 500;
			transition: all 0.2s;
			border-bottom: 3px solid transparent;
			margin-bottom: -2px;
			background: none;

			@media (max-width: map.get(map.get(pico.$breakpoints, 'sm'), 'breakpoint')) {
				padding: 0.5rem 1rem;
			}

			&:hover {
				color: var(--pico-color);
				background-color: var(--pico-primary-focus);
			}
		}

		input[type='radio']:checked + label {
			color: var(--pico-color);
			border-bottom-color: var(--pico-primary);
		}
	}
</style>
