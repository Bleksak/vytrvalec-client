<script lang="ts">
	import { page } from '$app/stores';
	import Accordion from '$components/Accordion.svelte';
	import NavbarInner from '$components/NavbarInner.svelte';

	let outerWidth = $state<number>();
	let open = $state<boolean>(false);

	let hamburgerSrc = $state<string>('/images/hamburger.svg');
</script>

<svelte:window bind:outerWidth />

<nav>
	<div class="navigation-wrapper">
		<div class="navigation">
			<a href="/{$page.data.lang}">
				<img src="/images/zcu-logo.png" title="Logo ZČU" alt="Logo ZČU" />
			</a>

			{#if (outerWidth ?? 0) <= 1000}
				<button class="hamburger" on:click={() => (open = !open)}>
					{#if open}
						<img class="icon" src="/images/x.svg" alt="Hamburger menu" />
					{:else}
						<img class="icon" src="/images/hamburger.svg" alt="Hamburger menu" />
					{/if}
				</button>
			{:else}
				<ul>
					<NavbarInner />
				</ul>
			{/if}
		</div>
	</div>
	{#if (outerWidth ?? 0) <= 1000}
		<div class="accordion-parent">
			<Accordion className="navbar-accordion" bind:opened={open}>
				<NavbarInner />
			</Accordion>
		</div>
	{/if}
</nav>

<style>
	nav {
		z-index: 9999;
		position: sticky;
		top: 0;
		left: 0;
		background-color: white;
		display: flex;
		flex-direction: column;
		font-size: 1.3rem;
	}

	.navigation-wrapper {
		padding: 10px 100px;
	}

	.navigation {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	ul {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		gap: 18px;
	}

	img {
		height: 80px;
	}

	.accordion-parent {
		background-color: white;
		position: relative;
	}

	.hamburger {
		cursor: pointer;
	}

	@media (max-width: 1000px) {
		nav {
			padding: 0;
		}
	}
</style>
