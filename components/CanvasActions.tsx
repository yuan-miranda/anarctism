// components/CanvasActions.tsx
'use client';

import Image from "next/image";
import { useCanvas } from "@/context/CanvasContext";
import { MIN_ZOOM } from "./ZoomActions";
import centerCanvas from "@/utils/centerCanvas";
import setAndStoreZoomLevel from "@/utils/setAndStoreZoomLevel";

export default function CanvasActions() {
    const { canvas, containerRef, setZoomLevel } = useCanvas();

    const handleCenterCanvas = () => {
        const container = containerRef.current;
        if (!container) return;

        centerCanvas(container, MIN_ZOOM);
        setAndStoreZoomLevel(container, MIN_ZOOM, setZoomLevel);
    };

    const handleSaveCanvas = () => {
        if (!canvas) return;

        const dataURL = canvas.toDataURL({
            format: 'png',
            multiplier: 2,
        });

        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `AnarctistCanvas_${new Date().toISOString()}.png`;
        link.click();
    }

    return (
        <div
            className="fixed m-4 z-[1] top-[10px] right-[10px]"
        >
            {/* desktop version */}
            <div
                className="hidden sm:flex flex-row gap-2"
            >
                <button
                    id="centerCanvas"
                    title="Center Canvas"
                    className="border border-gray-300 rounded px-4 py-2 cursor-pointer"
                    onClick={handleCenterCanvas}
                >
                    Center Canvas
                </button>
                <button
                    id="saveCanvas"
                    title="Save Canvas"
                    className="border border-gray-300 rounded px-4 py-2 cursor-pointer"
                    onClick={handleSaveCanvas}
                >
                    Save Canvas
                </button>
            </div>

            {/* minified version */}
            <div
                className="flex sm:hidden flex-row gap-2"
            >
                <button
                    id="centerCanvasMin"
                    title="Center Canvas"
                    className="border border-gray-300 rounded p-4 cursor-pointer"
                    onClick={handleCenterCanvas}
                >
                    <Image
                        src="/icon/centerCanvas.svg"
                        alt="Center Canvas"
                        width={24}
                        height={24}
                        className="dark:invert"
                    />
                </button>
                <button
                    id="saveCanvasMin"
                    title="Save Canvas"
                    className="border border-gray-300 rounded p-4 cursor-pointer"
                    onClick={handleSaveCanvas}
                >
                    <Image
                        src="/icon/saveCanvas.svg"
                        alt="Save Canvas"
                        width={24}
                        height={24}
                        className="dark:invert"
                    />
                </button>
            </div>
        </div>
    );
}