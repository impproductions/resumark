import style from './EditorPreview.module.scss';
import { useResumeState } from '../../../context/Resume/hook';
import { useEffect, useRef, useState } from 'react';
import { useBoxSize as useBoxSize } from '../../../hooks/useBoxSize';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { CodeEditor } from '../../ui/CodeEditor';
import { ThemeCarousel } from './ThemeCarousel';
import { ResumeRenderer } from '../ResumeRenderer';

export function EditorPreview() {
    const { theme, setTheme } = useResumeState();
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
        setFitIntoPx(containerWidth - 20);
    }, [boxSize, windowSize.width]);

    return (
        <div className={style.container}>
            <div className={style.header}>
                <ThemeCarousel />
            </div>
            <div className={style.content}>
                <div className={style.cssContainer}>
                    <CodeEditor
                        text={theme.css}
                        onChange={(val) =>
                            setTheme({
                                // TODO: only the actual string?
                                ...theme,
                                css: val,
                            })
                        }
                        language={'css'}
                    />
                </div>
                <div className={style.previewContainer} ref={containerRef}>
                    <ResumeRenderer fitIntoPx={fitIntoPx} />
                </div>
            </div>
        </div>
    );
}
