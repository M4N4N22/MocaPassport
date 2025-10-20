'use client';
import { useState } from 'react';
import { ClipboardIcon, CheckIcon } from 'lucide-react';

interface CodeBlockProps {
  title?: string;
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ title, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const lines = code.split('\n');

  return (
    <div className="relative bg-card rounded-xl overflow-hidden shadow-md w-[90%] h-[50%]">
      {title && (
        <div className="p-3 border-b border-zinc-800 text-sm font-medium text-muted-foreground bg-muted">
          {title}
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-lg hover:text-zinc-100 hover:bg-zinc-800 text-zinc-400 text-sm flex items-center gap-1"
      >
        {copied ? <CheckIcon className="w-4 h-4" /> : <ClipboardIcon className="w-4 h-4" />}
      </button>
      <pre className="p-4 text-sm overflow-x-auto">
        <code className="block">
          {lines.map((line, idx) => (
            <div key={idx} className="flex">
              <span className="select-none text-zinc-500 pr-4 text-right w-8">{idx + 1}</span>
              <span className="flex-1">{line}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
};
