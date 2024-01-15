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
		justify-content: center;
		justify-items: center;
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
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.special-links {
		flex: 1;
		display: flex;
		justify-content: center;
	}

	@media (max-width: 1000px) {
		footer {
			flex-direction: column;
		}

		.socials {
			flex-direction: column;
		}

		.special-links {
			flex-direction: column;
		}

		.about {
			display: none;
		}
	}
</style>
