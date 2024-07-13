// EditorProvider.tsx
import { useState, ReactNode, FC, createContext } from 'react';
import { EditorContextType } from './types';

export const EditorContext = createContext<EditorContextType | undefined>(
    undefined
);

export const EditorProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [config, setConfig] = useState<{ theme: 'light' | 'dark' }>({
        theme: 'light',
    });
    const [state, setState] = useState<{ currentView: 'content' | 'preview' }>({
        currentView: 'content',
    });

    const setTheme = (theme: 'light' | 'dark') => {
        setConfig({ ...config, theme });
        document
            .querySelector('html')!
            .setAttribute('data-theme', theme === 'light' ? 'default' : 'dark');
    };

    const setCurrentView = (view: 'content' | 'preview') => {
        setState({ ...state, currentView: view });
    };

    return (
        <EditorContext.Provider
            value={{ state, config, setTheme, setCurrentView }}
        >
            {children}
        </EditorContext.Provider>
    );
};
