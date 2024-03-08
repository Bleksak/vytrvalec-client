<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Accordion from '$components/Accordion.svelte';
	import NavbarInner from '$components/NavbarInner.svelte';

	let outerWidth = $state<number>();
	let open = $state<boolean>(false);

	const minWidth = 1200;

	let scrollY = $state<number>(0);

	const scrollToTop = () => {
		// NOTE: ve firefoxu nefunguje scrollTo 0, 0, proto tady scrollujeme na 1px a ne na 0
		// treba se to v budoucnu zmeni
		// da se to opravit odstranenim smooth scrollingu, ale bez nej to vypada zvlastne

		scrollY = 1;
	};

	afterNavigate(() => {
		open = false;
		scrollToTop();
	});
</script>

<svelte:window bind:outerWidth bind:scrollY />

<nav>
	<div class="navigation-wrapper">
		<div class="navigation">
			<a href="/{$page.data.lang}">
				<img src="/images/zcu-logo.png" title="Logo ZČU" alt="Logo ZČU" />
			</a>

			{#if (outerWidth ?? 0) <= minWidth}
				<button class="hamburger" onclick={() => (open = !open)}>
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
	{#if (outerWidth ?? 0) <= minWidth}
		<div class="accordion-parent">
			<Accordion className="navbar-accordion" bind:opened={open}>
				<NavbarInner />
			</Accordion>
		</div>
	{/if}
</nav>

<style>
	nav {
		z-index: 10;
		position: sticky;
		top: 0;
		left: 0;
		background-color: white;
		display: flex;
		flex-direction: column;
		font-size: 1.3rem;
	}

	.navigation-wrapper {
		padding: 10px 0;
		max-width: 1600px;
		margin: 0 auto;
		width: 100%;
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

	@media (max-width: 1200px) {
		.navigation-wrapper {
			padding: 10px 30px;
		}
	}
</style>
