// components/Canvas.tsx
'use client';

import { useEffect } from "react";
import * as fabric from "fabric";
import { useCanvas } from "@/context/CanvasContext";
import centerCanvas from "@/utils/centerCanvas";
import { MIN_ZOOM } from "./ZoomActions";
import setAndStoreZoomLevel from "@/utils/setAndStoreZoomLevel";

export default function Canvas() {
    const { canvasRef, containerRef, setCanvas, setZoomLevel } = useCanvas();

    // load or set initial zoom level
    useEffect(() => {
        console.log('Loading saved zoom level');
        const container = containerRef.current;
        if (!container) return;

        const storedZoomLevel = localStorage.getItem('canvasZoomLevel');
        const newZoomLevel = storedZoomLevel ? parseFloat(storedZoomLevel) : MIN_ZOOM;

        centerCanvas(container, newZoomLevel);
        setAndStoreZoomLevel(container, newZoomLevel, setZoomLevel);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // initialize fabric canvas
    useEffect(() => {
        const canvasElement = canvasRef.current;
        if (!canvasElement) return;

        const canvas = new fabric.Canvas(canvasElement, {
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
            id="canvas-container"
            style={{
                position: 'absolute',
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