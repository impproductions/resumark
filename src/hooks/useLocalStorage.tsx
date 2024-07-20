export function useLocalStorage() {
    function updateLocalStorage<T>(data: T, key: string) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    function getLocalStorage<T>(key: string): T | null {
        const data = localStorage.getItem(key);

        if (!data) {
            return null;
        }

        return JSON.parse(data);
    }

    return {
        updateLocalStorage,
        getLocalStorage,
    };
}
