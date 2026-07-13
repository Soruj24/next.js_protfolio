"use client";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ScreenshotsSectionProps {
  screenshots: string[];
  title: string;
}

export default function ScreenshotsSection({ screenshots, title }: ScreenshotsSectionProps) {
  const [selected, setSelected] = useState<number | null>(null);

  if (!screenshots?.length) return null;

  return (
    <section id="screenshots" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center shrink-0">
          <ImageIcon className="w-5 h-5 text-pink-400" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Screenshots</h2>
          <p className="text-sm text-gray-500 mt-0.5">Visual walkthrough of the application</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {screenshots.map((src, i) => (
          <button
            key={i}
            onClick={() => setSelected(selected === i ? null : i)}
            className="group relative aspect-video rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.03] hover:border-cyan-500/30 transition-all duration-300"
          >
            <Image
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              fill
              className={`object-cover transition-all duration-500 ${
                selected === i ? "scale-100" : "scale-100 group-hover:scale-105"
              }`}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 left-3 text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
              </svg>
              Click to {selected === i ? "minimize" : "expand"}
            </div>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-5xl w-full aspect-video rounded-2xl overflow-hidden border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={screenshots[selected]}
              alt={`${title} screenshot ${selected + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
