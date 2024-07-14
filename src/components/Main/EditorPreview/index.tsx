import style from './EditorPreview.module.scss';
import { useResumeState } from '../../../context/Resume/hook';
import { useEffect, useRef, useState } from 'react';
import { useBoxSize as useBoxSize } from '../../../hooks/useBoxSize';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { PageRenderer } from '../../ui/PageRenderer';
import { MarkdownParser } from '../../ui/MarkdownParser';
import { CodeEditor } from '../../ui/CodeEditor';

export function EditorPreview() {
    const { content, theme, setTheme } = useResumeState();
    const previewRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { boxSize } = useBoxSize(previewRef);
    const { windowSize } = useWindowSize();
    const [fitIntoPx, setFitIntoPx] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const containerWidth = container.clientWidth;
        setFitIntoPx(containerWidth);
    }, [boxSize, windowSize.width]);

    return (
        <div className={style.container}>
            <div className={style.cssContainer} ref={containerRef}>
                <CodeEditor text={theme} onChange={setTheme} language={'css'} />
            </div>
            <div className={style.previewContainer} ref={containerRef}>
                <PageRenderer fitIntoPx={fitIntoPx} maxScale={1}>
                    <MarkdownParser markdown={content} css={theme} />
                </PageRenderer>
            </div>
        </div>
    );
}
