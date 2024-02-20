<script lang="ts">
	import { page } from '$app/stores';
	import type { UserResponse } from '$lib/DTO/UserResponse';
	import FacultyTag from '$components/profile/FacultyTag.svelte';
	import SubmissionCard from '$components/profile/SubmissionCard.svelte';
	import LL from '$translations/i18n-svelte';
	import ActivityStat from '$components/profile/ActivityStat.svelte';
	import { fetchUserStatistics } from '$actions/Statistics';
	import { fetchActivities } from '$actions/Activity';
	import { fetchUserSubmissions } from '$actions/Submission';
	import type { ProfileSubmissionResponseDTO } from '$lib/DTO/SubmissionDTO';
	import { setGlobalContext } from '$lib/stores/GlobalContext.svelte';

	const currentUser: UserResponse = $page.data.user;

	const activitiesPromise = fetchActivities();
	const userStatisticsPromise = fetchUserStatistics(activitiesPromise);
	const submissionsPromise = fetchUserSubmissions(activitiesPromise);

	let submissions = $state<Array<ProfileSubmissionResponseDTO>>([]);

	const refetchSubmissions = () => {
		fetchUserSubmissions(activitiesPromise).then((submissionsResult) => {
			submissions = submissionsResult;
		});
	};

	setGlobalContext('refetchSubmissions', refetchSubmissions);
	refetchSubmissions();

	// TODO: currently this page only works for current user
</script>

<main>
	<div class="wrapper">
		<header>
			<div class="user">
				<h4 style="width: fit-content;">
					{currentUser.firstName}
					{currentUser.lastName}
				</h4>
				<FacultyTag facultyShortcut={currentUser.faculty.shortcut} />
			</div>
			<a class="settings" href="/{$page.data.lang}/account">
				<img class="icon" src="/images/icons/settings.svg" alt="Nastavení" title="Nastavení" />
			</a>
		</header>

		{#await userStatisticsPromise}
			{$LL.profile.loading.statistics()}
		{:then statistics}
			<div class="statistics">
				{#each statistics as stat}
					<ActivityStat userStats={stat} />
				{/each}
			</div>
		{/await}
	</div>

	{#await submissionsPromise}
		{$LL.profile.loading.submissions()}
	{:then}
		<div class="submissions">
			{#each submissions as submission}
				{#key submission.id}
					<SubmissionCard {submission} bind:submissions />
				{/key}
			{:else}
				{$LL.profile.noSubmissions()}
			{/each}
		</div>
	{/await}
</main>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	header {
		display: flex;
		justify-content: space-between;
		gap: 30px;
		align-items: center;
	}

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
		display: flex;
		gap: 10px;
		align-items: center;
		align-self: flex-start;
	}

	.settings {
		justify-self: flex-end;
	}

	.statistics {
		display: flex;
		flex-wrap: wrap;
		gap: 80px;
	}

	.submissions {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

		justify-content: space-between;
		gap: 15px;
	}

	@media (max-width: 48em) {
		.wrapper {
			margin: 0 auto;
		}

		header {
			justify-content: space-between;
			gap: 80px;
		}

		.statistics {
			justify-content: space-between;
			margin: 0 auto;
			width: 100%;
		}

		.submissions {
			grid-template-columns: minmax(200px, 300px);
			justify-content: center;
			gap: 15px;
		}
	}
</style>
