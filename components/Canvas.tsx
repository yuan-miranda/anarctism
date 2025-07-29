// components/Canvas.tsx
'use client';

import { useEffect } from "react";
import * as fabric from "fabric";
import { useCanvas } from "@/context/CanvasContext";
import centerCanvas from "@/utils/centerCanvas";
import { MIN_ZOOM } from "./ZoomActions";
import setAndStoreZoomLevel from "@/utils/setAndStoreZoomLevel";
import getCanvasPos from "@/utils/getCanvasPos";

export default function Canvas() {
    const { canvasRef, containerRef, setCanvas, setZoomLevel } = useCanvas();

    // load or set initial zoom level
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const storedZoomLevel = localStorage.getItem('canvasZoomLevel');
        const newZoomLevel = storedZoomLevel ? parseFloat(storedZoomLevel) : MIN_ZOOM;

        centerCanvas(container, newZoomLevel);
        setAndStoreZoomLevel(container, newZoomLevel, setZoomLevel);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // load or set initial canvas position
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const storedPosition = localStorage.getItem('canvasPosition');
        const { left, top } = storedPosition ? JSON.parse(storedPosition) : { left: 0, top: 0 };

        container.style.left = left + 'px';
        container.style.top = top + 'px';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // right-click panning functionality
    useEffect(() => {
        const canvasElement = canvasRef.current;
        const container = containerRef.current;
        if (!canvasElement || !container) return;

        let isDragging = false;
        const dragStart = { x: 0, y: 0 };
        const containerStart = { left: 0, top: 0 };

        const onMouseEnter = () => {
            if (!isDragging) document.body.style.cursor = 'crosshair';
        }

        const onMouseLeave = () => {
            if (!isDragging) document.body.style.cursor = 'grab';
        }

        const onMouseDown = (e: MouseEvent) => {
            if (e.button !== 2) return;

            isDragging = true;
            document.body.style.cursor = 'grabbing';
            canvasElement.style.cursor = 'grabbing';

            dragStart.x = e.clientX;
            dragStart.y = e.clientY;
            const pos = getCanvasPos(container);
            containerStart.left = pos.left;
            containerStart.top = pos.top;

        }

        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;

            const dx = e.clientX - dragStart.x;
            const dy = e.clientY - dragStart.y;
            container.style.left = (containerStart.left + dx) + 'px';
            container.style.top = (containerStart.top + dy) + 'px';
        }

        const onMouseUp = (e: MouseEvent) => {
            if (isDragging && e.button === 2) {
                isDragging = false;
                document.body.style.cursor = 'grab';
                canvasElement.style.cursor = 'crosshair';
                const pos = getCanvasPos(container);
                localStorage.setItem('canvasPosition', JSON.stringify({ left: pos.left, top: pos.top }));
            }
        }

        canvasElement.addEventListener('mouseenter', onMouseEnter);
        canvasElement.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('contextmenu', (e) => e.preventDefault());
        return () => {
            canvasElement.removeEventListener('mouseenter', onMouseEnter);
            canvasElement.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('contextmenu', (e) => e.preventDefault());
        };
    });

    // 2-finger panning functionality
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let isPanning = false
        const panStart = { x: 0, y: 0 };
        const containerStart = { left: 0, top: 0 };

        const onTouchStart = (e: TouchEvent) => {
            if (e.touches.length !== 2) return;
            e.preventDefault();

            isPanning = true;
            panStart.x = e.touches[0].clientX;
            panStart.y = e.touches[0].clientY;

            const pos = getCanvasPos(container);
            containerStart.left = pos.left;
            containerStart.top = pos.top;
        };

        const onTouchMove = (e: TouchEvent) => {
            if (!isPanning || e.touches.length !== 2) return;
            e.preventDefault();

            const dx = e.touches[0].clientX - panStart.x;
            const dy = e.touches[0].clientY - panStart.y;

            container.style.left = (containerStart.left + dx) + 'px';
            container.style.top = (containerStart.top + dy) + 'px';
        };

        const onTouchEnd = (e: TouchEvent) => {
            if (isPanning && e.touches.length < 2) {
                isPanning = false;
                const pos = getCanvasPos(container);
                localStorage.setItem('canvasPosition', JSON.stringify({ left: pos.left, top: pos.top }));
            }
        };

        const onTouchCancel = () => {
            if (!isPanning) return;

            isPanning = false;
            const pos = getCanvasPos(container);
            localStorage.setItem('canvasPosition', JSON.stringify({ left: pos.left, top: pos.top }));
        };

        document.addEventListener('touchstart', onTouchStart, { passive: false });
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onTouchEnd, { passive: false });
        document.addEventListener('touchcancel', onTouchCancel, { passive: false });
        return () => {
            document.removeEventListener('touchstart', onTouchStart);
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
            document.removeEventListener('touchcancel', onTouchCancel);
        };
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