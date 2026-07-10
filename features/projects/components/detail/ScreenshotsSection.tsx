"use client";
import { motion } from "framer-motion";
import { Camera, Expand } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ScreenshotsSectionProps {
  screenshots: string[];
  title: string;
}

export default function ScreenshotsSection({ screenshots, title }: ScreenshotsSectionProps) {
  const [selected, setSelected] = useState<number | null>(null);

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <section id="screenshots" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Camera className="w-4 h-4 text-violet-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Screenshots
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {screenshots.map((src, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelected(i)}
              className="group relative aspect-video rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.15] transition-all"
            >
              <Image
                src={src}
                alt={`${title} screenshot ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <Expand className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Lightbox */}
        {selected !== null && (
          <div
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelected(null)}
          >
            <div className="relative w-full max-w-4xl aspect-video">
              <Image
                src={screenshots[selected]}
                alt={`${title} screenshot ${selected + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
