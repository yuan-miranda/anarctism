// components/ColorActions.tsx
'use client';

import { useState } from "react";
import Image from "next/image";
import { AnimatedGradientBorderTW } from "./AnimatedGradientBorderTW";

export default function ColorActions() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div
            className="fixed m-4 z-[1] top-1/2 left-[10px] -translate-y-1/2"
        >
            <button
                onClick={toggleCollapse}
                id="toggleCollapse"
                title="Toggle Collapse"
                className={`w-8 h-8 border-2 border-gray-300 cursor-pointer`}
            >
                <Image
                    id="collapseDown"
                    src="/icon/collapseDown.svg"
                    alt="Collapse Down"
                    width={32}
                    height={32}
                    className={`${isCollapsed ? 'hidden' : 'block'} dark:invert`}
                />
                <Image
                    id="collapseUp"
                    src="/icon/collapseUp.svg"
                    alt="Collapse Up"
                    width={32}
                    height={32}
                    className={`${isCollapsed ? 'block' : 'hidden'} dark:invert`}
                />
            </button>

            {!isCollapsed && (
                <div
                    className="grid grid-cols-2 gap-2 mt-1"
                >
                    <button
                        id="colorBtnDefault"
                        title="Black"
                        className="w-8 h-8 border border-gray-300 cursor-pointer"
                        style={{ backgroundColor: '#000000' }}
                    />
                    <button
                        id="eraserStroke"
                        title="Eraser (White)"
                        className="w-8 h-8 border border-gray-300 cursor-pointer flex items-center justify-center"
                    >
                        20
                    </button>

                    {[
                        '#ff0000', // Red
                        '#ff7f00', // Orange
                        '#ffff00', // Yellow
                        '#00ff00', // Green
                        '#0000ff', // Blue
                        '#4b0082', // Indigo
                        '#8f00ff'  // Violet
                    ].map(color => (
                        <button
                            key={color}
                            title={color}
                            className="w-8 h-8 border border-gray-300 cursor-pointer"
                            style={{ backgroundColor: color }}
                        />
                    ))}

                    <AnimatedGradientBorderTW>
                        <input
                            id="customColor"
                            type="color"
                            title="Custom Color"
                            className="w-[30.5667px] h-[29.5667px] border-none bg-transparent cursor-pointer"
                        />
                    </AnimatedGradientBorderTW>

                    <button
                        id="decreaseStrokeSize"
                        title="Decrease Stroke Width"
                        className="w-8 h-8 border border-gray-300 cursor-pointer flex items-center justify-center"
                    >
                        <Image
                            src="/icon/decrement.svg"
                            alt="Decrease Stroke Width"
                            width={24}
                            height={24}
                            className="dark:invert"
                        />
                    </button>
                    <button
                        id="increaseStrokeSize"
                        title="Increase Stroke Width"
                        className="w-8 h-8 border border-gray-300 cursor-pointer flex items-center justify-center"
                    >
                        <Image
                            src="/icon/increment.svg"
                            alt="Increase Stroke Width"
                            width={24}
                            height={24}
                            className="dark:invert"
                        />
                    </button>
                    <button
                        id="increaseStrokeSize"
                        title="Size Indicator"
                        className="w-8 h-8 border border-gray-300 cursor-pointer flex items-center justify-center"
                    >
                        2
                    </button>
                </div>
            )}
        </div>
    );
}