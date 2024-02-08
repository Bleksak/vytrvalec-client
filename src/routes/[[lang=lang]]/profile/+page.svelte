<script lang="ts">
	import createUserSubmissionStore from '$lib/stores/UserSubmissionsStore.svelte';
	import { page } from '$app/stores';
	import type { UserResponse } from '$lib/DTO/UserResponse';
	import FacultyTag from '$components/profile/FacultyTag.svelte';
	import { getUserSubmissions } from '$actions/User';
	import SubmissionCard from '$components/profile/SubmissionCard.svelte';
	import type { UnknownSubmissionResponse } from '$lib/DTO/SubmissionDTO';
	import { setContext } from 'svelte';

	const currentUser: UserResponse = $page.data.user;
	const userSubmissionsStore = createUserSubmissionStore();
	setContext('userSubmissionsStore', userSubmissionsStore);
	$inspect(userSubmissionsStore);
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
		{#await userSubmissionsStore.promise()}
			Načítání aktivit...
		{:then}
			<div class="submissions">
				{#each userSubmissionsStore.all() as submission}
					<SubmissionCard {submission} fetchSubmissions={() => userSubmissionsStore.refetch()} />
				{/each}
			</div>
		{/await}
	</header>
</main>

<style>
	header {
		background-color: #fff;
	}
	.user {
		display: grid;
		width: fit-content;
		grid-template-columns: auto auto;
		gap: 10px;
		align-items: center;
	}
	.submissions {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, max-content));
		gap: 30px;
		justify-content: center;
		margin: 20px;
	}
</style>
