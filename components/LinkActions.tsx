// components/LinkActions.tsx
'use client';

import Image from "next/image";

export default function LinkActions() {
    return (
        <div
            className="fixed m-4 z-[1] bottom-[10px] right-[10px]"
        >
            <a href="https://github.com/yuan-miranda/anarctism" target="_blank">
                <Image
                    src="/icon/github-mark.svg"
                    alt="GitHub"
                    width={32}
                    height={32}
                    title="GitHub Repository"
                    className="dark:invert"
                />
            </a>
        </div>
    );
}