<script lang="ts">
	import { LL } from '$translations/i18n-svelte';
</script>

<footer class="container">
	<article>
		<p>
			Měsíční vytrvalec · oficiální stránka akce<br />
			<a href="mailto:{import.meta.env.VITE_CONTACT_EMAIL}">{import.meta.env.VITE_CONTACT_EMAIL}</a>
		</p>

		<nav>
			<ul>
				<li>
					<a href={import.meta.env.VITE_WEB_URL}>{$LL.faculties.UTS()}</a>
				</li>
				<li>
					<a href={import.meta.env.VITE_ZCU_WEB_URL}>Západočeská univerzita</a>
				</li>
			</ul>
		</nav>

		<p>
			<a target="_blank" href={import.meta.env.VITE_FACEBOOK_URL}>
				<img
					src="/images/icons/facebook.svg"
					alt="Facebook"
					title="Facebook"
					width="24"
					height="24"
				/>
			</a>
			<a target="_blank" href={import.meta.env.VITE_INSTAGRAM_URL}>
				<img
					src="/images/icons/instagram.svg"
					alt="Instagram"
					title="Instagram"
					width="24"
					height="24"
				/>
			</a>
			<a target="_blank" href={import.meta.env.VITE_WEB_URL}>
				<img src="/images/icons/web.svg" alt="Web" title="Web" width="24" height="24" />
			</a>
			<a target="_blank" href={import.meta.env.VITE_DISCORD_URL}>
				<img src="/images/icons/discord.svg" alt="Discord" title="Discord" width="24" height="24" />
			</a>
		</p>

		<footer>
			<small>
				© Západočeská univerzita v Plzni 2020–2025 · {$LL.footer.managed_by()}: Jiří Velek, Alena Kašparová
			</small>
		</footer>
	</article>
</footer>
