'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'

interface MarkdownContentProps {
  content: string
  className?: string
}

export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  if (!content?.trim()) return null

  return (
    <div className={`markdown-content text-sm leading-relaxed ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          p: ({ children }) => (
            <p className="mb-2 last:mb-0 text-slate-600 dark:text-gray-300">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-800 dark:text-gray-100">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          h1: ({ children }) => (
            <h4 className="text-base font-bold mb-2 text-slate-900 dark:text-white">{children}</h4>
          ),
          h2: ({ children }) => (
            <h5 className="text-sm font-bold mb-2 text-slate-900 dark:text-white">{children}</h5>
          ),
          h3: ({ children }) => (
            <h6 className="text-sm font-semibold mb-1 text-slate-900 dark:text-white">{children}</h6>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside ml-4 mb-2 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside ml-4 mb-2 space-y-1">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-slate-600 dark:text-gray-300">{children}</li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 dark:text-primary-400 hover:underline"
            >
              {children}
            </a>
          ),
          br: () => <br />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
