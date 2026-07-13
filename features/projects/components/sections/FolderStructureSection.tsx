"use client";
import { FolderTree } from "lucide-react";
import { motion } from "framer-motion";
import { IFolderNode } from "@/types";

interface FolderStructureSectionProps {
  structure: IFolderNode[];
}

function TreeNode({ node, depth = 0 }: { node: IFolderNode; depth?: number }) {
  return (
    <div
      className="flex items-center gap-2 py-1.5 text-sm"
      style={{ paddingLeft: `${depth * 20 + 8}px` }}
    >
      <span className="text-gray-500 shrink-0">
        {node.type === "folder" ? (
          <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        )}
      </span>
      <span className={node.type === "folder" ? "text-amber-300 font-medium" : "text-gray-300"}>
        {node.name}
      </span>
      {node.type === "folder" && node.children && (
        <span className="text-[10px] text-gray-600 ml-1">
          {node.children.length} {node.children.length === 1 ? "item" : "items"}
        </span>
      )}
    </div>
  );
}

function renderTree(nodes: IFolderNode[]) {
  return nodes.map((node, i) => (
    <div key={i}>
      <TreeNode node={node} />
      {node.type === "folder" && node.children && (
        <div>{renderTree(node.children)}</div>
      )}
    </div>
  ));
}

export default function FolderStructureSection({ structure }: FolderStructureSectionProps) {
  if (!structure?.length) return null;

  return (
    <section id="folder-structure" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
          <FolderTree className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Folder Structure</h2>
          <p className="text-sm text-gray-500 mt-0.5">Project organization at a glance</p>
        </div>
      </div>
      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm overflow-x-auto"
        >
          {renderTree(structure)}
        </motion.div>
      </div>
    </section>
  );
}
