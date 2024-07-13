import { useEffect, useState } from 'react';

export function useBoxSize(
    toComputeRef: React.RefObject<HTMLElement>,
    useComputedStyle = false
) {
    const [boxSize, setBoxSize] = useState<{
        width: number;
        height: number;
    } | null>(null);

    useEffect(() => {
        if (toComputeRef.current) {
            if (useComputedStyle) {
                const box = window.getComputedStyle(toComputeRef.current);
                setBoxSize({
                    width: parseFloat(box.width),
                    height: parseFloat(box.height),
                });
            } else {
                const box = toComputeRef.current.getClientRects()[0];
                setBoxSize({
                    width: box.width,
                    height: box.height,
                });
            }
        }
    }, [toComputeRef, useComputedStyle]);

    return { boxSize };
}
