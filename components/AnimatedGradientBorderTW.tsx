// components/AnimatedGradientBorderTW.tsx
// revised version of: https://ibelick.com/blog/create-animated-gradient-borders-with-css
'use client';

import { useEffect, useRef, CSSProperties } from "react";

export const AnimatedGradientBorderTW: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const boxElement = boxRef.current;

        if (!boxElement) {
            return;
        }

        const updateAnimation = () => {
            const angle =
                (parseFloat(boxElement.style.getPropertyValue("--angle")) + 1) % 360;
            boxElement.style.setProperty("--angle", `${angle}deg`);
            requestAnimationFrame(updateAnimation);
        };

        requestAnimationFrame(updateAnimation);
    }, []);

    return (
        <div
            ref={boxRef}
            style={
                {
                    "--angle": "0deg",
                    "--border-color":
                        "linear-gradient(var(--angle), red, orange, yellow, green, blue, indigo, violet)",
                    "--bg-color": "linear-gradient(#131219, #131219)",
                } as CSSProperties
            }
            className="flex items-center justify-center border border-transparent [background:padding-box_var(--bg-color),border-box_var(--border-color)]"
        >
            {children}
        </div>
    );
};
