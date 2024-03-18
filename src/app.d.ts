import type { UserResponse } from '$lib/DTO/UserResponse';

declare global {
	declare namespace App {
		interface Locals {
			jwt: string?;
			user: UserResponse;
			currentSeason: SeasonDTO;
		}
	}

	declare interface String {
		removeAccents(): string;
	}

	declare namespace svelteHTML {
		interface HTMLAttributes<T> {
			'on:outsideclick'?: (e: CustomEvent) => void;
		}
	}
}

String.prototype.removeAccents = function () {
	return this.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export {};
