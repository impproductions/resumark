import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState<{
        width: number;
        height: number;
    }>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = debounce(() => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;
            setWindowSize((prevSize) => {
                if (
                    prevSize.width !== newWidth ||
                    prevSize.height !== newHeight
                ) {
                    return { width: newWidth, height: newHeight };
                }
                return prevSize;
            });
        }, 10);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            handleResize.cancel();
        };
    }, []);

    return { windowSize };
}
