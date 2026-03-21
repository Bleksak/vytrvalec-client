<script lang="ts">
    import LL from '$translations/i18n-svelte';

    let { strength }: { strength: number } = $props();
</script>

<div class="strength-bar">
    <div class="fill strength-{strength}">
        <span>
            {$LL.registration.password_strength_label[
                strength as unknown as keyof typeof $LL.registration.password_strength_label
            ]()}
        </span>
    </div>
</div>

<style>
    .strength-bar {
        position: relative;
        width: 100%;
        max-width: 500px;
        height: 1.2rem;
        background: #202632;
        border-radius: 9999px;
        overflow: hidden;
        font-weight: 600;
    }

    .fill {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: inherit;
        color: #fff;
        transition:
            width 0.3s ease,
            background-color 0.3s ease;
        font-size: 0.9rem;
    }
    .strength-0 {
        width: 25%;
        background: #d32f2f;
    }
    .strength-1 {
        width: 40%;
        background: #f57c00;
    }
    .strength-2 {
        width: 55%;
        background: #fbc02d;
        color: #222;
    }
    .strength-3 {
        width: 70%;
        background: #8bc34a;
    }
    .strength-4 {
        width: 85%;
        background: #388e3c;
    }
    .strength-5 {
        width: 100%;
        background: linear-gradient(90deg, #2e7d32, #26c6da);
    }
</style>
