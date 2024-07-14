export interface ThemeDefinition {
    id: string;
    name: string;
    css: string;
    tags: string[];
    lastUpdated: string;
    lastSeen: string;
    hash: number;
}

export interface ThemeCreationPayload {
    name: string;
    css: string;
}

export interface ThemeStore {
    themes: ThemeDefinition[];
}

export interface ThemeStoreContextType {
    store: ThemeStore;
    availableThemes: string[];
    addTheme: (theme: ThemeCreationPayload) => void;
    removeTheme: (themeId: string) => void;
    updateTheme: (theme: ThemeDefinition) => void;
    updateThemeName: (themeId: string, newName: string) => void;
    updateThemeContent: (themeId: string, newContent: string) => void;
    getThemeByName: (themeName: string) => ThemeDefinition | undefined;
    getThemeById: (themeId: string) => ThemeDefinition | undefined;
}