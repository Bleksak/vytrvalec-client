<script lang="ts">
	import { Edit } from '@lucide/svelte';

	const { data } = $props();
</script>

<article>
	<header>
		<h2>Seznam charit</h2>
		<a role="button" href="/administration/charity/create">Nová charita</a>
	</header>

	<main>
		<table class="striped">
			<thead>
				<tr>
					<th scope="col">Název</th>
					<th scope="col">Akce</th>
				</tr>
			</thead>
			<tbody>
				{#each data.charities as charity}
					<tr>
						<td>{charity.name.cs}</td>
						<td>
							<a href="/administration/charity/{charity.id}"><Edit /></a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</main>
</article>
