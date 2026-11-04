import { cn } from "@/lib/utils";

/**
 * Aceternity text-generate-effect, rebuilt in CSS. The original hid every word
 * until JavaScript animated it in; here the words are server-rendered and fade
 * in with staggered CSS keyframes (`animate-word-in`), so the headline is in the
 * HTML, needs no JS, and shows at once under reduced motion. Words wrapped in
 * *asterisks* get the serif-italic accent, like <Accented>.
 */
export function TextGenerateEffect({
  words,
  className,
  stagger = 0.06,
  duration = 0.45,
}: {
  words: string;
  className?: string;
  stagger?: number;
  duration?: number;
}) {
  const tokens: { text: string; accent: boolean }[] = [];
  let accent = false;
  for (const raw of words.split(" ")) {
    if (raw.startsWith("*")) accent = true;
    tokens.push({ text: raw.replaceAll("*", ""), accent });
    // "*customers*," closes the accent even with trailing punctuation.
    if (raw.replace(/[^\w*]+$/, "").endsWith("*")) accent = false;
  }

  return (
    <span className={className}>
      {tokens.map((token, i) => (
        <span key={i}>
          <span
            className={cn(
              "inline-block animate-word-in opacity-0 blur-sm motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:blur-none",
              token.accent && "font-accent font-normal tracking-normal text-primary italic",
            )}
            style={{ animationDelay: `${i * stagger}s`, animationDuration: `${duration}s` }}
          >
            {token.text}
          </span>
          {i < tokens.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}
