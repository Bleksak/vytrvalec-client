<script lang="ts">
	import LL from '$translations/i18n-svelte';

	let { strength } : { strength: number } = $props();
</script>

<small class="strength-{strength}">
	{$LL.registration.password_strength_label[
		strength as unknown as keyof typeof $LL.registration.password_strength_label]()}
</small>

<style>
    small {
		color: white;
		font-weight: bold;
		border-radius: 10px;
		padding: 3px;
		display: flex;
		justify-content: center;
	}
	.strength-0 {
		width: fit-content;
		background-color: red
	}
	.strength-1 {
		width: 30%;
		background-color: orange
	}
	.strength-2 {
		width: 50%;
		background-color: greenyellow
	}
	.strength-3 {
		width: 70%;
		background-color: lime
	}
	.strength-4 {
		width: 90%;
		background-color: green
	}
	.strength-5 {
		width: 100%;
		background-color: turquoise;
	}
</style>
