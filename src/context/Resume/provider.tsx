// ResumeProvider.tsx
import { useState, ReactNode, FC, createContext } from 'react';
import { ResumeContextType, ResumeData, ThemeData } from './types';
import { useThemeStore } from '../ThemesStore/hook';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import placeholderResume from '../../assets/placeholder-resume.md?raw';

export const ResumeContext = createContext<ResumeContextType | undefined>(
    undefined
);

const DEFAULT_RESUME_DATA: ResumeData = {
    content: placeholderResume,
    theme: {
        id: 'default',
        name: 'Default',
        css: '',
    },
};

export const ResumeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { getThemeByName } = useThemeStore();
    const { getLocalStorage, updateLocalStorage } = useLocalStorage();

    const defaultTheme = getThemeByName('default') || DEFAULT_RESUME_DATA.theme;

    const [data, setData] = useState<ResumeData>(
        getLocalStorage('resumark.state.resume.data') || {
            ...DEFAULT_RESUME_DATA,
            theme: {
                css: defaultTheme.css,
                id: defaultTheme.id,
                name: defaultTheme.name,
            },
        }
    );

    const setDataWrapper = (newData: ResumeData) => {
        setData(newData);
        updateLocalStorage(newData, 'resumark.state.resume.data');
    };

    const setContent = (content: string) => {
        setDataWrapper({
            ...data,
            content,
        });
    };

    const setTheme = (theme: ThemeData) => {
        setDataWrapper({
            ...data,
            theme,
        });
    };

    const content = data.content;
    const theme = data.theme;

    return (
        <ResumeContext.Provider
            value={{
                content,
                theme,
                setContent,
                setTheme,
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
};
