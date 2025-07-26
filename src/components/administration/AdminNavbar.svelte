<script lang="ts">
	import type { CharityStore } from '$lib/stores/CharityStore.svelte';
	import { getContext } from 'svelte';
	import { page } from '$app/state';
	import type { SeasonStore } from '$lib/stores/SeasonStore.svelte';
	import Accordion from '$components/Accordion.svelte';
	import { beforeNavigate } from '$app/navigation';
	import Store from '$lib/enums/Stores';
	import type { FacultyStore } from '$lib/stores/FacultyStore.svelte';
	import type { ActivityStore } from '$lib/stores/ActivityStore.svelte';

	const charityStore = getContext<CharityStore>(Store.CHARITY_STORE);
	const seasonStore = getContext<SeasonStore>(Store.SEASON_STORE);
	const facultyStore = getContext<FacultyStore>(Store.FACULTY_STORE);
	const activityStore = getContext<ActivityStore>(Store.ACTIVITY_STORE);

	const routeMap = [
		'/administration/season/[[id=integer]]',
		'/administration/charity/[[id=integer]]',
		'/administration/faculty/[[id=integer]]',
		'/administration/activity/[[id=integer]]',
	];

	let route = $state(page.route.id as string);
	let checkboxes = $derived(routeMap.map((r) => r === route));

	beforeNavigate(({ to }) => {
		route = to?.route.id as string;
	});
</script>

<nav>
	<ul>
		<li>
			<a href="/administration/activity">Aktivity</a>
			<input id="navbar-season" bind:checked={checkboxes[0]} type="checkbox" />
			<Accordion bind:opened={checkboxes[3]}>
				{#each activityStore.all() as activity}
					<li class="accordion-inner">
						<a href="/administration/activity/{activity.id}">
							{activity.name}
						</a>
					</li>
				{/each}
			</Accordion>
		</li>
		<li>
			<a href="/administration/season">Sezóny</a>
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
			<a href="/administration/charity">Charity</a>
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
			<a href="/administration/faculty">Fakulty</a>
			<input id="navbar-faculty" type="checkbox" bind:checked={checkboxes[2]} />
			<Accordion bind:opened={checkboxes[2]}>
				{#each facultyStore.all() as faculty}
					<li class="accordion-inner">
						<a href="/administration/faculty/{faculty.id}">
							{faculty.name}
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
		display: flex;
		flex-direction: column;
		background-color: white;

		height: 100vh;

		box-shadow: 0px 0px 10px #dee2e6;
		border-radius: 0 20px 0 0;
		padding-top: 25px;
		overflow-y: scroll;
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
</style>
