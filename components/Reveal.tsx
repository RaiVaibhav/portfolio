"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Flips to true the first time any observer callback reports an intersection.
 * If it never does — a background tab, a throttled observer, an old browser —
 * the per-element failsafe below reveals the content anyway. The page must
 * never depend on the observer to become readable.
 */
let observerWorks = false;

type Props = {
  as?: "div" | "article" | "dl";
  className?: string;
  children: ReactNode;
};

export default function Reveal({ as: Tag = "div", className = "", children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observerWorks = true;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    io.observe(el);

    const failsafe = window.setTimeout(() => {
      if (!observerWorks) el.classList.add("in");
    }, 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const Element = Tag as "div";
  return (
    <Element ref={ref as React.Ref<HTMLDivElement>} className={`rv ${className}`.trim()}>
      {children}
    </Element>
  );
}
