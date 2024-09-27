import { useRef } from 'react';
import style from './PageRenderer.module.scss';
import { useBoxSize } from '../../../hooks/useBoxSize';
import classNames from 'classnames';

import './clear-rest.css';

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
        <div className={style.container}>
            <div
                className={classNames(style.a4, 'paper')}
                ref={previewRef}
                style={{
                    transform: `scale(${previewScale})`,
                    transformOrigin: 'top center',
                }}
                data-preserve-on-print={true}
            >
                {children}
            </div>
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
