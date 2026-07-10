"use client";
import { motion } from "framer-motion";
import { Zap, AlertCircle, CheckCircle } from "lucide-react";

interface ChallengesSectionProps {
  challenges: string[];
  solutions: string[];
}

export default function ChallengesSection({ challenges, solutions }: ChallengesSectionProps) {
  return (
    <section id="challenges" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
            <Zap className="w-4 h-4 text-orange-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Technical Challenges
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Challenges */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-red-400/60 uppercase tracking-widest">
              Challenges
            </span>
            {challenges.map((challenge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-red-500/[0.03] border border-red-500/10"
              >
                <AlertCircle className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-[13px] leading-relaxed">{challenge}</span>
              </motion.div>
            ))}
          </div>

          {/* Solutions */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest">
              Solutions
            </span>
            {solutions.map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/10"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400/60 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-[13px] leading-relaxed">{solution}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
