// context/CanvasContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from "react";
import * as fabric from "fabric";

type CanvasContextType = {
    canvas: fabric.Canvas | null;
    setCanvas: (canvas: fabric.Canvas | null) => void;
    zoomLevel: number;
    setZoomLevel: (zoomLevel: number) => void;
};

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [zoomLevel, setZoomLevel] = useState<number>(1);

    useEffect(() => {
        const savedZoomLevel = localStorage.getItem('canvasZoomLevel');
        if (savedZoomLevel) {
            setZoomLevel(parseFloat(savedZoomLevel));
        }
    }, []);

    return (
        <CanvasContext.Provider value={{ canvas, setCanvas, zoomLevel, setZoomLevel }}>
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