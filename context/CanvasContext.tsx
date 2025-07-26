// context/CanvasContext.tsx
'use client';

import { createContext, useContext, useState } from "react";
import * as fabric from "fabric";

type CanvasContextType = {
    canvas: fabric.Canvas | null;
    setCanvas: (canvas: fabric.Canvas | null) => void;
};

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

    return (
        <CanvasContext.Provider value={{ canvas, setCanvas }}>
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