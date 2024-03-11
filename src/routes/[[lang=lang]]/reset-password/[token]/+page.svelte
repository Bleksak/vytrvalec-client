<script lang="ts">
	import LL from '$translations/i18n-svelte';
	import NewPasswordForm from '$components/forms/NewPasswordForm.svelte';
</script>

<div class="reset-password">
	<header>
		<h3>{$LL.reset.title()}</h3>
	</header>

	<NewPasswordForm />
</div>

<style>	
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 40px;
	}
</style>
