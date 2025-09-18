<script lang="ts">
	import Heading from '$components/Heading.svelte';
	import { Edit, Eye } from '@lucide/svelte';

	const { data } = $props();
</script>

<article>
	<Heading>
		<h1>Seznam sezón</h1>
		<a role="button" href="/administration/season/create">Nová sezóna</a>
	</Heading>

	<main>
		<table class="striped">
			<thead>
				<tr>
					<th scope="col">Začátek</th>
					<th scope="col">Konec</th>
					<th scope="col">Charita</th>
					<th scope="col">Akce</th>
				</tr>
			</thead>
			<tbody>
				{#each data.seasons as season}
					<tr>
						<td>{season.start.toLocaleDateString('cs')}</td>
						<td>{season.end.toLocaleDateString('cs')}</td>
						<td>
							<a href="/administration/charity/{season.charity.id}">{season.charity.name.cs}</a>
						</td>
						<td>
							<a title="Detail" href="/administration/season/{season.id}"><Eye /></a>
							<a title="Upravit" href="/administration/season/{season.id}/edit"><Edit /></a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</main>
</article>
