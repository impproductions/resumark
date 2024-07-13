import style from './EditorPreview.module.scss';
import { useResumeState } from '../../../context/Resume/hook';
import { MarkdownParser } from './MarkdownParser';
import { useEffect, useRef, useState } from 'react';
import { useBoxSize as useBoxSize } from '../../../hooks/useBoxSize';
import { useWindowSize } from '../../../hooks/useWindowSize';

export function EditorPreview() {
    const { content } = useResumeState();
    const [previewScale, setPreviewScale] = useState<number>(1);
    const previewRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { boxSize } = useBoxSize(previewRef);
    const { windowSize } = useWindowSize();

    useEffect(() => {
        const container = containerRef.current;
        const containerSize = container?.getBoundingClientRect();
        if (
            boxSize &&
            containerSize &&
            boxSize.width >= containerSize.width - 80
        ) {
            const scale =
                scaleToFitWindowWidth(containerSize.width, boxSize.width) * 0.8;
            setPreviewScale(scale);
        } else {
            setPreviewScale(1);
        }
    }, [boxSize, windowSize.width]);

    return (
        <div className={style.container} ref={containerRef}>
            <div
                className={style.a4}
                ref={previewRef}
                style={{
                    transform: `scale(${previewScale})`,
                    transformOrigin: 'top center',
                }}
            >
                <div className={style.previewReset}>
                    <MarkdownParser markdown={content} />
                </div>
            </div>
        </div>
    );
}

function scaleToFitWindowWidth(windowWidth: number, boxWidth: number) {
    return Math.min(1, windowWidth / boxWidth);
}
