import type { ReactNode } from "react";

const TOKEN = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)|`(.+?)`/g;

/**
 * Content files stay plain data. This turns the three bits of inline markup
 * they use — **bold**, [text](href) and `code` — into React nodes.
 */
export function rich(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;

  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));

    if (m[1] !== undefined) {
      out.push(<b key={key++}>{m[1]}</b>);
    } else if (m[2] !== undefined) {
      out.push(
        <a key={key++} href={m[3]} target="_blank" rel="noopener noreferrer">
          {m[2]}
        </a>,
      );
    } else if (m[4] !== undefined) {
      out.push(<code key={key++}>{m[4]}</code>);
    }

    last = m.index + m[0].length;
  }

  if (last < text.length) out.push(text.slice(last));
  return out;
}
