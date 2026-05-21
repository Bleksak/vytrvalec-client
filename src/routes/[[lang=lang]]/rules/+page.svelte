<script lang="ts">
    import LL from '$translations/i18n-svelte';
</script>

<main>
    <article>
        <h2 class="no-transform">{$LL.rules.challenge_title()}</h2>
        <section>
            <p>{$LL.rules.intro.content1()}</p>
            <p>{$LL.rules.intro.content2()}</p>
            <p>{$LL.rules.intro.content3()}</p>
        </section>

        <section>
            <h4>{$LL.rules.disciplines.title()}</h4>
            <p>{$LL.rules.disciplines.description()}</p>
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
                <li>{$LL.rules.progress.content3()}</li>
                <li>{$LL.rules.progress.content4()}</li>
            </ul>
        </section>

        <section>
            <h4>{$LL.rules.target_activities.title()}</h4>
            <p><strong>{$LL.rules.target_activities.is_activity()}</strong></p>
            <ul class="list-style">
                <li>{$LL.rules.target_activities.activity1()}</li>
                <li>{$LL.rules.target_activities.activity2()}</li>
                <li>{$LL.rules.target_activities.activity3()}</li>
            </ul>
            <p><strong>{$LL.rules.target_activities.not_activity()}</strong></p>
            <ul>
                <li>{$LL.rules.target_activities.activity4()}</li>
            </ul>
        </section>

        <section>
            <h4>{$LL.rules.extra_points.title()}</h4>
            <p>{$LL.rules.extra_points.intro()}</p>
            <ul class="list-style">
                <li>
                    {$LL.rules.extra_points.third_week.title()}
                    <ul class="list-style">
                        <li>
                            +1 <strong>{$LL.rules.extra_points.extra_point().toUpperCase()}</strong>
                            {$LL.rules.extra_points.third_week.extra_one()}
                        </li>
                        <li>
                            +2 <strong>{$LL.rules.extra_points.extra_points().toUpperCase()}</strong
                            >
                            {$LL.rules.extra_points.third_week.extra_two()}
                        </li>
                    </ul>
                </li>
                <li>
                    {$LL.rules.extra_points.fourth_week.title()}
                    <ul class="list-style">
                        <li>
                            +1 <strong>{$LL.rules.extra_points.extra_point().toUpperCase()}</strong>
                            {$LL.rules.extra_points.fourth_week.extra_one()}
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
