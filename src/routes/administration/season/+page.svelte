<script lang="ts">
	import { page } from '$app/state';
	import { Edit } from '@lucide/svelte';
</script>

<article>
	<header>
		<h2>Seznam sezón</h2>
		<a role="button" href="/administration/season/create">Nová sezóna</a>
	</header>

	<main>
		<table class="striped">
			<thead>
				<tr>
					<th scope="col">Ročník</th>
					<th scope="col">Charita</th>
				</tr>
			</thead>
			<tbody>
				{#each page.data.seasons as season}
					<tr>
						<td>{season.charity.name}</td>
						<td><img class="icon" src={activity.icon} alt="Ikonka" title="Ikonka" /></td>
						<td>{season.min_elevation}</td>
						<td>
							<a href="/administration/season/{season.id}"><Edit /></a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</main>
</article>
