"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Copy, Check } from "lucide-react";
import type { ICodeSnippet } from "@/types";

interface CodeSnippetsSectionProps {
  codeSnippets: ICodeSnippet[];
}

export default function CodeSnippetsSection({ codeSnippets }: CodeSnippetsSectionProps) {
  return (
    <section id="code-snippets" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
            <Code className="w-4 h-4 text-pink-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Code Snippets
          </h2>
        </div>

        <div className="space-y-6">
          {codeSnippets.map((snippet, i) => (
            <CodeBlock key={i} snippet={snippet} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function CodeBlock({ snippet }: { snippet: ICodeSnippet }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl bg-[#060a12] border border-white/[0.06] overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-white/[0.04] flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-white">{snippet.title}</h4>
          <p className="text-[12px] text-gray-400 mt-0.5">{snippet.description}</p>
        </div>
        <button
          onClick={copyCode}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] font-medium text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="px-5 py-4 overflow-x-auto">
        <pre className="text-[13px] leading-[1.7] font-mono text-gray-400 whitespace-pre">
          {snippet.code}
        </pre>
      </div>
    </motion.div>
  );
}
