export interface LayoutConfig {
    columnDividerPercentage: number;
}

export interface EditorLayoutConfig {
    content: LayoutConfig;
    preview: LayoutConfig;
}

export interface EditorConfig {
    theme: 'light' | 'dark';
    layout: EditorLayoutConfig;
}
export interface EditorState {
    currentView: 'content' | 'preview';
}

export interface EditorContextType {
    state: EditorState;
    config: EditorConfig;
    setTheme: (theme: 'light' | 'dark') => void;
    setCurrentView: (view: 'content' | 'preview') => void;
}