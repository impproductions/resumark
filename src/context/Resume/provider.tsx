// ResumeProvider.tsx
import { useState, ReactNode, FC, createContext } from 'react';
import { ResumeContextType, ResumeData, ThemeData } from './types';
import { useThemeStore } from '../ThemesStore/hook';

export const ResumeContext = createContext<ResumeContextType | undefined>(
    undefined
);

// TODO: use hook
const updateLocalStorage = (resumeData: ResumeData) => {
    localStorage.setItem(
        'resumark.state.resume.data',
        JSON.stringify(resumeData)
    );
};

const getLocalStorage = (): ResumeData | null => {
    const data = localStorage.getItem('resumark.state.resume.data');
    if (!data) {
        return null;
    }

    const parsedData = JSON.parse(data);

    return parsedData;
};

const DEFAULT_RESUME_DATA: ResumeData = {
    content: '',
    theme: {
        id: 'default',
        name: 'Default',
        css: '',
    },
};

export const ResumeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { getThemeByName } = useThemeStore();

    const defaultTheme = getThemeByName('default') || DEFAULT_RESUME_DATA.theme;

    const [data, setData] = useState<ResumeData>(
        getLocalStorage() || {
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
        updateLocalStorage(newData);
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
