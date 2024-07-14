import { useRef } from 'react';
import style from './PageRenderer.module.scss';
import { useBoxSize } from '../../../hooks/useBoxSize';

interface Props {
    fitIntoPx: number;
    children?: React.ReactNode;
    maxScale?: number;
}

export function PageRenderer({ fitIntoPx, children, maxScale = 1 }: Props) {
    const previewRef = useRef<HTMLDivElement>(null);
    const { boxSize } = useBoxSize(previewRef);

    const previewScale = scaleToFitIntoWidth(
        fitIntoPx,
        boxSize?.width || 0, // FIXME: boxSize should never be undefined
        maxScale
    );

    return (
        <div
            className={style.a4}
            ref={previewRef}
            style={{
                transform: `scale(${previewScale})`,
                transformOrigin: 'top center',
            }}
        >
            {children}
        </div>
    );
}

function scaleToFitIntoWidth(
    windowWidth: number,
    boxWidth: number,
    maxScale = 1
) {
    if (!boxWidth) {
        return 1;
    }

    if (maxScale === -1) {
        return windowWidth / boxWidth;
    }

    return Math.min(maxScale, windowWidth / boxWidth);
}
