import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './variables.css';
import './index.css';
import 'typeface-roboto';
import 'typeface-lora';
import { EditorProvider } from './context/Editor/provider.tsx';
import { ResumeProvider } from './context/Resume/provider.tsx';
import { ThemeStoreProvider } from './context/ThemesStore/provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <EditorProvider>
            <ThemeStoreProvider>
                <ResumeProvider>
                    <App />
                </ResumeProvider>
            </ThemeStoreProvider>
        </EditorProvider>
    </React.StrictMode>
);
