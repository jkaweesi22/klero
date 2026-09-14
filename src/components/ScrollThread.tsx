import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

/**
 * A thin vertical thread, fixed to the right edge of the viewport, that
 * fills and carries a bead downward with overall page scroll progress.
 * Doubles as both a scroll progress cue (an Apple-style continuous-motion
 * touch) and a literal small rendering of Klero's own "carried forward"
 * thread motif — deliberately not a generic top loading bar.
 *
 * Desktop only (there's no good place for it once the mobile nav takes
 * over the right edge), and skipped entirely under prefers-reduced-motion.
 */
export default function ScrollThread() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });
  const dotTop = useTransform(progress, (v) => `${v * 100}%`);

  if (reduceMotion) return null;

  return (
    <div
      className="hidden lg:block fixed right-6 top-28 bottom-12 w-px z-40 pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-cocoa/12" />
      <motion.div
        className="absolute inset-x-0 top-0 h-full bg-terracotta origin-top"
        style={{ scaleY: progress }}
      />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full bg-terracotta shadow-[0_0_0_3px_rgba(0,0,0,0.08)]"
        style={{ top: dotTop }}
      />
    </div>
  );
}
