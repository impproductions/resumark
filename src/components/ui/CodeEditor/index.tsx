import { Editor } from '@monaco-editor/react';
import { useEditorState } from '../../../context/Editor/hook';
import style from './CodeEditor.module.scss';

interface Props {
    language: 'css' | 'markdown';
    text: string;
    onChange?: (text: string) => void;
    onCommit?: (text: string) => void;
}

export function CodeEditor({ text, onChange, language }: Props) {
    const { config } = useEditorState();

    return (
        <div className={style.container}>
            <Editor
                height="100%"
                defaultLanguage={language}
                options={{
                    minimap: { enabled: false },
                    automaticLayout: true,
                }}
                value={text}
                onChange={(value) => onChange?.(value || '')}
                theme={config.theme === 'light' ? 'light' : 'vs-dark'}
            />
        </div>
    );
}
