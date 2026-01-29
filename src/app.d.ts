import type { UserResponse } from '$lib/DTO/UserResponse';
import type { AxiosInstance } from 'axios';

declare global {
	declare namespace App {
		interface Locals {
			axios: AxiosInstance;
			jwt?: string|null;
			user?: UserResponse;
			currentSeason: SeasonDTO | null;
		}

		interface Error {
			message?: string;
			errors?: Record<string, string>;
		}
	}

	declare interface String {
		removeAccents(): string;
	}
}

String.prototype.removeAccents = function () {
	return this.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export {};
