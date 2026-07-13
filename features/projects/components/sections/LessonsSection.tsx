"use client";
import { BookOpen } from "lucide-react";

interface LessonsSectionProps {
  lessons: string[];
}

export default function LessonsSection({ lessons }: LessonsSectionProps) {
  if (!lessons?.length) return null;

  return (
    <section id="lessons-learned" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Lessons Learned</h2>
          <p className="text-sm text-gray-500 mt-0.5">Key takeaways from this project</p>
        </div>
      </div>
      <div className="space-y-3">
        {lessons.map((lesson, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-amber-500/20 transition-all duration-300"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-bold shrink-0 mt-0.5">
              {i + 1}
            </span>
            <p className="text-gray-300 leading-relaxed">{lesson}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
