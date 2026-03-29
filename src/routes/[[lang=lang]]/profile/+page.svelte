<script lang="ts">
    import { page } from '$app/state';
    import SubmissionCard from '$components/profile/SubmissionCard.svelte';
    import LL from '$translations/i18n-svelte';
    import ActivityStat from '$components/profile/ActivityStat.svelte';
    import Heading from '$components/Heading.svelte';
    import FacultyTag from '$components/profile/FacultyTag.svelte';
    import { Settings } from '@lucide/svelte';

    const { data } = $props();
</script>

<main>
    <article>
        <Heading>
            <div class="user-row">
                <div class="user">
                    <h1>
                        {data.user!.first_name}
                        {data.user!.last_name}
                    </h1>
                    <FacultyTag facultyShortcut={data.user!.faculty.shortcut} />
                </div>
                <a href="/{data.lang}/account" title="Nastavení účtu">
                    <Settings />
                </a>
            </div>
        </Heading>
        <main>
            <section class="grid">
                {#each data.statistics as stat}
                    <ActivityStat userStats={stat} activities={data.activities} />
                {/each}
            </section>

            <section class="submissions">
                {#each data.submissions as submission (submission.id)}
                    <SubmissionCard {submission} activities={data.activities} api={data.api} />
                {:else}
                    {$LL.profile.no_submissions()}
                {/each}
            </section>
        </main>
    </article>
</main>

<style>
    h1 {
        margin: 0;
    }

    .user-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: 1rem;
    }
    .user {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .submissions {
        gap: 1rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
        justify-content: flex-start;
    }

    @media (max-width: 48em) {
        .submissions {
            grid-template-columns: minmax(200px, 300px);
            justify-content: center;
        }
    }
</style>
