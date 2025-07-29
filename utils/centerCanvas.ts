// utils/centerCanvas.ts

export default function centerCanvas(container: HTMLElement, zoomLevel: number) {
    if (!container) return;

    container.style.left = '50%';
    container.style.top = '50%';
    container.style.transform = `translate(-50%, -50%) scale(${zoomLevel})`;
}