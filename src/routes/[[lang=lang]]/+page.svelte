<script lang="ts">
    import { page } from '$app/state';
    import Stats from '$components/home/Stats.svelte';
    import { onMount } from 'svelte';
    import { LL } from '$translations/i18n-svelte';
    import type { PageProps } from './$types';
    import SeasonDetail from '$components/home/SeasonDetail.svelte';
    import Heading from '$components/Heading.svelte';

    import androidStoreImage from '$static/images/google-play.png';
    import appleStoreImage from '$static/images/apple-store.png';
    import {
        SeasonResult,
        type SeasonResultRank,
        type SeasonResultRankRow,
        type ExtraPoints,
    } from '$lib/DTO/SeasonResultDTO';

    const { data }: PageProps = $props();

    const seasonResultCalculator = $derived(new SeasonResult(data.activities));

    const googlePlayLink = 'https://play.google.com/store/apps/details?id=cz.magnetka.mv'; // To neni citlivý, nebudu dávat do envu
    const appleStoreLink = 'https://apps.apple.com/us/app/6743554661';

    let isMobileDevice = $state(false);

    onMount(() => {
        if (/Android/i.test(navigator.userAgent) || /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            isMobileDevice = true;
        }
    });

    const seasonResult = $derived.by(() => {
        if (data.lastSeason === null) {
            return {
                total_distance: 0,
                total_points: 0,
                rows: [] as SeasonResultRankRow[],
                extras: [] as ExtraPoints[],
            } as SeasonResultRank;
        }

        return seasonResultCalculator.calculateSeasonResultRank(
            data.lastSeason,
            data.lastSeasonResult,
        );
    });
</script>

{#if isMobileDevice}
    <section>
        <h1>{$LL.homepage.mobile_app.title()}</h1>
        <span>{$LL.homepage.mobile_app.download()}</span>
        <div class="grid">
            <a href={googlePlayLink} target="_blank" rel="noopener noreferrer">
                <img src={androidStoreImage} alt="Google Play" />
            </a>
            <a href={appleStoreLink} target="_blank" rel="noopener noreferrer">
                <img src={appleStoreImage} alt="App Store" />
            </a>
        </div>
    </section>
{/if}

<section>
    <div class="grid">
        <article>
            <Heading>
                <h1>Měsíční Vytrvalec</h1>
            </Heading>
            <p>
                {$LL.homepage.intro()}
            </p>
            <a role="button" class="secondary" href="/{data.lang}/rules">
                {$LL.rules.title().toUpperCase()}
            </a>
            <a role="button" href="/{data.lang}/results">
                {$LL.results.results().toLocaleUpperCase()}
            </a>
        </article>
        <article>
            <Heading>
                <h1>{$LL.homepage.about.title()}</h1>
            </Heading>
            <p>
                {$LL.homepage.about.content()}
            </p>
        </article>
    </div>
</section>

{#if data.totalStatistics}
    <Stats totalStatistics={data.totalStatistics} />
{/if}

{#if data.lastSeason && data.lastSeasonResult}
	<SeasonDetail
		faculties={data.faculties}
		season={data.lastSeason}
		result={seasonResult}
	/>
{/if}

<section>
    <article>
        <Heading>
            <h1>Sponzoři Akce</h1>
        </Heading>
        <div class="sponsors">
            <a href="https://www.decathlon.cz/?utm_source=vytrvalec">
                <img src="/images/decathlon-logo.png" title="Decathlon" alt="Decathlon" />
            </a>
        </div>
    </article>
</section>

<style lang="scss">
    .sponsors {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;

        > * {
            flex: 1 1 calc(33.333% - 1rem); // subtract the gap
            max-width: calc(33.333% - 1rem);
        }
    }
</style>
