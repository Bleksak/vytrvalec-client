<script lang="ts">
    import MultiStepForm from '$components/MultiStepForm.svelte';
    import Dialog from '$components/Dialog.svelte';
    import LL from '$translations/i18n-svelte';
    import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
    import { ONBOARDING_COOKIE_NAME, type OnboardingDTO } from '$lib/DTO/OnboardingDTO';
    import { setCookie } from '$utils/cookies';
    let dialog = $state<Dialog>();

    const { currentSeason }: { currentSeason: SeasonDTO | null } = $props();

    function setOnboardingCookie(onboarding: OnboardingDTO) {
        const value = JSON.stringify({
            status: onboarding.status,
            season: onboarding.season
        });

        setCookie(ONBOARDING_COOKIE_NAME, value, 3652);
    }

    function handleSubmit() {
        setOnboardingCookie({status: "completed", season: currentSeason?.id});
        dialog?.close();
    }

    function handleClose() {
        setOnboardingCookie({status: "completed", season: currentSeason?.id});
    }
</script>

{#snippet submit()}
    <button type="button" onclick={() => handleSubmit()}>{$LL.onboarding.go_to_challenge()}</button>
{/snippet}

{#snippet WelcomeStep()}
    <section>
        <h1>{$LL.rules.challenge_title()}</h1>
        <p class="important-content">{$LL.rules.intro.content1()}</p>
        <div class="card-group">
            <div class="card">
                <span>
                    {$LL.rules.intro.content2()}
                </span>
            </div>
        </div>
        <small>{$LL.rules.intro.content3()}</small>
    </section>
{/snippet}

{#snippet DisciplinesStep()}
    <section>
        <h1>{$LL.rules.disciplines.title()}</h1>
        <p>{$LL.rules.disciplines.description()}</p>
        <div class="card-group">
            <div class="card">
                <ul>
                    <li>{$LL.activities['Běh/Chůze']()}</li>
                    <li>{$LL.activities['Kolo/Koloběžka']()}</li>
                </ul>
            </div>
        </div>
    </section>
{/snippet}

{#snippet HowToStep()}
    <section>
        <h1>{$LL.rules.progress.title()}</h1>
        <p>{$LL.rules.progress.content1()}</p>
        <div class="card-group">
            <div class="card">
                <p><strong>{$LL.rules.progress.recommended_apps()}</strong></p>
                <ul>
                    <li>Garmin Connect</li>
                    <li>Strava</li>
                </ul>
            </div>
        </div>
        <div class="card-group">
            <div class="card">
                <strong>{$LL.rules.progress.scoring()}</strong>
                <p>{$LL.rules.progress.content2()}</p>
                <ul>
                    <li>{$LL.rules.progress.first_place()}</li>
                    <li>{$LL.rules.progress.second_place()}</li>
                    <li>{$LL.rules.progress.third_place()}</li>
                    <li>...</li>
                </ul>
            </div>
        </div>
        <p>{$LL.rules.progress.content4()}</p>
    </section>
{/snippet}

{#snippet ActivityStep()}
    <section>
        <h1>{$LL.rules.target_activities.title()}</h1>
        <div class="card-group">
            <div class="card">
                <p><strong>{$LL.rules.target_activities.is_activity()}</strong></p>
                <ul>
                    <li>{$LL.rules.target_activities.activity1()}</li>
                    <li>{$LL.rules.target_activities.activity2()}</li>
                    <li>{$LL.rules.target_activities.activity3()}</li>
                </ul>
            </div>
            <div class="card">
                <p><strong>{$LL.rules.target_activities.not_activity()}</strong></p>
                <ul>
                    <li>{$LL.rules.target_activities.activity4()}</li>
                </ul>
            </div>
        </div>
    </section>
{/snippet}

{#snippet ExtraPointsStep()}
    <section>
        <h1>{$LL.rules.extra_points.step_title()}</h1>
        <p>{$LL.rules.extra_points.intro()}</p>
        <div class="card-group">
            <div class="card">
                <p><strong>{$LL.rules.extra_points.third_week.title()}</strong></p>
                <ul>
                    <li>
                        +1 <strong>{$LL.rules.extra_points.extra_points().toUpperCase()}</strong>
                        {$LL.rules.extra_points.third_week.extra_one()}
                    </li>
                    <li>
                        +2 <strong>{$LL.rules.extra_points.extra_points().toUpperCase()}</strong>
                        {$LL.rules.extra_points.third_week.extra_two()}
                    </li>
                </ul>
            </div>
            <div class="card">
                <p><strong>{$LL.rules.extra_points.fourth_week.title()}</strong></p>
                <ul>
                    <li>
                        +1 <strong>{$LL.rules.extra_points.extra_point().toUpperCase()}</strong>
                        {$LL.rules.extra_points.fourth_week.extra_one()}
                    </li>
                </ul>
            </div>
        </div>
    </section>
{/snippet}

<main>
    <Dialog bind:this={dialog} header={$LL.rules.title()} onclose={() => handleClose()}>
        <MultiStepForm
            {submit}
            steps={[
                {
                    title: $LL.rules.intro.step_title(),
                    content: WelcomeStep,
                },
                {
                    title: $LL.rules.disciplines.step_title(),
                    content: DisciplinesStep,
                },
                {
                    title: $LL.rules.progress.step_title(),
                    content: HowToStep,
                },
                {
                    title: $LL.rules.target_activities.step_title(),
                    content: ActivityStep,
                },
                {
                    title: $LL.rules.extra_points.step_title(),
                    content: ExtraPointsStep,
                },
            ]}
        />
    </Dialog>
</main>

<style>
    .card-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        gap: 1rem;
    }

    .card-group .card {
        border: 1px solid #005bab38;
        padding: 1rem;
        border-radius: 8px;
        background-color: #005cab1a;
    }

    ul {
        margin: 0;
    }
</style>
