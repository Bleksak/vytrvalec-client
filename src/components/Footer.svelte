<script lang="ts">
	import { LL } from '$translations/i18n-svelte';
</script>

<footer>
	<div class="footer-wrapper">
		<div class="socials">
			<a class="icon" href={import.meta.env.VITE_FACEBOOK_URL}>
				<img class="icon" src="/images/icons/facebook.svg" alt="Facebook" title="Facebook" />
			</a>
			<a class="icon" href={import.meta.env.VITE_INSTAGRAM_URL}>
				<img class="icon" src="/images/icons/instagram.svg" alt="Instagram" title="Instagram" />
			</a>
			<a class="icon" href={import.meta.env.VITE_WEB_URL}>
				<img class="icon" src="/images/icons/web.svg" alt="Web" title="Web" />
			</a>
			<a class="icon" href={import.meta.env.VITE_DISCORD_URL}>
				<img class="icon" src="/images/icons/discord.svg" alt="Discord" title="Discord" />
			</a>
		</div>
		<div class="about">
			<a href={import.meta.env.VITE_WEB_URL} class="uts">
				<strong>Ústav tělesné výchovy a sportu ZČU</strong>
			</a>
			<span>{$LL.footer.contact()}</span>
		</div>
		<div class="special-links">
			{$LL.footer.managed_by()}:&nbsp;Jiří Velek, Alena Kašparová
		</div>
	</div>
</footer>

<style>
	footer {
		background-color: #005cab;
		color: white;
		padding: 30px 0;
	}

	.footer-wrapper {
		display: flex;
		gap: 10px;
		justify-content: space-between;
		align-items: center;
		max-width: 1600px;
		margin: 0 auto;
		width: 100%;
	}

	.uts {
		color: white;
		font-size: 1.5rem;
	}

	.about {
		flex: 1;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.socials {
		flex: 1;
		gap: 10px;

		align-items: center;
		display: flex;
		justify-content: flex-start;
	}

	.special-links {
		flex: 1;
		display: flex;
		justify-content: flex-end;
	}

	@media (max-width: 1200px) {
		.footer-wrapper {
			flex-direction: column;
			padding: 10px 30px;
		}

		.socials {
			flex-direction: column;
			min-width: 200px;
		}

		.special-links {
			flex-direction: column;
			margin: 0;
		}

		.about {
			display: none;
			align-items: center;
		}
	}
</style>
