import { useState, ReactNode, FC, createContext, useEffect } from 'react';
import {
    ThemeStoreContextType,
    ThemeDefinition,
    ThemeStore,
    ThemeCreationPayload,
} from './types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { defaultThemes } from './deafultThemes.ts';
import dayjs from 'dayjs';
import uuid from 'uuid4';
import { hash } from '../../lib/crypto.ts';

export const ThemeStoreContext = createContext<
    ThemeStoreContextType | undefined
>(undefined);

// FIXME: move alerts outside of the provider and
// just throw an error if something goes wrong

export const ThemeStoreProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    // TODO: indexedDB or remote storage
    const { updateLocalStorage, getLocalStorage } = useLocalStorage();

    const [store, setStore] = useState<ThemeStore>(
        getLocalStorage('resumark.themes.store') || {
            themes: [],
        }
    );

    useEffect(() => {
        updateLocalStorage(store, 'resumark.themes.store');
    }, [store, updateLocalStorage]);

    const storeWithDefaults = {
        ...store,
        themes: [...defaultThemes, ...store.themes],
    };

    const addTheme = (theme: ThemeCreationPayload) => {
        if (storeWithDefaults.themes.find((t) => t.name === theme.name)) {
            alert('Theme with this name already exists');
            return null; // FIXME
        }

        const newTheme: ThemeDefinition = {
            id: uuid(),
            name: theme.name,
            css: theme.css,
            tags: [],
            lastUpdated: dayjs().toISOString(),
            lastSeen: dayjs().toISOString(),
            hash: hash(theme.css + theme.name),
        };

        setStore({
            themes: [...store.themes, newTheme],
        });

        return newTheme.id;
    };

    const removeTheme = (themeId: string) => {
        if (defaultThemes.find((t) => t.id === themeId)) {
            alert('Cannot remove default themes');
            return;
        }
        if (!store.themes.find((t) => t.id === themeId)) {
            alert('Theme with this name does not exist');
            return;
        }
        setStore({
            themes: store.themes.filter((t) => t.id !== themeId),
        });
    };

    const updateTheme = (theme: ThemeDefinition) => {
        if (defaultThemes.find((t) => t.name === theme.name)) {
            alert('Cannot update default themes');
            return;
        }
        if (!store.themes.find((t) => t.name === theme.name)) {
            alert('Theme with this name does not exist');
            return;
        }

        theme.lastUpdated = dayjs().toISOString();
        theme.hash = hash(theme.css + theme.name);

        setStore({
            themes: store.themes.map((t) =>
                t.name === theme.name ? theme : t
            ),
        });
    };

    const updateThemeName = (themeId: string, newName: string) => {
        if (defaultThemes.find((t) => t.name === newName)) {
            alert('Cannot update default themes');
            return;
        }
        if (!store.themes.find((t) => t.id === themeId)) {
            alert('Theme with this id does not exist');
            return;
        }
        if (store.themes.find((t) => t.name === newName)) {
            alert('Theme with this name already exists');
            return;
        }

        const currentTheme = getThemeById(themeId)!;

        const hashValue = hash(currentTheme.css + newName);
        const lastUpdated = dayjs().toISOString();

        setStore({
            themes: store.themes.map((t) =>
                t.id === themeId
                    ? {
                          ...t,
                          hash: hashValue,
                          lastUpdated,
                      }
                    : t
            ),
        });
    };

    const updateThemeContent = (themeId: string, newContent: string) => {
        if (defaultThemes.find((t) => t.id === themeId)) {
            alert('Cannot update default themes');
            return;
        }
        if (!store.themes.find((t) => t.id === themeId)) {
            alert('Theme with this id does not exist');
            return;
        }

        const currentTheme = getThemeById(themeId)!;

        const hashValue = hash(newContent + currentTheme.name);
        const lastUpdated = dayjs().toISOString();

        setStore({
            themes: store.themes.map((t) =>
                t.id === themeId
                    ? {
                          ...t,
                          css: newContent,
                          hash: hashValue,
                          lastUpdated,
                      }
                    : t
            ),
        });
    };

    const getThemeByName = (themeName: string) => {
        return storeWithDefaults.themes.find(
            (t) => t.name.toLowerCase() === themeName.toLowerCase()
        );
    };

    const getThemeById = (themeId: string) => {
        return storeWithDefaults.themes.find((t) => t.id === themeId);
    };

    return (
        <ThemeStoreContext.Provider
            value={{
                store: storeWithDefaults,
                availableThemes: storeWithDefaults.themes.map(
                    (theme) => theme.name
                ),
                addTheme,
                removeTheme,
                updateTheme,
                updateThemeName,
                updateThemeContent,
                getThemeByName,
                getThemeById,
            }}
        >
            {children}
        </ThemeStoreContext.Provider>
    );
};
