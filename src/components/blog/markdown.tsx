import Link from "next/link";
import { Fragment } from "react";
import { slugify } from "@/lib/slug";

/**
 * Renders the small markdown subset the blog editor supports, straight to
 * React elements (no HTML strings, so pasted content can't inject markup):
 *
 *   ## Heading   ### Subheading   - bullet   1. numbered   > quote   ---
 *   **bold**   *italic*   `code`   [link text](/contact or https://...)
 */

type Block =
  | { type: "h2" | "h3" | "p" | "quote"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "hr" };

function parseBlocks(source: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let quote: string[] = [];

  const flush = () => {
    if (paragraph.length) blocks.push({ type: "p", text: paragraph.join(" ") });
    if (quote.length) blocks.push({ type: "quote", text: quote.join(" ") });
    paragraph = [];
    quote = [];
  };

  for (const raw of source.replace(/\r\n?/g, "\n").split("\n")) {
    const line = raw.trim();
    let match: RegExpMatchArray | null;

    if (!line) {
      flush();
    } else if ((match = line.match(/^(#{1,4})\s+(.+)$/))) {
      flush();
      blocks.push({ type: match[1].length <= 2 ? "h2" : "h3", text: match[2] });
    } else if (/^(-{3,}|\*{3,})$/.test(line)) {
      flush();
      blocks.push({ type: "hr" });
    } else if ((match = line.match(/^[-*+]\s+(.+)$/)) || (match = line.match(/^\d+[.)]\s+(.+)$/))) {
      flush();
      const type = /^\d/.test(line) ? "ol" : "ul";
      const last = blocks.at(-1);
      if (last && last.type === type) last.items.push(match[1]);
      else blocks.push({ type, items: [match[1]] });
    } else if ((match = line.match(/^>\s?(.*)$/))) {
      if (paragraph.length) flush();
      quote.push(match[1]);
    } else {
      if (quote.length) flush();
      paragraph.push(line);
    }
  }
  flush();
  return blocks;
}

/** Plain text of an inline string, for heading ids and the table of contents. */
function plain(text: string) {
  return text.replace(/\*\*|\*|`/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

export function headingId(text: string) {
  return slugify(plain(text));
}

/** The article's H2s, for the "In this article" list. */
export function extractHeadings(source: string) {
  return parseBlocks(source)
    .filter((block): block is { type: "h2"; text: string } => block.type === "h2")
    .map((block) => ({ id: headingId(block.text), text: plain(block.text) }));
}

const inlinePattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\)|`[^`]+`|\*[^*\s][^*]*\*)/g;

function Inline({ text }: { text: string }) {
  return text.split(inlinePattern).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code key={i} className="rounded-md bg-secondary px-1.5 py-0.5 text-[0.9em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const className = "font-medium text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary";
      if (href.startsWith("/")) {
        return (
          <Link key={i} href={href} className={className}>
            {label}
          </Link>
        );
      }
      if (/^https?:\/\//.test(href)) {
        return (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={className}>
            {label}
          </a>
        );
      }
      return <Fragment key={i}>{label}</Fragment>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function Markdown({ source }: { source: string }) {
  return (
    <div className="text-[1.0625rem] leading-[1.8] text-foreground/80">
      {parseBlocks(source).map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={headingId(block.text)}
                className="mt-12 scroll-mt-28 text-2xl leading-tight font-semibold tracking-[-0.02em] text-foreground first:mt-0 sm:text-[1.75rem]"
              >
                <Inline text={block.text} />
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-8 text-xl font-semibold text-foreground">
                <Inline text={block.text} />
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="mt-5 space-y-2.5 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>
                      <Inline text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mt-5 list-decimal space-y-2.5 pl-6 marker:font-semibold marker:text-primary">
                {block.items.map((item, j) => (
                  <li key={j} className="pl-1">
                    <Inline text={item} />
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={i} className="mt-6 border-l-2 border-primary pl-5 text-lg text-foreground">
                <Inline text={block.text} />
              </blockquote>
            );
          case "hr":
            return <hr key={i} className="my-10 border-border" />;
          default:
            return (
              <p key={i} className="mt-5 first:mt-0">
                <Inline text={block.text} />
              </p>
            );
        }
      })}
    </div>
  );
}
