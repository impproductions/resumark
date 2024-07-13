import style from './EditorPreview.module.scss';
import { useResumeState } from '../../../context/Resume/hook';
import { useEffect, useRef, useState } from 'react';
import { useBoxSize as useBoxSize } from '../../../hooks/useBoxSize';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { PageRenderer } from '../../ui/PageRenderer';
import { MarkdownParser } from '../../ui/MarkdownParser';

export function EditorPreview() {
    const { content, theme } = useResumeState();
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
        setFitIntoPx(containerWidth - 40);
    }, [boxSize, windowSize.width]);

    return (
        <div className={style.container} ref={containerRef}>
            <PageRenderer fitIntoPx={fitIntoPx}>
                <MarkdownParser markdown={content} css={theme} />
            </PageRenderer>
        </div>
    );
}
