"use client";
import { Code } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ICodeSnippet } from "@/types";
import { motion } from "framer-motion";

interface CodeSnippetsSectionProps {
  snippets: ICodeSnippet[];
}

export default function CodeSnippetsSection({ snippets }: CodeSnippetsSectionProps) {
  if (!snippets?.length) return null;

  return (
    <section id="code-snippets" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
          <Code className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Code Snippets</h2>
          <p className="text-sm text-gray-500 mt-0.5">Key implementation details</p>
        </div>
      </div>
      <div className="space-y-6">
        {snippets.map((snippet, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="rounded-2xl overflow-hidden border border-white/[0.08]"
          >
            <div className="flex items-center justify-between px-5 py-3 bg-white/[0.03] border-b border-white/[0.08]">
              <div>
                <h4 className="text-white font-semibold text-sm">{snippet.title}</h4>
                {snippet.description && (
                  <p className="text-gray-500 text-xs mt-0.5">{snippet.description}</p>
                )}
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 bg-white/5 px-2 py-1 rounded-md">
                {snippet.language}
              </span>
            </div>
            <SyntaxHighlighter
              language={snippet.language || "typescript"}
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: 0,
                fontSize: "13px",
                lineHeight: "1.6",
                background: "rgba(255,255,255,0.02)",
              }}
              showLineNumbers
            >
              {snippet.code}
            </SyntaxHighlighter>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
