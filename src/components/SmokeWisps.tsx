import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

type SmokeWispsProps = {
  /** Positioning classes — this component renders `absolute`, so the
   * caller supplies the rest (e.g. "inset-0", or "-top-16 inset-x-0
   * bottom-0" to let wisps rise above their container). */
  className?: string;
  /** Number of wisps to render. */
  count?: number;
};

/**
 * A soft, abstract rising-warmth motif — evokes an oven's heat and steam
 * without a literal smoke graphic (per the brand brief: "no cheesy literal
 * steam graphics"). A handful of blurred, translucent wisps drift and fade
 * on a continuous loop, and — via framer-motion's scroll-linked transforms —
 * rise a little further and fade in/out as the section scrolls through
 * view, so the motion reads as connected to scrolling rather than just
 * looping in place.
 *
 * Purely decorative (aria-hidden). Respects prefers-reduced-motion: the
 * continuous drift and scroll-linked transform are both dropped in favor of
 * a faint, static glow.
 */
export default function SmokeWisps({ className = "", count = 3 }: SmokeWispsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.3, 0.75, 1], [0, 1, 1, 0]);
  const rise = useTransform(scrollYProgress, [0, 1], [30, -50]);

  return (
    <div ref={ref} className={`pointer-events-none absolute overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        style={reduceMotion ? { opacity: 0.12 } : { opacity: scrollOpacity, y: rise }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            className="smoke-wisp"
            style={
              reduceMotion
                ? { left: `${18 + i * 30}%`, animation: "none" }
                : {
                    left: `${18 + i * 30}%`,
                    animationDelay: `${i * 1.7}s`,
                    animationDuration: `${8 + i * 1.6}s`,
                  }
            }
          />
        ))}
      </motion.div>
    </div>
  );
}
