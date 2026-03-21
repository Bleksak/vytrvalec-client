<script lang="ts">
    import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
    import { LL } from '$translations/i18n-svelte';
    import { Clock } from '@lucide/svelte';

    const { season }: { season: SeasonDTO } = $props();

    let now = $state(Date.now());

    setInterval(() => {
        now = Date.now();
    }, 1000);

    const diff = $derived(new Date(season.end).getTime() - now);

    const timer = $derived(() => {
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };

        const seconds = Math.floor(diff / 1000) % 60;
        const minutes = Math.floor(diff / (1000 * 60)) % 60;
        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        return { days, hours, minutes, seconds, finished: false };
    });
</script>

{#if !timer().finished}
    <section>
        <article class="timer">
            <div class="title">
                <Clock class="filter-blue" size="30" />
                <span>{$LL.season_timer.title()}</span>
            </div>
            <div class="cards">
                <div class="card">
                    <span>{timer().days}</span> <small>{$LL.season_timer.day()}</small>
                </div>
                <div class="card">
                    <span>{timer().hours}</span> <small>{$LL.season_timer.hour()}</small>
                </div>
                <div class="card">
                    <span>{timer().minutes}</span> <small>{$LL.season_timer.minute()}</small>
                </div>
                <div class="card">
                    <span>{timer().seconds}</span> <small>{$LL.season_timer.second()}</small>
                </div>
            </div>
        </article>
    </section>
{/if}

<style lang="scss">
@use '@picocss/pico/scss/settings' as pico;

    .timer {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.8rem;
        margin: 1rem 0 1rem 0;

        .title {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .cards {
            display: flex;
            gap: 0.5rem;

            .card {
                display: flex;
                align-items: center;
                flex-direction: column;
                padding: 0.5rem;
                text-transform: uppercase;
                border-radius: 0.25rem;
                background-color: var(--pico-color-slate-900)

                span {
                    font-weight: bold;
                }

                small {
                    color: #4c5664;
                }
            }
        }
    }
</style>
