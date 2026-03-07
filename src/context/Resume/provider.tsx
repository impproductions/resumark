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
import uuid from 'uuid4';

export const ResumeContext = createContext<ResumeContextType | undefined>(
    undefined
);

const DEFAULT_RESUME_DATA: ResumeData = {
    id: 'default',
    name: 'My Resume',
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

    const initialResumes: ResumeData[] = getLocalStorage('resumark.state.resumes') || [
        {
            ...DEFAULT_RESUME_DATA,
            theme: {
                css: defaultTheme.css,
                id: defaultTheme.id,
                name: defaultTheme.name,
            },
        },
    ];

    // Migrate legacy single-resume storage
    const legacySingle: ResumeData | null = getLocalStorage('resumark.state.resume.data');
    const migratedResumes = (() => {
        if (legacySingle && !getLocalStorage('resumark.state.resumes')) {
            return [legacySingle];
        }
        return initialResumes;
    })();

    const [resumes, setResumes] = useState<ResumeData[]>(migratedResumes);
    const [activeResumeId, setActiveResumeId] = useState<string>(
        getLocalStorage('resumark.state.activeResumeId') || migratedResumes[0].id
    );

    const activeResume = resumes.find((r) => r.id === activeResumeId) ?? resumes[0];

    const persistResumes = (updated: ResumeData[]) => {
        setResumes(updated);
        updateLocalStorage(updated, 'resumark.state.resumes');
    };

    const persistActiveId = (id: string) => {
        setActiveResumeId(id);
        updateLocalStorage(id, 'resumark.state.activeResumeId');
    };

    const updateActive = (patch: Partial<ResumeData>) => {
        const updated = resumes.map((r) =>
            r.id === activeResume.id ? { ...r, ...patch } : r
        );
        persistResumes(updated);
    };

    const setContent = (content: string) => {
        updateActive({ content });
    };

    const setTheme = (theme: ThemeData) => {
        updateActive({ theme });
    };

    const switchResume = (id: string) => {
        persistActiveId(id);
    };

    const createResume = (name: string) => {
        const newResume: ResumeData = {
            id: uuid(),
            name,
            content: placeholderResume,
            theme: {
                css: defaultTheme.css,
                id: defaultTheme.id,
                name: defaultTheme.name,
            },
        };
        const updated = [...resumes, newResume];
        persistResumes(updated);
        persistActiveId(newResume.id);
    };

    const deleteResume = (id: string) => {
        if (resumes.length === 1) return;
        const updated = resumes.filter((r) => r.id !== id);
        persistResumes(updated);
        if (activeResumeId === id) {
            persistActiveId(updated[0].id);
        }
    };

    const renameResume = (id: string, name: string) => {
        const updated = resumes.map((r) => (r.id === id ? { ...r, name } : r));
        persistResumes(updated);
    };

    const getThemeMetadata = () => {
        const theme = activeResume.theme;
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

    return (
        <ResumeContext.Provider
            value={{
                content: activeResume.content,
                theme: activeResume.theme,
                setContent,
                setTheme,
                getThemeMetadata,
                resumes,
                activeResumeId: activeResume.id,
                switchResume,
                createResume,
                deleteResume,
                renameResume,
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
};
