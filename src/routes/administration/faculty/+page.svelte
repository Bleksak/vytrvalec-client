<script lang="ts">
	import { Edit } from '@lucide/svelte';

	const { data } = $props();
</script>

<article>
	<header>
		<h2>Seznam pracovišť</h2>
		<a role="button" href="/administration/faculty/create">Nové pracoviště</a>
	</header>

	<main>
		<table class="striped">
			<thead>
				<tr>
					<th scope="col">Název</th>
					<th scope="col">Zkratka</th>
					<th scope="col">Nadřazená fakulta</th>
					<th scope="col">Barva</th>
					<th scope="col">Akce</th>
				</tr>
			</thead>
			<tbody>
				{#each data.faculties.values() as faculty}
					<tr>
						<td>{faculty.name?.cs ?? ''}</td>
						<td>{faculty.shortcut}</td>
						{#if faculty.parent}
							<td>{data.faculties.get(faculty.parent)!.shortcut}</td>
						{:else}
							<td></td>
						{/if}
						<td>
							<span
								style="display:block; width: 25px; height: 25px;"
								style:background-color={faculty.color}
							>
							</span>
						</td>
						<td>
							<a href="/administration/faculty/{faculty.id}"><Edit /></a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</main>
</article>
