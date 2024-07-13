import style from './EditorContent.module.scss';
import { useResumeState } from '../../../context/Resume/hook';
import { PageRenderer } from '../../ui/PageRenderer';
import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { MarkdownParser } from '../../ui/MarkdownParser';

export function EditorContent() {
    const { content, setContent, theme } = useResumeState();
    const { windowSize } = useWindowSize();
    const previewColumnRef = useRef<HTMLDivElement>(null);
    const [fitIntoPx, setFitIntoPx] = useState(0);

    useEffect(() => {
        const previewColumn = previewColumnRef.current;
        if (!previewColumn) {
            return;
        }

        const previewColumnWidth = previewColumn.clientWidth;
        setFitIntoPx(previewColumnWidth - 20); // FIXME: magic number
    }, [windowSize]);

    return (
        <div className={style.container}>
            <div className={style.editor}>
                <textarea
                    className={style.textarea}
                    placeholder="Start typing your markdown here..."
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                ></textarea>
            </div>
            <div className={style.preview} ref={previewColumnRef}>
                <div className={style.previewTitle}>Preview</div>
                <div className={style.previewContent}>
                    <PageRenderer fitIntoPx={fitIntoPx}>
                        <MarkdownParser markdown={content} css={theme} />
                    </PageRenderer>
                </div>
            </div>
        </div>
    );
}
