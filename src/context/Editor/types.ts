export interface EditorConfig {
    theme: 'light' | 'dark';
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
