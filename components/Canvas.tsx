// components/Canvas.tsx
'use client';

import { useEffect, useRef } from "react";
import * as fabric from "fabric";

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current!, {
            isDrawingMode: true,
        });

        const brush = new fabric.PencilBrush(canvas);
        brush.width = 5;
        brush.color = 'white';
        canvas.freeDrawingBrush = brush;

        return () => {
            canvas.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} width={800} height={500} />;
}