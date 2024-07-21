import { useEffect, useState } from 'react';
import style from './FloatingTooltip.module.scss';
import classNames from 'classnames';

interface Props {
    open: boolean;
    direction: 'top' | 'bottom' | 'left' | 'right';
    children?: React.ReactNode;
}

export function FloatingTooltip({ open, direction, children }: Props) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <div
            className={style.container}
            style={{
                display: open ? 'block' : 'none',
                top: mousePosition.y + 'px',
                left: mousePosition.x + 'px',
            }}
        >
            <div className={classNames(style.content, style[direction])}>
                {children}
            </div>
        </div>
    );
}
