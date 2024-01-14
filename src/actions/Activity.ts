import type { ActivityDTO } from '$lib/DTO/ActivityDTO';
import axios from 'axios';

export const fetchActivities = async (): Promise<Array<ActivityDTO>> => {
	return (await axios.get('/activity').catch(() => null))?.data ?? [];
};
