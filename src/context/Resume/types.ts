import { Result } from "../../lib/validation";

export interface ThemeData {
    id: string;
    name: string;
    css: string;
}

export interface ResumeData {
    id: string;
    name: string;
    content: string;
    theme: ThemeData;
}

export interface ThemeMetadata {
    sections: number
}

export interface ResumeContextType {
    content: ResumeData['content'];
    theme: ResumeData['theme'];
    setContent: (content: ResumeData['content']) => void;
    setTheme: (theme: ResumeData['theme']) => void;
    getThemeMetadata: () => Result<ThemeMetadata>;
}


