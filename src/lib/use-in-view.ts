import { useEffect, useRef, useState } from "react";

/**
 * Tiny IntersectionObserver hook. Used instead of Motion's `useInView` so the
 * counters and lazy effects do not depend on the animation library.
 */
export function useInView<T extends Element = HTMLElement>({
  rootMargin = "0px",
  once = false,
}: { rootMargin?: string; once?: boolean } = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, once]);

  return [ref, inView] as const;
}
