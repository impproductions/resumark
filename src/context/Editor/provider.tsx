// EditorProvider.tsx
import { useState, ReactNode, FC, createContext, useEffect } from 'react';
import { EditorConfig, EditorContextType, EditorState } from './types';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const EditorContext = createContext<EditorContextType | undefined>(
    undefined
);

const DEFAULT_CONFIG: EditorConfig = {
    theme: 'light',
};

const DEFAULT_STATE: EditorState = {
    currentView: 'content',
};

export const EditorProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { updateLocalStorage, getLocalStorage } = useLocalStorage();
    const [config, setConfig] = useState<EditorConfig>(
        getLocalStorage('resumark.editor.config') || DEFAULT_CONFIG
    );
    const [state, setState] = useState<EditorState>(
        getLocalStorage('resumark.editor.state') || DEFAULT_STATE
    );

    const setTheme = (theme: 'light' | 'dark') => {
        setConfig({ ...config, theme });
    };

    const setCurrentView = (view: 'content' | 'preview') => {
        setState({ ...state, currentView: view });
    };

    useEffect(() => {
        updateLocalStorage(config, 'resumark.editor.config');
        updateLocalStorage(state, 'resumark.editor.state');
        document
            .querySelector('html')!
            .setAttribute(
                'data-theme',
                config.theme === 'light' ? 'default' : 'dark'
            );
    }, [config, state, updateLocalStorage]);

    return (
        <EditorContext.Provider
            value={{ state, config, setTheme, setCurrentView }}
        >
            {children}
        </EditorContext.Provider>
    );
};
