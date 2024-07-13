import React from 'react';
import style from './EditorContent.module.scss';

export function EditorContent() {
    return (
        <div className={style.container}>
            <div className={style.editor}>
                <textarea
                    className={style.textarea}
                    placeholder="Start typing your markdown here..."
                ></textarea>
                <div className={style.preview}>
                    <div className={style.previewTitle}>Preview</div>
                    <div className={style.previewContent}>[]</div>
                </div>
            </div>
        </div>
    );
}
