// components/Canvas.tsx
'use client';

import { useEffect, useRef } from "react";
import * as fabric from "fabric";

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = new fabric.Canvas(canvasRef.current, {
            isDrawingMode: true,
            backgroundColor: 'white',
        });
        canvas.renderAll();

        const brush = new fabric.PencilBrush(canvas);
        brush.width = 2;
        brush.color = 'black';
        canvas.freeDrawingBrush = brush;

        return () => {
            canvas.dispose();
        };
    }, []);

    return (
        <div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
            <canvas ref={canvasRef} width={800} height={500} />
        </div>
    )
}