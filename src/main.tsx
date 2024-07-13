import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './variables.css';
import './index.css';
import { EditorProvider } from './context/Editor/provider.tsx';
import { ResumeProvider } from './context/Resume/provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <EditorProvider>
            <ResumeProvider>
                <App />
            </ResumeProvider>
        </EditorProvider>
    </React.StrictMode>
);
