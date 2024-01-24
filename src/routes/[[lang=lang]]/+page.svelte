<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button.svelte';
	import PastWinners from '$components/home/PastWinners.svelte';
	import Stats from '$components/home/Stats.svelte';
</script>

<header>
	<img src="/images/cyclist2.png" alt="Cyclist" />
	<article>
		<section class="header">
			<h1>Měsíční vytrvalec</h1>
		</section>
		<section class="content">
			<p>
				Akce měsíční vytrvalec vznikla během zimního semestru v&nbsp;roce 2020. Tuto pohybovou
				soutěž připravila a&nbsp;zorganizovala Katedra tělesné výchovy Fakulty strojní Západočeské
				univerzity v&nbsp;Plzni s&nbsp;úmyslem rozhýbat studenty během distanční výuky, která
				probíhala na&nbsp;ZČU během koronavirové pandemie.
			</p>
		</section>
		<section class="buttons">
			<a href="/{$page.data.lang}/rules"><Button class="squared secondary">PRAVIDLA</Button></a>
			<a href="/{$page.data.lang}/results"><Button class="squared">VÝSLEDKY</Button></a>
		</section>
	</article>
</header>

<main>
	<div class="about">
		<div class="left">
			<img src="/images/runner.png" alt="Runner" />
		</div>
		<article>
			<h2>O VÝZVĚ</h2>
			<section class="content">
				<p>
					Účastníci bojují čtyři týdny za&nbsp;svoje týmy (fakulta, VŠ ústav / rektorátní pracoviště
					/ U3V) v&nbsp;počtu naběhaných a&nbsp;naježděných kilometrů. Ty se v&nbsp;rámci týmů
					sčítají a&nbsp;v&nbsp;závěru týdne určují počet bodů, které daný tým získá a&nbsp;podle
					toho se umístí v&nbsp; celkovém pořadí.
				</p>
			</section>
		</article>
	</div>

	<Stats />
	<PastWinners />
</main>

<style>
	header {
		display: flex;
		width: 100%;
		position: relative;
	}

	header > img {
		width: 100%;
	}

	header > article {
		display: flex;
		flex-direction: column;
		position: absolute;
		bottom: 100px;
		left: 100px;
		width: 800px;
	}

	header > article > section.header {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 15px 50px;
		align-self: self-start;
		background-color: #005cab;
	}

	header > article > section.header > h1 {
		white-space: nowrap;
		color: white;
	}

	article > section.content {
		max-width: 800px;
		width: 100%;
		padding: 15px 30px;
		background-color: white;
	}

	header > article > section.buttons {
		align-self: flex-end;
		display: flex;
	}

	.about {
		display: flex;
	}

	main > .about > .left {
		flex: 10;
	}

	main > .about > .left > img {
		height: 100%;
	}

	main > .about > article {
		flex: 9;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 10px;
		gap: 10px;
	}

	main > .stats {
		padding: 50px 0;
	}

	@media (max-width: 1000px) {
		header {
			position: static;
		}

		header img {
			display: none;
		}

		header article {
			width: 100%;
			position: static;
		}

		header article section.header {
			width: 100%;
		}

		header article section.content {
			align-self: center;
		}

		header article section.buttons {
			display: none;
		}

		.about .left {
			display: none;
		}
	}
</style>
