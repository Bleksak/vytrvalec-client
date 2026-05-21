import { fetchCharities, removeCharity } from '$actions/Charity';
import type { CharityDTO } from '$lib/DTO/CharityDTO';

export type CharityStore = {
    get: (id: number) => CharityDTO | null;
    all: () => Array<CharityDTO>;
    updateOrCreate: (charity: CharityDTO) => void;
    promise: () => Promise<Array<CharityDTO>>;
    remove: (charity: CharityDTO) => Promise<boolean>;
};

export const createCharityStore = (): CharityStore => {
    let charities = $state<Array<CharityDTO>>([]);

    const charitiesPromise: Promise<Array<CharityDTO>> = fetchCharities();

    charitiesPromise.then((result) => {
        charities = result;
    });

    const get = (id: number): CharityDTO | null => {
        if (Number.isNaN(id)) {
            return null;
        }

        return charities.find((season) => season.id === id) ?? null;
    };

    const all = (): Array<CharityDTO> => {
        return charities;
    };

    const updateOrCreate = (charity: CharityDTO) => {
        const index = charities.findIndex((c) => c.id === charity.id);

        if (index !== -1) {
            charities[index] = charity;
        } else {
            charities.unshift(charity);
        }
    };

    const remove = async (charity: CharityDTO): Promise<boolean> => {
        const result = await removeCharity(charity);

        if (result) {
            charities = charities.filter((c) => c.id !== charity.id);
        }

        return result;
    };

    const promise = () => charitiesPromise;

    return {
        get: get,
        all: all,
        promise: promise,
        updateOrCreate: updateOrCreate,
        remove: remove,
    };
};

export default createCharityStore;
