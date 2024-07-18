// ResumeProvider.tsx
import { useState, ReactNode, FC, createContext } from 'react';
import {
    ResumeContextType,
    ResumeData,
    ThemeData,
    ThemeMetadata,
} from './types';
import { useThemeStore } from '../ThemesStore/hook';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import placeholderResume from '../../assets/placeholder-resume.rmd?raw';
import YAML from 'yaml';
import { Err as Err, Ok as Ok, Validator } from '../../lib/validation';

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

    const getThemeMetadata = () => {
        try {
            const metadataString = theme.css
                .split('/***metadata')[1]
                .split('***/')[0];

            if (!metadataString.trim()) {
                return Err<ThemeMetadata>([
                    'Empty metadata block - try adding "sections: <number>" to your metadata',
                ]);
            }
            const metadata: ThemeMetadata = YAML.parse(metadataString);

            console.log({
                metadata,
                type: typeof metadata,
                sections: metadata.sections,
            });

            const validator = new Validator<ThemeMetadata>(metadata, [
                [
                    (obj) => typeof obj === 'object',
                    'Metadata is not an object - try adding "sections: <number>" to your metadata',
                ],
                [
                    (obj) => Boolean(obj.sections),
                    '"sections" is not defined - try adding "sections: <number>" to your metadata',
                ],
                [
                    (obj) => typeof obj.sections === 'number',
                    '"sections" is not a number - try adding "sections: <number>" to your metadata',
                ],
            ]);

            const [valid, errors] = validator.validate();

            if (!valid) {
                return Err<ThemeMetadata>(errors);
            }

            return Ok(metadata);
        } catch (e) {
            return Err<ThemeMetadata>([
                'Metadata not found in CSS - try adding a metadata block: \n/***metadata\nsections: <number>\n***/',
            ]);
        }
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
                getThemeMetadata,
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
};
