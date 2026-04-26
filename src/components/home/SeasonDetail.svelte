<script lang="ts">
    import type { FacultyDTO } from '$lib/DTO/FacultyDTO';
    import type { SeasonResultRank } from '$lib/DTO/SeasonResultDTO';
    import { FacultyColorMap } from '$utils/colors';
    import {
        Trophy,
        Medal,
        ExternalLink,
        ImageIcon,
        Coins,
        CalendarRangeIcon,
    } from '@lucide/svelte';
    import LL from '$translations/i18n-svelte';
    import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
    import type { SvelteMap } from 'svelte/reactivity';
    import Heading from '$components/Heading.svelte';
    import type { Snippet } from 'svelte';
    import { getLocale } from '$paraglide/runtime';
    import SeasonTimer from '$components/SeasonTimer.svelte';
    import Store from '$lib/enums/Stores';
    import type { DialogStore } from '$lib/stores/DialogStore.svelte';
    import { getAllContexts, getContext } from 'svelte';
    import ImagePreview from '$components/ImagePreview.svelte';

    const context = getAllContexts();
    const dialogStore = getContext<DialogStore>(Store.DIALOG_STORE);

    type Result = {
        faculty: FacultyDTO;
        points: number;
        distance: number;
    };

    const {
        faculties,
        season,
        result,
        title = $LL.season_detail.title(),
        heading = undefined,
    }: {
        faculties: SvelteMap<number, FacultyDTO>;
        season: SeasonDTO;
        result: SeasonResultRank;
        title?: string;
        heading?: Snippet;
    } = $props();

    const locale = $derived(getLocale());

    const winners: Array<Result> = $derived(
        result.rows.slice(0, 3).map((value) => {
            return {
                faculty: faculties.get(value.faculty)!,
                points: value.points,
                distance: value.distance,
            };
        }),
    );

    const positionText = (position: number): keyof typeof $LL.season_detail.ordinal =>
        (['first', 'second', 'third'] as Array<keyof typeof $LL.season_detail.ordinal>)[position];

    const seasonEnd = new Date(season.end); //tmp fix
    seasonEnd.setDate(seasonEnd.getDate() - 1);
</script>

<article>
    <Heading>
        <div class="grid">
            <h1>{title}</h1>
            {#if heading}
                {@render heading()}
            {/if}
        </div>
        <div class="grid">
            <span class="flex-align-center gap-small">
                <CalendarRangeIcon />
                {$LL.season_detail.date_range({ start: season.start, end: seasonEnd })}
            </span>
            <div class="grid">
                {#each winners as winner, index (winner.faculty.id)}
                    <div
                        style:background-color={FacultyColorMap[
                            winner.faculty.shortcut as keyof typeof FacultyColorMap
                        ]}
                        class="winner-badge"
                    >
                        {#if index === 0}
                            <Trophy />
                        {:else}
                            <Medal />
                        {/if}
                        {$LL.season_detail.ordinal[positionText(index)]({
                            name: winner.faculty.shortcut,
                        })}
                    </div>
                {/each}
            </div>
        </div>
    </Heading>
    <div class="grid charity-grid">
        <div class="charity-image-container">
            {#if season.charity.image}
                <button
                    type="button"
                    class="charity-image-button"
                    onclick={() =>
                        dialogStore.open(
                            ImagePreview,
                            {
                                src: season.charity.image || '/placeholder.svg',
                                title: season.charity.name[locale],
                                alt: season.charity.name[locale],
                            },
                            context,
                        )}
                >
                    <img
                        src={season.charity.image || '/placeholder.svg'}
                        alt={season.charity.name[locale]}
                        class="charity-image"
                    />
                </button>
            {:else}
                <div class="charity-placeholder-content">
                    <ImageIcon size={48} />
                    <span>{$LL.season_detail.no_image()}</span>
                </div>
            {/if}
        </div>
        <section class="charity">
            <article>
                <h2>{season.charity.name[getLocale()]}</h2>
                {#if season.charity.description[locale]}
                    <p>{season.charity.description[locale]}</p>
                {/if}
                {#if season.charity.website}
                    <div>
                        <a
                            href={season.charity.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            role="button"
                        >
                            <ExternalLink />
                            {$LL.season_detail.visit_charity()}
                        </a>
                    </div>
                {/if}
            </article>
            <section class="charity-stats">
                {#if season.is_running}
                    <article class="money-collected">
                        <SeasonTimer {season} />
                    </article>
                {/if}

                <article class="money-collected">
                    <div class="title">
                        <div class="icon-container">
                            <Coins size="1rem" />
                        </div>

                        <span>{$LL.season_detail.raised()}</span>
                    </div>
                    <strong class="money-collected-amount"
                        >{$LL.season_detail.raised_value({
                            raised: result.total_distance / 1000,
                        })}</strong
                    >
                </article>
            </section>
        </section>
    </div>
</article>

<style lang="scss">
    @use '@picocss/pico/scss/settings' as pico;
    @use 'sass:map';

    .flex-align-center {
        display: flex;
        align-items: center;
    }

    .gap-small {
        gap: 0.5rem;
    }

    .charity {
        margin-bottom: 0;
    }

    .winner-badge {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.5rem;
        font-size: 0.75rem;
        font-weight: 500;
        color: white;
        border-radius: 0.25rem;
    }

    .charity-grid {
        align-items: center;
        grid-template-columns: 1fr 2fr;
    }

    .charity-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 0.5rem;
        margin: 0;
    }

    @media (max-width: map.get(map.get(pico.$breakpoints, 'md'), 'breakpoint')) {
        .charity-grid {
            grid-template-columns: 1fr;
        }
    }

    .charity-image-container {
        position: relative;
        height: 100%;
        border-radius: 0.375rem;
        overflow: hidden;
        border: 1px solid rgba(0, 92, 171, 0.2);
    }

    .charity-image {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    .charity-image-button {
        all: unset;
        cursor: pointer;
        height: 100%;
    }

    .charity-placeholder-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .money-collected {
        margin-bottom: 0;
        display: flex;
        flex-direction: column;
        background-color: rgba(0, 92, 171, 0.1);
        gap: 0.8rem;

        .title {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .money-collected-amount {
            font-size: 1.5rem;
            padding-block: 0.25rem;
        }
    }
</style>
