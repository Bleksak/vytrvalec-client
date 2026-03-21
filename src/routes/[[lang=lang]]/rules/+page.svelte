<script lang="ts">
    import LL from '$translations/i18n-svelte';
</script>

<main>
    <article>
        <h2 class="no-transform">{$LL.rules.challengeTitle()}</h2>
        <section>
            <p>{$LL.rules.intro.content1()}</p>
            <p>{$LL.rules.intro.content2()}</p>
        </section>

        <section>
            <h4>{$LL.rules.disciplines.title()}</h4>
            <ul class="list-style">
                <li>{$LL.activities['Běh/Chůze']()}</li>
                <li>{$LL.activities['Kolo/Koloběžka']()}</li>
            </ul>
        </section>

        <section>
            <h4>{$LL.rules.progress.title()}</h4>
            <ul class="list-style">
                <li>{$LL.rules.progress.content1()}</li>
                <li>{$LL.rules.progress.content2()}</li>
            </ul>
        </section>

        <section>
            <h4>{$LL.rules.target_activities.title()}</h4>
            <ul class="list-style">
                <li>{$LL.rules.target_activities.body()}</li>
                <li>{$LL.rules.target_activities.supplement()}</li>
            </ul>
        </section>

        <section>
            <h4>{$LL.rules.extraPoints.title()}</h4>
            <p>{$LL.rules.extraPoints.intro()}</p>
            <ul class="list-style">
                <li>
                    {$LL.rules.extraPoints.thirdWeek.title()}
                    <ul class="list-style">
                        <li>
                            1 <strong>{$LL.rules.extraPoints.extraPoint().toUpperCase()}</strong>
                            {$LL.rules.extraPoints.thirdWeek.extraOne()}
                        </li>
                        <li>
                            2 <strong>{$LL.rules.extraPoints.extraPoints().toUpperCase()}</strong>
                            {$LL.rules.extraPoints.thirdWeek.extraTwo()}
                        </li>
                    </ul>
                </li>
                <li>
                    {$LL.rules.extraPoints.fourthWeek.title()}
                    <ul class="list-style">
                        <li>
                            1 <strong>{$LL.rules.extraPoints.extraPoint().toUpperCase()}</strong>
                            {$LL.rules.extraPoints.fourthWeek.extraOne()}
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
    </article>
</main>

<style>
    main {
        max-width: 1640px;
        margin: 0 auto;
        width: 100%;
    }

    article {
        display: flex;
        flex-direction: column;
        padding: 50px 20px;
        gap: 30px;
    }
</style>
