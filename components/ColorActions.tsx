// components/ColorActions.tsx
'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatedGradientBorderTW } from "./AnimatedGradientBorderTW";
import { useCanvas } from "@/context/CanvasContext";

const DEFAULT_COLOR = '#000000';
const DEFAULT_ERASER_COLOR = '#FFFFFF';
const DEFAULT_STROKE_WIDTH = 2;
const MAX_STROKE_WIDTH = 20;

export default function ColorActions() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [strokeWidth, setStrokeWidth] = useState(DEFAULT_STROKE_WIDTH);
    const [color, setColor] = useState(DEFAULT_COLOR);
    const [eraser, setEraser] = useState(false);
    const { canvas } = useCanvas();

    const handleCollapseToggle = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleColorChange = (newColor: string) => {
        if (!canvas || !canvas.freeDrawingBrush) return;
        setEraser(false);
        setColor(newColor);
    }

    const handleEraserClick = () => {
        if (!canvas || !canvas.freeDrawingBrush) return;
        setEraser(true);
        setColor(DEFAULT_ERASER_COLOR);
    };

    const handleStrokeWidthChange = (increment: boolean) => {
        if (!canvas || !canvas.freeDrawingBrush) return;
        const newWidth = increment ? Math.min(strokeWidth + 1, MAX_STROKE_WIDTH) : Math.max(strokeWidth - 1, 1);
        setStrokeWidth(newWidth);
    };

    const handleCustomColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = event.target.value;
        handleColorChange(newColor);
    };

    useEffect(() => {
        if (!canvas || !canvas.freeDrawingBrush) return;
        canvas.freeDrawingBrush.color = color;
        canvas.freeDrawingBrush.width = eraser ? strokeWidth * 10 : strokeWidth;
    }, [canvas, color, strokeWidth, eraser]);

    return (
        <div
            className="fixed m-4 z-[1] top-1/2 left-[10px] -translate-y-1/2"
        >
            <button
                onClick={handleCollapseToggle}
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
                        onClick={() => handleColorChange(DEFAULT_COLOR)}
                    />
                    <button
                        id="eraserStroke"
                        title="Eraser (White)"
                        className="w-8 h-8 border border-gray-300 cursor-pointer flex items-center justify-center"
                        onClick={handleEraserClick}
                    >
                        {strokeWidth * 10}
                    </button>

                    {[
                        'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'
                    ].map(color => (
                        <button
                            key={color}
                            title={color}
                            className="w-8 h-8 border border-gray-300 cursor-pointer"
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorChange(color)}
                        />
                    ))}

                    <AnimatedGradientBorderTW>
                        <input
                            id="customColor"
                            type="color"
                            title="Custom Color"
                            className="w-[30.5667px] h-[29.5667px] border-none bg-transparent cursor-pointer"
                            value={color}
                            onChange={handleCustomColorChange}
                        />
                    </AnimatedGradientBorderTW>

                    <button
                        id="decreaseStrokeSize"
                        title="Decrease Stroke Width"
                        className="w-8 h-8 border border-gray-300 cursor-pointer flex items-center justify-center"
                        onClick={() => handleStrokeWidthChange(false)}
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
                        onClick={() => handleStrokeWidthChange(true)}
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
                        {strokeWidth}
                    </button>
                </div>
            )}
        </div>
    );
}