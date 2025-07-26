import type { TranslationObject } from './TranslationObjectDTO';

export type ActivityDTO = {
	id: number;
	name: string;
	visible: boolean;
};

export type CreateActivityDTO = {
	name: TranslationObject;
	min_elevation: number;
};
