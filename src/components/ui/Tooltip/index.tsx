import React from 'react';
import style from './Tooltip.module.scss';

interface Props {
    at:
        | 'top'
        | 'bottom'
        | 'left'
        | 'right'
        | 'center'
        | 'top-left'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-right';
    elementRef: React.RefObject<HTMLElement>;
    children: React.ReactNode;
}

export function Tooltip({ elementRef, at, children }: Props) {
    if (!elementRef.current) {
        return null;
    }

    let { top, left } = elementRef.current.getBoundingClientRect();

    if (at === 'top') {
        top -= 10;
        left += elementRef.current.offsetWidth / 2;
    } else if (at === 'bottom') {
        top += elementRef.current.offsetHeight + 10;
        left += elementRef.current.offsetWidth / 2;
    } else if (at === 'left') {
        top += elementRef.current.offsetHeight / 2;
        left -= 10;
    } else if (at === 'right') {
        top += elementRef.current.offsetHeight / 2;
        left += elementRef.current.offsetWidth + 10;
    } else if (at === 'center') {
        top += elementRef.current.offsetHeight / 2;
        left += elementRef.current.offsetWidth / 2;
    } else if (at === 'top-left') {
        top -= 10;
        left -= 10;
    } else if (at === 'top-right') {
        top -= 10;
        left += elementRef.current.offsetWidth + 10;
    } else if (at === 'bottom-left') {
        top += elementRef.current.offsetHeight + 10;
        left -= 10;
    } else if (at === 'bottom-right') {
        top += elementRef.current.offsetHeight + 10;
        left += elementRef.current.offsetWidth + 10;
    }

    const topCss = top + 'px';
    const leftCss = left + 'px';

    return (
        <div className={style.container} style={{ top: topCss, left: leftCss }}>
            <div className="content">{children}</div>
        </div>
    );
}
