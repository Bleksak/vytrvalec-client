<script>
	import { page } from '$app/stores';
</script>

<footer>
	<div class="socials">
		<a href={import.meta.env.VITE_FACEBOOK_URL}>
			<img src="/images/facebook.svg" alt="Facebook" />
		</a>
		<a href={import.meta.env.VITE_INSTAGRAM_URL}>
			<img src="/images/instagram.svg" alt="Instagram" />
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
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		background-color: #005cab;
		align-items: center;
		color: white;
		padding: 30px 100px;
	}

	footer > .socials {
		display: flex;
		gap: 20px;
	}
	footer > .socials img {
		width: 40px;
	}

	footer span {
		font-size: 30px;
		font-weight: bold;
	}

	footer .special-links {
		display: flex;
		gap: 15px;
	}

	footer a {
		color: white;
		font-size: 24px;
	}
	footer a:hover {
		color: white;
	}
</style>
