import { useLayoutEffect, useRef, useState } from "react";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type RevealOwnProps<T extends ElementType> = {
  children: ReactNode;
  /** animate.css animation name, without the animate__ prefix — e.g. "fadeInUp". */
  animation?: string;
  /** Stagger delay in milliseconds. */
  delay?: number;
  duration?: number;
  as?: T;
  className?: string;
};

type RevealProps<T extends ElementType> = RevealOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof RevealOwnProps<T>>;

type Phase = "idle" | "pending" | "revealed";

/**
 * Reveals its children with an animate.css (https://animate.style) entrance
 * animation the first time they scroll into view.
 *
 * Safety net: children render plainly and fully visible until we can
 * guarantee an entrance animation will actually run. Only once an
 * IntersectionObserver is attached do we hide-then-reveal — and if that
 * observer is unsupported, reduced motion is preferred, or it simply never
 * fires within a short grace period, content is force-shown. Nothing on
 * this site should ever be left permanently invisible by a scroll animation.
 */
export default function Reveal<T extends ElementType = "div">({
  children,
  animation = "fadeInUp",
  delay = 0,
  duration = 700,
  as,
  className = "",
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  // useLayoutEffect (not useEffect) so the idle -> pending switch happens
  // before the browser paints — no flash of visible-then-hidden content.
  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;

    if (reducedMotion || typeof IntersectionObserver === "undefined" || !el) {
      setPhase("revealed");
      return;
    }

    setPhase("pending");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPhase("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(el);

    // Belt-and-braces: never leave content stuck invisible.
    const fallback = window.setTimeout(() => setPhase("revealed"), 2000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const classes =
    phase === "pending"
      ? "opacity-0"
      : phase === "revealed"
        ? `animate__animated animate__${animation}`
        : "";

  return (
    <Tag
      ref={ref}
      className={`${classes} ${className}`}
      style={phase === "revealed" ? { animationDelay: `${delay}ms`, animationDuration: `${duration}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
