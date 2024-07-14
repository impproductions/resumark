export function useLocalStorage() {
    function updateLocalStorage<T>(data: T, key: string) {
        localStorage.setItem(key, JSON.stringify(data));
        console.debug('Updated localStorage:', key, data);
    }

    function getLocalStorage<T>(key: string): T | null {
        const data = localStorage.getItem(key);

        if (!data) {
            return null;
        }

        console.debug('Retrieved localStorage:', key, data);
        return JSON.parse(data);
    }

    return {
        updateLocalStorage,
        getLocalStorage,
    };
}
