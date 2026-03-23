<script lang="ts">
    import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
    import { LL } from '$translations/i18n-svelte';
    import { Clock } from '@lucide/svelte';
    import { onMount } from 'svelte';

    const { season }: { season: SeasonDTO } = $props();

    let now = $state(Date.now());

    onMount(() => {
        const interval = setInterval(() => {
            now = Date.now();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });

    const diff = $derived(new Date(season.end).getTime() - now);

    const timer = $derived(() => {
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

        const seconds = (Math.floor(diff / 1000) % 60).toString().padStart(2, '0');
        const minutes = (Math.floor(diff / (1000 * 60)) % 60).toString().padStart(2, '0');
        const hours = (Math.floor(diff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
            .toString()
            .padStart(2, '0');

        return { days, hours, minutes, seconds };
    });
</script>

<div class="timer">
    <div class="title">
        <div class="icon-container">
            <Clock size="1rem" />
        </div>
        {$LL.season_timer.title()}
    </div>
    <main class="cards">
        <div class="card">
            <div class="card-content">
                <strong>{timer().days}</strong> <small>{$LL.season_timer.day()}</small>
            </div>
        </div>
        <div class="card">
            <div class="card-content">
                <strong>{timer().hours}</strong> <small>{$LL.season_timer.hour()}</small>
            </div>
        </div>
        <div class="card">
            <div class="card-content">
                <strong>{timer().minutes}</strong> <small>{$LL.season_timer.minute()}</small>
            </div>
        </div>
        <div class="card">
            <div class="card-content">
                <strong>{timer().seconds}</strong> <small>{$LL.season_timer.second()}</small>
            </div>
        </div>
    </main>
</div>

<style lang="scss">
    @use '@picocss/pico/scss/colors' as colors;

    .timer {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;

        .title {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .cards {
            display: flex;
            gap: 0.8rem;

            .card {
                display: flex;
                gap: 0.8rem;
                align-items: center;
                text-transform: uppercase;
                border-radius: 0.25rem;

                .card-content {
                    display: flex;
                    flex-direction: column;
                }

                strong {
                    font-size: 1.5rem;
                }

                small {
                    color: #4c5664;
                }
            }

            .card:not(:last-child)::after {
                content: ':';
            }
        }
    }
</style>
