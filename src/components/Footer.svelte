<script>
	import { page } from '$app/stores';
</script>

<footer>
	<div class="socials">
		<a class="icon" href={import.meta.env.VITE_FACEBOOK_URL}>
			<img class="icon" src="/images/facebook.svg" alt="Facebook" />
		</a>
		<a class="icon" href={import.meta.env.VITE_INSTAGRAM_URL}>
			<img class="icon" src="/images/instagram.svg" alt="Instagram" />
		</a>
	</div>
	<div class="about">
		<span>Katedra tělesné výchovy a sportu</span>
	</div>
	<div class="special-links">
		<a href="/{$page.data.lang}/cookies">Cookies</a>
	</div>
</footer>

<style>
	footer {
		display: flex;
		gap: 10px;
		justify-content: space-between;
		background-color: #005cab;
		align-items: center;
		color: white;
		padding: 30px 100px;
	}

	footer span {
		font-size: 1.6rem;
		font-weight: bold;
	}

	a {
		color: white;
		font-size: 1.5rem;
	}

	.about {
		flex: 1;
		display: flex;
		justify-content: center;
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
		margin-right: 35px;
	}

	@media (max-width: 1200px) {
		footer {
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
