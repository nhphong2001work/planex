"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { assets } from "@/lib/assets";
import { customerStory, type Locale } from "@/lib/content";

const slideSizes = [
    { width: 1536, height: 820 },
    { width: 720, height: 384 },
    { width: 1633, height: 872 },
] as const;

export function CustomerStoryMedia({ locale }: { locale: Locale }) {
    const [activeSlide, setActiveSlide] = useState(0);
    const japanese = locale === "ja";
    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveSlide((current) => (current + 1) % assets.customerStorySlides.length);
        }, 5000);

        return () => window.clearInterval(timer);
    }, []);

    const moveSlide = (direction: number) => {
        setActiveSlide((current) =>
            (current + direction + assets.customerStorySlides.length) %
            assets.customerStorySlides.length,
        );
    };

    return (
        <div className="min-w-0 space-y-6">
            <figure className="m-0">
                <div className="relative aspect-video overflow-hidden bg-[#e5ebe8]">
                    <Image
                        key={activeSlide}
                        src={assets.customerStorySlides[activeSlide]}
                        alt={customerStory.slideAlt[activeSlide][locale]}
                        width={slideSizes[activeSlide].width}
                        height={slideSizes[activeSlide].height}
                        unoptimized
                        className="h-full w-full animate-image-reveal object-cover motion-reduce:animate-none"
                    />
                    <button
                        type="button"
                        onClick={() => moveSlide(-1)}
                        aria-label={japanese ? "前の画像" : "Previous image"}
                        className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center bg-white/55 text-xl text-navy shadow-sm transition hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        onClick={() => moveSlide(1)}
                        aria-label={japanese ? "次の画像" : "Next image"}
                        className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center bg-white/55 text-xl text-navy shadow-sm transition hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                    >
                        ›
                    </button>
                </div>
                <figcaption className="flex items-center justify-between gap-4 py-3 text-sm text-muted">
                    <span>{customerStory.slideAlt[activeSlide][locale]}</span>
                    <span aria-live="polite" className="shrink-0 tabular-nums">
                        {activeSlide + 1} / {assets.customerStorySlides.length}
                    </span>
                </figcaption>
            </figure>

            <figure className="m-0">
                <video
                    className="aspect-video w-full bg-[#e5ebe8] object-cover"
                    controls
                    playsInline
                    muted
                    preload="metadata"
                    aria-label={customerStory.videoLabel[locale]}
                >
                    <source src={assets.customerStoryVideo} type="video/mp4" />
                    {japanese
                        ? "お使いのブラウザーでは動画を再生できません。"
                        : "Your browser does not support video playback."}
                </video>
                <figcaption className="pt-3 text-sm text-muted">
                    {customerStory.videoLabel[locale]}
                </figcaption>
            </figure>
        </div>
    );
}
