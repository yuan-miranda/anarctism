// components/Canvas.tsx
'use client';

import { useEffect } from "react";
import * as fabric from "fabric";
import { useCanvas } from "@/context/CanvasContext";

export default function Canvas() {
    const { canvasRef, containerRef, setCanvas, zoomLevel } = useCanvas();

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
    }, [canvasRef, setCanvas]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) scale(${zoomLevel})`,
            }}
        >
            <div
                className="border-4 border-gray-300"
            >
                <canvas
                    ref={canvasRef}
                    width={4096}
                    height={4096}
                />
            </div>
        </div>
    );
}