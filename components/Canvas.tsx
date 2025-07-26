// components/Canvas.tsx
'use client';

import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { useCanvas } from "@/context/CanvasContext";

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { setCanvas, zoomLevel } = useCanvas();

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

        setCanvas(canvas);

        return () => {
            canvas.dispose();
        };
    }, [setCanvas]);

    return (
        <div
            id="canvasContainer"
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ transform: `scale(${zoomLevel})` }}
        >
            <div
                className="border-4 border-gray-300"
            >
                <canvas
                    id="canvas"
                    ref={canvasRef} width={4096} height={4096} />
            </div>
        </div>
    );
}