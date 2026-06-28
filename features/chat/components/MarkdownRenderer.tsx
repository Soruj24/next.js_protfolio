import React from "react"
import ReactMarkdown from "react-markdown"

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h2: (props) => <h2 className="text-lg font-bold mb-2" {...props} />,
        h3: (props) => <h3 className="text-base font-bold mb-1" {...props} />,
        p: (props) => <p className="leading-relaxed mb-2" {...props} />,
        ul: (props) => <ul className="list-disc pl-5 space-y-1" {...props} />,
        ol: (props) => <ol className="list-decimal pl-5 space-y-1" {...props} />,
        a: (props) => (
          <a className="text-blue-600 hover:underline dark:text-blue-400" {...props} />
        ),
        strong: (props) => <strong className="font-semibold" {...props} />,
        code: (props) => (
          <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-slate-800" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
