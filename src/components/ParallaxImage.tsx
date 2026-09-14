import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

type ParallaxImageProps = {
  src: string;
  alt: string;
  /** Classes for the outer frame — aspect ratio, rounding, etc. Needs `overflow-hidden` (already applied) and `relative` (already applied). */
  className?: string;
  imgClassName?: string;
  /** How far the image drifts (px) across the element's scroll range. Larger = more noticeable parallax. */
  distance?: number;
  loading?: "lazy" | "eager";
};

/**
 * An image that drifts slightly as the page scrolls past it — continuous,
 * scroll-linked motion (via framer-motion's useScroll/useTransform) rather
 * than a one-off entrance animation. The image is deliberately oversized
 * and offset so the moving window never reveals empty space at its edges.
 *
 * Respects prefers-reduced-motion (renders a plain, static image).
 */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  distance = 36,
  loading = "lazy",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        className={`absolute inset-x-0 object-cover ${imgClassName}`}
        style={{
          top: -distance,
          height: `calc(100% + ${distance * 2}px)`,
          ...(reduceMotion ? {} : { y }),
        }}
      />
    </div>
  );
}
