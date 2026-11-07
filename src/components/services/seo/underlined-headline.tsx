/**
 * SEO page headline style: the *starred* phrase in blue with a hand-drawn
 * underline, e.g. "Show up where your customers *search*".
 */
export function UnderlinedHeadline({ text }: { text: string }) {
  const [before, accent, after] = text.split("*");
  return (
    <>
      {before}
      {accent && (
        <span className="relative inline-block whitespace-nowrap text-primary">
          {accent}
          <svg
            aria-hidden="true"
            viewBox="0 0 200 12"
            preserveAspectRatio="none"
            className="absolute -bottom-1.5 left-[4%] h-3 w-[92%] sm:-bottom-2"
          >
            <path
              d="M3 9 C 50 2, 130 1, 197 6"
              fill="none"
              strokeWidth={4}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="stroke-primary"
            />
          </svg>
        </span>
      )}
      {after}
    </>
  );
}
