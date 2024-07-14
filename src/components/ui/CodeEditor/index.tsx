import React from 'react';
import style from './CodeEditor.module.scss';

interface Props {
    text: string;
    onChange?: (text: string) => void;
    onCommit?: (text: string) => void;
}

export function CodeEditor({ text, onChange, onCommit }: Props) {
    return (
        <div className={style.container}>
            <textarea
                className={style.textarea}
                value={text}
                onChange={(e) => onChange?.(e.target.value)}
                onBlur={() => onCommit?.(text)}
            />
        </div>
    );
}
