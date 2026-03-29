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
    <button type="button" onclick={() => handleSubmit()}>{$LL.onboarding.goChallenge()}</button>
{/snippet}

{#snippet WelcomeStep()}
    <section>
        <h1>{$LL.rules.challengeTitle()}</h1>
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
                <p><strong>{$LL.rules.progress.recommendedApps()}</strong></p>
                <ul>
                    <li>{$LL.rules.progress['App/Garmin']()}</li>
                    <li>{$LL.rules.progress['App/Strava']()}</li>
                </ul>
            </div>
        </div>
        <div class="card-group">
            <div class="card">
                <strong>{$LL.rules.progress.scoring()}</strong>
                <p>{$LL.rules.progress.content2()}</p>
                <ul>
                    <li>{$LL.rules.progress.firstPlace()}</li>
                    <li>{$LL.rules.progress.secondPlace()}</li>
                    <li>{$LL.rules.progress.thirdPlace()}</li>
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
                <p><strong>{$LL.rules.target_activities.isActivity()}</strong></p>
                <ul>
                    <li>{$LL.rules.target_activities.activity1()}</li>
                    <li>{$LL.rules.target_activities.activity2()}</li>
                    <li>{$LL.rules.target_activities.activity3()}</li>
                </ul>
            </div>
            <div class="card">
                <p><strong>{$LL.rules.target_activities.notActivity()}</strong></p>
                <ul>
                    <li>{$LL.rules.target_activities.activity4()}</li>
                </ul>
            </div>
        </div>
    </section>
{/snippet}

{#snippet ExtraPointsStep()}
    <section>
        <h1>{$LL.rules.extraPoints.stepTitle()}</h1>
        <p>{$LL.rules.extraPoints.intro()}</p>
        <div class="card-group">
            <div class="card">
                <p><strong>{$LL.rules.extraPoints.thirdWeek.title()}</strong></p>
                <ul>
                    <li>
                        +1 <strong>{$LL.rules.extraPoints.extraPoint().toUpperCase()}</strong>
                        {$LL.rules.extraPoints.thirdWeek.extraOne()}
                    </li>
                    <li>
                        +2 <strong>{$LL.rules.extraPoints.extraPoints().toUpperCase()}</strong>
                        {$LL.rules.extraPoints.thirdWeek.extraTwo()}
                    </li>
                </ul>
            </div>
            <div class="card">
                <p><strong>{$LL.rules.extraPoints.fourthWeek.title()}</strong></p>
                <ul>
                    <li>
                        +1 <strong>{$LL.rules.extraPoints.extraPoint().toUpperCase()}</strong>
                        {$LL.rules.extraPoints.fourthWeek.extraOne()}
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
                    title: $LL.rules.intro.stepTitle(),
                    content: WelcomeStep,
                },
                {
                    title: $LL.rules.disciplines.stepTitle(),
                    content: DisciplinesStep,
                },
                {
                    title: $LL.rules.progress.stepTitle(),
                    content: HowToStep,
                },
                {
                    title: $LL.rules.target_activities.stepTitle(),
                    content: ActivityStep,
                },
                {
                    title: $LL.rules.extraPoints.stepTitle(),
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
