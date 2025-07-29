// utils/updateTransformScale.ts

export default function updateTransformScale(container: HTMLElement, zoomLevel: number) {
    const currentTransform = container.style.transform || '';

    const newTransform = /scale\([^)]+\)/.test(currentTransform)
        ? currentTransform.replace(/scale\([^)]+\)/, `scale(${zoomLevel})`)
        : `${currentTransform} scale(${zoomLevel})`.trim();

    container.style.transform = newTransform;
}