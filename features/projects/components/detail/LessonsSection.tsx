"use client";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

interface LessonsSectionProps {
  lessonsLearned: string[];
}

export default function LessonsSection({ lessonsLearned }: LessonsSectionProps) {
  return (
    <section id="lessons" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-teal-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Lessons Learned
          </h2>
        </div>

        <div className="space-y-3">
          {lessonsLearned.map((lesson, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-teal-500/[0.03] border border-teal-500/10"
            >
              <div className="w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[11px] font-bold text-teal-400">{i + 1}</span>
              </div>
              <span className="text-gray-400 text-[13px] leading-relaxed">{lesson}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
