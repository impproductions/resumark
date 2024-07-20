import { Editor } from '@monaco-editor/react';
import { useEditorState } from '../../../context/Editor/hook';
import style from './CodeEditor.module.scss';
import { useEffect, useState } from 'react';

interface Props {
    language: 'css' | 'markdown';
    text: string;
    onChange?: (text: string) => void;
    onCommit?: (text: string) => void;
    readonly?: boolean;
    readonlyMessage?: string;
}

export function CodeEditor({
    text,
    onChange,
    language,
    readonly = false,
    readonlyMessage = 'This editor is read-only',
}: Props) {
    const { config } = useEditorState();
    const [content, setContent] = useState(text);

    useEffect(() => {
        setContent(text);
    }, [text]);

    return (
        <div className={style.container}>
            <Editor
                height="100%"
                defaultLanguage={language}
                options={{
                    minimap: { enabled: false },
                    automaticLayout: true,
                    readOnly: readonly,
                    readOnlyMessage: { value: readonlyMessage },
                }}
                value={content}
                // value={text}
                onChange={(value) => onChange?.(value || '')}
                theme={config.theme === 'light' ? 'light' : 'vs-dark'}
            />
        </div>
    );
}
