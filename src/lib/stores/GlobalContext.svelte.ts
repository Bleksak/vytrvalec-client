let globalContext = $state<Map<string, any>>(new Map());

export const setGlobalContext = <T>(key: string, value: T) => {
	globalContext.set(key, value);
};

export const getGlobalContext = <T>(key: string): T | undefined => {
	return globalContext.get(key) as T;
};
