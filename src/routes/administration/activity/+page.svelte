<script lang="ts">
	import Heading from '$components/Heading.svelte';
	import { Edit } from '@lucide/svelte';

	const { data } = $props();
</script>

<article>
	<Heading>
		<h1>Seznam aktivit</h1>
		<a role="button" href="/administration/activity/create">Nová aktivita</a>
	</Heading>

	<main>
		<table class="striped">
			<thead>
				<tr>
					<th scope="col">Název</th>
					<th scope="col">Ikonka</th>
					<th scope="col">Min. převýšení (m)</th>
					<th scope="col">Akce</th>
				</tr>
			</thead>
			<tbody>
				{#each data.activities as activity}
					<tr>
						<td>{activity.name.cs}</td>
						<td><img class="icon" src={activity.icon} alt="Ikonka" title="Ikonka" /></td>
						<td>{activity.min_elevation}</td>
						<td>
							<a href="/administration/activity/{activity.id}"><Edit /></a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</main>
</article>
