<div class="past-winners">
	<div class="row">
		<h2>Uplynulé ročníky</h2>
	</div>
	<!-- TODO: Vymyslet jak udelat lazy loading jinak by to mohlo zatezovat server -->
	<div class="row carousel-controls">
		<h3>
			<span id="carousel-prev">&lt;</span>&nbsp;&nbsp;Říjen 2021&nbsp;&nbsp;<span id="carousel-next"
				>&gt;</span
			>
		</h3>
	</div>
	<div class="carousel-item">
		<div class="row">
			<article class="charity">
				<h3>CHARITY</h3>
				<h6>DAVID a&nbsp;GOLIÁŠ - Kubík</h6>
				<p>
					Kubík - kombinované postižení - 11 let. Kubík se v&nbsp;bříšku vyvíjel jako úplně zdravé
					miminko, ale při porodu se dost přidusil, což se projevilo na jeho mozečku. Diagnóza DMO.
				</p>
			</article>
			<div class="winners-wrapper">
				<div class="winners">
					<div class="winner">
						<span>Fakulta strojní</span>
						<div class="bar bar-medium"></div>
					</div>

					<div class="winner">
						<span>Fakulta aplikovanych ved</span>
						<div class="bar bar-large"></div>
					</div>

					<div class="winner">
						<span>Fakulta ekonomicka</span>
						<div class="bar bar-small"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.past-winners {
		width: 100%;
		background-color: #005cab;
		padding: 20px 0px;
	}
	.past-winners h2,
	.past-winners h3,
	.past-winners h4,
	.past-winners h5,
	.past-winners h6 {
		font-weight: bold;
		color: white;
	}
	.past-winners p {
		color: white;
	}

	.charity {
		width: 40%;
	}

	.winners-wrapper {
		width: 40%;
		height: 200px;
		display: flex;
		justify-content: center;
	}

	.winners {
		display: flex;
		justify-content: space-evenly;
		align-items: end;
	}
	.winners .bar {
		width: 80px;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		background-color: white;
	}
	.winners .bar::after {
		display: flex;
		justify-content: center;
		margin-top: 25px;
		font-weight: 500;
		color: #005cab;
		font-size: 1.5rem;
	}
	.winners .bar-medium {
		height: 130px;
	}
	.winners .bar-medium::after {
		content: '2';
	}
	.winners .bar-small {
		height: 100px;
	}
	.winners .bar-small::after {
		content: '3';
	}
	.winners .bar-large {
		height: 190px;
	}
	.winners .bar-large::after {
		content: '1';
	}
	.winners .winner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}
	.winners .winner span {
		color: white;
		font-weight: 500;
		font-size: 1.2rem;
	}
</style>
