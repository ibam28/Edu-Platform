export interface CodeBlockProps {
  title?: string;
  code: string;
}

export function CodeBlock({ title, code }: CodeBlockProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background-muted">
      {title ? (
        <div className="border-b border-border bg-background-subtle px-4 py-2 text-xs font-semibold text-muted">
          {title}
        </div>
      ) : null}
      <pre className="overflow-x-auto p-4 text-sm font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
