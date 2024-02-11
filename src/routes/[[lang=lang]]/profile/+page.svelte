<script lang="ts">
	import { page } from '$app/stores';
	import type { UserResponse } from '$lib/DTO/UserResponse';
	import FacultyTag from '$components/profile/FacultyTag.svelte';
	import SubmissionCard from '$components/profile/SubmissionCard.svelte';
	import profileDataStore from '$lib/stores/ProfileDataStore.svelte';
	import LL from '../../../translations/i18n-svelte';
	import ActivityStat from '$components/profile/ActivityStat.svelte';

	const currentUser: UserResponse = $page.data.user;
	profileDataStore.refetch();
</script>

<main>
	<header>
		<div class="user">
			<h4 style="width: fit-content;">
				{currentUser.firstName}
				{currentUser.lastName}
			</h4>
			<FacultyTag facultyShortcut={currentUser.faculty.shortcut} />
		</div>
		{#await profileDataStore.promise()}
			Načítání statistik...
		{:then}
			<div class="repeat statistics">
				{#each profileDataStore.all().statistics as stat}
					<ActivityStat {...stat} />
				{/each}
			</div>
		{/await}
		<h2 class="no-transform">{$LL.profile.submissions()}</h2>
		{#await profileDataStore.promise()}
			Načítání aktivit...
		{:then}
			<div class="repeat submissions">
				{#each profileDataStore.all().submissions as submission}
					<SubmissionCard {submission} />
				{/each}
			</div>
		{/await}
	</header>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 1640px;
		margin: 0 auto;
		width: 100%;
		padding: 20px;
		background-color: white;
	}
	.user {
		display: grid;
		width: fit-content;
		grid-template-columns: auto auto;
		gap: 10px;
		align-items: center;
	}
	.repeat {
		display: grid;
		gap: 15px;
		justify-content: center;
		margin: 20px;
	}
	.statistics {
		grid-template-columns: repeat(auto-fill, minmax(200px, max-content));
	}
	.submissions {
		grid-template-columns: repeat(auto-fill, minmax(300px, max-content));
	}
	.no-transform {
		text-transform: none;
	}
</style>
