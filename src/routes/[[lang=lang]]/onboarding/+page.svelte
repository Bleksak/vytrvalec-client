<script lang="ts">
    import MultiStepForm from '$components/MultiStepForm.svelte';
    import { enhance } from '$app/forms';
    import type { SubmitFunction } from '@sveltejs/kit';
    import { goto } from '$app/navigation';

    const { data } = $props();

    let errors: Record<string, string> = $state({});

    const enhancer: SubmitFunction = async ({ submitter }) => {
        submitter?.setAttribute('disabled', 'disabled');
        return async ({ result }) => {
            if (result.type === 'failure') {
                errors = result.data as any;
                submitter?.removeAttribute('disabled');
            } else if (result.type === 'redirect') {
                await goto(result.location, { invalidateAll: true });
            }
        };
    };
</script>

{#snippet submit()}
    <button type="submit">Přejít na výzvu</button>
{/snippet}

{#snippet WelcomeStep()}
    <section>
        <h1>Pravidla výzvy</h1>
        <p class="important-content">Běhejte, choďte jezděte na kole, koloběžce, bruslích!</p>
        <p>Nejen, že uděláte něco pro svoje zdraví, ale přispějete na dobrou věc!</p>
        <div class="card-group">
            <div class="card">
                <span>
                    Kilometry, které soutěžící urazí se přemění na koruny a přispějeme tím na
                    charitu.
                </span>
            </div>
        </div>
        <small
            >Průběžný počet najetých a uběhnutých kilometrů fakult a mimofakultních pracovišť budeme
            vyhodnocovat po týdnu a každá fakulta či pracoviště mají možnost získat body do
            celkového hodnocení.</small
        >
    </section>
{/snippet}

{#snippet DisciplinesStep()}
    <section>
        <h1>Disciplíny</h1>
        <p>Soutěž probíhá ve dvou samostatných disciplínách:</p>
        <div class="card-group">
            <div class="card">
                <strong>Běh a chůze</strong>
                <br />
                <span>Zaznamenávejte své běhy a procházky</span>
            </div>
            <div class="card">
                <strong>Kolo, koloběžka a brusle</strong>
                <br />
                <span>Všechny kolové a kolečkové aktivity</span>
            </div>
        </div>
    </section>
{/snippet}

{#snippet HowToStep()}
    <section>
        <h1>Jak soutěžit?</h1>
        <p>
            Zaznamenávejte své cílené pohybové aktivity prostřednictvím mobilní aplikace a
            nahrávejte je na tento portál.
        </p>
        <div class="card-group">
            <div class="card">
                <p><strong>Doporučené aplikace:</strong></p>
                <ul>
                    <li>Garmin Connect</li>
                    <li>Strava</li>
                </ul>
            </div>
        </div>
        <div class="card-group">
            <div class="card">
                <strong>Bodování</strong>
                <p>Každý týden se vyhodnocuje počet uražených kilometrů v daných disciplínách.</p>
                <ul>
                    <li>1. místo: 15 bodů</li>
                    <li>2. místo: 14 bodů</li>
                    <li>3. místo: 13 bodů</li>
                    <li>atd.</li>
                </ul>
            </div>
        </div>
        <p>Celkovým vítězem se stane tým s nejvíce body za 4 týdny v součtu obou disciplín.</p>
    </section>
{/snippet}

{#snippet ActivityStep()}
    <section>
        <h1>Aktivity</h1>
        <div class="card-group">
            <div class="card">
                <p><strong>Co JE cílová aktivita:</strong></p>
                <ul>
                    <li>Jdu si zaběhat, zapnu si aktivitu a vypnu si aktivitu.</li>
                    <li>Jdu se projít, zapnu si aktivitu a vypnu si aktivitu.</li>
                    <li>Jedu na kole, zapnu si aktivitu a vypnu si aktivitu.</li>
                </ul>
            </div>
            <div class="card">
                <p><strong>Co NENÍ cílová aktivita:</strong></p>
                <ul>
                    <li>Součet nachozených kilometrů za den (např. z krokoměru).</li>
                </ul>
            </div>
        </div>
        <small
            >Pro zaznamenávání cílových aktivit využijte např. aplikaci Garmin Connect nebo Strava.</small
        >
    </section>
{/snippet}

{#snippet ExtraPointsStep()}
    <section>
        <h1>Extra body</h1>
        <p>Jednotlivci mohou pro svou fakultu získat extra body!</p>
        <div class="card-group">
            <div class="card">
                <p><strong>Třetí týden</strong></p>
                <ul>
                    <li>
                        +1 EXTRA BOD pro jednotlivce, který uběhne/ujde/ujede nejvíce kilometrů v
                        jednom dni v dané disciplíně.
                    </li>
                    <li>
                        +2 EXTRA BODY pro jednotlivce s největším součtem kilometrů za celý týden v
                        dané disciplíně
                    </li>
                </ul>
            </div>
            <div class="card">
                <p><strong>Čtvrtý týden</strong></p>
                <ul>
                    <li>
                        +1 EXTRA BOD pro jednotlivce s největším převýšením v jedné aktivitě v dané
                        disciplíně.
                    </li>
                </ul>
                <small>Podmínka: Chůze více než 1000m a jízda více než 1500m.</small>
            </div>
        </div>
    </section>
{/snippet}

<main>
    <article>
        <main>
            <section>
                <form method="post" use:enhance={enhancer} action="/"></form>
                <MultiStepForm
                    {submit}
                    steps={[
                        {
                            title: 'Vítejte',
                            content: WelcomeStep,
                        },
                        {
                            title: 'Disciplíny',
                            content: DisciplinesStep,
                        },
                        {
                            title: 'Soutěž',
                            content: HowToStep,
                        },
                        {
                            title: 'Aktivity',
                            content: ActivityStep,
                        },
                        {
                            title: 'Extra body',
                            content: ExtraPointsStep,
                        },
                    ]}
                />
            </section>
        </main>
    </article>
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
