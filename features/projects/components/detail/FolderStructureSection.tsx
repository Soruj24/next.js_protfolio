"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FolderTree, ChevronRight, ChevronDown, FileCode, Folder } from "lucide-react";
import type { IFolderNode } from "@/types";

interface FolderStructureSectionProps {
  folderStructure: IFolderNode[];
}

function FolderNode({ node, depth = 0 }: { node: IFolderNode; depth?: number }) {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const isFolder = node.type === "folder";

  return (
    <div>
      <button
        onClick={() => isFolder && setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-2 py-1.5 px-2 rounded-lg text-[13px] font-medium transition-colors ${
          isFolder
            ? "text-gray-300 hover:bg-white/[0.03] cursor-pointer"
            : "text-gray-400 cursor-default"
        }`}
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
      >
        {isFolder ? (
          <>
            <ChevronRight
              className={`w-3 h-3 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
            <Folder className="w-4 h-4 text-cyan-500/70 flex-shrink-0" />
          </>
        ) : (
          <>
            <div className="w-3" />
            <FileCode className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </>
        )}
        <span className="truncate">{node.name}</span>
      </button>
      {isFolder && isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <FolderNode key={child.name} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FolderStructureSection({ folderStructure }: FolderStructureSectionProps) {
  return (
    <section id="folder-structure" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <FolderTree className="w-4 h-4 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Folder Structure
          </h2>
        </div>

        <div className="rounded-2xl bg-[#060a12] border border-white/[0.06] overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.04] flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <span className="text-[10px] font-mono text-gray-400 ml-2">project-structure</span>
          </div>
          <div className="p-3 font-mono text-[13px]">
            {folderStructure.map((node) => (
              <FolderNode key={node.name} node={node} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
