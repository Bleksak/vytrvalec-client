<script lang="ts">
    import Heading from '$components/Heading.svelte';
    import type { TotalStatisticsDTO } from '$lib/DTO/StatisticsDTO';
    import LL from '$translations/i18n-svelte';
    import { PersonStanding } from '@lucide/svelte';

    const { totalStatistics }: { totalStatistics: TotalStatisticsDTO } = $props();
</script>

{#if totalStatistics.activities.length > 0}
    <section>
        <article>
            <Heading>
                <h1>{$LL.homepage.statistics.title()}</h1>
            </Heading>
            <div class="grid">
                <div class="card">
                    <PersonStanding class="card-img filter-blue" size="50" />
                    <div class="card-statistics">
                        <span class="stats-numeric">
                            {totalStatistics.users}
                        </span>
                        <span class="stats-heading">
                            {$LL.homepage.statistics.users()}
                        </span>
                    </div>
                </div>
                {#each totalStatistics.activities as activityStatistic}
                    <div class="card">
                        <img
                            class="card-img filter-blue"
                            src={activityStatistic.activity.icon}
                            alt="Statistics icon"
                        />
                        <div class="card-statistics">
                            <span class="stats-numeric">
                                {(activityStatistic.distance / 1000).toFixed(0)}&nbsp;km
                            </span>
                            <span class="stats-heading">
                                {activityStatistic.activity.name.cs}
                            </span>
                        </div>
                    </div>
                {/each}
            </div>
        </article>
    </section>
{/if}

<style>
    .card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
    }

    .card-statistics {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .card-img {
        height: 50px;
    }

    :global(.card-img) {
        height: 50px;
    }

    .stats-numeric {
        font-weight: bold;
    }

    .stats-heading {
        color: #888888;
        font-weight: normal;
    }
</style>
