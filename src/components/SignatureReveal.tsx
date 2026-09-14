import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import raisinCake from "../assets/images/raisin-cake.jpg";

/**
 * The page's one big cinematic moment: a pinned section where the raisin
 * cake — Klero's signature pastry — grows from a small framed photo into a
 * full-bleed image as you scroll through it, revealed via an animated
 * clip-path rather than scaling the element itself (robust at any
 * viewport size, since the image already fills its container and is
 * simply being "un-masked").
 *
 * Mechanism: the section is much taller than the viewport (220vh). Its
 * content is `sticky top-0 h-screen`, so it stays put while that extra
 * height is consumed by scrolling — framer-motion's useScroll reports
 * 0→1 progress across exactly that span, which drives the clip-path,
 * heading fade, and caption fade. Once the container's height is used up,
 * the sticky element releases naturally and Offerings scrolls up over it —
 * no manual hand-off needed.
 *
 * Deliberately used once, for the brand's specific signature item, rather
 * than as a recurring pattern — a technique like this loses its impact
 * (and starts to feel like a tech-product demo rather than a food brand)
 * if it's repeated on every section.
 */
// v mapped from [from, to] to [0, 1], clamped — a couple of the effects
// below need this same "clamped local progress" shape.
const localProgress = (v: number, from: number, to: number) => Math.min(Math.max((v - from) / (to - from), 0), 1);

export default function SignatureReveal() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Every transform below is a plain function of progress (rather than
  // framer-motion's [input range]/[output range] array shorthand) with
  // explicit clamping — the array form did not reliably clamp to its
  // final value once scrollYProgress moved past the defined range in
  // testing, leaving e.g. the heading visibly non-zero opacity well into
  // the reveal. Safer to compute it by hand.
  const clipPath = useTransform(scrollYProgress, (v) => {
    const p = localProgress(v, 0.12, 0.62);
    const ease = p * p * (3 - 2 * p); // smoothstep, so the open/close isn't linear
    // Starts as a modest, clearly-small framed photo (well clear of the
    // heading above it) and opens out to full-bleed.
    const insetV = 36 * (1 - ease);
    const insetH = 33 * (1 - ease);
    const radius = 24 * (1 - ease);
    return `inset(${insetV}% ${insetH}% round ${radius}px)`;
  });
  const imageScale = useTransform(scrollYProgress, (v) => 1.12 - 0.12 * localProgress(v, 0.12, 0.62));
  const headingOpacity = useTransform(scrollYProgress, (v) => 1 - localProgress(v, 0.1, 0.24));
  const headingY = useTransform(scrollYProgress, (v) => -36 * localProgress(v, 0, 0.24));
  const captionOpacity = useTransform(scrollYProgress, (v) => localProgress(v, 0.72, 0.9));
  const captionY = useTransform(scrollYProgress, (v) => 16 * (1 - localProgress(v, 0.72, 0.9)));

  if (reduceMotion) {
    return (
      <section className="section-pad" aria-label="Klero's signature raisin cake">
        <div className="content-wrap text-center flex flex-col items-center">
          <p className="eyebrow text-terracotta mb-3">Our Signature</p>
          <h2 className="font-display text-[clamp(1.7rem,1.35rem+1.4vw,2.4rem)] text-cocoa mb-8 max-w-md">
            The one people ask for by name.
          </h2>
          <img
            src={raisinCake}
            alt="Klero's signature raisin cake, sliced and dusted with powdered sugar"
            className="rounded-[24px] w-full max-w-xl aspect-[4/5] object-cover"
          />
          <p className="font-display italic text-brown text-lg mt-6">
            Klero's raisin cake — baked the morning of pickup.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[220vh]" aria-label="Klero's signature raisin cake">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-cream">
        <motion.div
          style={{ opacity: headingOpacity, y: headingY }}
          className="absolute inset-x-0 top-[16%] md:top-[20%] z-20 text-center px-6 pointer-events-none"
        >
          <p className="eyebrow text-terracotta mb-3">Our Signature</p>
          <h2 className="font-display text-[clamp(1.8rem,1.3rem+2vw,2.8rem)] text-cocoa max-w-md mx-auto">
            The one people ask for by name.
          </h2>
        </motion.div>

        <motion.div className="absolute inset-0" style={{ clipPath }}>
          <motion.img
            src={raisinCake}
            alt="Klero's signature raisin cake, sliced and dusted with powdered sugar"
            className="w-full h-full object-cover"
            style={{ scale: imageScale }}
          />
        </motion.div>

        <motion.div
          style={{ opacity: captionOpacity, y: captionY }}
          className="absolute z-20 bottom-14 md:bottom-20 inset-x-0 text-center px-6 pointer-events-none"
        >
          <p className="font-display italic text-cream text-xl md:text-2xl [text-shadow:0_2px_16px_rgba(62,39,35,0.5)]">
            Klero's raisin cake — baked the morning of pickup.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
