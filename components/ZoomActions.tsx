// components/ZoomActions.tsx
'use client';

import Image from "next/image";

export default function ZoomActions() {
    return (
        <div
            className="fixed m-4 z-[1] bottom-[10px] left-[10px] flex flex-row gap-2"
        >
            <button
                id="zoomIn"
                title="Zoom In"
                className="border border-gray-300 rounded p-4 cursor-pointer"
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