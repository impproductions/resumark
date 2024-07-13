import { useRef } from 'react';
import style from './PageRenderer.module.scss';
import { useBoxSize } from '../../../hooks/useBoxSize';

interface Props {
    fitIntoPx: number;
    children?: React.ReactNode;
}

export function PageRenderer({ fitIntoPx, children }: Props) {
    const previewRef = useRef<HTMLDivElement>(null);
    const { boxSize } = useBoxSize(previewRef);

    const previewScale = scaleToFitIntoWidth(fitIntoPx, boxSize?.width || 0); // FIXME

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

function scaleToFitIntoWidth(windowWidth: number, boxWidth: number) {
    if (!boxWidth) {
        return 1;
    }
    return Math.min(1, windowWidth / boxWidth);
}
