export interface ResumeData {
    content: string;
    theme: string;
}

export interface ResumeContextType {
    content: ResumeData['content'];
    theme: ResumeData['theme'];
    setContent: (content: string) => void;
    setTheme: (theme: string) => void;
}
