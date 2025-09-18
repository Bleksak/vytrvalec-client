<script lang="ts">
	import type { Snippet } from 'svelte';

	type Step = {
		title: string;
		content: Snippet;
	};

	const {
		prevButton = $bindable(defaultPrevButton),
		nextButton = $bindable(defaultNextButton),
		steps,
		submit
	}: {
		prevButton?: Snippet;
		nextButton?: Snippet;
		steps: Array<Step>;
		submit: Snippet;
	} = $props();

	let currentStepIndex = $state(0);

	function defaultNextButtonHandler(): void {
		currentStepIndex = Math.min(currentStepIndex + 1, steps.length - 1);
	}

	function defaultPrevButtonHandler(): void {
		currentStepIndex = Math.max(0, currentStepIndex - 1);
	}

	function setStep(stepIndex: number): void {
		currentStepIndex = stepIndex;
	}
</script>

{#snippet defaultPrevButton()}
	<button type="button" disabled={currentStepIndex === 0} class="secondary" onclick={defaultPrevButtonHandler}>
		Předchozí krok
	</button>
{/snippet}

{#snippet defaultNextButton()}
	<button type="button" onclick={defaultNextButtonHandler}>Další krok</button>
{/snippet}

<article>
	<header>
		<div class="progress-container">
			{#each steps as step, i}
				<div class="progress-step">
					<span class="circle-title">{step.title}</span>
					<button type="button" onclick={() => setStep(i)} class="circle {currentStepIndex >= i ? 'active' : ''}">
						{i + 1}
					</button>
				</div>
			{/each}

			<div class="progress" style:width={(100 * currentStepIndex) / (steps.length - 1) + '%'}></div>
		</div>
	</header>

	{#each steps as step, index}
		<div style:display={index === currentStepIndex ? 'block' : 'none'}>
			{@render step.content()}
		</div>
	{/each}

	<footer>
		<div class="group">
			{@render prevButton()}

			{#if currentStepIndex === steps.length - 1}
				{@render submit()}
			{:else}
				{@render nextButton()}
			{/if}
		</div>
	</footer>
</article>

<style lang="scss">
	.group {
		display: flex;
		gap: 1rem;
		width: auto;
	}

	.progress-step {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.progress-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}

	.progress-container::before {
		content: '';
		background-color: #e0e0e0;
		position: absolute;
		bottom: calc(25px);
		margin-inline: 1rem;
		height: 4px;
		z-index: 1;
		width: calc(100% - 2rem);
	}

	.progress {
		background-color: #3498db;
		margin-inline: 1rem;
		position: absolute;
		bottom: calc(25px);
		left: 0;
		height: 4px;
		z-index: 1;
		transition: 0.4s ease;
		max-width: calc(100% - 2rem);
	}

	.circle {
		background-color: #fff;
		color: #999;
		border-radius: 50%;
		height: 50px;
		width: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 3px solid #e0e0e0;
		transition: 0.4s ease;
		cursor: pointer;
		z-index: 2;
		padding: 0;
		margin-bottom: 0;
	}

	.circle.active::after {
		color: #3498db;
	}

	.circle.active {
		border-color: #3498db;
	}
</style>
