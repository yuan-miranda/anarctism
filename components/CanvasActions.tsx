// components/CanvasActions.tsx
'use client';

import Image from "next/image";

export default function CanvasActions() {
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
                >
                    Center Canvas
                </button>
                <button
                    id="saveCanvas"
                    title="Save Canvas"
                    className="border border-gray-300 rounded px-4 py-2 cursor-pointer"
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