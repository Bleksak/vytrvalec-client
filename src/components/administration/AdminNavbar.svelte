<script lang="ts">
	import type { CharityStore } from '$lib/stores/CharityStore.svelte';
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import type { SeasonStore } from '$lib/stores/SeasonStore.svelte';
	import Accordion from '$components/Accordion.svelte';

	const charityStore = getContext<CharityStore>('charityStore');
	const seasonStore = getContext<SeasonStore>('seasonStore');

	const routeMap = [
		'/administration/season/[[id=integer]]',
		'/administration/charity/[[id=integer]]'
	];

	let checkboxes = $state(routeMap.map(() => true));
	let route = $derived($page.route.id as string);

	const toggle = (index: number) => {
		checkboxes[index] = !checkboxes[index];
	};

	$effect(() => {
		for (let i = 0; i < checkboxes.length; i++) {
			checkboxes[i] = i === routeMap.indexOf(route);
		}
	});
</script>

<nav>
	<ul>
		<li>
			<a href="/administration/season" on:click={() => toggle(0)}>Sezóny</a>
			<input id="navbar-season" bind:checked={checkboxes[0]} type="checkbox" />
			<Accordion bind:opened={checkboxes[0]}>
				{#each seasonStore.all() as season}
					<li class="accordion-inner">
						<a href="/administration/season/{season.id}">
							{season.start.toLocaleDateString('cs', { year: 'numeric', month: 'long' })}
						</a>
					</li>
				{/each}
			</Accordion>
		</li>
		<li>
			<a href="/administration/charity" on:click={() => toggle(1)}> Charity </a>
			<input type="checkbox" bind:checked={checkboxes[1]} />
			<Accordion bind:opened={checkboxes[1]}>
				{#each charityStore.all() as charity}
					<li class="accordion-inner">
						<a href="/administration/charity/{charity.id}">
							{charity.name}
						</a>
					</li>
				{/each}
			</Accordion>
		</li>
		<li>
			<a href="/administration/user">Uživatelé</a>
		</li>
		<li>
			<a href="/administration/submission">Uživatelské příspěvky</a>
		</li>
	</ul>
</nav>

<style>
	nav {
		flex: 1;
		margin-left: 100px;
		display: flex;
		flex-direction: column;
		background-color: white;

		height: 100vh;

		box-shadow: 0px 0px 10px #dee2e6;
		border-radius: 20px 20px 0 0;
		padding-top: 25px;
	}

	nav > ul {
		display: flex;
		flex-direction: column;
	}

	a:hover {
		background: rgb(200, 200, 200);
	}

	a {
		display: block;
		font-weight: 500;
		user-select: none;
		padding: 10px;
	}

	input[type='checkbox'] {
		display: none;
	}

	li.accordion-inner a {
		padding: 10px;
		padding-left: 20px;
	}

	@media (max-width: 1000px) {
		nav {
			margin-inline: 100px;
		}
	}
</style>
