<script lang="ts">
	import type { ActivityDTO } from '$lib/DTO/ActivityDTO';
	import type { FacultyDTO } from '$lib/DTO/FacultyDTO';
	import type { OutlierActivity } from '$lib/DTO/SeasonResultDTO';
	import type { AnonymizedUser } from '$lib/DTO/UserResponse';
	import LL from '$translations/i18n-svelte';
	import type { SvelteMap } from 'svelte/reactivity';

	const {
		outliersInActivity,
		faculties,
		activity,
        users,
	}: {
		outliersInActivity: OutlierActivity;
		activity: ActivityDTO;
		faculties: SvelteMap<number, FacultyDTO>;
        users: Record<number, AnonymizedUser>;
	} = $props();
</script>

<section>
	<div>
		<h5>{$LL.activities[activity.name.cs as keyof typeof $LL.activities]()}</h5>
	</div>
	<table class="striped">
		<thead>
			<tr>
				<th>{$LL.registration.first_name()}</th>
				<th>{$LL.results.faculty()}</th>
				<th class="text-right">{$LL.results.count()}</th>
			</tr>
		</thead>
		<tbody>
			{#each Object.values(outliersInActivity.results) as outlier}
				{@const faculty = faculties.get(outlier.faculty_id)}
                {@const user = users[outlier.user]}
				<tr>
					<td>{user.first_name} {user.last_name}</td>
					<td>{faculty?.shortcut}</td>
					<td class="text-right">{(outlier.value / 1000).toFixed(1)} km</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>
