// components/ZoomActions.tsx
'use client';

import { useCanvas } from "@/context/CanvasContext";
import Image from "next/image";

const ZOOM_STEP = 0.1;
const MAX_ZOOM = 3;
const MIN_ZOOM = 0.1;

export default function ZoomActions() {
    const { zoomLevel, setZoomLevel } = useCanvas();

    const handleZoom = (direction: 'in' | 'out') => {
        let newZoomLevel = zoomLevel + (direction === 'in' ? ZOOM_STEP : -ZOOM_STEP);
        newZoomLevel = Math.min(Math.max(newZoomLevel, MIN_ZOOM), MAX_ZOOM);
        newZoomLevel = Math.round(newZoomLevel * 10) / 10;

        localStorage.setItem('canvasZoomLevel', newZoomLevel.toString());
        setZoomLevel(newZoomLevel);
    };

    return (
        <div
            className="fixed m-4 z-[1] bottom-[10px] left-[10px] flex flex-row gap-2"
        >
            <button
                id="zoomIn"
                title="Zoom In"
                className="border border-gray-300 rounded p-4 cursor-pointer"
                onClick={() => handleZoom('in')}
                disabled={zoomLevel >= MAX_ZOOM}
            >
                <Image
                    src="/icon/zoomIn.svg"
                    alt="Zoom In"
                    width={24}
                    height={24}
                    className="dark:invert"
                />
            </button>
            <button
                id="zoomOut"
                title="Zoom Out"
                className="border border-gray-300 rounded p-4 cursor-pointer"
                onClick={() => handleZoom('out')}
                disabled={zoomLevel <= MIN_ZOOM}
            >
                <Image
                    src="/icon/zoomOut.svg"
                    alt="Zoom Out"
                    width={24}
                    height={24}
                    className="dark:invert"
                />
            </button>
        </div>
    );
}