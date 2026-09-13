const KEYWORDS = new Set([
  "import",
  "from",
  "def",
  "for",
  "in",
  "if",
  "not",
  "return",
  "yield",
  "else",
  "elif",
  "as",
  "with",
]);

// Minimal, dependency-free token coloring — good enough for short snippets
// without pulling in a full syntax-highlighting library.
function tokenize(line: string) {
  const tokens: { text: string; className: string }[] = [];
  const regex = /(#.*$)|("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')|(\b\d+\b)|([A-Za-z_][A-Za-z0-9_]*)|(\s+)|([^\sA-Za-z0-9_]+)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(line))) {
    const [, comment, dq, sq, num, word, space, symbol] = match;
    if (comment) tokens.push({ text: comment, className: "text-muted/70" });
    else if (dq || sq) tokens.push({ text: dq ?? sq, className: "text-accent-green" });
    else if (num) tokens.push({ text: num, className: "text-accent-amber" });
    else if (word) {
      tokens.push({
        text: word,
        className: KEYWORDS.has(word) ? "text-accent-violet" : "text-white",
      });
    } else if (space) tokens.push({ text: space, className: "" });
    else if (symbol) tokens.push({ text: symbol, className: "text-accent-cyan" });
  }
  return tokens;
}

export function CodeBlock({ code }: { code: string }) {
  const lines = code.split("\n");
  return (
    <pre className="overflow-x-auto rounded-lg border border-base-border bg-base-950/80 p-4 font-mono text-[11.5px] leading-relaxed scrollbar-none">
      <code>
        {lines.map((line, i) => (
          <div key={i}>
            {tokenize(line).map((token, ti) => (
              <span key={ti} className={token.className}>
                {token.text}
              </span>
            ))}
            {line === "" && " "}
          </div>
        ))}
      </code>
    </pre>
  );
}
