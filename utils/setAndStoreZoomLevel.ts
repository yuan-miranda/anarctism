// utils/setAndStoreZoomLevel.ts

import updateTransformScale from "./updateTransformScale";

export default function setAndStoreZoomLevel(container: HTMLElement, newZoomLevel: number, setZoomLevel: (level: number) => void) {
    localStorage.setItem('canvasZoomLevel', newZoomLevel.toString());
    updateTransformScale(container, newZoomLevel);
    setZoomLevel(newZoomLevel);
}