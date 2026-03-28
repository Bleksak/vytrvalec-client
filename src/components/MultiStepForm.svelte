<script lang="ts">
    import LL from '$translations/i18n-svelte';
    import type { Snippet } from 'svelte';

    type Step = {
        title: string;
        content: Snippet;
    };

    const {
        prevButton = $bindable(defaultPrevButton),
        nextButton = $bindable(defaultNextButton),
        steps,
        submit,
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
    <button
        type="button"
        disabled={currentStepIndex === 0}
        class="secondary"
        onclick={defaultPrevButtonHandler}
    >
        {$LL.form.prevStep()}
    </button>
{/snippet}

{#snippet defaultNextButton()}
    <button type="button" onclick={defaultNextButtonHandler}>{$LL.form.nextStep()}</button>
{/snippet}

<article>
    <header>
        <div class="progress-container">
            {#each steps as step, i}
                <div class="progress-step">
                    <span class="circle-title">{step.title}</span>
                    <button
                        type="button"
                        onclick={() => setStep(i)}
                        class="circle {currentStepIndex >= i ? 'active' : ''}"
                    >
                        {i + 1}
                    </button>
                </div>
            {/each}

            <div
                class="progress"
                style:width={(100 * currentStepIndex) / (steps.length - 1) + '%'}
            ></div>
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
    header {
        padding-top: 50px;
        overflow: hidden;
    }

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
        margin-inline: 1rem;
    }

    .progress-container::before {
        content: '';
        background-color: #005bab38;
        position: absolute;
        bottom: calc(25px);
        height: 4px;
        z-index: 1;
        width: calc(100% - 50px);
        margin-inline: 25px;
    }

    .progress {
        background-color: #3498db;
        position: absolute;
        bottom: calc(25px);
        left: 0;
        height: 4px;
        z-index: 1;
        transition: 0.4s ease;
    }

    .circle {
        background-color: var(--pico-primary-background);
        color: white;
        border-radius: 50%;
        height: 50px;
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid var(--pico-primary-background);
        transition: 0.4s ease;
        cursor: pointer;
        z-index: 2;
        padding: 0;
        margin-bottom: 0;
    }

    .circle-title {
        padding-bottom: 0.5rem;
        position: absolute;
        bottom: 45px;
        text-wrap: nowrap;
    }

    .circle.active::after {
        color: #3498db;
    }
</style>
