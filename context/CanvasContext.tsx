// context/CanvasContext.tsx
'use client';

import { createContext, useContext, useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

type CanvasContextType = {
    canvas: fabric.Canvas | null;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    containerRef: React.RefObject<HTMLDivElement | null>;
    zoomLevel: number;
    setCanvas: (canvas: fabric.Canvas | null) => void;
    setZoomLevel: (zoomLevel: number) => void;
};

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [zoomLevel, setZoomLevel] = useState<number>(1);

    useEffect(() => {
        const savedZoomLevel = localStorage.getItem('canvasZoomLevel');
        if (savedZoomLevel) {
            setZoomLevel(parseFloat(savedZoomLevel));
        }
    }, []);

    return (
        <CanvasContext.Provider value={{ canvas, canvasRef, containerRef, zoomLevel, setCanvas, setZoomLevel }}>
            {children}
        </CanvasContext.Provider>
    );
};

export const useCanvas = () => {
    const context = useContext(CanvasContext);
    if (!context) {
        throw new Error("useCanvas must be used within a CanvasProvider");
    }
    return context;
};