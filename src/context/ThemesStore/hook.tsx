import { useContext } from 'react';
import { ThemeStoreContext } from './provider';
import { ThemeStoreContextType } from './types';

export const useThemeStore = (): ThemeStoreContextType => {
    const context = useContext(ThemeStoreContext);
    if (!context) {
        throw new Error('useThemeState must be used within an ThemeProvider');
    }
    return context;
};
