// utils/getCanvasPos.ts

export default function getCanvasPos(container: HTMLElement) {
    const style = window.getComputedStyle(container);
    return {
        left: parseInt(style.left, 10),
        top: parseInt(style.top, 10)
    };
}