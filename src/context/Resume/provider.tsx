// ResumeProvider.tsx
import { useState, ReactNode, FC, createContext } from 'react';
import { ResumeContextType, ResumeData } from './types';

import defaultCss from './default-user-theme.css?raw';

export const ResumeContext = createContext<ResumeContextType | undefined>(
    undefined
);

// TODO: hook
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

    console.warn('Overriding localStorage theme data with default data');
    parsedData.theme = String(defaultCss);

    return parsedData;
};

export const ResumeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<ResumeData>(
        getLocalStorage() || {
            content: '',
            theme: String(defaultCss),
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

    const setTheme = (theme: string) => {
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
