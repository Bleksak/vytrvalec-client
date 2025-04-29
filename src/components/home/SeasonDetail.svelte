<script lang="ts">
	import type { CharityDTO } from '$lib/DTO/CharityDTO';
	import type { FacultyDTO } from '$lib/DTO/FacultyDTO';
	import type { SeasonResult } from '$lib/DTO/SeasonResultDTO';
	import Store from '$lib/enums/Stores';
	import type { FacultyStore } from '$lib/stores/FacultyStore.svelte';
	import { FacultyColorMap } from '$utils/colors';
	import { Trophy, Medal, ExternalLink, ImageIcon, Coins, CalendarRangeIcon } from '@lucide/svelte';
	import { getContext } from 'svelte';
	import LL from '$translations/i18n-svelte';
	import type { FullSeasonDTO, SeasonDTO } from '$lib/DTO/SeasonDTO';

	const facultyStore: FacultyStore = getContext(Store.FACULTY_STORE);

	type Result = {
		faculty: FacultyDTO;
		points: number;
		distance: number;
	};

	const {
		season,
		result,
		charity
	}: {
		season: SeasonDTO | FullSeasonDTO;
		result: SeasonResult;
		charity: CharityDTO;
	} = $props();

	const winners: Array<Result> = $derived(
		result
			.getTotalWinners()
			.slice(0, 3)
			.map((value) => {
				return {
					faculty: facultyStore.get(value.faculty)!,
					points: value.points,
					distance: value.distance
				};
			})
	);

	const positionText = (position: number): keyof typeof $LL.season_detail.ordinal =>
		(['first', 'second', 'third'] as Array<keyof typeof $LL.season_detail.ordinal>)[position];
</script>

<div class="season-details-container">
	<div class="season-card">
		<div class="season-card-header">
			<div class="season-header-content">
				<div>
					<h2 class="season-title">{$LL.season_detail.title()}</h2>
					<div class="season-date">
						<CalendarRangeIcon class="season-date-icon" />
						{$LL.season_detail.date_range({ start: season.start, end: season.end })}
					</div>
				</div>
				<div class="season-winners">
					{#each winners as winner, index (winner.faculty)}
						<div
							style:background-color={FacultyColorMap[
								winner.faculty.shortcut as keyof typeof FacultyColorMap
							]}
							class="winner-badge"
						>
							{#if index === 0}
								<Trophy />
							{:else}
								<Medal />
							{/if}
							{$LL.season_detail.ordinal[positionText(index)]({ name: winner.faculty.shortcut })}
						</div>
					{/each}
				</div>
			</div>
		</div>
		<hr class="season-separator" />
		<div class="season-card-content">
			<div class="charity-grid {!charity.image ? 'charity-grid-no-image' : ''}">
				{#if charity.image}
					<div class="charity-image-container">
						<img
							src={charity.image || '/placeholder.svg'}
							alt={charity.name}
							class="charity-image"
						/>
					</div>
				{:else}
					<div class="charity-charity-image-container">
						<div class="charity-placeholder-content">
							<ImageIcon size={48} class="charity-placeholder-icon" />
							<span class="charity-placeholder-text">{$LL.season_detail.no_image()}</span>
						</div>
					</div>
				{/if}
				<div class="charity-details">
					<div class="article">
						<h3 class="charity-name">{charity.name}</h3>
						{#if charity.description}
							<p class="charity-description">{charity.description}</p>
						{:else}
							<p class="charity-description-fallback"></p>
						{/if}
						{#if charity.website}
							<div>
								<a
									href={charity.website}
									target="_blank"
									rel="noopener noreferrer"
									class="charity-link-button"
								>
									<ExternalLink class="charity-link-icon" />
									{$LL.season_detail.visit_charity()}
								</a>
							</div>
						{/if}
					</div>
					<div class="money-collected">
						<div class="money-icon-container">
							<Coins size="1rem" />
						</div>
						<span class="money-text">
							{$LL.season_detail.raised({ raised: result.getTotalDistance() })}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.season-details-container {
		width: 100%;
		padding-top: 1rem;
		padding-bottom: 1rem;
	}

	.season-card {
		border: none;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		position: relative;
		background-color: white;
		border-radius: 0.5rem;
	}

	.season-card-header {
		padding: 1.5rem 1.5rem 0.5rem 1.5rem;
		background-image: linear-gradient(to right, rgba(0, 92, 171, 0.1), transparent);
	}

	.season-header-content {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.season-title {
		font-size: 1.5rem;
		font-weight: 600;
		color: #005cab;
		margin: 0;
	}

	.season-date {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.5rem;
		color: #6b7280;
		font-size: 0.875rem;
	}

	.season-winners {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.winner-badge {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.25rem 0.5rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 500;
		color: white;
	}

	.season-separator {
		height: 1px;
		background-color: rgba(0, 92, 171, 0.2);
		margin: 0;
		border: none;
	}

	.season-card-content {
		padding: 1.5rem;
	}

	.charity-grid {
		display: grid;
		gap: 1.5rem;
		align-items: center;
	}

	.charity-grid-no-image {
		grid-template-columns: 1fr;
	}

	.charity-image-container {
		position: relative;
		height: 14rem;
		border-radius: 0.375rem;
		overflow: hidden;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(0, 92, 171, 0.2);
	}

	.charity-image {
		object-fit: contain;
		width: 100%;
		height: 100%;
	}

	.charity-placeholder-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	:global(.charity-placeholder-icon) {
		color: #9ca3af;
		margin-bottom: 0.5rem;
	}

	.charity-placeholder-text {
		color: #6b7280;
		font-size: 0.875rem;
	}

	.charity-details {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: space-between;
	}

	.charity-name {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: #005cab;
	}

	.money-collected {
		display: flex;
		align-items: center;
		background-color: rgba(0, 92, 171, 0.1);
		padding: 0.5rem;
		border-radius: 0.375rem;
	}

	.money-icon-container {
		margin-right: 0.5rem;
		background-color: #005cab;
		color: white;
		padding: 0.25rem;
		border-radius: 9999px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.money-text {
		font-weight: 500;
		color: #005cab;
	}

	.charity-description {
		color: #6b7280;
		margin-bottom: 1rem;
	}

	.charity-description-fallback {
		color: #6b7280;
		font-style: italic;
		margin-bottom: 1rem;
	}

	.charity-link-button {
		display: inline-flex;
		gap: 8px;
		align-items: center;
		padding: 0.5rem 1rem;
		background-color: transparent;
		color: #005cab;
		border: 1px solid #005cab;
		border-radius: 0.375rem;
		font-weight: 500;
		cursor: pointer;
		text-decoration: none;
		transition:
			background-color 0.2s,
			color 0.2s;
	}

	.charity-link-button:hover {
		background-color: #005cab;
		color: white;
	}

	/* Responsive styles */
	@media (min-width: 640px) {
		.season-header-content {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}

		.season-title {
			font-size: 1.5rem;
		}
	}

	@media (min-width: 768px) {
		.charity-grid {
			grid-template-columns: 1fr 2fr;
		}

		.charity-image-container {
			height: 16rem;
		}
	}
</style>
