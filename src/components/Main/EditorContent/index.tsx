import style from './EditorContent.module.scss';
import { useResumeState } from '../../../context/Resume/hook';
import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { CodeEditor } from '../../ui/CodeEditor';
import { ResumeRenderer } from '../ResumeRenderer';

export function EditorContent() {
    const { content, setContent } = useResumeState();
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
                <CodeEditor
                    text={content}
                    onChange={setContent}
                    onCommit={setContent}
                    language="markdown"
                />
            </div>
            <div className={style.preview} ref={previewColumnRef}>
                <div className={style.previewContent}>
                    <ResumeRenderer fitIntoPx={fitIntoPx} />
                    {/* <PageRenderer fitIntoPx={fitIntoPx}>
                        <MarkdownParser markdown={content} css={theme.css} />
                    </PageRenderer> */}
                </div>
            </div>
        </div>
    );
}
