import { useContext } from 'react';
import { EditorContext } from './provider';
import { EditorContextType } from './types';

export const useEditorState = (): EditorContextType => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error('useEditorState must be used within an EditorProvider');
    }
    return context;
};
